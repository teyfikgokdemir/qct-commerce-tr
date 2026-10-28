import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');
const buttons = read('../public/styles/buttons.css');
const layout = read('../src/layouts/BaseLayout.astro');

test('shared secondary button states use the QCT blue palette', () => {
  assert.match(buttons, /background: rgba\(0, 47, 167, 0\.08\)/);
  assert.match(buttons, /border-color: var\(--qct-color-coral, #002fa7\)/);
  assert.match(buttons, /color: var\(--qct-color-coral-dark, #00227b\)/);
  assert.doesNotMatch(buttons, /#e66b5f\b|#a63f36\b|rgba\(230,\s*107,\s*95|rgba\(185,\s*71,\s*62/i);
});

test('dark hero contrast treatment stays intact and CSS cache version advances', () => {
  assert.match(buttons, /\.page-hero \.button--secondary,\s*\.hero \.button--secondary\s*\{\s*border-color: rgba\(255, 255, 255, 0\.28\);\s*color: #fffaf5;/);
  assert.match(layout, /buttons\.css\?v=20261028-brand-blue/);
});
