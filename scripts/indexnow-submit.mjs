import { readdir, readFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE_ORIGIN, routeForAstroSource, canonicalSiteUrl } from './indexnow-routing.mjs';

// Default: do not bulk-resubmit the sitemap. Pick exactly one explicit mode.
// --changed-from=HEAD^: direct static Astro pages changed since a git ref
// --urls-file=path: one canonical full URL per line, including deleted pages
// --all: intentional exceptional full sitemap submission
const args = process.argv.slice(2);
const modeArgs = args.filter((a) => a === '--all' || a.startsWith('--changed-from=') || a.startsWith('--urls-file='));
if (modeArgs.length !== 1) throw new Error('Choose one mode: --changed-from=<git-ref>, --urls-file=<path>, or explicit --all.');
const DRY_RUN = args.includes('--dry-run');
const LOCAL_SITEMAP = args.includes('--local');
const SITEMAP_URL = `${SITE_ORIGIN}/sitemap-index.xml`;
const API_URL = 'https://api.indexnow.org/indexnow';
const KEY_DIR = fileURLToPath(new URL('../public/', import.meta.url));
const BATCH_SIZE = 10_000;

function decodeXml(value) {
  return value.replaceAll('&amp;', '&').replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('&quot;', '"').replaceAll('&apos;', "'");
}
function locs(xml) {
  return [...xml.matchAll(/<loc>\s*([\s\S]*?)\s*<\/loc>/gi)].map((m) => decodeXml(m[1].trim()));
}
async function findKey() {
  const files = await readdir(KEY_DIR);
  for (const name of files) {
    if (!name.endsWith('.txt') || ['robots.txt', 'llms.txt', 'llms-full.txt', 'sitemap.txt'].includes(name)) continue;
    const stem = name.slice(0, -4);
    if (!/^[a-zA-Z0-9-]{8,128}$/.test(stem)) continue;
    const key = (await readFile(resolve(KEY_DIR, name), 'utf8')).trim();
    if (key === stem) return key;
  }
  throw new Error('No valid IndexNow key file was found under public/.');
}
async function fetchXml(url) {
  if (LOCAL_SITEMAP) {
    const pathname = new URL(url).pathname;
    const distPath = resolve(KEY_DIR, '../dist', `.${pathname}`);
    return readFile(distPath, 'utf8');
  }
  const response = await fetch(url, { headers: { accept: 'application/xml,text/xml' } });
  if (!response.ok) throw new Error(`Sitemap HTTP ${response.status}: ${url}`);
  return response.text();
}
async function readSitemap(url, visited = new Set()) {
  if (visited.has(url)) return [];
  visited.add(url);
  const xml = await fetchXml(url);
  const urls = locs(xml);
  if (!/<sitemapindex\b/i.test(xml)) return urls;
  const nested = [];
  for (const child of urls) nested.push(...await readSitemap(child, visited));
  return nested;
}
function changedRoutesFromGit(ref) {
  if (!/^[A-Za-z0-9_./^~-]+$/.test(ref) || ref.startsWith('-') || ref.includes('..')) throw new Error('Invalid git ref for --changed-from.');
  const output = execFileSync('git', ['diff', '--name-only', '--diff-filter=ACMRT', ref, 'HEAD', '--', 'src/pages'], { encoding: 'utf8' });
  return [...new Set(output.split(/\r?\n/).map(routeForAstroSource).filter(Boolean))];
}
async function chooseUrls(mode) {
  if (mode === '--all') {
    return [...new Set((await readSitemap(SITEMAP_URL)).filter((url) => url.startsWith(`${SITE_ORIGIN}/`)).map((url) => canonicalSiteUrl(url)))];
  }
  if (mode.startsWith('--urls-file=')) {
    const filename = mode.slice('--urls-file='.length);
    if (!filename) throw new Error('Missing --urls-file path');
    const lines = (await readFile(filename, 'utf8')).split(/\r?\n/).map((l) => l.trim()).filter((l) => l && !l.startsWith('#'));
    return [...new Set(lines.map((url) => canonicalSiteUrl(url)))];
  }
  const routes = changedRoutesFromGit(mode.slice('--changed-from='.length));
  if (!routes.length) { console.log('No directly changed static Astro page routes; no IndexNow request.'); return []; }
  const published = new Set((await readSitemap(SITEMAP_URL)).map((url) => canonicalSiteUrl(url)));
  const urls = routes.map((r) => `${SITE_ORIGIN}${r}`).filter((url) => published.has(url));
  console.log(`Detected ${routes.length} direct static routes; ${urls.length} present in the published sitemap. Dynamic/data/shared component changes require editorial URL selection via --urls-file.`);
  return [...new Set(urls)];
}
async function submitBatch(key, urls, batch, total) {
  if (DRY_RUN) {
    console.log(JSON.stringify({ dryRun: true, batch, total, urlCount: urls.length, firstUrl: urls[0], lastUrl: urls.at(-1) }));
    return;
  }
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=utf-8', accept: 'application/json' },
    body: JSON.stringify({ host: new URL(SITE_ORIGIN).host, key, keyLocation: `${SITE_ORIGIN}/${key}.txt`, urlList: urls }),
  });
  const body = await response.text();
  console.log(JSON.stringify({ batch, total, urlCount: urls.length, status: response.status, response: body.slice(0, 500) || response.statusText }));
  if (![200, 202].includes(response.status)) throw new Error(`IndexNow HTTP ${response.status}`);
}
const selected = await chooseUrls(modeArgs[0]);
if (!selected.length) {
  console.log('IndexNow: zero URLs selected; skipped.');
} else {
  const key = DRY_RUN ? null : await findKey();
  const groups = [];
  for (let i = 0; i < selected.length; i += BATCH_SIZE) groups.push(selected.slice(i, i + BATCH_SIZE));
  console.log(`IndexNow: preparing ${selected.length} URLs in ${groups.length} batches.`);
  for (let i = 0; i < groups.length; i++) await submitBatch(key, groups[i], i + 1, groups.length);
  console.log(DRY_RUN ? 'IndexNow dry-run completed.' : 'IndexNow submission accepted; indexing is not guaranteed.');
}
