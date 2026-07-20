import fs from 'node:fs';
import path from 'node:path';

const DIST = 'dist';
const SITE = 'https://qctcommerce.com';
const htmlFiles = [];
const errors = [];
const canonicals = new Set();
const incoming = new Map();

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(file);
    else if (entry.name.endsWith('.html')) htmlFiles.push(file);
  }
}

function attribute(tag, name) {
  return tag.match(new RegExp(`\\b${name}=["']([^"']+)["']`, 'i'))?.[1] ?? null;
}

function tags(html, name) {
  return html.match(new RegExp(`<${name}\\s+[^>]*>`, 'gi')) ?? [];
}

function expectedUrl(file) {
  const relative = path.relative(DIST, file).split(path.sep).join('/');
  if (relative === 'index.html') return `${SITE}/`;
  if (relative === '404.html') return `${SITE}/404/`;
  if (relative.endsWith('/index.html')) return `${SITE}/${relative.slice(0, -'index.html'.length)}`;
  return `${SITE}/${relative}`;
}

function localPageExists(pathname) {
  const clean = decodeURIComponent(pathname).replace(/^\/+/, '');
  if (!clean) return fs.existsSync(path.join(DIST, 'index.html'));
  const candidates = pathname.endsWith('/')
    ? [path.join(DIST, clean, 'index.html')]
    : [path.join(DIST, clean), path.join(DIST, `${clean}.html`), path.join(DIST, clean, 'index.html')];
  return candidates.some((candidate) => fs.existsSync(candidate));
}

function schemaNodes(value) {
  if (!value || typeof value !== 'object') return [];
  if (Array.isArray(value)) return value.flatMap(schemaNodes);
  const current = value['@type'] ? [value] : [];
  const graph = Array.isArray(value['@graph']) ? value['@graph'].flatMap(schemaNodes) : [];
  return [...current, ...graph];
}

