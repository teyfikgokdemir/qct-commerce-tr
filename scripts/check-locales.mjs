// Run after npm run build. Checks rendered output, including dynamic blog routes,
// so a valid Astro page hidden by a hosting redirect cannot silently pass.
import fs from 'node:fs';
import path from 'node:path';

const SITE = 'https://qctcommerce.com';
const DIST = 'dist';
const errors = [];
const fail = (url, message) => errors.push(`${url}: ${message}`);
const read = file => fs.readFileSync(file, 'utf8');
const decode = text => text.replace(/&#(x[\da-f]+|\d+);/gi, (_, n) => String.fromCodePoint(n[0].toLowerCase() === 'x' ? parseInt(n.slice(1), 16) : Number(n)))
  .replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&');
const text = html => decode(html.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
const attr = (tag, key) => decode(tag.match(new RegExp(`\\b${key}=["']([^"']*)["']`, 'i'))?.[1] ?? '');
const tags = (html, name) => html.match(new RegExp(`<${name}\\b[^>]*>`, 'gi')) ?? [];
const walk = dir => fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)]);
const locs = xml => [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => decode(m[1]));
const locale = url => new URL(url).pathname.startsWith('/en/') ? 'en' : new URL(url).pathname.startsWith('/ka/') ? 'ka' : 'tr';
const hrefLang = { tr: 'tr-TR', en: 'en', ka: 'ka-GE' };
const ogLocale = { tr: 'tr_TR', en: 'en_US', ka: 'ka_GE' };
// Proper names remain unchanged in English. This is a regression heuristic,
// not a general language detector; also catch common Turkish words without accents.
const turkish = value => /[ıİşŞğĞçÇöÖüÜ]|\b(?:ne kadar|veya|fiyat|fiyatlar|hizmetler|sayfa|teklif al|hemen|nedir|gizlilik|urun|baslangic)\b/i.test(
  value.replace(/Türkiye|TÜRKİYE|Teyfik Gökdemir|ÇiçekSepeti/gu, '')
);

if (!fs.existsSync(path.join(DIST, 'sitemap-index.xml'))) {
  console.error('Missing build output. Run npm run build before npm run check:locales.');
  process.exit(1);
}

const redirects = read(path.join(DIST, '_redirects')).split(/\r?\n/).filter(line => line.trim() && !line.trim().startsWith('#')).map(line => {
  const [source, target] = line.trim().split(/\s+/);
  const pattern = source.split('*').map(part => part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('.*');
  return { source, target, pattern: new RegExp(`^${pattern}$`) };
});
const redirectFor = url => redirects.find(entry => entry.pattern.test(new URL(url, SITE).pathname));
const pages = new Map();
for (const file of walk(DIST).filter(file => file.endsWith('.html'))) {
  const relative = path.relative(DIST, file).split(path.sep).join('/');
  const url = SITE + '/' + (relative === '404.html' ? '404/' : relative.replace(/index\.html$/, ''));
  const html = read(file);
  const links = tags(html, 'link');
  const metas = tags(html, 'meta');
  const metadata = key => metas.filter(tag => attr(tag, 'name') === key || attr(tag, 'property') === key).map(tag => attr(tag, 'content'));
  const canonical = links.filter(tag => attr(tag, 'rel') === 'canonical').map(tag => attr(tag, 'href'));
  const alternates = links.filter(tag => attr(tag, 'rel') === 'alternate' && attr(tag, 'hreflang')).map(tag => ({ lang: attr(tag, 'hreflang'), href: attr(tag, 'href') }));
  const titles = [...html.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi)].map(m => text(m[1]));
  const headings = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => text(m[1]));
  pages.set(url, { html, metadata, canonical, alternates, titles, headings, indexable: !metadata('robots').some(value => /noindex/i.test(value)) });
}

