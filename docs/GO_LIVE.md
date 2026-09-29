# ShortlistProof go-live switches

The application code, Supabase schema, paid entitlement model and Stripe sandbox objects are prepared. These are the remaining account-level switches before charging real customers.

## 1. Stripe live account

Current connected Stripe context is sandbox only.

When a live Stripe account is connected:

1. Create the live `ShortlistProof Full Benchmark` product.
2. Create a one-time GBP 39 price.
3. Create a live hosted Payment Link / Checkout route.
4. Append authenticated Supabase user id as `client_reference_id`.
5. Lock/prefill the signed-in email.
6. Register the Supabase `stripe-webhook` endpoint for:
   - `checkout.session.completed`
   - `checkout.session.async_payment_succeeded`
   - `checkout.session.async_payment_failed`
   - `checkout.session.expired`
   - `charge.refunded`
7. Store the live signing secret server-side.
8. Replace sandbox product/link validation constants with live values.
9. Expose the public GBP 39 CTA only after the live webhook has been tested.

Do not grant `users.plan = 'full'` from the browser. Only the verified webhook may grant paid access.

## 2. Branded domain

Preferred domain: `shortlistproof.com`.

The application now derives canonical, Open Graph, robots and sitemap URLs from the request host, so a custom domain does not require hard-coded SEO changes.

After the domain is attached:

1. Update Stripe success/redirect URLs.
2. Add the domain to Supabase Auth redirect/site URL allowlists.
3. Confirm password reset and email confirmation return to the custom domain.
4. Verify HTTPS and redirects from any old public hostname.

## 3. Auth email

Supabase Auth is functional, but commercial launch should use a production SMTP provider for predictable confirmation and password-reset delivery.

Leaked-password protection is intentionally not treated as a launch blocker by product decision.

## 4. Azure Foundry

Keep `private.ai_provider_config.enabled = false` until real endpoint/model credentials exist and an integration test passes. See `docs/AZURE_FOUNDRY.md`.

## 5. Permissioned Scholar data

Do not market successful-application comparison until verified/permissioned records are actually ingested. Raw essays should not be exposed to users by default.

## Launch acceptance

A paid launch is accepted only when:

- live GBP 39 checkout completes;
- signed webhook creates one idempotent payment row;
- the purchaser becomes `plan=full`;
- Full routes load server-side;
- refund handling revokes access when no other paid entitlement remains;
- auth emails arrive;
- custom-domain redirect works;
- zero critical runtime errors appear after smoke testing.
