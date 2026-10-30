// Contract test for optional AI discovery resources. Canonical HTML remains authoritative.
import fs from 'node:fs';
import path from 'node:path';

const DIST = 'dist';
const SITE = 'https://qctcommerce.com';
const errors = [];
const fail = (message) => errors.push(message);
const read = (name) => {
  const file = path.join(DIST, name);
  if (!fs.existsSync(file)) { fail(`Missing built asset: ${name}`); return ''; }
  return fs.readFileSync(file, 'utf8');
};
const routeFile = (route) => route === '/' ? 'index.html' : `${route.slice(1)}index.html`;
const urls = [
  '/', '/en/', '/az/',
  '/hizmetler/', '/en/services/', '/az/xidmetler/',
  '/fiyatlar/', '/en/pricing/', '/az/qiymetler/',
  '/e-ticaret/', '/en/ecommerce/', '/az/e-ticaret/',
  '/web-tasarim/', '/en/web-design/', '/az/veb-dizayn/',
  '/seo-geo/', '/en/search-visibility/', '/az/seo-geo/',
  '/iletisim/', '/en/contact/', '/az/elaqe/',
  '/pazaryeri-kurulumu/', '/amazon-turkiye-magaza-kurulumu/', '/amazon-amerika-magaza-kurulumu/'
];
for (const url of urls) {
  if (!fs.existsSync(path.join(DIST, routeFile(url)))) fail(`Missing advertised route: ${url}`);
}
const short = read('llms.txt');
const full = read('llms-full.txt');
const headers = read('_headers');
const robots = read('robots.txt');
for (const [label, content] of [['llms.txt', short], ['llms-full.txt', full]]) {
  for (const route of ['/', '/en/', '/az/', '/fiyatlar/', '/en/pricing/', '/az/qiymetler/']) {
    if (!content.includes(`${SITE}${route}`)) fail(`${label} missing ${route}`);
  }
}
for (const route of ['/pazaryeri-kurulumu/', '/amazon-turkiye-magaza-kurulumu/', '/amazon-amerika-magaza-kurulumu/']) {
  if (!full.includes(`${SITE}${route}`)) fail(`Detailed reference missing ${route}`);
}
// Prevent documents from advertising absent URLs even when the required core routes exist.
const referencedUrls = new Set(
  [short, full].flatMap((body) => body.match(/https:\/\/qctcommerce\.com\/[A-Za-z0-9/_.-]*/g) ?? [])
    .map((url) => url.replace(/[.,;:!?]+$/, ''))
);
for (const textUrl of referencedUrls) {
  let url;
  try { url = new URL(textUrl); } catch { fail(`Invalid QCT discovery URL: ${textUrl}`); continue; }
  if (url.search || url.hash) { fail(`Unexpected parameters in discovery URL: ${textUrl}`); continue; }
  const name = url.pathname.endsWith('/') ? `${url.pathname.slice(1)}index.html` : url.pathname.slice(1);
  if (!fs.existsSync(path.join(DIST, name))) fail(`Broken published discovery reference: ${textUrl}`);
}
if (!short.includes(`${SITE}/llms-full.txt`)) fail('llms.txt must link to llms-full.txt');
if (!full.includes(`${SITE}/llms.txt`)) fail('llms-full.txt must link back to llms.txt');
if (!robots.includes('Sitemap: https://qctcommerce.com/sitemap-index.xml')) fail('robots.txt missing sitemap link');
if (robots.split(/\r?\n/).some((line) => /^Disallow:\s*\/$/.test(line.trim()))) fail('robots.txt unexpectedly blocks root crawling');
for (const asset of ['llms.txt', 'llms-full.txt']) {
  const block = headers.match(new RegExp(`^/${asset.replace('.', '\\.')}\\n((?:[ \\t]+[^\\n]*\\n)+)`, 'm'))?.[1] ?? '';
  if (!block.includes('Content-Type: text/plain; charset=utf-8') || !block.includes('Access-Control-Allow-Origin: *')) fail(`Missing compatible headers for ${asset}`);
}
for (const name of ['ard.json', 'ai-catalog.json']) {
  let parsed;
  try { parsed = JSON.parse(read(`.well-known/${name}`)); } catch (e) { fail(`Invalid ${name}: ${e.message}`); continue; }
  if (parsed?.host?.identifier !== 'did:web:qctcommerce.com') fail(`${name}: invalid host`);
  const entries = parsed?.entries ?? [];
  for (const asset of ['llms.txt', 'llms-full.txt']) {
    if (!entries.some((e) => e.url === `${SITE}/${asset}` && e.type === 'text/plain')) fail(`${name}: missing ${asset}`);
  }
  if (new Set(entries.map((e) => e.identifier)).size !== entries.length) fail(`${name}: duplicate entry identifiers`);
}
for (const route of ['/', '/en/', '/az/']) {
  const html = read(routeFile(route));
  if (!html.includes('href="/llms.txt"') || !html.includes('href="/llms-full.txt"')) fail(`${route}: missing discovery links`);
}
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
else console.log('PASS: AI discovery assets, 3 locale homepages, 24 advertised routes and 2 compatible manifests.');
