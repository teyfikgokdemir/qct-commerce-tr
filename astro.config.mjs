// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://qctstudio.com',
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en-US', sq: 'sq-AL', mk: 'mk-MK', sr: 'sr-RS' },
      },
    }),
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'sq', 'mk', 'sr'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
