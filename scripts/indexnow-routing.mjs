// Pure functions for safe, conservative IndexNow submissions.
export const SITE_ORIGIN = 'https://qctcommerce.com';

export function routeForAstroSource(filename) {
  if (!filename.startsWith('src/pages/') || !filename.endsWith('.astro') || filename.includes('[')) return null;
  const part = filename.slice('src/pages/'.length, -'.astro'.length);
  if (part === '404' || part === '404/index') return null;
  if (part === 'index') return '/';
  const base = part.endsWith('/index') ? part.slice(0, -'/index'.length) : part;
  if (!base || base.includes('..') || base.includes('\\')) return null;
  return `/${base}/`;
}

export function canonicalSiteUrl(raw, origin = SITE_ORIGIN) {
  let u;
  try { u = new URL(raw); } catch { throw new Error(`Invalid absolute URL: ${raw}`); }
  if (u.origin !== origin || u.username || u.password || u.search || u.hash || !u.pathname.startsWith('/')) {
    throw new Error(`Only canonical, same-origin URLs without query/hash are allowed: ${raw}`);
  }
  return u.toString();
}
