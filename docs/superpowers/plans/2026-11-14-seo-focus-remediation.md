# QCT Commerce SEO Focus Remediation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Focus organic indexation on evidence-backed location pages, improve the strongest low-CTR article, correct market copy, and record valid project briefs as leads without changing routes, design, consent, or calculator semantics.

**Architecture:** A pure shared publication-policy module will be the single source of truth for both location templates and the Astro sitemap filter. Existing components keep their structure; the ikas article receives one slug-scoped decision block, and the project-brief handler emits the already-allowlisted analytics events only after native validation succeeds.

**Tech Stack:** Astro 7.4.7, TypeScript/ES modules, `@astrojs/sitemap` 3.7.4, Node 22.23.4 test runner, Playwright 1.65.0

**Spec:** `docs/superpowers/specs/2026-11-14-seo-focus-remediation-design.md`

## Global Constraints

- Preserve all existing routes, Turkish root URLs, self-canonicals, indexable hreflang pairs, schema.org output, internal links, OG previews, robots.txt, accessibility, responsive design, calculator, WhatsApp, and consent behavior.
- Discovery-only pages return `200`, keep self-canonicals, emit `noindex, follow`, omit hreflang, and are excluded from the sitemap; they are never robots-blocked.
- All location hubs and every Azerbaijani location page remain indexable.
- Turkish/English service-page counterparts receive the same publication class.
- New programmatic location/service combinations default to discovery-only until explicitly allowlisted.
- Do not copy volatile ikas prices; link to `https://ikas.com/tr/e-ticaret-paketleri` and distinguish vendor charges from QCT Commerce implementation scope.
- Calculator completion must never emit `generate_lead`; only a valid project-brief submission may do so.
- Use only repository-supported commands and Node 22.23.4; no new dependency, deployment, merge, analytics-account mutation, or external outreach is included.

## Review Focus

- Unknown or newly added market/service keys must return discovery-only; Task 1 adds a direct policy-unit assertion for an unknown key.
- A noindex locale pair must not leak reciprocal hreflang or enter any generated sitemap; Task 1 checks both built counterparts and all sitemap files.
- Non-location URLs and location hubs must not be accidentally filtered from the sitemap; Task 1 checks `/`, both location hubs, and an Azerbaijani detail page.
- Native validation failure must not emit completion analytics or open WhatsApp; Task 3 exercises an invalid form before a valid submission.
- The official ikas URL may change commercially but must remain clearly identified as the live vendor source rather than a copied price; Task 2 asserts the official-domain link and absence of hard-coded vendor package amounts in the new block.

---

### Task 1: Shared location publication policy

**Files:**
- Create: `src/data/location-indexation.mjs`
- Modify: `astro.config.mjs`
- Modify: `src/pages/lokasyon/[sehir]/[hizmet].astro`
- Modify: `src/pages/en/location/[city]/[service].astro`
- Modify: `tests/location-hub-publication.test.mjs`

**Interfaces:**
- Produces: `INDEXATION_AUDIT_WINDOW` with `from: '2026-10-15'`, `to: '2026-11-11'`, and property `sc-domain:qctcommerce.com`.
- Produces: `INDEXABLE_PROGRAMMATIC_LOCATION_SERVICE_KEYS: ReadonlySet<string>` containing the 46 approved current `trMarketId:trServiceSlug` pairs.
- Produces: `isProgrammaticLocationServiceIndexable(marketId: string, trServiceSlug: string): boolean`; returns `false` for unknown keys.
- Consumes in both templates: Turkish uses `market.id`; English uses `market.alternateId`; both use `service.trSlug`.

- [ ] **Step 1: Write the failing policy and built-output tests**

Extend `tests/location-hub-publication.test.mjs` to import the policy module and assert:

