# QCT Commerce — Impeccable design baseline

**Date:** 2026-11-04 (Europe/Istanbul)
**Status:** Read-only assessment. No production design, marketing copy, pricing or application code was changed.
**Baseline:** `main` at `f9765006c2de8c5c9f849bf2da2a8468298ca1c2`.
**Tool:** Impeccable CLI `4.8.0` (version-pinned, no agent/live mode).
**Evidence:** [GitHub Actions run #41817715577](https://github.com/teyfikgokdemir/qct-commerce-tr/actions/runs/41817715577) → `impeccable-design-baseline` artifact (JSON + stderr + exit statuses).
**Scope:** `src/`, `public/styles/` source rules; rendered production `/` and `/hizmetler/`. The remote rendered checks assess the live deployment, not a branch preview.

## Verified findings (raw, not deduplicated)

| Surface | Warnings | Advisories | Total |
|---|---:|---:|---:|
| Source — `src/` | 4 | 1 | 5 |
| Source — `public/styles/` | 14 | 3 | 17 |
| Live homepage | 49 | 21 | 70 |
| Live services page | 12 | 8 | 20 |
| **Total scan events** | **79** | **33** | **112** |

**Important:** 112 is a count of detector events, not 112 independently verified defects. Source and rendered checks can flag the same pattern. Some stylistic rules are subjective; browser layout, accessibility and actual conversion impact still require judgment.

Source rule distribution: 12 one-sided colored accent borders; 4 decorative two-axis grid backgrounds; 2 gradient-text instances; 2 thick colored borders on rounded panels; 1 generic-font warning (Inter); 1 generic-marketing-word warning (inside a URL string; likely a false positive).

Rendered homepage distribution: 30 undersized functional-text warnings, 13 low-contrast advisories, 11 tiny-text advisories, 6 small heading-kicker warnings, 2 dark glow warnings, 2 unbalanced-heading warnings, and 6 other events.

Rendered services distribution: 5 heading-kicker warnings, 4 low-contrast advisories, 3 dark glow warnings, 2 orphan-line advisories, 2 accent-border warnings, 1 overlong-line warning, 1 heading balance advisory, 1 undersized functional-text warning and 1 decorative grid advisory.

## Priority and design decision

**P1 — Readability of homepage configurator.** The rendered scanner finds multiple interactive price/add-on labels at **9–10 px**, especially the calculator and price details. These are prominent in the primary conversion path. Plan: raise functional labels to a measured ~12–14 px, preserve the compact layout, and verify the price result at 360/390/768/1440 px. Related: `public/styles/qct-v2.css`, `src/components/QctCommerceV2.astro` and English equivalent.

**P1 — Contrast.** The live scanner estimates several muted text/background combinations at **4.3–4.4:1** where 4.5:1 is expected for normal text. Plan: adjust muted tokens rather than darken the entire design; verify with browser contrast measurement and across TR/EN/AZ.

**P2 — Editorial typography.** Services intro lines and several headings are poorly balanced; one sampled line is roughly **126 characters**, and short orphan words appear. Plan: set sensible max-width in `ch`, tighten hierarchy, test real screen widths and **avoid blanket `white-space: nowrap`**.

**P2 — Reduce generic decorative treatment.** Multiple 3 px accent bands, gradient text, ornamental grids and glow effects produce a busy feel inconsistent with a restrained, premium B2B presentation. Plan: refine one shared card/panel at a time; keep the QCT blue palette and focus-visible affordances. Relevant: `src/components/service/ServicePage.astro`, `public/styles/service-cards-isolated.css`, `src/components/PremiumInfrastructurePage.astro`, `public/styles/qct-v2.css`.

**P3 — Brand typography and micro-interactions.** The generic-font warning does not itself justify replacing the current brand font. Check any font change and marquee motion with actual previews, brand guidance, keyboard navigation and reduced-motion preferences.

**Needs human interpretation:** Heading eyebrow/kicker warnings may be intentional and useful; the single `marketing-buzzword` source finding is a URL slug rather than site marketing copy. Do not auto-correct either.

## Safe implementation sequence — NOT YET EXECUTED

1. Capture browser screenshots of TR/EN/AZ at mobile, tablet and desktop widths; annotate only reproducible issues.
2. Make a **single-surface** typography/contrast patch in a separate change branch, avoiding global CSS resets.
3. Apply a restrained card/EDGE refinement only where screenshots demonstrate improvement, preserving navigation, calculator, WhatsApp and existing brand tokens.
4. Run `npm ci`, `npm run build`, `npm run check:locales`, `npm run check:performance`, `npm run check:analytics`, and `npm test`; compare screenshots and verify accessible focus and reduced motion.
5. Open a separate implementation PR for review; merge/deploy only after verified checks and visual review.

## Execution and risk register

- ✅ GitHub source and production page audits executed successfully by a purpose-limited workflow on the experiment branch.
- ✅ JSON evidence uploaded; zip integrity verified from downloaded artifact.
- ✅ CLI findings returned detector exit code `2` as documented; the workflow marks this as successful execution, **not** a clean bill of design quality.
- ⚠️ No controlled visual before/after comparison or complete accessibility test was performed.
- ⚠️ No application build or browser regression suite was run against a visual change because **no visual change was made**.
- ✅ No installation into site application dependencies, no privileged token usage, no production deployment, and no changes to `main`.

