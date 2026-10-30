# QCT Commerce

Astro tabanlı, Cloudflare Pages üzerinde yayınlanan çok dilli QCT Commerce dijital ticaret ve hizmet sitesi.

## Mimari ve yayınlanan diller

| Dil | Ana sayfa | Kapsam |
| --- | --- | --- |
| Türkçe | https://qctcommerce.com/ | Genel hizmetler, rehberler, araçlar, pazaryeri ve lokasyon sayfaları |
| English | https://qctcommerce.com/en/ | Hizmet, blog, iletişim ve lokasyon içerikleri |
| Azərbaycanca | https://qctcommerce.com/az/ | Yerelleştirilmiş temel hizmet, blog ve ticari sayfalar |

Tek site ve tek alan adı kullanılır. Gerçek eşdeğer sayfalar için reciprocal `hreflang` ve self-canonical URL'ler üretilir. Her sayfanın tüm dillerde karşılığı **olmak zorunda değildir**. Özellikle pazaryeri / Amazon kurulum sayfaları şu anda yalnızca Türkçedir. TR/EN lokasyon sayfaları Azerbaycan dilindeki sayfalarla yapay olarak çoğaltılmaz.

Mevcut sayfalar `src/pages`, bileşenler `src/components`, dil eşdeğerleri `src/data/locale-parity.js` ve `src/data/locale-routing.js` içinde yönetilir. `src/layouts/BaseLayout.astro` canonical, hreflang, OG ve ana JSON-LD şemalarını üretir.

## Yerel geliştirme

Node.js `22.23.4` (CI ile aynı sürüm) ve npm önerilir.

```bash
npm ci
npm run dev
npm run build
npm run check:locales
npm run check:performance
npm run check:analytics
npm test
```

Statik çıktı `dist/` klasörüne oluşturulur. `npm run build` içerik, metadata, üretilmiş HTML, yönlendirme, dil eşliği ve AI keşif dosyalarının bütünlük kontrollerini çalıştırır. `npm test` tarayıcı regresyon testlerini içerir; Chromium kurulumu gerekebilir.

## Cloudflare Pages ve CI

- Framework: `Astro`
- Build: `npm run build`
- Output: `dist`
- Root: `/`
- Node: `22.23.4`
- GitHub Actions: `.github/workflows/ci.yml`, `deploy.yml`, `production-verify.yml` ve güvenlik denetimi.
- Production deploy Cloudflare Pages'in GitHub entegrasyonu üzerinden gerçekleşir. CI, deploy ve canlı doğrulama **ayrı** adımlardır.

## Keşif, SEO ve GEO

- `public/robots.txt` ve Astro sitemap: https://qctcommerce.com/sitemap-index.xml
- Özet: https://qctcommerce.com/llms.txt
- Ayrıntılı kaynak: https://qctcommerce.com/llms-full.txt
- Uyumluluk manifestoları: `public/.well-known/ard.json`, `public/.well-known/ai-catalog.json`
- `scripts/audit-ai-discovery.mjs` kaynakların yayınlanan rotalarla ve birbirleriyle tutarlı olmasını denetler.
- `scripts/indexnow-submit.mjs` hedefli URL bildirimi için kullanılır; `--all` olmadan bütün sitemap'i göndermeyi reddeder.

`llms*.txt` ve özel manifestolar ek keşif kaynaklarıdır; Google sıralaması veya ChatGPT/Claude/Perplexity tarafından önerilme garantisi vermez. Öncelik: özgün hizmet içeriği, doğru ticari kapsam, taranabilir HTML ve ölçülebilir organik talep.

## Değişiklik güvenliği

Mevcut tasarım, hesaplayıcı, çok dilli deneyim, WhatsApp dönüşüm akışı ve analytics/çerez onayı korunmalıdır. Denetim talepleri düzenleme izni değildir. Değişiklikler dar kapsamlı branch + PR ile yapılır; merge/deploy yalnızca yetkilendirilmiş kapsamda gerçekleştirilir. Kurumsal kayıt, müşteri sayısı, fiziksel ofis, başarı oranı veya garanti iddiası doğrulanmadan eklenmez.