walk(DIST);

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  const canonical = expectedUrl(file);
  const pathname = new URL(canonical).pathname;
  const expectedLang = pathname.startsWith('/ka/') ? 'ka' : pathname.startsWith('/en/') ? 'en' : 'tr';
  const htmlLang = html.match(/<html\s+[^>]*lang=["']([^"']+)["']/i)?.[1] ?? null;

  if (htmlLang !== expectedLang) errors.push(`${file}: html lang ${htmlLang} does not match ${expectedLang}.`);

  const titleTags = html.match(/<title>([\s\S]*?)<\/title>/gi) ?? [];
  if (titleTags.length !== 1 || !titleTags[0].replace(/<\/?title>/gi, '').trim()) errors.push(`${file}: expected one non-empty title.`);

  const h1Tags = html.match(/<h1\b[^>]*>/gi) ?? [];
  if (h1Tags.length !== 1) errors.push(`${file}: expected exactly one H1, found ${h1Tags.length}.`);

  const descriptionTags = tags(html, 'meta').filter((tag) => attribute(tag, 'name')?.toLowerCase() === 'description');
  if (descriptionTags.length !== 1 || !attribute(descriptionTags[0], 'content')?.trim()) errors.push(`${file}: expected one non-empty meta description.`);

  const canonicalTags = tags(html, 'link').filter((tag) => attribute(tag, 'rel')?.toLowerCase() === 'canonical');
  if (canonicalTags.length !== 1 || attribute(canonicalTags[0], 'href') !== canonical) errors.push(`${file}: canonical does not match ${canonical}.`);

  const robots = tags(html, 'meta').filter((tag) => attribute(tag, 'name')?.toLowerCase() === 'robots').map((tag) => attribute(tag, 'content') ?? '').join(',').toLowerCase();
  const indexable = !robots.includes('noindex');
  if (indexable) canonicals.add(canonical);

  const alternates = tags(html, 'link').filter((tag) => attribute(tag, 'rel')?.toLowerCase() === 'alternate' && attribute(tag, 'hreflang'));
  const isPairedHome = pathname === '/' || pathname === '/en/';
  const isGeorgiaPair = pathname === '/en/georgia/' || pathname === '/ka/georgia/';
  if (isPairedHome) {
    const langs = new Set(alternates.map((tag) => attribute(tag, 'hreflang')));
    for (const required of ['tr-TR', 'en', 'x-default']) {
      if (!langs.has(required)) errors.push(`${file}: multilingual home is missing ${required} hreflang.`);
    }
  } else if (isGeorgiaPair) {
    const langs = new Set(alternates.map((tag) => attribute(tag, 'hreflang')));
    for (const required of ['en', 'ka-GE', 'x-default']) {
      if (!langs.has(required)) errors.push(`${file}: Georgia language pair is missing ${required} hreflang.`);
    }
  } else if (alternates.length) {
    errors.push(`${file}: unpaired page must not emit hreflang alternates.`);
  }

  const jsonLdMatches = [...html.matchAll(/<script\s+[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  if (!jsonLdMatches.length) errors.push(`${file}: expected at least one JSON-LD block.`);
  const nodes = [];
  for (const match of jsonLdMatches) {
    try { nodes.push(...schemaNodes(JSON.parse(match[1].trim()))); }
    catch (error) { errors.push(`${file}: invalid JSON-LD (${error.message}).`); }
  }

  for (const required of ['Organization', 'WebSite']) {
    if (!nodes.some((node) => node['@type'] === required)) errors.push(`${file}: JSON-LD is missing ${required}.`);
  }
  if (!nodes.some((node) => ['WebPage', 'AboutPage', 'ContactPage', 'CollectionPage'].includes(node['@type']))) errors.push(`${file}: JSON-LD is missing a WebPage-compatible node.`);

  const articleNodes = nodes.filter((node) => node['@type'] === 'Article');
  const isArticle = pathname.startsWith('/blog/') && pathname !== '/blog/';
  if (isArticle && articleNodes.length !== 1) errors.push(`${file}: blog article must emit exactly one Article node.`);
  if (!isArticle && articleNodes.length) errors.push(`${file}: Article schema is only allowed on blog articles.`);

  const serviceNodes = nodes.filter((node) => node['@type'] === 'Service');
  const servicePaths = new Set(['/e-ticaret/', '/web-tasarim/', '/whatsapp-satis/', '/seo-geo/', '/meta-reklamlari/', '/yapay-zeka-otomasyonlari/']);
  if (servicePaths.has(pathname) && serviceNodes.length !== 1) errors.push(`${file}: service page must emit exactly one Service node.`);
  if (!servicePaths.has(pathname) && serviceNodes.length) errors.push(`${file}: Service schema is only allowed on service detail pages.`);

  for (const tag of tags(html, 'a')) {
    const href = attribute(tag, 'href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) continue;
    let url;
    try { url = new URL(href, SITE); }
    catch { errors.push(`${file}: invalid link ${href}.`); continue; }
    if (url.origin !== SITE) continue;
    if (!localPageExists(url.pathname)) errors.push(`${file}: internal link does not resolve: ${href}.`);
    else incoming.set(url.pathname, (incoming.get(url.pathname) ?? 0) + 1);
  }
}

for (const canonical of canonicals) {
  const pathname = new URL(canonical).pathname;
  if (pathname !== '/' && !incoming.get(pathname)) errors.push(`${pathname}: indexable page has no incoming internal link.`);
}

const sitemapFile = path.join(DIST, 'sitemap-0.xml');
if (!fs.existsSync(sitemapFile)) errors.push('dist/sitemap-0.xml is missing.');
else {
  const sitemap = fs.readFileSync(sitemapFile, 'utf8');
  const sitemapUrls = new Set([...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]));
  for (const canonical of canonicals) if (!sitemapUrls.has(canonical)) errors.push(`Sitemap is missing ${canonical}.`);
}

console.log(`Multilingual HTML audit: ${htmlFiles.length} files checked.`);
if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log('Multilingual canonical, metadata, schema and internal-link audit passed.');
}
