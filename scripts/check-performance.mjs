import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');

if (!fs.existsSync(dist)) {
  console.error('check:performance: dist/ bulunamadı. Önce npm run build çalıştırın.');
  process.exit(1);
}

const htmlFiles = [];
const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.isFile() && entry.name.endsWith('.html')) htmlFiles.push(full);
  }
};
walk(dist);

const failures = [];
const warnings = [];

const attrValues = (html, tag, attr) => {
  const tags = [...html.matchAll(new RegExp('<' + tag + '\\b[^>]*>', 'gi'))].map((m) => m[0]);
  return tags.map((value) => {
    const match = value.match(new RegExp('\\b' + attr + '=["\\\']([^"\\\']+)["\\\']', 'i'));
    return match?.[1] ?? null;
  }).filter(Boolean);
};

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  const rel = path.relative(dist, file).replaceAll('\\', '/');
  const styles = attrValues(html, 'link', 'href').filter((href) => /\.css(?:[?#]|$)/i.test(href));
  const scripts = attrValues(html, 'script', 'src');

  for (const [kind, values] of [['stylesheet', styles], ['script', scripts]]) {
    const duplicates = [...new Set(values.filter((value, index) => values.indexOf(value) !== index))];
    if (duplicates.length) failures.push(rel + ': duplicate ' + kind + ' reference(s): ' + duplicates.join(', '));
  }

  const gtagLoads = scripts.filter((src) => src.includes('googletagmanager.com/gtag/js')).length;
  if (gtagLoads > 1) failures.push(rel + ': duplicate GA4 loader detected.');

  if (/\/scripts\/animations\.js(?:[?#]|["'])/i.test(html)) {
    warnings.push(rel + ': legacy animations.js is still referenced.');
  }
}

const sizeChecks = [
  { dir: path.join(dist, '_astro'), ext: '.js', max: 180 * 1024, label: 'JS asset' },
  { dir: path.join(dist, '_astro'), ext: '.css', max: 280 * 1024, label: 'CSS asset' },
];

for (const check of sizeChecks) {
  if (!fs.existsSync(check.dir)) continue;
  for (const entry of fs.readdirSync(check.dir, { withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.endsWith(check.ext)) continue;
    const file = path.join(check.dir, entry.name);
    const size = fs.statSync(file).size;
    if (size > check.max) {
      failures.push(check.label + ' too large: ' + entry.name + ' (' + Math.round(size / 1024) + ' KB)');
    }
  }
}

if (warnings.length) {
  console.warn('Performance warnings:\n- ' + warnings.join('\n- '));
}
if (failures.length) {
  console.error('Performance checks failed:\n- ' + failures.join('\n- '));
  process.exit(1);
}

console.log('Performance checks passed for ' + htmlFiles.length + ' built HTML files.');