- the allowlist has 46 current pairs and an unknown `future-market:web-tasarim` key returns `false`;
- these 11 existing pairs return `false`: `istanbul:web-tasarim`, `antalya:web-tasarim`, `kocaeli:seo-geo`, `adana:seo-geo`, `konya:seo-geo`, all three `denizli` services, `eskisehir:e-ticaret`, `samsun:seo-geo`, and `ingiltere:web-tasarim`;
- representative evidence-backed pairs `mersin:e-ticaret`, `azerbaycan:e-ticaret`, `ankara:web-tasarim`, and `gaziantep:seo-geo` return `true`;
- the current 19 × 3 matrix from `src/data/programmatic-markets.ts` produces the same indexability result for every Turkish page and its English counterpart;
- built Turkish/English counterparts for `denizli:e-ticaret` exist, have self-canonicals and `noindex, follow`, contain no hreflang, and are absent from all `dist/sitemap-*.xml` files;
- built counterparts for `mersin:e-ticaret` remain indexable, reciprocal, and present in the sitemap;
- `/`, `/lokasyon/`, and `/en/location/` remain in the sitemap, every built page below `dist/az/lokasiya/` remains indexable and present in the sitemap, and `public/robots.txt` is unchanged in behavior.

- [ ] **Step 2: Run the focused test to verify it fails**

Run: `node --test tests/location-hub-publication.test.mjs`

Expected: FAIL because `src/data/location-indexation.mjs` and the discovery-only built behavior do not exist.

- [ ] **Step 3: Implement the explicit allowlist**

Create `src/data/location-indexation.mjs` with the two named exports and `isProgrammaticLocationServiceIndexable(marketId, trServiceSlug)`. Populate the 46-entry allowlist from the current 19 × 3 matrix excluding the 11 pairs above; do not compute “all except” at runtime, so future keys default to `false`.

- [ ] **Step 4: Apply the policy to both locale templates**

In both dynamic child templates, compute `isIndexable` through the shared function, pass `noindex={!isIndexable}` to `BaseLayout`, and pass the reciprocal `alternates` only when `isIndexable` is true. Do not change page copy, routes, parent links, schema inputs, or Azerbaijani templates.

- [ ] **Step 5: Apply the same policy to sitemap generation**

In `astro.config.mjs`, import the policy plus `trMarkets`, `enMarkets`, and `programmaticServices`. Build a set of current TR/EN child URLs whose normalized pair is not allowlisted, then configure `sitemap({ filter: (page) => !discoveryOnlyUrls.has(new URL(page).pathname) })`. Non-location URLs, hubs, and all Azerbaijani routes pass through.

- [ ] **Step 6: Build and run the focused test**

Run: `npm run build && node --test tests/location-hub-publication.test.mjs`

Expected: PASS; the HTML audit reports discovery-only pages as noindex without hreflang, and the locale/sitemap audits report no indexable/sitemap mismatch.

- [ ] **Step 7: Commit the independently working publication gate**

Run:

```bash
git add astro.config.mjs src/data/location-indexation.mjs "src/pages/lokasyon/[sehir]/[hizmet].astro" "src/pages/en/location/[city]/[service].astro" tests/location-hub-publication.test.mjs
git commit -m "fix: focus location page indexation"
```

Expected: one focused commit; no generated `dist/` files staged.

### Task 2: ikas intent answer and market-copy correction

**Files:**
- Modify: `src/data/blog.ts`
- Modify: `src/i18n/seo.ts`
- Modify: `src/components/BlogArticle.astro`
- Modify: `src/components/AboutPage.astro`
- Modify: `src/pages/en/about/index.astro`
- Modify: `src/pages/en/contact/index.astro`
- Create: `tests/seo-focus-remediation.test.mjs`

**Interfaces:**
- Consumes: existing article slug `ikas-fiyatlari-2026-kurulum-tema-seo-maliyetleri` and existing `BlogArticle.astro` rendering path.
- Produces: slug-scoped `.qct-article__cost-guide` with a heading, two-column responsibility table, and official ikas pricing link.
- Produces: unchanged article URL with `modified: '2026-11-14'` and metadata that directly includes the “ikas ne kadar” intent.

- [ ] **Step 1: Write failing built-content tests**

Create `tests/seo-focus-remediation.test.mjs` and assert that the built Turkish ikas article:

