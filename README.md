# QCT Commerce Türkiye

QCT Commerce Türkiye için Astro tabanlı, tek dilli (`tr`) statik site projesi.

Site; Türkiye’deki KOBİ, üretici, perakendeci ve e-ticaret markalarına yönelik e-ticaret ve dijital büyüme hizmetlerini Türkçe sunar. Tasarım sistemi, responsive davranışlar, erişilebilirlik ve animasyonlar Astro bileşenleri içinde korunur.

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

- Tek site dili ve belge dili: `tr`
- Dil önekli rota yoktur; sayfalar kök rotalarda üretilir.
- Sitemap, `@astrojs/sitemap` ile derleme sırasında oluşturulur.
- Sayfa rotaları Türkçe ve kök seviyesindedir.
- Canonical, Open Graph ve sitemap tabanı `https://qctcommerce.com` adresidir.
- Yapılandırılmış veriler Türkiye pazarı ile doğrulanmış e-posta ve telefon bilgilerini kullanır.
- `npm run build`; içerik kalıntısı, metadata, HTML, JSON-LD ve iç bağlantı denetimlerini birlikte çalıştırır.
