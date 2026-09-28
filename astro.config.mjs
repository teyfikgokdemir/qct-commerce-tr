// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// deployment sync 2026-09-28
// https://astro.build/config
export default defineConfig({
  site: 'https://qctcommerce.com',
  integrations: [sitemap()],
});