const sitemapUrls = [];
for (const sitemap of locs(read(path.join(DIST, 'sitemap-index.xml')))) {
  const url = new URL(sitemap);
  if (url.origin !== SITE) { fail(sitemap, 'foreign sitemap origin'); continue; }
  const file = path.join(DIST, url.pathname);
  if (!fs.existsSync(file)) { fail(sitemap, 'missing sitemap file'); continue; }
  sitemapUrls.push(...locs(read(file)));
}
if (new Set(sitemapUrls).size !== sitemapUrls.length) fail('sitemap', 'duplicate URLs');
for (const url of sitemapUrls) {
  if (!pages.get(url)?.indexable) fail(url, 'sitemap URL is missing or not indexable');
  if (redirectFor(url)) fail(url, 'sitemap URL is shadowed by a redirect');
}
const robotsMaps = read(path.join(DIST, 'robots.txt')).match(/^Sitemap:\s*(.+)$/gim) ?? [];
if (robotsMaps.length !== 1 || robotsMaps[0].trim() !== `Sitemap: ${SITE}/sitemap-index.xml`) fail('robots.txt', 'expected only the canonical sitemap-index.xml');
if (fs.existsSync(path.join(DIST, 'sitemap_index.xml'))) fail('sitemap', 'unexpected sitemap_index.xml');

