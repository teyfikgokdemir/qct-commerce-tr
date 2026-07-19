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
    if (parts.length !== 3) {
      errors.push(`Satır ${index + 1}: üç alan bekleniyor.`);
    }
    return { source: parts[0], target: parts[1], status: parts[2] };
  });

const sources = new Set();

for (const entry of entries) {
  if (!entry.source?.startsWith('/') || !entry.target?.startsWith('/')) {
    errors.push(`${entry.source}: kaynak ve hedef kökten başlayan yerel yollar olmalı.`);
  }
  if (entry.source?.includes('*') || entry.target?.includes('*')) {
    errors.push(`${entry.source}: wildcard yönlendirme kullanılmamalı.`);
  }
  if (entry.status !== '301') {
    errors.push(`${entry.source}: yalnızca 301 yönlendirme bekleniyor.`);
  }
  if (sources.has(entry.source)) {
    errors.push(`${entry.source}: yinelenen yönlendirme kaynağı.`);
  }
  sources.add(entry.source);
}

for (const entry of entries) {
  if (entry.source === entry.target || sources.has(entry.target)) {
    errors.push(`${entry.source}: yönlendirme zinciri veya loop riski (${entry.target}).`);
  }

  const target = decodeURIComponent(entry.target).replace(/^\/+/, '');
  const candidates = entry.target === '/'
    ? [path.join('dist', 'index.html')]
    : entry.target.endsWith('/')
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
  console.log(`Redirect audit: ${entries.length} güvenli 301 eşleşmesi; wildcard, zincir veya loop yok.`);
}
