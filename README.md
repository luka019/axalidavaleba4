# ShortlistProof

ShortlistProof is an independent Chevening application evidence workspace. It is designed to diagnose structure, evidence, coherence and missing proof in an applicant's own writing. It must not generate, rewrite, complete or paraphrase Chevening submission answers.

## Production stack

- Vercel: public site and Applicant Portal
- Supabase: Auth, Postgres, private PDF storage, Edge Functions
- Stripe: one-time Full access entitlement
- Azure Foundry / Azure AI Search: planned server-side analysis provider once production credentials and the permissioned Scholar knowledge set are connected

## Current payment model

- Free: basic Proof Check
- Full ShortlistProof: GBP 39 one-time for one application cycle
- Stripe sandbox product and Payment Link are configured
- Premium entitlement is granted only by the signed Stripe webhook, which writes to `payments` and updates `users.plan`
- Authenticated clients cannot update `users.plan` or `stripe_customer_id`

## Premium routes

- Method Comparison
- Story Bank / Best Story Finder
- Whole Case
- Final Proof

The portal checks `users.plan = 'full'` before rendering premium routes.

## Sandbox checkout test

Open the signed-in portal with `?sandbox=1`, for example:

`/app/settings?sandbox=1`

The checkout button adds the authenticated Supabase user id as Stripe `client_reference_id` and locks the Stripe checkout email to the signed-in email. Stripe webhook fulfillment validates the Payment Link id, user id, GBP 39 amount and currency before granting access.

## Security controls

- RLS on user-facing application tables
- Least-privilege table and column grants
- Users cannot self-upgrade their plan
- Private PDF bucket, PDF-only, 10 MB limit
- Stripe webhook signature verification with five-minute replay tolerance
- Stripe signing secret stored outside the Edge Function source in a private server-only secret store
- CSP, frame denial, nosniff and restrictive Permissions-Policy
- Portal routes are noindex
- Self-service application deletion and account deletion
- Raw Scholar source tables are private and not client-readable

## Release checks

Before a live commercial release:

1. Connect a live Stripe account.
2. Recreate the GBP 39 Product/Price and live Payment Link.
3. Register the live webhook endpoint and replace the private live signing secret.
4. Change the portal from hidden sandbox checkout to live checkout.
5. Finalise merchant contact/refund wording in Terms and Stripe Checkout settings.
6. Configure production SMTP for Supabase Auth and enable leaked-password protection.
7. Connect the branded domain and update canonical/OG/sitemap/payment redirect URLs.
8. Connect Azure Foundry/Azure AI Search credentials before claiming AI/Scholar-dataset analysis is live.
9. Ingest only permissioned/licensed Scholar material and label source type; never expose raw successful-application text by default.

## Compliance guardrail

Chevening currently prohibits AI-generated answers to its essay questions. Product functionality must stay diagnostic: analyse, compare, identify evidence, challenge gaps, ask questions and test coherence. Do not generate submission prose.
