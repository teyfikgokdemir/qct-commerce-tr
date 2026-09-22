import fs from 'node:fs';
import path from 'node:path';

const redirectsFile = path.join('dist', '_redirects');
const errors = [];

if (!fs.existsSync(redirectsFile)) {
  console.error('dist/_redirects bulunamadı.');
  process.exit(1);
}

const entries = fs.readFileSync(redirectsFile, 'utf8')
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter((line) => line && !line.startsWith('#'))
  .map((line, index) => {
    const parts = line.split(/\s+/);
    if (parts.length !== 3) errors.push(`Satır ${index + 1}: üç alan bekleniyor.`);
    return { source: parts[0], target: parts[1], status: parts[2] };
  });

const sources = new Set();
const requiredWorkRedirects = new Map([
  ['/work/', '/calismalar/'],
  ['/work/headwear/', '/calismalar/headwear/'],
  ['/work/misima/', '/calismalar/misima/'],
  ['/work/artman/', '/calismalar/artman/'],
]);
const approvedWildcardRedirects = new Map([
  ['/products/*', '/e-ticaret/'],
  ['/pages/*', '/hizmetler/'],
  ['/collections/*', '/hizmetler/'],
  ['/policies/*', '/kullanim-kosullari/'],
  ['/blogs/*', '/blog/'],
  ['/en/products/*', '/en/ecommerce/'],
  ['/en/pages/*', '/en/'],
  ['/en/collections/*', '/en/'],
  ['/en/policies/*', '/en/terms/'],
  ['/en/blogs/*', '/en/blog/'],
]);

for (const entry of entries) {
  if (!entry.source?.startsWith('/') || !entry.target?.startsWith('/')) {
    errors.push(`${entry.source}: kaynak ve hedef kökten başlayan yerel yollar olmalı.`);
  }
  if (entry.source?.includes('*') || entry.target?.includes('*')) {
    const approvedTarget = approvedWildcardRedirects.get(entry.source);
    if (!approvedTarget || approvedTarget !== entry.target || entry.target.includes('*')) {
      errors.push(`${entry.source}: yalnızca onaylı eski URL ailelerinde hedefi sabit wildcard yönlendirme kullanılabilir.`);
    }
  }
  if (entry.status !== '301') errors.push(`${entry.source}: yalnızca 301 yönlendirme bekleniyor.`);
  if (sources.has(entry.source)) errors.push(`${entry.source}: yinelenen yönlendirme kaynağı.`);
  sources.add(entry.source);
}

for (const [source, target] of requiredWorkRedirects) {
  const entry = entries.find((candidate) => candidate.source === source);
  if (!entry || entry.target !== target || entry.status !== '301') {
    errors.push(`${source}: yayımlanan çalışma için beklenen birebir 301 bulunamadı (${target}).`);
  }
}

for (const [source, target] of approvedWildcardRedirects) {
  const entry = entries.find((candidate) => candidate.source === source);
  if (!entry || entry.target !== target || entry.status !== '301') {
    errors.push(`${source}: eski URL ailesi için beklenen güvenli wildcard 301 bulunamadı (${target}).`);
  }
}

if (entries.some((entry) => entry.source.includes('phiaderm') || entry.target.includes('phiaderm'))) {
  errors.push('Phiaderm yayımlanmadığı için çalışma yönlendirmesi bulunmamalı.');
}

for (const entry of entries) {
  const targetPathname = entry.target.split('#')[0] || '/';
  if (entry.source === targetPathname || sources.has(targetPathname)) {
    errors.push(`${entry.source}: yönlendirme zinciri veya loop riski (${entry.target}).`);
  }

  const target = decodeURIComponent(targetPathname).replace(/^\/+/, '');
  const candidates = targetPathname === '/'
    ? [path.join('dist', 'index.html')]
    : targetPathname.endsWith('/')
      ? [path.join('dist', target, 'index.html')]
      : [path.join('dist', target), path.join('dist', target, 'index.html')];

  if (!candidates.some((candidate) => fs.existsSync(candidate))) {
    errors.push(`${entry.source}: hedef build çıktısında bulunamadı (${entry.target}).`);
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Redirect audit: ${entries.length} güvenli 301 eşleşmesi; ${approvedWildcardRedirects.size} onaylı wildcard ailesi; zincir veya loop yok.`);
}
