# Workspace and commerce release - 29 September 2026

## Implemented

- Atomic authenticated workspace creation via SECURITY INVOKER ensure_workspace, with ownership RLS preserved.
- Explicit data-loading errors rather than rendering failed reads as empty accounts.
- Serialised answer saves and updated_at conflict detection; unsaved-draft download.
- Course/career context save and blank-field deletion, followed by state refresh.
- Onboarding button recovery and preservation of unsaved draft text when switching criteria.
- Story creation, editing, deletion, personal evidence notes and explicitly self-declared review labels.
- Saved final-review checklist bound to a SHA-256 fingerprint of the four saved drafts. Changing draft text requires reviewing again.
- Account-name update, deliberate private JSON export, saved PDF download/removal and a PDF header sanity check (not malware scanning).
- Live/test access separation, expiry-aware UI, explicit sandbox context on premium requests, billing history and fail-closed live availability.
- Sandbox Payment Link return URL now includes /app/settings?sandbox=1&payment=success&session_id={CHECKOUT_SESSION_ID}.
- Benefit-led plan context and three short, attributed public alumni profiles on /stories and the home page. No customer testimonial, endorsement or selection-success claim is made.
- 13 public sitemap URLs. Private routes remain noindex and no-store.

## Verification layers

`node tests/release.cjs`: source, SSR, routes, metadata, CSP and disclosure contracts.

`node tests/workflows.cjs`: entitlement expiry, sandbox separation, premium context, serialised saves, stale writes and bounds.

`python tests/browser.py`: existing demo/responsive/navigation/form regression suite. Auth/support success responses are mocked.

`python tests/workspace-browser.py`: new onboarding, draft, story, review, export and billing UI contracts with an in-memory provider. No real user account or payment is created.

`python tests/deployed.py`: deployed source fingerprint, sitemap, public/private headers and route checks.

Database transaction tests were run against synthetic records and rolled back. They covered repeated workspace creation, onboarding, answer/experience/review saves, cross-account isolation, blocked plan upgrades, sandbox/live separation, duplicate payment events, out-of-order failure and full-refund revocation. These were database tests, not signed HTTP webhook or email-delivery tests.

After the review-table privilege migration, authenticated privileges were confirmed to be SELECT, INSERT, UPDATE and DELETE only; anonymous SELECT is false and RLS is enabled. Answers, experiences and users have updated_at triggers for conflict detection.

## Commercial launch gates - still closed

1. Only the connected Stripe sandbox account is available. A verified live merchant account, appropriate bank/payout setup and live API/webhook configuration are required. The user's permission to use Stripe does not supply merchant identity or establish eligibility.
2. Billing config still reports available=false, with no live payment URL or merchant/contact fields. Do not flip launch_verified until the live price, fulfilment, refund, customer information, tax treatment and service terms have been validated. The current webhook expects exactly GBP 39; changing tax/discount handling requires changing and testing the amount-validation contract.
3. Real email confirmation/recovery and a real authenticated save-upload-download-delete cycle remain to be tested end to end. SMTP delivery and leaked-password protection have not been configured by this release.
4. Azure analysis is still disabled; no model endpoint or production credentials have been connected. The current checker is deterministic, not semantic AI.
5. The product has no verified customer success testimonials. Public Chevening alumni profiles are editorial references only.

## Source references

- Raju Kendre: Chevening, 12 November 2024, https://www.chevening.org/news/breaking-down-barriers-how-raju-kendre-is-redefining-opportunities-for-indias-marginalised-communities/
- Eunice Ntobedzi Hanna and Maya Terro: Chevening, 18 June 2024, https://www.chevening.org/news/celebrating-our-chevening-alumni/

The source dates are retained; current job titles are not inferred from historical profiles. Source portraits or logos are not reused.
