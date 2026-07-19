import fs from 'node:fs';
import path from 'node:path';

const DIST = 'dist';
const SITE = 'https://qctcommerce.com';
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
const renderedTitles = new Map();
const renderedDescriptions = new Map();
const indexableCanonicals = new Set();
const incomingLinks = new Map();
const servicePaths = new Set([
  '/e-ticaret/', '/web-tasarim/', '/whatsapp-satis/', '/seo-geo/',
  '/meta-reklamlari/', '/yapay-zeka-otomasyonlari/',
]);

function registerUnique(map, value, file, label) {
  if (!value) return;
  if (map.has(value)) errors.push(`${file}: duplicate ${label} also used by ${map.get(value)}.`);
  else map.set(value, file);
}

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
  const expectedPath = new URL(expectedCanonical).pathname;
  const expectedLang = 'tr';

  const htmlLang = html.match(/<html\s+[^>]*lang=["']([^"']+)["']/i)?.[1] ?? null;
  if (htmlLang !== expectedLang) {
    errors.push(`${file}: html lang ${htmlLang} does not match ${expectedLang}.`);
  }

  const titleTags = html.match(/<title>([\s\S]*?)<\/title>/gi) ?? [];
  if (titleTags.length !== 1 || !titleTags[0].replace(/<\/?title>/gi, '').trim()) {
    errors.push(`${file}: expected one non-empty title, found ${titleTags.length}.`);
  } else {
    registerUnique(renderedTitles, titleTags[0].replace(/<\/?title>/gi, '').trim(), file, 'title');
  }

  const h1Tags = html.match(/<h1\b[^>]*>/gi) ?? [];
  if (h1Tags.length !== 1) {
    errors.push(`${file}: expected exactly one H1, found ${h1Tags.length}.`);
  }

  const description = metaContent(html, 'name', 'description');
  if (description.count !== 1 || !description.content?.trim()) {
    errors.push(`${file}: expected one non-empty meta description, found ${description.count}.`);
  } else {
    registerUnique(renderedDescriptions, description.content.trim(), file, 'meta description');
  }

  if (canonicalTags.length !== 1) {
    errors.push(`${file}: expected one canonical tag, found ${canonicalTags.length}.`);
  } else {
    const canonical = attribute(canonicalTags[0], 'href');
    if (canonical !== expectedCanonical) {
      errors.push(`${file}: canonical ${canonical} does not match ${expectedCanonical}.`);
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
    indexableCanonicals.add(expectedCanonical);
    if (alternateTags.length !== 0) {
      errors.push(`${file}: single-language pages must not emit hreflang alternates.`);
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

    const articleNodes = nodes.filter((node) => node['@type'] === 'Article');
    const isArticlePage = expectedPath.startsWith('/blog/') && expectedPath !== '/blog/';
    if (isArticlePage && articleNodes.length !== 1) {
      errors.push(`${file}: blog article must emit exactly one Article node.`);
    }
    if (!isArticlePage && articleNodes.length) {
      errors.push(`${file}: Article schema is only allowed on real blog article pages.`);
    }

    const serviceNodes = nodes.filter((node) => node['@type'] === 'Service');
    if (servicePaths.has(expectedPath) && serviceNodes.length !== 1) {
      errors.push(`${file}: service page must emit exactly one Service node.`);
    }
    if (!servicePaths.has(expectedPath) && serviceNodes.length) {
      errors.push(`${file}: Service schema is only allowed on service detail pages.`);
    }

    const faqNodes = nodes.filter((node) => node['@type'] === 'FAQPage');
    for (const faqNode of faqNodes) {
      if (!html.includes('<details')) {
        errors.push(`${file}: FAQPage schema requires visible FAQ details.`);
      }
      for (const question of faqNode.mainEntity ?? []) {
        if (question.name && !html.includes(question.name)) {
          errors.push(`${file}: FAQ schema question is not visible: ${question.name}`);
        }
      }
    }

    const founderId = `${SITE}/hakkimizda/#teyfik-gokdemir`;
    const personNodes = nodes.filter((node) => node['@type'] === 'Person');
    if (expectedPath === '/hakkimizda/') {
      const founder = personNodes.find((node) => node['@id'] === founderId);
      const organization = nodes.find((node) => node['@id'] === `${SITE}/#organization`);
      if (personNodes.length !== 1 || !founder) {
        errors.push(`${file}: AboutPage must emit exactly one verified founder Person node.`);
      } else {
        if (founder.name !== 'Teyfik Gökdemir' || founder.jobTitle !== 'QCT Commerce Kurucusu') {
          errors.push(`${file}: founder Person name or jobTitle is incorrect.`);
        }
        if (founder.worksFor?.['@id'] !== `${SITE}/#organization`) {
          errors.push(`${file}: founder worksFor must reference the QCT Commerce Organization.`);
        }
        if (founder.image !== `${SITE}/images/teyfik-gokdemir-qct-commerce.webp`) {
          errors.push(`${file}: founder image URL is incorrect.`);
        }
        if (!Array.isArray(founder.knowsLanguage) || !founder.knowsLanguage.includes('Türkçe') || !founder.knowsLanguage.includes('İngilizce')) {
          errors.push(`${file}: founder knowsLanguage must contain Türkçe and İngilizce.`);
        }
        if (!Array.isArray(founder.knowsAbout) || founder.knowsAbout.length !== 10) {
          errors.push(`${file}: founder knowsAbout must contain only the 10 verified expertise areas.`);
        }
        for (const forbidden of ['sameAs', 'birthDate', 'address', 'alumniOf', 'award', 'hasCredential']) {
          if (forbidden in founder) errors.push(`${file}: founder Person must not include ${forbidden}.`);
        }
      }
      if (organization?.founder?.['@id'] !== founderId) {
        errors.push(`${file}: Organization founder reference does not match the Person @id.`);
      }

      const portrait = tags(html, 'img').find(
        (tag) => attribute(tag, 'src') === '/images/teyfik-gokdemir-qct-commerce.webp',
      );
      if (!portrait) {
        errors.push(`${file}: founder portrait is missing from visible HTML.`);
      } else {
        const portraitAttributes = {
          alt: 'QCT Commerce Kurucusu Teyfik Gökdemir',
          width: '900',
          height: '1213',
          loading: 'lazy',
          decoding: 'async',
        };
        for (const [name, value] of Object.entries(portraitAttributes)) {
          if (attribute(portrait, name) !== value) {
            errors.push(`${file}: founder portrait ${name} must be ${value}.`);
          }
        }
      }
      if (!fs.existsSync(path.join(DIST, 'images', 'teyfik-gokdemir-qct-commerce.webp'))) {
        errors.push(`${file}: optimized founder portrait is missing from the build output.`);
      }
    } else if (personNodes.length) {
      errors.push(`${file}: founder Person schema is only allowed on the AboutPage.`);
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
    } else {
      incomingLinks.set(url.pathname, (incomingLinks.get(url.pathname) ?? 0) + 1);
    }
  }
}

for (const canonical of indexableCanonicals) {
  const pathname = new URL(canonical).pathname;
  if (pathname !== '/' && !incomingLinks.get(pathname)) {
    errors.push(`${pathname}: indexable page has no incoming internal link.`);
  }
}

const sitemapFile = path.join(DIST, 'sitemap-0.xml');
if (!fs.existsSync(sitemapFile)) {
  errors.push('dist/sitemap-0.xml is missing.');
} else {
  const sitemap = fs.readFileSync(sitemapFile, 'utf8');
  const sitemapUrls = new Set([...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]));
  for (const canonical of indexableCanonicals) {
    if (!sitemapUrls.has(canonical)) errors.push(`Sitemap is missing ${canonical}.`);
  }
  for (const url of sitemapUrls) {
    if (!indexableCanonicals.has(url)) errors.push(`Sitemap contains a non-indexable or non-canonical URL: ${url}.`);
  }
}

