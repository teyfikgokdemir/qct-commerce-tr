import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
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

test('IndexNow command refuses implicit full sitemap submission', () => {
  const result = spawnSync(process.execPath, ['scripts/indexnow-submit.mjs'], { encoding: 'utf8' });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Choose one mode/);
});
test('IndexNow URL file dry run sends no network request and deduplicates', () => {
  const dir = mkdtempSync(join(tmpdir(), 'qct-indexnow-test-'));
  try {
    const file = join(dir, 'urls.txt');
    writeFileSync(file, '# changed pages\\nhttps://qctcommerce.com/en/pricing/\\nhttps://qctcommerce.com/en/pricing/\\n');
    const result = spawnSync(process.execPath, ['scripts/indexnow-submit.mjs', `--urls-file=${file}`, '--dry-run'], { encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, /"urlCount":1/);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});
