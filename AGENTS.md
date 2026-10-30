# QCT Commerce — repository agent instructions

## Current architecture (verified 2026-10-30)
- Astro 7.4.x static marketing site, deployed by Cloudflare Pages from `main`. Production: https://qctcommerce.com.
- **Three published locales:** Turkish at `/`, English at `/en/`, Azerbaijani at `/az/`. Treat all three as production features. Keep page-specific reciprocal hreflang only when genuine translations exist, canonical and x-default behavior, language switch routes, metadata and localized content intact.
- Turkish marketplace and Amazon setup routes do **not** currently have English/Azerbaijani translations. Do not invent translated URLs.
- Location/market hub programmatic pages exist in TR/EN; AZ is deliberately handled via the actual Azerbaijani pages. Do not invent offices, local clients or geographic presence.
- Preserve the quote calculator, WhatsApp funnel, consent/analytics, accessibility, videos, keyboard navigation, responsive design, and the current brand color system.

## Before modifying files
Read README.md, package.json, affected source files, and relevant workflows. Check current default branch SHA, open PRs, tests and changed files. Documentation is context; confirm implementation in source.
An audit or review request is read-only. For code changes, make the smallest reversible patch on a dedicated branch and open a PR. Do not push directly to `main` or deploy without an explicit instruction; do not merge your own PR by default.

## SEO, GEO, AEO and AI discovery
Preserve self-canonicals, hreflang, schema.org JSON-LD, sitemap, robots.txt, internal links, OG previews, and per-locale meta descriptions. Validate content and HTML with the existing audits, not with assumptions.
- Site machine-readable summaries: `public/llms.txt` and `public/llms-full.txt`.
- Optional interoperability manifests: `public/.well-known/ard.json` and `public/.well-known/ai-catalog.json`. They are **not** a Google ranking feature or an AI recommendation guarantee.
- Match all summaries and manifests to **published** pages and facts; never fabricate client references, certifications, seller approvals, results, company registration, physical offices, translated pages or guaranteed search rankings.
- Google does not require llms.txt for AI Overviews; standard crawlable, helpful pages remain the primary discovery source. OpenAI Search uses OAI-SearchBot. Do not overengineer `robots.txt` with redundant bot-specific Allow rules.
- IndexNow notifies participating search engines about recently changed URLs; acceptance is not indexing. Use targeted changed-page submission where possible and never bulk-resubmit by default.

## Development and verification
Use supported commands defined in `package.json`: `npm ci`, `npm run build`, `npm run check:locales`, `npm run check:performance`, `npm run check:analytics`, `npm test`.
`npm run build` includes source/content checks, Astro build, built HTML/link/schema/parity checks, and AI discovery audits.
When launching a dev server, use `astro dev --background`; stop it with `astro dev stop`.
Keep Node consistent with CI (22.23.4). Never expose credentials, customer or private analytics data.
Report separately: changed files, local tests, CI, commit and push, PR, production deploy, live verification, failures and open risks.

Documentation: https://docs.astro.build
