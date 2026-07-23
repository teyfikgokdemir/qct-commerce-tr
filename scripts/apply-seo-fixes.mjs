import { readFile, writeFile } from 'node:fs/promises';

const layoutPath = new URL('../src/layouts/BaseLayout.astro', import.meta.url);
let source = await readFile(layoutPath, 'utf8');

const oldXDefault = `{alternates.length > 0 && <link rel="alternate" hreflang="x-default" href={new URL('/en/georgia/', SITE_URL).toString()} />}`;
const newXDefault = `{alternates.length > 0 && <link rel="alternate" hreflang="x-default" href={new URL(alternates.find((alternate) => alternate.lang === 'en' || alternate.lang === 'en-US')?.href ?? '/en/', SITE_URL).toString()} />}`;

if (source.includes(oldXDefault)) {
  source = source.replace(oldXDefault, newXDefault);
} else if (source.includes(`hreflang="x-default"`) && source.includes(`/en/georgia/`)) {
  throw new Error('Unexpected x-default implementation. Refusing an unsafe partial patch.');
}

const founderNeedle = `image: new URL('/images/teyfik-gokdemir-qct-commerce.webp', SITE_URL).toString(), knowsLanguage: ['Türkçe', 'İngilizce'],`;
const founderReplacement = `image: new URL('/images/teyfik-gokdemir-qct-commerce.webp', SITE_URL).toString(), sameAs: ['https://teyfikgokdemir.com/', 'https://www.linkedin.com/in/teyfik-g%C3%B6kdemir-0b1a9758'], knowsLanguage: ['Türkçe', 'İngilizce'],`;
if (source.includes(founderNeedle)) source = source.replace(founderNeedle, founderReplacement);

await writeFile(layoutPath, source, 'utf8');
console.log('Applied QCT Commerce SEO consistency fixes.');
