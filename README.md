# QCT Studio — Astro site

## Durum (bu paketle birlikte)

**Ana sayfa (Header, Hero, Problem, Services, Process, Work, FinalCta, Contact, Footer): gerçek WP temasından birebir taşındı.**
- Tüm metinler, sınıf isimleri (`.qct-hero`, `.qct-signal-room`, `.qct-service-card` vb.) orijinal `qct-balkan-premium` temasıyla birebir aynı.
- CSS (`base.css`, `components.css`, `home.css`, `pages.css`, `services.css`, `animations.css`, `utilities.css`) ve JS (`main.js`, `animations.js`) dosyaları olduğu gibi `public/styles/` ve `public/scripts/` altına kopyalandı.
- Çoklu dil (EN/SQ/MK/SR) mevcut `src/i18n/` sözlük sistemi üzerinden çalışıyor — gerçek WP içeriğiyle eşleşen çeviriler zaten mevcuttu, üzerine dokunulmadı.
- `npm run build` ile 56 sayfa hatasız derleniyor, test edildi.

**İç sayfalar (About, Services detay, Contact, Careers, Legal sayfaları — `AboutPage.astro`, `ServicePage.astro`, `LegalPage.astro` vb.): henüz gerçek temaya taşınmadı.**
- Bu sayfalar `.qct-svc-*`, `.qct-btn` gibi WP temasında **var olmayan** sınıf isimleri kullanıyor — yani gerçek CSS'te bu sınıflar için stil tanımı yok, sayfalar büyük ölçüde stilsiz görünecek.
- Metin içerikleri makul/marka diline uygun görünüyor ama gerçek WP kaynağıyla birebir karşılaştırılmadı.
- Bu sayfaları ana sayfayla aynı yöntemle (gerçek `page-*.php` şablonlarından birebir taşıma) sıradaki adımda düzeltmemiz lazım.

## Nasıl kurulur
1. Bu klasörün tüm içeriğini mevcut `qct-studio` proje klasörünün üzerine kopyala (üzerine yazma / birleştirme).
2. `npm install`
3. `npm run dev` → `localhost:4321` üzerinde ana sayfayı kontrol et.
4. Sorunsuzsa `git add . && git commit -m "ana sayfa gerçek temaya taşındı" && git push`, Cloudflare otomatik deploy edecek.

## Sıradaki adım
İç sayfaları (`/about/`, `/services/`, `/contact/`, `/website-design/` vb.) aynı "gerçek PHP şablonundan birebir taşı" yöntemiyle sırayla düzeltmek — ana sayfada izlediğimiz yöntemin devamı.
