import test from 'node:test';
import assert from 'node:assert/strict';
import { routeForAstroSource, canonicalSiteUrl } from '../scripts/indexnow-routing.mjs';

test('root and localized Astro routes map to canonical paths', () => {
  assert.equal(routeForAstroSource('src/pages/index.astro'), '/');
  assert.equal(routeForAstroSource('src/pages/en/index.astro'), '/en/');
  assert.equal(routeForAstroSource('src/pages/az/e-ticaret/index.astro'), '/az/e-ticaret/');
  assert.equal(routeForAstroSource('src/pages/hakkimizda.astro'), '/hakkimizda/');
});
test('dynamic, data, non-page and 404 paths are never auto-submitted', () => {
  for (const file of ['src/pages/blog/[slug].astro', 'src/pages/404.astro', 'src/components/Header.astro', 'src/data/blog.ts', 'src/pages/rss.xml.ts']) {
    assert.equal(routeForAstroSource(file), null, file);
  }
});
test('IndexNow accepts only same-origin canonical URLs without parameters', () => {
  assert.equal(canonicalSiteUrl('https://qctcommerce.com/en/pricing/'), 'https://qctcommerce.com/en/pricing/');
  for (const url of ['https://elsewhere.example/', 'https://qctcommerce.com/en/?utm=x', 'https://qctcommerce.com/az/#top', '/en/', 'https://user@qctcommerce.com/']) {
    assert.throws(() => canonicalSiteUrl(url), url);
  }
});
