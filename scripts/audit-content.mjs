import fs from 'node:fs';
import path from 'node:path';

const roots = ['src', 'public'];
const extensions = new Set(['.astro', '.ts', '.js', '.mjs', '.json', '.txt', '.md', '.svg']);
const checks = [
  ['eski marka hesabı', /qctalbania/i],
  ['eski analytics kimliği', new RegExp(['G-GPH', 'PRQG328'].join(''), 'i')],
  ['yayınlanmayan vaka çalışması', /\bPhiaderm\b/i],
  ['fiziksel reklam hizmeti', /tabela|dijital baskı|araç kaplama|promosyon ürün|fiziksel reklam|\bsignage\b|vehicle wrap|promotional product|digital print/i],
  ['eski rota', /['"`]\/(?:about|services|website-design|e-commerce|whatsapp-commerce|seo-performance|meta-ads-landing-pages|ai-automation|careers|contact|privacy-policy|terms-conditions|cookie-policy|work)(?:\/|['"`])/i],
  ['kaldırılan öne çıkan rozeti', /sub-menu__badge|>\s*Öne çıkan\s*</i],
  ['bağlamsız genel CTA', /Projenizi konuşalım|İletişime geçin|Projenizi anlatın/i],
];
const errors = [];
let analyticsIdCount = 0;

function walk(target) {
  for (const entry of fs.readdirSync(target, { withFileTypes: true })) {
    const file = path.join(target, entry.name);
    if (entry.isDirectory()) { if (entry.name !== 'dist') walk(file); continue; }
    if (!extensions.has(path.extname(file))) continue;
    const source = fs.readFileSync(file, 'utf8');
    analyticsIdCount += source.match(/G-ZGC820MP20/g)?.length ?? 0;
    for (const [label, pattern] of checks) {
      if (pattern.test(source)) errors.push(`${file}: ${label}`);
    }
  }
}

for (const root of roots) walk(root);
if (analyticsIdCount !== 1) errors.push(`GA4 kimliği kaynaklarda tam bir kez bulunmalı; bulunan: ${analyticsIdCount}`);
if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log('İçerik kalıntısı denetimi geçti.');
}
