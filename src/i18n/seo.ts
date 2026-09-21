export type SeoPage =
  | 'home' | 'about' | 'services' | 'website-design' | 'e-commerce' | 'ai-automation'
  | 'seo-performance' | 'whatsapp-commerce' | 'meta-ads' | 'careers' | 'contact' | 'blog'
  | 'blog-shopify' | 'blog-mistakes' | 'blog-marketplace' | 'blog-ai-search'
  | 'blog-ai-product-content' | 'blog-whatsapp-automation'
  | 'blog-google-not-visible' | 'blog-chatgpt-visibility' | 'blog-web-pricing-2026'
  | 'blog-ikas-shopify-2026' | 'blog-mobile-ecommerce-conversion'
  | 'work' | 'work-headwear' | 'work-misima' | 'work-artman';

interface SeoEntry { title: string; description: string; }

const seo: Record<SeoPage, SeoEntry> = {
  home: { title: 'QCT Commerce — Türkiye için Dijital Ticaret Sistemleri', description: 'E-ticaret, web, görünürlük ve yapay zekâ destekli büyüme altyapılarını satış odaklı tek sistemde kuruyoruz.' },
  about: { title: 'Hakkımızda — QCT Commerce Türkiye', description: 'QCT Commerce’ın Türkiye’deki KOBİ, üretici, perakendeci ve e-ticaret markaları için dijital büyümeye nasıl yaklaştığını keşfedin.' },
  services: { title: 'E-ticaret ve Dijital Büyüme Hizmetleri', description: 'E-ticaret altyapısı, web tasarım, WhatsApp satış, SEO, GEO, AEO, AIO, Meta reklamları ve yapay zekâ otomasyonu hizmetlerini inceleyin.' },
  'website-design': { title: 'Web Sitesi Yaptırma & Web Tasarım Fiyatları | QCT Commerce', description: 'Kurumsal ve kişisel web sitesi yaptırmak isteyenler için mobil uyumlu tasarım, site yenileme ve şeffaf fiyatlar. Başlangıç 6.900 TL.' },
  'e-commerce': { title: 'E-Ticaret Sitesi Kurma | Shopify, ikas, WooCommerce | QCT', description: 'Shopify, ikas, WooCommerce, Ticimax ve IdeaSoft ile e-ticaret sitesi kurma, mağaza yenileme, ürün girişi ve platform taşıma. Başlangıç 9.900 TL.' },
  'ai-automation': { title: 'B2B Yapay Zekâ Otomasyonları — QCT Commerce', description: 'Talep yönlendirme, veri işleme, özetleme ve ekip devri gibi tekrarlayan işleri azaltan insan kontrollü yapay zekâ otomasyonları kuruyoruz.' },
  'seo-performance': { title: 'SEO Hizmeti, GEO & AI Görünürlük | QCT Commerce', description: 'Mevcut siteniz için teknik SEO, GEO, AEO ve AI görünürlük analizi; Google, AI Overviews, ChatGPT, Gemini ve Perplexity odaklı iyileştirme planı. Başlangıç 3.900 TL.' },
  'whatsapp-commerce': { title: 'B2B WhatsApp Satış Sistemleri — QCT Commerce', description: 'Web, ürün sayfası ve reklamlardan gelen talepleri bağlamlı, ölçülebilir ve ekip kontrolündeki WhatsApp satış akışlarına dönüştürüyoruz.' },
  'meta-ads': { title: 'Meta Reklamları ve Landing Page — QCT Commerce', description: 'Meta reklamlarını teklif ile eşleşen mobil landing page, net CTA, WhatsApp veya form akışı ve doğru dönüşüm ölçümüyle birlikte kuruyoruz.' },
  careers: { title: 'Kariyer ve İş Birliği — QCT Commerce', description: 'QCT Commerce kariyer duyurularını, çalışma ilkelerini ve genel iş birliği başvuruları için paylaşmanız gereken bilgileri inceleyin.' },
  contact: { title: 'İletişim — QCT Commerce Türkiye', description: 'E-ticaret veya dijital büyüme projenizi anlatmak için QCT Commerce’a e-posta, telefon ya da WhatsApp üzerinden ulaşın.' },
  blog: { title: 'E-ticaret ve Dijital Büyüme Blogu', description: 'Türkiye’de e-ticaret altyapısı, Shopify, yapay zekâ araması, WhatsApp satış, dönüşüm ve dijital büyüme için uygulamaya dönük rehberler.' },
  'blog-shopify': { title: 'Shopify Mağaza Kurma Rehberi — Türkiye', description: 'Türkiye’de Shopify mağazası kurmadan önce ürün yapısı, ödeme, kargo, mobil deneyim, ölçüm ve operasyon için planlanması gereken adımlar.' },
  'blog-mistakes': { title: 'E-ticaret Sitesinde Sık Yapılan Hatalar', description: 'Ürün sayfası, mobil deneyim, ödeme akışı, ölçüm ve içerik yapısında e-ticaret satışını zorlaştıran temel hataları ve çözüm yollarını inceleyin.' },
  'blog-marketplace': { title: 'Pazaryerinden Kendi E-ticaret Sitenize Geçiş', description: 'Pazaryeri satışlarını kesmeden kendi e-ticaret kanalınızı kurmak için veri, operasyon, maliyet, marka deneyimi ve geçiş planını değerlendirin.' },
  'blog-ai-search': { title: 'Google AI Overviews, GEO ve AIO Rehberi 2026', description: 'Google AI Overviews, GEO, AEO ve AIO için içerik yapısı, schema, marka sinyalleri ve ölçüm adımlarını içeren güncel arama görünürlüğü rehberi.' },
  'blog-ai-product-content': { title: 'Yapay Zekâ ile Ürün Açıklaması Hazırlama', description: 'AI ile SEO ve satış odaklı ürün açıklaması üretirken veri doğruluğu, içerik şablonu, editör kontrolü ve benzer içerik riskini yönetin.' },
  'blog-whatsapp-automation': { title: 'WhatsApp Satış Otomasyonu Nasıl Kurulur?', description: 'B2B işletmeler için web ve reklam taleplerini toplayan, doğru ekibe yönlendiren ve insan kontrollü takip sağlayan WhatsApp satış otomasyonu rehberi.' },
  'blog-google-not-visible': { title: 'Web Sitem Google’da Neden Çıkmıyor? 2026 Kontrol Rehberi', description: 'Web siteniz Google’da görünmüyorsa indeksleme, Search Console, robots, canonical, içerik, yerel SEO ve teknik sorunları adım adım kontrol edin.' },
  'blog-chatgpt-visibility': { title: 'ChatGPT’de Firmam Nasıl Görünür? AI Görünürlük Rehberi', description: 'Firmanızın ChatGPT, Gemini ve diğer yapay zekâ sistemlerinde doğru anlaşılması için marka varlığı, içerik, schema, kaynak ve GEO/AEO adımlarını inceleyin.' },
  'blog-web-pricing-2026': { title: 'Web Sitesi Yaptırma Fiyatları 2026: Neye Göre Değişir?', description: 'Kurumsal web, e-ticaret, site yenileme ve SEO projelerinde fiyatı belirleyen kapsam, sayfa, ürün, entegrasyon ve bakım kalemlerini şeffaf biçimde öğrenin.' },
  'blog-ikas-shopify-2026': { title: 'ikas mı Shopify mı? Türkiye için 2026 Karşılaştırması', description: 'ikas ve Shopify’ı Türkiye pazarı için ödeme, entegrasyon, yönetim, uluslararası satış, SEO ve toplam sahip olma maliyeti açısından karşılaştırın.' },
  'blog-mobile-ecommerce-conversion': { title: 'Mobil E-Ticaret Sitesi Neden Satış Yapmıyor? 2026 Rehberi', description: 'Mobil e-ticaret dönüşümünü düşüren hız, menü, filtre, ürün sayfası, sepet ve ödeme sorunlarını tespit etmek için uygulamalı kontrol listesi.' },
  work: { title: 'Seçili Web ve E-ticaret Çalışmaları — QCT Commerce', description: 'QCT ekosistemi kapsamında gerçekleştirilen seçili web, e-ticaret ve dijital deneyim çalışmalarını doğrulanabilir kapsam ve çıktılarıyla inceleyin.' },
  'work-headwear': { title: 'HEADWEAR E-ticaret Vaka Çalışması — QCT Commerce', description: 'HEADWEAR için ürün keşfi, çok dilli mağaza yapısı, mobil alışveriş ve teknik arama temellerini birleştiren e-ticaret çalışmasını inceleyin.' },
  'work-misima': { title: 'Misima Group Web Vaka Çalışması — QCT Commerce', description: 'Misima Group için web stratejisi, bilgi mimarisi, arayüz tasarımı ve geliştirmeyi birleştiren kurumsal dijital deneyimi inceleyin.' },
  'work-artman': { title: 'Artman Group Web Vaka Çalışması — QCT Commerce', description: 'Artman Group’un geniş kurumsal hizmet portföyünü açık kategoriler, güven içeriği ve iletişim yollarıyla düzenleyen web çalışmasını inceleyin.' },
};

export function getPageSeo(page: SeoPage): SeoEntry { return seo[page]; }