import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return Response.json({ error: "Method not allowed" }, { status: 405, headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return Response.json({ error: "Unauthorized" }, { status: 401, headers: corsHeaders });
    }

    const body = await req.json().catch(() => ({}));
    if (body?.confirm !== "DELETE") {
      return Response.json({ error: "Confirmation required" }, { status: 400, headers: corsHeaders });
    }

    const url = Deno.env.get("SUPABASE_URL")!;
    const publishable = JSON.parse(Deno.env.get("SUPABASE_PUBLISHABLE_KEYS") || "{}")["default"]
      || Deno.env.get("SUPABASE_ANON_KEY")!;
    const secret = JSON.parse(Deno.env.get("SUPABASE_SECRET_KEYS") || "{}")["default"]
      || Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const token = authHeader.slice(7);
    const userClient = createClient(url, publishable, {
      global: { headers: { Authorization: authHeader } },
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { data: userData, error: userError } = await userClient.auth.getUser(token);
    if (userError || !userData.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401, headers: corsHeaders });
    }

    const admin = createClient(url, secret, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const userId = userData.user.id;
    const { data: apps } = await admin
      .from("applications")
      .select("source_file_path")
      .eq("user_id", userId);

    const paths = (apps || []).map((x: { source_file_path: string | null }) => x.source_file_path).filter(Boolean) as string[];
    if (paths.length) {
      await admin.storage.from("application-files").remove(paths);
    }

    const { error: deleteError } = await admin.auth.admin.deleteUser(userId);
    if (deleteError) throw deleteError;

    return Response.json({ ok: true }, { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (error) {
    console.error("delete-account", error);
    return Response.json({ error: "Account deletion failed" }, { status: 500, headers: corsHeaders });
  }
});