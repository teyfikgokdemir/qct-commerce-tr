import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve('dist');
const urls = [
  '/pazaryeri-kurulumu/',
  '/amazon-turkiye-magaza-kurulumu/',
  '/amazon-amerika-magaza-kurulumu/',
];
const read = (file) => fs.readFileSync(path.join(dist, file), 'utf8');
const index = read('sitemap-index.xml');
const sitemapNames = [...index.matchAll(/<loc>https:\/\/qctcommerce\.com\/(sitemap-[^<]+\.xml)<\/loc>/g)].map(match => match[1]);
if (sitemapNames.length === 0) throw new Error('Sitemap index does not reference any sitemap XML.');
const xml = sitemapNames.map(read).join('\n');
const llms = fs.readFileSync(path.resolve('public/llms.txt'), 'utf8');
const robots = read('robots.txt');

for (const route of urls) {
  const canonical = 'https://qctcommerce.com' + route;
  if (!xml.includes('<loc>' + canonical + '</loc>')) throw new Error('Missing sitemap URL: ' + canonical);
  if (!llms.includes(canonical)) throw new Error('Missing llms.txt URL: ' + canonical);
  const html = read(path.join(route.slice(1), 'index.html'));
  if (!html.includes('rel="canonical"') || !html.includes(canonical)) throw new Error('Missing canonical: ' + canonical);
}
if (!robots.includes('Sitemap: https://qctcommerce.com/sitemap-index.xml')) throw new Error('robots.txt missing sitemap index');
console.log('PASS: 3 marketplace service URLs present in sitemap, llms.txt and canonical HTML.');
