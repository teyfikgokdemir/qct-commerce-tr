# QCT Analytics reference standard

GA4: G-ZGC820MP20 (existing property 537161539). GTM: GTM-W5JDHT9S. Clarity: yoad04yxmv.

The site owns GA4 and Clarity. GTM is a separately consent-gated extension container; do not add another Google tag, GA4 event tag or Clarity tag for these same events. `qct_event` contains `qct_event_name` and `qct_event_params` for future integrations. There is no consent-bypassing noscript iframe.

PUBLIC_GTM_ID and PUBLIC_CLARITY_ID override the public IDs at build time. An empty value disables that provider. Production hostname protection excludes preview/local traffic.

## Consent

Existing qct-analytics-consent values and GA4 advanced Consent Mode are preserved. Default analytics/ad storage, ad user data and personalization are denied. GA4 may send cookieless page views before consent. GTM requires analytics consent; Clarity additionally requires the new recording disclosure to be accepted (qct-recording-consent-v1). Returning GA-only consent does not enable recording. All custom events and first-touch session storage require analytics consent. Revoking consent clears analytics cookies/attribution and reloads to stop loaded scripts.

Clarity uses consentv2, body text masking and strict project masking. Recording is skipped on query/hash URLs. Google signals and ad personalization are disabled in this reference site.

## Events and conversions

- whatsapp_click, phone_click, email_click: contact intent, not verified leads.
- cta_click, outbound_click, language_change: navigation intent.
- scroll_depth: percent_scrolled 25/50/75/90, once per page.
- service_view, reference_view, blog_view: recognized page families.
- pricing_start/pricing_complete: calculator interaction, never a form conversion.
- form_start: brief interaction. The brief opens WhatsApp, so its submit action is whatsapp_click. No generate_lead/form_submit is fabricated.
- For sites with a real submission endpoint, form_submit/generate_lead requires a successful server response.

Parameters are allowlisted; form contents, raw contact URLs, query strings, click IDs and search terms are omitted. UTM source/medium/campaign accept constrained campaign identifiers only after consent. Referrer is reduced to origin/host. Revenue or business cost inputs are not sent.

## GA4 console

On 2026-09-26, automatic scroll, outgoing click, site search and form interaction measurement were turned off and their saved values verified. Video and file measurement remain enabled. This prevents duplicate custom events and automatic search/form collection. Existing GA4 property and measurement ID remain unchanged.

Mark contact-intent events as secondary key events according to reporting needs; do not call them confirmed leads. Never create a purchase conversion for this service website.

## Validation

npm run check:analytics: 12 consent, privacy, deduplication, SPA-scroll and hostname tests. npm run build, npm run check:locales and npm run check:performance pass. Local browser verified reject, reopen and accept. Vendor dashboard ingestion must be checked after production deployment; passing local tests does not establish live ingestion.

Official API references: https://developers.google.com/tag-platform/security/guides/consent and https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-consent-api-v2.
