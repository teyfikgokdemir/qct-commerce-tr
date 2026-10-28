import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const mobileMenu = readFileSync(new URL('../src/components/MobileMenu.astro', import.meta.url), 'utf8');

test('active mobile drawer footer fades into its navy background', () => {
  assert.match(mobileMenu, /\.qctm-panel\{[\s\S]*?background:\s*#090d16\s*!important/);
  assert.match(mobileMenu, /\.qctm-bottom\{[^\n]*background:linear-gradient\(180deg,rgba\(9,13,22,0\),#090d16 22%\)!important/);
});

test('active mobile drawer does not reintroduce the warm legacy palette', () => {
  assert.match(mobileMenu, /\.qctm-group-toggle small\{color:rgba\(148,163,184,\.78\)!important/);
  assert.doesNotMatch(mobileMenu, /#0f1210\b|rgba\(243,234,223,/i);
});
