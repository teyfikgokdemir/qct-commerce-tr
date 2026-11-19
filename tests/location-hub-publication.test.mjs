import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (relative) => fs.readFileSync(path.join(root, relative), 'utf8');
const trHubPath = 'dist/lokasyon/index.html';
const enHubPath = 'dist/en/location/index.html';
const sitemapXml = () => fs.readdirSync(path.join(root, 'dist'))
  .filter((name) => /^sitemap-\d+\.xml$/.test(name))
  .map((name) => read(`dist/${name}`))
  .join('\n');

test('location service policy allowlists only evidence-backed current pairs', async () => {
  const {
    INDEXATION_AUDIT_WINDOW,
    INDEXABLE_PROGRAMMATIC_LOCATION_SERVICE_KEYS,
    isProgrammaticLocationServiceIndexable,
  } = await import('../src/data/location-indexation.mjs');
  assert.deepEqual(INDEXATION_AUDIT_WINDOW, {
    from: '2026-10-15',
    to: '2026-11-11',
    property: 'sc-domain:qctcommerce.com',
  });
  assert.equal(INDEXABLE_PROGRAMMATIC_LOCATION_SERVICE_KEYS.size, 46);
  assert.equal(isProgrammaticLocationServiceIndexable('future-market', 'web-tasarim'), false);

  const discoveryOnly = new Set([
    'istanbul:web-tasarim',
    'antalya:web-tasarim',
    'kocaeli:seo-geo',
    'adana:seo-geo',
    'konya:seo-geo',
    'denizli:web-tasarim',
    'denizli:e-ticaret',
    'denizli:seo-geo',
    'eskisehir:e-ticaret',
    'samsun:seo-geo',
    'ingiltere:web-tasarim',
  ]);
  const markets = [
    'istanbul', 'ankara', 'izmir', 'bursa', 'antalya', 'gaziantep', 'kocaeli',
    'adana', 'kayseri', 'konya', 'denizli', 'mersin', 'eskisehir', 'samsun',
    'sakarya', 'almanya', 'ingiltere', 'azerbaycan', 'dubai',
  ];
  const services = ['web-tasarim', 'e-ticaret', 'seo-geo'];
  for (const market of markets) {
    for (const service of services) {
      const key = `${market}:${service}`;
      assert.equal(
        isProgrammaticLocationServiceIndexable(market, service),
        !discoveryOnly.has(key),
        `unexpected publication class for ${key}`,
      );
    }
  }
  for (const key of ['mersin:e-ticaret', 'azerbaycan:e-ticaret', 'ankara:web-tasarim', 'gaziantep:seo-geo']) {
    const [market, service] = key.split(':');
    assert.equal(isProgrammaticLocationServiceIndexable(market, service), true, `${key} should remain indexable`);
  }
});

test('discovery-only locale pair stays crawlable but leaves hreflang and sitemap', () => {
  const xml = sitemapXml();
  for (const [file, canonical] of [
    ['dist/lokasyon/denizli/e-ticaret/index.html', 'https://qctcommerce.com/lokasyon/denizli/e-ticaret/'],
    ['dist/en/location/denizli/ecommerce/index.html', 'https://qctcommerce.com/en/location/denizli/ecommerce/'],
  ]) {
    assert.ok(fs.existsSync(path.join(root, file)), `${file} should still be built`);
    const html = read(file);
    assert.ok(html.includes(`rel="canonical" href="${canonical}"`), `${file} self-canonical`);
    assert.match(html, /<meta[^>]+name="robots"[^>]+content="noindex, follow"/i);
    assert.doesNotMatch(html, /<link rel="alternate" hreflang=/i);
    assert.ok(!xml.includes(`<loc>${canonical}</loc>`), `${canonical} should not be in sitemap`);
  }
});

test('evidence-backed locale pair stays reciprocal and published', () => {
  const xml = sitemapXml();
  for (const [file, canonical, alternate] of [
    ['dist/lokasyon/mersin/e-ticaret/index.html', 'https://qctcommerce.com/lokasyon/mersin/e-ticaret/', 'https://qctcommerce.com/en/location/mersin/ecommerce/'],
    ['dist/en/location/mersin/ecommerce/index.html', 'https://qctcommerce.com/en/location/mersin/ecommerce/', 'https://qctcommerce.com/lokasyon/mersin/e-ticaret/'],
  ]) {
    const html = read(file);
    assert.ok(html.includes(`rel="canonical" href="${canonical}"`));
    assert.doesNotMatch(html, /content="noindex, follow"/i);
    assert.ok(html.includes(`href="${alternate}"`), `${file} reciprocal alternate`);
    assert.ok(xml.includes(`<loc>${canonical}</loc>`), `${canonical} should be in sitemap`);
  }
});

test('sitemap keeps core routes and every Azerbaijani location page indexable', () => {
  const xml = sitemapXml();
  for (const canonical of [
    'https://qctcommerce.com/',
    'https://qctcommerce.com/lokasyon/',
    'https://qctcommerce.com/en/location/',
  ]) assert.ok(xml.includes(`<loc>${canonical}</loc>`), `${canonical} should remain in sitemap`);

  const azRoot = path.join(root, 'dist/az/lokasiya');
  const azFiles = fs.readdirSync(azRoot, { recursive: true })
    .filter((name) => name.endsWith('index.html'));
  assert.ok(azFiles.length > 0, 'Azerbaijani location output should exist');
  for (const relative of azFiles) {
    const html = fs.readFileSync(path.join(azRoot, relative), 'utf8');
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    assert.ok(canonical, `${relative} canonical`);
    assert.doesNotMatch(html, /content="noindex, follow"/i);
    assert.ok(xml.includes(`<loc>${canonical}</loc>`), `${canonical} should remain in sitemap`);
  }

  const robots = read('public/robots.txt');
  assert.ok(robots.includes('Sitemap: https://qctcommerce.com/sitemap-index.xml'));
  assert.doesNotMatch(robots, /Disallow:\s*\/(?:en\/location|lokasyon|az\/lokasiya)/i);
});

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
    assert.match(html, /<h1\b[^>]*>/);
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

test('Turkish hub has scoped header clearance and responsive market cards', () => {
  const source = read('src/pages/lokasyon/index.astro');
  assert.match(source, /class="qct-location"/);
  assert.match(source, /\.qct-location \.page-hero\s*\{\s*padding: calc\(var\(--qct-hero-clearance/);
  assert.match(source, /\.qct-location \.service-grid\s*\{\s*display: grid;/);
  assert.match(source, /@media \(max-width: 640px\)/);
});
