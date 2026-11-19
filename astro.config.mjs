// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { trMarkets, programmaticServices, trServicePath, enServicePath } from './src/data/programmatic-markets.ts';
import { isProgrammaticLocationServiceIndexable } from './src/data/location-indexation.mjs';

const discoveryOnlyUrls = new Set(
  trMarkets.flatMap((market) => programmaticServices.flatMap((service) =>
    isProgrammaticLocationServiceIndexable(market.id, service.trSlug)
      ? []
      : [trServicePath(market.id, service), enServicePath(market.alternateId, service)],
  )),
);

// deployment sync 2026-09-28
// https://astro.build/config
export default defineConfig({
  site: 'https://qctcommerce.com',
  integrations: [sitemap({
    filter: (page) => !discoveryOnlyUrls.has(new URL(page).pathname),
  })],
});
