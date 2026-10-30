# QCT Commerce — multilingual digital commerce website

Astro 7.4.2 static website for QCT Commerce at https://qctcommerce.com.

- Supported locales: Turkish (`/`), English (`/en/`), Azerbaijani (`/az/`). Preserve the real TR/EN/AZ page mappings and reciprocal `hreflang` clusters; not all specialised marketplace pages have translations.
- Commercial scope: website development, e-commerce, digital sales systems, SEO/GEO/AEO/AIO and automation. Pricing and contractual terms must be taken from current published pages, never invented from manifest content.
- Deployment: Cloudflare Pages. `npm run build` runs content, metadata, output HTML, redirects and language-parity audits. `npm test` runs browser regressions.
- AI discovery resources: `/llms.txt`, `/llms-full.txt`, `/.well-known/ard.json`, `/.well-known/ai-catalog.json`. These are informational, not promises of AI indexing, ranking, recommendation or citation.
- Never fabricate office locations, customers, local presence, qualifications or verified outcomes for programmatic market pages.

## Gereksinimler

- Node.js 22.12 veya üzeri
- npm

## Yerel geliştirme

```bash
npm install
npm run dev
```

Üretim derlemesi ve proje denetimleri:

```bash
npm run build
```

Derleme çıktısı `dist/` klasörüne yazılır.

## Cloudflare Pages

Cloudflare Pages projesini bu repo ile bağlarken şu ayarları kullanın:

- Framework preset: `Astro`
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: `/`
- Node.js: `22.12` veya üzeri

Üretim alan adı `https://qctcommerce.com` olarak yapılandırılmıştır. Alan adını Cloudflare Pages projesine doğrulayıp bağladıktan sonra canonical URL’ler ve sitemap bu adresi kullanır.

## Mimari notlar

- TR root, EN `/en/`, AZ `/az/`; non-equivalent pages must not receive fabricated `hreflang` counterparts.
- Astro sitemap index (`/sitemap-index.xml`) and page-level canonical URLs use `https://qctcommerce.com`.
- The actual language parity maps are maintained in `src/data/locale-parity.js` and related routing code; use them instead of assuming URL slugs translate automatically.
- Core SEO and AI discoverability rely on visible accurate service content, structured data, sensible internal linking, indexability and technical verification. `llms*.txt` and well-known files complement but do not replace search engine signals.
- Read `AGENTS.md`, CI workflows, package scripts and current page sources before changes. Prefer focused branches and pull requests; preserve existing UX, calculators and analytics consent.
