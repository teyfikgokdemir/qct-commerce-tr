# QCT Commerce SEO Focus Remediation — Design

**Date:** 14 November 2026
**Status:** Awaiting implementation approval
**Scope:** Conservative organic-search and measurement remediation for the existing Turkish-first Astro site

## Context

The latest 28-day evidence shows that search visibility is growing, but traffic and click-through remain low: Search Console recorded 3,289 impressions and 15 clicks (0.46% CTR, average position 44.7), while GA4 recorded 168 sessions and no configured conversions. The site also publishes a large number of programmatic location URLs, several of which have no recorded search demand, while a smaller set already receives impressions or clicks.

This design concentrates indexing and editorial effort without deleting routes, changing the visual design, introducing new locales, or altering consent behavior.

## Goals

- Keep proven or promising pages indexable and improve their search-result relevance.
- Reduce sitemap and indexation noise from unproven programmatic location/service combinations.
- Turn a valid project-brief submission into an observable lead event without treating calculator usage as a lead.
- Correct the remaining Georgia/Azerbaijan market-copy inconsistency.
- Translate the audit into a focused 30-day organic acquisition checklist.

## Non-goals

- Deleting, redirecting, or robots-blocking location pages.
- Removing English or Azerbaijani content.
- Redesigning pages or changing primary navigation.
- Inventing vendor pricing, customer proof, rankings, guarantees, or commercial claims.
- Changing GA4 account settings, deploying to production, or performing external link outreach in this change.

## 1. Programmatic indexation policy

### Publication classes

Every generated location page will fall into one of two explicit classes:

1. **Indexable:** included in the XML sitemap and rendered with the existing canonical and locale annotations.
2. **Discovery-only:** remains a working `200` page, remains reachable through internal links, keeps its self-canonical, and renders `noindex, follow`; it is omitted from the XML sitemap and does not emit hreflang alternates.

No page in this work will be blocked in `robots.txt`. Search engines must be able to crawl discovery-only pages to see the `noindex` directive.

### Conservative selection rule

- All location parent/hub pages remain indexable.
- All Azerbaijani location/service pages remain indexable in this first phase because the set is small and already contains click and top-position signals.
- Turkish and English child pages are assessed as locale pairs for the same market and service.
- A Turkish/English pair remains indexable when either member recorded at least one Search Console impression during the audited 28-day window, or when it is explicitly protected for editorial/business reasons.
- Only pairs with zero recorded impressions on both locale versions and no protected status become discovery-only.
- New programmatic child pages default to discovery-only until explicitly approved for indexing. This prevents future sitemap growth from silently bypassing the publication gate.

The approved indexable combinations will live in one small, dated source module with the audit window and rule documented beside the data. Runtime code will not call analytics services.

### Rendering and sitemap integration

Location child templates will derive indexability from the shared policy and pass the existing `noindex` option to the base layout. The Astro sitemap integration will use the same policy to exclude discovery-only URLs. One source of truth prevents a page from being indexable in markup but absent from the intended publication policy, or vice versa.

Locale-paired Turkish and English pages will change class together. Hreflang remains reciprocal on indexable pairs and is suppressed on both discovery-only counterparts, matching the repository's built-HTML audit. Existing canonicals, page content, routes, and internal navigation remain intact.

## 2. Search-result and content improvement

### ikas cost article

The existing `/blog/ikas-fiyatlari-2026-paket-kurulum-tema-seo-ek-maliyetler/` URL will be preserved. Its visible introduction and metadata will be refined around the demonstrated queries “ikas ne kadar”, “ikas web sitesi fiyatları”, and “ikas ücreti ne kadar”.

The article will:

- give a direct, concise answer near the top;
- distinguish the vendor's subscription/package price from QCT Commerce setup, theme, content, SEO, integration, and support costs;
- link to the current official ikas pricing source instead of copying a potentially changing vendor price;
- add a compact decision table explaining what is included by the vendor versus what requires project scoping;
- preserve the current URL and avoid unsupported price or performance claims;
- update its modification date to 14 November 2026.

Only an official ikas source will be used to verify vendor-facing wording before implementation.

### Market copy consistency

Remaining references that describe Georgia as the current market focus will be aligned with the site's actual Türkiye–Azerbaijan–international positioning. The change covers the affected Turkish and English About/Contact copy only; it does not add locales or rewrite unrelated content.

## 3. Lead measurement

The project-brief component already validates required inputs and opens WhatsApp. On one valid submission it will emit, exactly once:

- `form_submit` — a completed structured brief;
- `generate_lead` — the high-intent lead signal;
- `whatsapp_click` — the handoff to WhatsApp.

An invalid submission emits none of these completion events. Existing `form_start` behavior remains unchanged. Calculator completion remains an engagement event and will not emit `generate_lead`.

The repository can supply and test the events, but marking `generate_lead` as a GA4 key event is an account-level operation. That step will be recorded as a post-merge owner action and will not be claimed as completed here.

## 4. Organic acquisition follow-through

The existing acquisition brief will be updated rather than duplicated. It will add a dated 30-day checklist focused on:

- improving high-impression, low-CTR pages before creating more pages;
- reviewing the ikas article after sufficient Search Console data accumulates;
- strengthening internal links from relevant blog and service pages to proven commercial pages;
- pursuing only permission-cleared case-study and directory opportunities;
- recording weekly non-brand impressions, clicks, CTR, average position, valid project briefs, and leads.

No external profile, backlink, ad campaign, or outreach message will be submitted as part of this repository change.

## 5. Verification strategy

Behavior changes will be implemented test-first.

Automated checks will verify that:

- protected and evidence-backed location child pairs remain indexable and present in the sitemap;
- discovery-only pairs render `noindex, follow`, return `200`, keep their canonical, and are absent from the sitemap;
- parent location hubs and all Azerbaijani location pages remain indexable;
- Turkish/English paired pages cannot receive conflicting publication classes;
- `robots.txt` is unchanged and does not block discovery-only pages;
- the ikas article retains its URL and contains the direct-answer and official-source elements;
- the affected market copy contains no remaining Georgia/Gürcistan positioning;
- invalid project briefs emit no completion events, while one valid submission emits each intended event once;
- calculator completion still does not emit `generate_lead`.

After focused tests pass, the repository-supported full test/build command will be run. Generated sitemap and representative built pages will also be inspected directly.

## 6. Delivery and rollback

Implementation will remain on `codex/seo-focus-remediation`. No deployment or direct push to the default branch is included. The changes are reversible: removing a combination from the discovery-only policy restores indexability and sitemap inclusion on the next build; content and event changes are isolated to their owning files.

## Expected changed areas

- One shared location indexation-policy module.
- Turkish and English dynamic location/service templates.
- Astro sitemap configuration.
- ikas article data/metadata and its existing article presentation path.
- Affected About/Contact copy.
- Project-brief analytics calls and focused tests.
- Existing organic acquisition brief and test coverage.

## Acceptance criteria

- No routes are removed and no supported locale architecture changes.
- Only approved zero-signal Turkish/English child pairs become discovery-only.
- Indexability and sitemap publication use the same policy.
- Existing design, mobile behavior, accessibility, consent flow, calculator behavior, and WhatsApp handoff remain functional.
- All focused checks and the full repository test/build command pass.
- Commit, push, PR, CI, deployment, and live verification are reported separately and never implied.
