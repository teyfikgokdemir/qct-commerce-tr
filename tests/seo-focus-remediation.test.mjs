import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (relative) => fs.readFileSync(path.join(root, relative), 'utf8');

test('ikas cost article answers the pricing intent without freezing vendor prices', () => {
  const html = read('dist/blog/ikas-fiyatlari-2026-kurulum-tema-seo-maliyetleri/index.html');
  assert.ok(html.includes('<link rel="canonical" href="https://qctcommerce.com/blog/ikas-fiyatlari-2026-kurulum-tema-seo-maliyetleri/">'));
  assert.match(html.toLocaleLowerCase('tr-TR'), /ikas ne kadar/);
  assert.match(html, /<time\b[^>]*datetime="2026-11-14"[^>]*>/);

  const guideMatches = html.match(/<section class="qct-article__cost-guide"[\s\S]*?<\/section>/g) ?? [];
  assert.equal(guideMatches.length, 1, 'expected one ikas cost decision guide');
  const guide = guideMatches[0];
  assert.match(guide, /<table\b/);
  assert.match(guide, /<caption\b[^>]*>/);
  assert.match(guide.toLocaleLowerCase('tr-TR'), /ikas platformu/);
  assert.match(guide.toLocaleLowerCase('tr-TR'), /qct commerce \/ proje kapsamı/);
  assert.equal((guide.match(/href="https:\/\/ikas\.com\/tr\/e-ticaret-paketleri"/g) ?? []).length, 1);
  assert.ok(guide.includes('target="_blank"'));
  assert.ok(guide.includes('rel="noopener noreferrer"'));
  assert.doesNotMatch(guide, /\b(?:4\.660|6\.998|11\.618)\b/);

  assert.ok(html.includes('href="/blog/ikas-mi-shopify-mi-2026/"'));
  assert.ok(html.includes('href="/fiyatlar/"'));
});

test('about and contact pages describe the active Azerbaijan market without office claims', () => {
  const cases = [
    { file: 'dist/hakkimizda/index.html', required: ['Türkiye', 'Azerbaycan', 'uluslararası'] },
    { file: 'dist/en/about/index.html', required: ['Türkiye', 'Azerbaijan', 'international'] },
    { file: 'dist/en/contact/index.html', required: ['Türkiye', 'Azerbaijan', 'International'] },
  ];
  for (const { file, required } of cases) {
    const html = read(file);
    assert.doesNotMatch(html, /Gürcistan|Georgia/i, `${file} contains retired market positioning`);
    for (const phrase of required) assert.ok(html.includes(phrase), `${file} missing ${phrase}`);
    assert.doesNotMatch(html, /(?:office in Azerbaijan|Azerbaycan(?:'da|’da) ofis)/i, `${file} implies a physical office`);
  }
});