- remains at `dist/blog/ikas-fiyatlari-2026-kurulum-tema-seo-maliyetleri/index.html` with the same self-canonical;
- has title/visible copy containing `ikas ne kadar` and a `2026-11-14` modified date;
- contains exactly one `.qct-article__cost-guide`, an accessible table separating `ikas platformu` from `QCT Commerce / proje kapsamı`, and exactly one external link to `https://ikas.com/tr/e-ticaret-paketleri`;
- does not place the current vendor package amounts `4.660`, `6.998`, or `11.618` in that guide;
- still contains the existing links to `/blog/ikas-mi-shopify-mi-2026/` and `/fiyatlar/` and has no horizontal overflow in the existing browser regression.

Also assert that `dist/hakkimizda/index.html`, `dist/en/about/index.html`, and `dist/en/contact/index.html` contain no `Gürcistan` or `Georgia` positioning and explicitly describe Türkiye, Azerbaijan/Azerbaycan, and international delivery without claiming an office.

- [ ] **Step 2: Run the focused test to verify it fails**

Run: `node --test tests/seo-focus-remediation.test.mjs`

Expected: FAIL because the cost guide and corrected copy are absent.

- [ ] **Step 3: Update the article data and metadata**

In `src/data/blog.ts`, retain the slug and published date, set `modified` to `2026-11-14`, make the intro answer “ikas ne kadar?” directly without a vendor price, and keep platform subscription separate from implementation, theme, migration, products, SEO, integrations, payment, and operations. In `src/i18n/seo.ts`, revise only `blog-ikas-cost-2026` so title/description include the direct query intent and remain factual.

- [ ] **Step 4: Add the slug-scoped decision block**

In `BlogArticle.astro`, add one conditional `.qct-article__cost-guide` before the generic sections. Use semantic `<table>` markup with row headers for “ikas platformu” and “QCT Commerce / proje kapsamı”; link to the official ikas packages page with safe external-link attributes. Reuse existing article typography, line colors, and the mobile breakpoint; do not introduce a new visual system.

- [ ] **Step 5: Correct the three remaining market references**

Replace only the affected FAQ, English About, and English Contact sentences with Türkiye–Azerbaijan–international wording. Preserve truthful language availability and avoid office, client, or local-presence claims.

- [ ] **Step 6: Build and run focused content tests**

Run: `npm run build && node --test tests/seo-focus-remediation.test.mjs && node --test --test-name-pattern="commercial SEO routes" tests/p2-audit.test.mjs`

Expected: PASS; the URL, canonical, internal links, content assertions, and existing commercial link cluster remain intact.

- [ ] **Step 7: Commit the content correction**

Run:

```bash
git add src/data/blog.ts src/i18n/seo.ts src/components/BlogArticle.astro src/components/AboutPage.astro src/pages/en/about/index.astro src/pages/en/contact/index.astro tests/seo-focus-remediation.test.mjs
git commit -m "fix: sharpen organic search intent"
```

Expected: one content-focused commit with no unrelated page rewrite.

### Task 3: Valid project-brief lead measurement

**Files:**
- Modify: `src/components/LeadQualificationForm.astro`
- Modify: `tests/p2-audit.test.mjs`

**Interfaces:**
- Consumes: existing global `window.qctTrackEvent(name, { form_name: 'project_brief' })` and existing analytics allowlist entries `form_submit`, `generate_lead`, and `whatsapp_click`.
- Produces: one valid submit dispatches those three events once each before the existing WhatsApp `window.open`; invalid submit dispatches none.

- [ ] **Step 1: Write the failing browser regression**

Add `test('valid project brief emits one lead sequence after validation', ...)` to `tests/p2-audit.test.mjs`. On `/iletisim/`, replace `window.qctTrackEvent` with an in-page event collector and replace `window.open` with a collector. First submit the untouched required form and assert no `form_submit`, `generate_lead`, `whatsapp_click`, or WhatsApp open. Then select the first non-empty values for `business`, `platform`, `priority`, and `timeline`, fill `market`, submit once, and assert exactly one event for each name, each with `form_name: 'project_brief'`, plus one correctly encoded WhatsApp open.

- [ ] **Step 2: Run the focused browser test to verify it fails**