const englishTitles = new Map();
const homeH1 = pages.get(`${SITE}/en/`)?.headings[0];
const homeTitle = pages.get(`${SITE}/en/`)?.titles[0];
const homeDescription = pages.get(`${SITE}/en/`)?.metadata('description')[0];
for (const [url, page] of pages) {
  const lang = locale(url);
  if (attr(tags(page.html, 'html')[0] ?? '', 'lang') !== lang) fail(url, `html lang must be ${lang}`);
  if (page.canonical.length !== 1 || page.canonical[0] !== url) fail(url, 'canonical must be unique and self-referencing');
  if (page.titles.length !== 1 || !page.titles[0]) fail(url, 'expected one non-empty title');
  if (page.headings.length !== 1 || !page.headings[0]) fail(url, 'expected one non-empty H1');
  for (const key of ['description', 'og:title', 'og:description', 'og:locale', 'og:url']) {
    if (page.metadata(key).length !== 1 || !page.metadata(key)[0]) fail(url, `expected one non-empty ${key}`);
  }
  if (page.metadata('og:title')[0] !== page.titles[0] || page.metadata('og:description')[0] !== page.metadata('description')[0]) fail(url, 'OG title/description mismatch');
  if (page.metadata('og:locale')[0] !== ogLocale[lang] || page.metadata('og:url')[0] !== url) fail(url, 'OG locale/URL mismatch');
  const expectedOgAlternates = [...new Set(page.alternates.filter(a => a.lang !== 'x-default').map(a => Object.entries(hrefLang).find(([, value]) => value === a.lang)?.[0]).map(key => ogLocale[key]).filter(value => value && value !== ogLocale[lang]))].sort();
  if (JSON.stringify(page.metadata('og:locale:alternate').sort()) !== JSON.stringify(expectedOgAlternates)) fail(url, 'OG alternate locales must use language_TERRITORY');
  if (page.indexable && !sitemapUrls.includes(url)) fail(url, 'indexable page missing from sitemap');
  if (page.indexable && redirectFor(url)) fail(url, 'published page is shadowed by a redirect');
  const languages = page.alternates.map(a => a.lang);
  if (new Set(languages).size !== languages.length) fail(url, 'duplicate hreflang');
  if (page.alternates.length) {
    if (!page.alternates.some(a => a.lang === hrefLang[lang] && a.href === url)) fail(url, 'missing self hreflang');
    if (!languages.includes('x-default')) fail(url, 'missing x-default');
    const english = page.alternates.find(a => a.lang === 'en');
    if (page.alternates.find(a => a.lang === 'x-default')?.href !== english?.href) fail(url, 'x-default must reference the paired English page');
  }
  for (const alternate of page.alternates) {
    if (![...Object.values(hrefLang), 'x-default'].includes(alternate.lang)) fail(url, `inconsistent hreflang ${alternate.lang}`);
    const target = pages.get(alternate.href);
    if (!target?.indexable || redirectFor(alternate.href)) { fail(url, `alternate is missing, noindex or redirected: ${alternate.href}`); continue; }
    if (alternate.lang !== 'x-default' && alternate.lang !== hrefLang[locale(alternate.href)]) fail(url, 'alternate language does not match its target');
    for (const member of page.alternates) {
      if (!target.alternates.some(a => a.lang === member.lang && a.href === member.href)) fail(url, `non-reciprocal hreflang cluster: ${alternate.href}`);
    }
  }
  if (lang !== 'en') continue;
  if (englishTitles.has(page.titles[0])) fail(url, `duplicate English title with ${englishTitles.get(page.titles[0])}`);
  englishTitles.set(page.titles[0], url);
  if (url !== `${SITE}/en/` && (page.headings[0] === homeH1 || page.titles[0] === homeTitle || page.metadata('description')[0] === homeDescription)) fail(url, 'homepage H1 or metadata fallback');
  const visible = page.html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, '').replace(/<!--[\s\S]*?-->/g, '');
  const snippets = [...visible.matchAll(/>([^<>]+)</g)].map(m => text(m[1]));
  for (const tag of tags(visible, 'meta')) snippets.push(attr(tag, 'content'));
  for (const tag of visible.match(/<[^>]+>/g) ?? []) for (const key of ['aria-label', 'alt', 'placeholder']) snippets.push(attr(tag, key));
  for (const snippet of new Set(snippets.filter(turkish))) fail(url, `Turkish content: ${snippet.slice(0, 160)}`);
  for (const match of page.html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const inspect = node => {
        if (!node || typeof node !== 'object') return;
        for (const [key, value] of Object.entries(node)) {
          if (['name', 'headline', 'description', 'text'].includes(key) && typeof value === 'string' && turkish(value)) fail(url, `Turkish structured data: ${value.slice(0, 120)}`);
          if (typeof value === 'object') inspect(value);
        }
      };
      inspect(JSON.parse(match[1]));
    } catch { fail(url, 'invalid JSON-LD'); }
  }
  for (const anchor of page.html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)) {
    const anchorTag = `<a ${anchor[1]}>`;
    const href = attr(anchorTag, 'href');
    if (!href.startsWith('/') && !href.startsWith(SITE + '/')) continue;
    const target = new URL(href, url);
    const anchorHreflang = attr(anchorTag, 'hreflang');
    const alternateMatch = page.alternates.some(a => a.lang === anchorHreflang && new URL(a.href, SITE).pathname === target.pathname);
    if (alternateMatch) continue;
    if (target.pathname.startsWith('/en/')) {
      if (!pages.has(target.origin + target.pathname) || redirectFor(target.href)) fail(url, `English link missing or redirected: ${href}`);
    } else if (!((target.pathname === '/' && ['TR', 'Türkiye'].includes(text(anchor[2]))) || (target.pathname === '/ka/georgia/' && text(anchor[2]) === 'KA'))) fail(url, `non-English internal content link: ${href}`);
  }
}
for (const route of ['/en/', '/en/blog/', '/en/meta-ads/', '/en/audit/', '/en/how-we-work/', '/en/services/', '/en/pricing/', '/en/work/', '/en/contact/']) {
  if (!pages.get(SITE + route)?.indexable) fail(route, 'required English page missing');
}

console.log(`Locale QA: ${pages.size} HTML files, ${sitemapUrls.length} sitemap URLs, ${englishTitles.size} English pages.`);
if (errors.length) { console.error([...new Set(errors)].join('\n')); process.exitCode = 1; }
else console.log('PASS: routing, English content, metadata, canonical, reciprocal hreflang and sitemap.');
