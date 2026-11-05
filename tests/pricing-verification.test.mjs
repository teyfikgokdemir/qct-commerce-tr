import { test } from 'node:test';
import assert from 'node:assert/strict';
import { hasServicePrice } from '../scripts/pricing-verification.mjs';
test('pricing verification matches separated price markup only in the correct service card', () => {
  const html = '<article><div><span>Website redesign</span><p>Scope</p></div><div><strong>6.900 TL</strong></div></article><article><span>Dynamic SEO</span><strong>5.990 TL / month</strong></article>';
  assert.equal(hasServicePrice(html, 'Website redesign', '6.900 TL'), true);
  assert.equal(hasServicePrice(html, 'Website redesign', '5.990 TL / month'), false);
  assert.equal(hasServicePrice(html, 'Website redesign', '4.900 TL'), false);
  assert.equal(hasServicePrice(html, 'Missing service', '6.900 TL'), false);
});