Run: `node --test --test-name-pattern="valid project brief" tests/p2-audit.test.mjs`

Expected: FAIL because only `whatsapp_click` is currently emitted.

- [ ] **Step 3: Emit completion events after validation**

In the existing submit handler, leave `event.preventDefault()` and `form.reportValidity()` in place. After the message is constructed and immediately before `window.open`, call `track('form_submit')`, `track('generate_lead')`, then `track('whatsapp_click')`. Do not add user-entered field values to analytics parameters and do not change `form_start`.

- [ ] **Step 4: Run focused analytics checks**

Run: `npm run build && node --test --test-name-pattern="valid project brief|platform-prefilled quote" tests/p2-audit.test.mjs && npm run check:analytics`

Expected: PASS; valid brief events are observed once, invalid submissions emit none, calculator completion still emits zero leads, and consent/privacy checks pass.

- [ ] **Step 5: Commit the measurement fix**

Run:

```bash
git add src/components/LeadQualificationForm.astro tests/p2-audit.test.mjs
git commit -m "fix: measure valid project brief leads"
```

Expected: one analytics-focused commit with no consent or account-setting change.

### Task 4: Acquisition checklist, full verification, and pull request

**Files:**
- Modify: `docs/organic-acquisition-priorities-2026-10.md`
- Modify: `tests/seo-focus-remediation.test.mjs`

**Interfaces:**
- Consumes: completed publication, content, and lead-measurement behavior from Tasks 1–3.
- Produces: a dated 30-day owner checklist and a reviewable feature-branch PR targeting `main`.

- [ ] **Step 1: Add a failing documentation assertion**

Extend `tests/seo-focus-remediation.test.mjs` to assert the existing acquisition brief contains a `14 November 2026` 30-day section with weekly non-brand impressions, clicks, CTR, average position, valid project briefs, leads, the ikas article review, internal-link review, and permission-cleared case-study/directory actions; also assert it explicitly says no external submissions were performed.

- [ ] **Step 2: Run the focused test to verify it fails**

Run: `node --test tests/seo-focus-remediation.test.mjs`

Expected: FAIL because the dated checklist is absent.

- [ ] **Step 3: Update the existing acquisition brief**

Append one concise dated section to `docs/organic-acquisition-priorities-2026-10.md`. Use the measured baseline (3,289 impressions, 15 clicks, 0.46% CTR over 15 October–11 November 2026), list weekly owner actions, and record the GA4 owner action to mark `generate_lead` as a key event after deployment. State clearly that no backlink/profile submission, GA4 account change, merge, or deployment occurred in this branch.

- [ ] **Step 4: Run the complete local verification matrix**

Run in this order:

```bash
npm run check:analytics
npm run build
npm run check:locales
npm run check:performance
npm test
git diff --check origin/main...HEAD
git status --short
```

Expected: every command exits 0; Node tests report zero failures; only intentional source/docs/test changes appear; `dist/`, screenshots, secrets, and analytics payloads are not staged.

- [ ] **Step 5: Inspect representative generated artifacts and branch diff**

Read the built ikas article, one discovery-only TR/EN pair, one indexable TR/EN pair, `dist/sitemap-index.xml`, all referenced sitemap XML files, and `public/robots.txt`. Run `git diff --stat origin/main...HEAD` and `git diff --name-only origin/main...HEAD`.

Expected: generated evidence matches the tests and the diff contains no route deletion, dependency change, workflow change, robots change, or unrelated design edit.

- [ ] **Step 6: Commit documentation and plan updates**

Run:

```bash
git add docs/organic-acquisition-priorities-2026-10.md tests/seo-focus-remediation.test.mjs
git commit -m "docs: add organic acquisition follow-through"
```

Expected: clean working tree after the commit.

- [ ] **Step 7: Push the feature branch and open a PR**

Run: `git push -u origin codex/seo-focus-remediation`

Open a PR targeting `main` with a factual summary of the four change areas and the exact local verification results. Do not merge it and do not deploy.

Expected: open PR for `codex/seo-focus-remediation`; CI status is reported separately from local tests, and production/live verification remains “not run”.