const llmsFile = path.join(DIST, 'llms.txt');
if (!fs.existsSync(llmsFile)) {
  errors.push('dist/llms.txt is missing.');
} else {
  const llmsBuffer = fs.readFileSync(llmsFile);
  const llms = llmsBuffer.toString('utf8').replace(/\r\n/g, '\n');
  const lines = llms.split('\n');
  const h1Lines = lines.filter((line) => /^#\s+\S/.test(line));
  const firstH1Index = lines.findIndex((line) => /^#\s+\S/.test(line));
  const nextContentLine = lines.slice(firstH1Index + 1).find((line) => line.trim());
  const markdownLinkPattern = /\[([^\]\n]+)\]\((https:\/\/[^)\s]+)\)/g;
  const markdownLinks = [...llms.matchAll(markdownLinkPattern)];
  const contentWithoutValidLinks = llms.replace(markdownLinkPattern, '');
  const listLines = lines.filter((line) => line.startsWith('- '));

  if (llmsBuffer[0] === 0xef && llmsBuffer[1] === 0xbb && llmsBuffer[2] === 0xbf) {
    errors.push('dist/llms.txt must be UTF-8 without a BOM.');
  }
  if (llms.includes('\uFFFD')) errors.push('dist/llms.txt contains invalid UTF-8 replacement characters.');
  if (h1Lines.length !== 1 || h1Lines[0] !== '# QCT Commerce') {
    errors.push(`dist/llms.txt must contain exactly one H1 named QCT Commerce; found ${h1Lines.length}.`);
  }
  if (firstH1Index !== 0) errors.push('dist/llms.txt must begin with its H1.');
  if (!nextContentLine?.startsWith('> ')) {
    errors.push('dist/llms.txt must place a blockquote summary immediately after its H1.');
  }
  if (/https?:\/\//i.test(contentWithoutValidLinks)) {
    errors.push('dist/llms.txt contains a bare or malformed HTTP URL.');
  }
  if (listLines.some((line) => !/^- \[[^\]]+\]\(https:\/\/[^)\s]+\): \S/.test(line))) {
    errors.push('dist/llms.txt link lists must use "- [Başlık](https://...): kısa açıklama" format.');
  }
  if ((llms.match(/\]\(/g) ?? []).length !== markdownLinks.length) {
    errors.push('dist/llms.txt contains a malformed Markdown link.');
  }

  for (const [, title, href] of markdownLinks) {
    let url;
    try {
      url = new URL(href);
    } catch {
      errors.push(`dist/llms.txt contains an invalid URL for ${title}: ${href}.`);
      continue;
    }
    if (url.origin === SITE && !indexableCanonicals.has(url.toString())) {
      errors.push(`dist/llms.txt internal target is not a generated canonical page: ${href}.`);
    }
  }

  console.log(`llms.txt audit: ${h1Lines.length} H1, ${markdownLinks.length} Markdown links, ${listLines.length} canonical page entries checked.`);
}

console.log(`HTML SEO audit: ${htmlFiles.length} files, ${indexable} indexable, ${noindex} noindex.`);
console.log(`Rendered metadata audit: ${jsonLdBlocks} JSON-LD blocks, ${internalLinks} internal links checked.`);

if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log('Canonical, metadata, structured data and internal-link audit passed.');
}
