import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');
const international = read('../public/styles/international.css');
const programmatic = read('../public/styles/programmatic.css');
const caseStudy = read('../public/styles/case-study-overrides.css');
const layout = read('../src/layouts/BaseLayout.astro');

test('international page accents no longer render legacy coral', () => {
  for (const [name, source] of Object.entries({ international, programmatic, caseStudy })) {
    assert.doesNotMatch(source, /#e66b5f\b|rgba\(230,\s*107,\s*95/i, name);
  }
  assert.match(international, /\.site-main :is\(\.hero, \.page-hero\) \.eyebrow\s*\{\s*color: #93c5fd/);
  assert.match(programmatic, /\.page-hero \.eyebrow\{color:#93c5fd\}/);
  assert.match(caseStudy, /qct-int-case__dark \.eyebrow\s*\{\s*color: #93c5fd !important/);
});

test('shared layout requests fresh CSS versions for international pages', () => {
  assert.match(layout, /international\.css\?v=20261028-brand-blue/);
  assert.match(layout, /case-study-overrides\.css\?v=20261028-brand-blue/);
});
