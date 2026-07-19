import fs from 'node:fs';

const source = fs.readFileSync('src/i18n/seo.ts', 'utf8');
const entryPattern = /title:\s*'([^']+)',\s*\r?\n\s*description:\s*'([^']+)'/g;
const entries = [...source.matchAll(entryPattern)].map((match) => ({
  title: match[1],
  description: match[2],
}));

const expectedEntries = 64;
const errors = [];

if (entries.length !== expectedEntries) {
  errors.push(`Expected ${expectedEntries} indexed metadata entries, found ${entries.length}.`);
}

for (const [index, entry] of entries.entries()) {
  if (entry.title.length < 30 || entry.title.length > 65) {
    errors.push(`Entry ${index + 1}: title length ${entry.title.length} is outside 30–65 characters: ${entry.title}`);
  }

  if (entry.description.length < 100 || entry.description.length > 165) {
    errors.push(`Entry ${index + 1}: description length ${entry.description.length} is outside 100–165 characters: ${entry.description}`);
  }
}

const duplicateTitles = entries
  .map((entry) => entry.title)
  .filter((title, index, titles) => titles.indexOf(title) !== index);

if (duplicateTitles.length) {
  errors.push(`Duplicate titles: ${[...new Set(duplicateTitles)].join(' | ')}`);
}

console.log(`Metadata audit: ${entries.length} entries checked.`);

if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  const titleLengths = entries.map((entry) => entry.title.length);
  const descriptionLengths = entries.map((entry) => entry.description.length);
  console.log(`Titles: ${Math.min(...titleLengths)}–${Math.max(...titleLengths)} characters.`);
  console.log(`Descriptions: ${Math.min(...descriptionLengths)}–${Math.max(...descriptionLengths)} characters.`);
  console.log('Metadata audit passed.');
}
