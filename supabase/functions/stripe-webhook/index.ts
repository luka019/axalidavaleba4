import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const STRIPE_PAYMENT_LINK_ID = "plink_1UKznXK4rZekAXQGA4gD5vos";
const PRODUCT_KEY = "full_shortlistproof";
const EXPECTED_AMOUNT = 3900;
const EXPECTED_CURRENCY = "gbp";

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function hex(bytes: ArrayBuffer) {
  return [...new Uint8Array(bytes)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

async function verifySignature(rawBody: string, header: string | null, secret: string) {
  if (!header || !secret) return false;
  const parts = header.split(",").map((x) => x.trim());
  const timestamp = parts.find((x) => x.startsWith("t="))?.slice(2);
  const signatures = parts.filter((x) => x.startsWith("v1=")).map((x) => x.slice(3));
  if (!timestamp || !signatures.length) return false;

  const ts = Number(timestamp);
  if (!Number.isFinite(ts) || Math.abs(Math.floor(Date.now() / 1000) - ts) > 300) return false;

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = hex(await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(timestamp + "." + rawBody),
  ));
  return signatures.some((candidate) => safeEqual(signature, candidate));
}

function isUuid(value: unknown): value is string {
  return typeof value === "string" &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

Deno.serve(async (req: Request) => {
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const url = Deno.env.get("SUPABASE_URL")!;
  const secretKeys = JSON.parse(Deno.env.get("SUPABASE_SECRET_KEYS") || "{}");
  const secretKey = secretKeys["default"] || Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !secretKey) return json({ error: "Server configuration error" }, 500);

  const admin = createClient(url, secretKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: webhookSecret, error: secretError } = await admin
    .rpc("get_server_integration_secret", { p_name: "stripe_webhook_secret_sandbox" });
  if (secretError || !webhookSecret) return json({ error: "Webhook configuration error" }, 500);

  const rawBody = await req.text();
  const signature = req.headers.get("stripe-signature");
  if (!(await verifySignature(rawBody, signature, webhookSecret))) {
    return json({ error: "Invalid signature" }, 400);
  }

  let event: any;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  if (event?.livemode !== false) return json({ received: true, ignored: "wrong_mode" });

  try {
    if (
      event.type === "checkout.session.completed" ||
      event.type === "checkout.session.async_payment_succeeded" ||
      event.type === "checkout.session.async_payment_failed" ||
      event.type === "checkout.session.expired"
    ) {
      const session = event.data?.object || {};
      if (session.payment_link !== STRIPE_PAYMENT_LINK_ID) {
        return json({ received: true, ignored: "different_payment_link" });
      }

      const userId = session.client_reference_id;
      if (!isUuid(userId)) return json({ received: true, ignored: "missing_user_reference" });

      const { data: profile } = await admin.from("users").select("id").eq("id", userId).maybeSingle();
      if (!profile) return json({ received: true, ignored: "unknown_user" });

      let status = "pending";
      if (event.type === "checkout.session.async_payment_failed" || event.type === "checkout.session.expired") {
        status = "failed";
      } else if (event.type === "checkout.session.async_payment_succeeded" || session.payment_status === "paid") {
        status = "paid";
      }

      const amount = Number(session.amount_total || 0);
      const currency = String(session.currency || "").toLowerCase();
      if (amount !== EXPECTED_AMOUNT || currency !== EXPECTED_CURRENCY) {
        return json({ received: true, ignored: "unexpected_price" });
      }

      const paymentIntent = typeof session.payment_intent === "string"
        ? session.payment_intent
        : session.payment_intent?.id || null;
      const customerId = typeof session.customer === "string"
        ? session.customer
        : session.customer?.id || null;

      const paymentRow = {
        user_id: userId,
        product_key: PRODUCT_KEY,
        stripe_checkout_session_id: session.id,
        stripe_payment_intent_id: paymentIntent,
        amount_minor: amount,
        currency,
        status,
        paid_at: status === "paid" ? new Date().toISOString() : null,
      };

      const { error: paymentError } = await admin
        .from("payments")
        .upsert(paymentRow, { onConflict: "stripe_checkout_session_id" });
      if (paymentError) throw paymentError;

      if (status === "paid") {
        const update: Record<string, unknown> = {
          plan: "full",
          updated_at: new Date().toISOString(),
        };
        if (customerId) update.stripe_customer_id = customerId;
        const { error: profileError } = await admin.from("users").update(update).eq("id", userId);
        if (profileError) throw profileError;
      }

      return json({ received: true });
    }

    if (event.type === "charge.refunded") {
      const charge = event.data?.object || {};
      const paymentIntent = typeof charge.payment_intent === "string"
        ? charge.payment_intent
        : charge.payment_intent?.id || null;
      if (!paymentIntent || charge.refunded !== true) return json({ received: true });

      const { data: rows, error: findError } = await admin
        .from("payments")
        .select("id,user_id")
        .eq("stripe_payment_intent_id", paymentIntent);
      if (findError) throw findError;
      if (!rows?.length) return json({ received: true });

      const { error: refundError } = await admin
        .from("payments")
        .update({ status: "refunded" })
        .eq("stripe_payment_intent_id", paymentIntent);
      if (refundError) throw refundError;

      for (const row of rows) {
        const { count } = await admin
          .from("payments")
          .select("id", { count: "exact", head: true })
          .eq("user_id", row.user_id)
          .eq("product_key", PRODUCT_KEY)
          .eq("status", "paid");
        if (!count) {
          await admin.from("users").update({
            plan: "free",
            updated_at: new Date().toISOString(),
          }).eq("id", row.user_id);
        }
      }
      return json({ received: true });
    }

    return json({ received: true, ignored: "event_not_used" });
  } catch (error) {
    console.error("stripe-webhook", error);
    return json({ error: "Webhook processing failed" }, 500);
  }
});