import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (relative) => fs.readFileSync(path.join(root, relative), 'utf8');
const trHubPath = 'dist/lokasyon/index.html';
const enHubPath = 'dist/en/location/index.html';

test('both location hubs are built with reciprocal hreflang and self-canonical', () => {
  assert.ok(fs.existsSync(path.join(root, trHubPath)), 'run npm run build first: Turkish location hub missing');
  assert.ok(fs.existsSync(path.join(root, enHubPath)), 'run npm run build first: English location hub missing');
  const tr = read(trHubPath);
  const en = read(enHubPath);
  for (const [html, lang, canonical] of [
    [tr, 'tr', 'https://qctcommerce.com/lokasyon/'],
    [en, 'en', 'https://qctcommerce.com/en/location/'],
  ]) {
    assert.match(html, new RegExp(`<html\\b[^>]*lang="${lang}"`));
    assert.ok(html.includes(`rel="canonical" href="${canonical}"`), `self canonical missing: ${canonical}`);
    assert.match(html, /<h1\\b[^>]*>/);
    assert.ok(html.includes('hreflang="tr-TR" href="https://qctcommerce.com/lokasyon/"'));
    assert.ok(html.includes('hreflang="en" href="https://qctcommerce.com/en/location/"'));
    assert.ok(!/<meta[^>]+name="robots"[^>]+noindex/i.test(html));
  }
});

test('hubs expose real market parents without asserting local offices', () => {
  const tr = read(trHubPath);
  const en = read(enHubPath);
  for (const route of ['/lokasyon/istanbul/', '/lokasyon/kayseri/', '/lokasyon/azerbaycan/', '/lokasyon/dubai/']) {
    assert.ok(tr.includes(`href="${route}"`), `missing Turkish market: ${route}`);
  }
  for (const route of ['/en/location/istanbul/', '/en/location/kayseri/', '/en/location/azerbaijan/', '/en/location/dubai/']) {
    assert.ok(en.includes(`href="${route}"`), `missing English market: ${route}`);
  }
  assert.match(tr, /yerel ofisi|fiziksel ofisi/i);
  assert.match(en, /physical office/i);
});

test('market hubs appear in sitemap and market detail pages link to them', () => {
  const sitemaps = fs.readdirSync(path.join(root, 'dist')).filter((name) => /^sitemap-\d+\.xml$/.test(name));
  assert.ok(sitemaps.length > 0, 'generated sitemap not found');
  const xml = sitemaps.map((name) => read(`dist/${name}`)).join('\n');
  assert.ok(xml.includes('https://qctcommerce.com/lokasyon/'));
  assert.ok(xml.includes('https://qctcommerce.com/en/location/'));
  for (const file of ['dist/lokasyon/kayseri/index.html', 'dist/lokasyon/kayseri/e-ticaret/index.html']) {
    assert.ok(read(file).includes('href="/lokasyon/"'), `missing hub ancestor link in ${file}`);
  }
  for (const file of ['dist/en/location/kayseri/index.html', 'dist/en/location/kayseri/ecommerce/index.html']) {
    assert.ok(read(file).includes('href="/en/location/"'), `missing hub ancestor link in ${file}`);
  }
  const redirects = read('public/_redirects');
  assert.doesNotMatch(redirects, /^\/(?:en\/location|lokasyon)\/\s+\S+/gm);
});
