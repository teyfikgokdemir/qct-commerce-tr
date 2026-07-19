import fs from 'node:fs';
import path from 'node:path';

const DIST = 'dist';
const SITE = 'https://qctstudio.com';
const expectedHreflangs = ['en', 'sq', 'mk', 'sr', 'x-default'];
const pageSchemaTypes = new Set([
  'WebPage',
  'AboutPage',
  'ContactPage',
  'CollectionPage',
]);
const htmlFiles = [];

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
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

function metaContent(html, attributeName, attributeValue) {
  const matches = tags(html, 'meta').filter(
    (tag) => attribute(tag, attributeName)?.toLowerCase() === attributeValue.toLowerCase(),
  );
  return {
    count: matches.length,
    content: matches.length === 1 ? attribute(matches[0], 'content') : null,
  };
}

function expectedUrl(file) {
  const relative = path.relative(DIST, file).split(path.sep).join('/');
  if (relative === 'index.html') return `${SITE}/`;
  if (relative === '404.html') return `${SITE}/404/`;
  if (relative.endsWith('/index.html')) {
    return `${SITE}/${relative.slice(0, -'index.html'.length)}`;
  }
  return `${SITE}/${relative}`;
}

function expectedLanguage(file) {
  const relative = path.relative(DIST, file).split(path.sep).join('/');
  return relative.match(/^(sq|mk|sr)\//)?.[1] ?? 'en';
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

const errors = [];
let indexable = 0;
let noindex = 0;
let internalLinks = 0;
let jsonLdBlocks = 0;

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  const canonicalTags = tags(html, 'link').filter(
    (tag) => attribute(tag, 'rel')?.toLowerCase() === 'canonical',
  );
  const alternateTags = tags(html, 'link').filter(
    (tag) => attribute(tag, 'rel')?.toLowerCase() === 'alternate' && attribute(tag, 'hreflang'),
  );
  const robotsTags = tags(html, 'meta').filter(
    (tag) => attribute(tag, 'name')?.toLowerCase() === 'robots',
  );
  const robots = robotsTags.map((tag) => attribute(tag, 'content') ?? '').join(',').toLowerCase();
  const isNoindex = robots.includes('noindex');
  const expectedCanonical = expectedUrl(file);
  const expectedLang = expectedLanguage(file);

  const htmlLang = html.match(/<html\s+[^>]*lang=["']([^"']+)["']/i)?.[1] ?? null;
  if (htmlLang !== expectedLang) {
    errors.push(`${file}: html lang ${htmlLang} does not match ${expectedLang}.`);
  }

  const titleTags = html.match(/<title>([\s\S]*?)<\/title>/gi) ?? [];
  if (titleTags.length !== 1 || !titleTags[0].replace(/<\/?title>/gi, '').trim()) {
    errors.push(`${file}: expected one non-empty title, found ${titleTags.length}.`);
  }

  const description = metaContent(html, 'name', 'description');
  if (description.count !== 1 || !description.content?.trim()) {
    errors.push(`${file}: expected one non-empty meta description, found ${description.count}.`);
  }

  if (canonicalTags.length !== 1) {
    errors.push(`${file}: expected one canonical tag, found ${canonicalTags.length}.`);
  } else {
    const canonical = attribute(canonicalTags[0], 'href');
    if (canonical !== expectedCanonical) {
      errors.push(`${file}: canonical ${canonical} does not match ${expectedCanonical}.`);
    }
    if (/\/(sq|mk|sr)\/\1(?:\/|$)/.test(canonical ?? '')) {
      errors.push(`${file}: canonical contains a repeated locale segment: ${canonical}.`);
    }
  }

  const requiredOg = ['og:type', 'og:site_name', 'og:title', 'og:description', 'og:url', 'og:image'];
  for (const property of requiredOg) {
    const meta = metaContent(html, 'property', property);
    if (meta.count !== 1 || !meta.content?.trim()) {
      errors.push(`${file}: expected one non-empty ${property} meta tag, found ${meta.count}.`);
    }
  }

  const ogUrl = metaContent(html, 'property', 'og:url').content;
  if (ogUrl && ogUrl !== expectedCanonical) {
    errors.push(`${file}: og:url ${ogUrl} does not match ${expectedCanonical}.`);
  }

  const ogImage = metaContent(html, 'property', 'og:image').content;
  if (ogImage) {
    try {
      const imageUrl = new URL(ogImage);
      if (imageUrl.origin !== SITE || !fs.existsSync(path.join(DIST, imageUrl.pathname.replace(/^\//, '')))) {
        errors.push(`${file}: og:image does not resolve to a generated local asset: ${ogImage}.`);
      }
    } catch {
      errors.push(`${file}: og:image is not a valid absolute URL: ${ogImage}.`);
    }
  }

  const requiredTwitter = ['twitter:card', 'twitter:title', 'twitter:description', 'twitter:image'];
  for (const name of requiredTwitter) {
    const meta = metaContent(html, 'name', name);
    if (meta.count !== 1 || !meta.content?.trim()) {
      errors.push(`${file}: expected one non-empty ${name} meta tag, found ${meta.count}.`);
    }
  }

  const hreflangs = alternateTags.map((tag) => attribute(tag, 'hreflang')).filter(Boolean).sort();

  if (isNoindex) {
    noindex += 1;
    if (alternateTags.length !== 0) {
      errors.push(`${file}: noindex page must not emit hreflang alternates.`);
    }
  } else {
    indexable += 1;
    if (JSON.stringify(hreflangs) !== JSON.stringify([...expectedHreflangs].sort())) {
      errors.push(`${file}: expected hreflang set ${expectedHreflangs.join(', ')}, found ${hreflangs.join(', ')}.`);
    }

    for (const tag of alternateTags) {
      const href = attribute(tag, 'href') ?? '';
      if (/\/(sq|mk|sr)\/\1(?:\/|$)/.test(href)) {
        errors.push(`${file}: hreflang contains a repeated locale segment: ${href}.`);
      }
    }
  }

  const jsonLdMatches = [...html.matchAll(/<script\s+[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  jsonLdBlocks += jsonLdMatches.length;
  if (!jsonLdMatches.length) {
    errors.push(`${file}: expected at least one JSON-LD block.`);
  } else {
    const nodes = [];
    for (const match of jsonLdMatches) {
      try {
        nodes.push(...schemaNodes(JSON.parse(match[1].trim())));
      } catch (error) {
        errors.push(`${file}: invalid JSON-LD (${error.message}).`);
      }
    }

    for (const type of ['Organization', 'WebSite']) {
      if (!nodes.some((node) => node['@type'] === type)) {
        errors.push(`${file}: JSON-LD is missing ${type}.`);
      }
    }
    if (!nodes.some((node) => pageSchemaTypes.has(node['@type']))) {
      errors.push(`${file}: JSON-LD is missing a WebPage-compatible node.`);
    }
  }

  const anchorTags = tags(html, 'a');
  for (const tag of anchorTags) {
    const href = attribute(tag, 'href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) continue;

    let url;
    try {
      url = new URL(href, SITE);
    } catch {
      errors.push(`${file}: invalid link URL ${href}.`);
      continue;
    }

    if (url.origin !== SITE) continue;
    internalLinks += 1;
    if (!localPageExists(url.pathname)) {
      errors.push(`${file}: internal link does not resolve to a generated page: ${href}.`);
    }
  }
}

console.log(`HTML SEO audit: ${htmlFiles.length} files, ${indexable} indexable, ${noindex} noindex.`);
console.log(`Rendered metadata audit: ${jsonLdBlocks} JSON-LD blocks, ${internalLinks} internal links checked.`);

if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log('Canonical, hreflang, metadata, structured data and internal-link audit passed.');
}
