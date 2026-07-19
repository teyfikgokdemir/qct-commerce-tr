export type SeoPage =
  | 'home'
  | 'about'
  | 'services'
  | 'website-design'
  | 'e-commerce'
  | 'ai-automation'
  | 'seo-performance'
  | 'whatsapp-commerce'
  | 'meta-ads'
  | 'careers'
  | 'contact'
  | 'blog'
  | 'blog-shopify'
  | 'blog-mistakes'
  | 'blog-marketplace';

interface SeoEntry { title: string; description: string; }

const seo: Record<SeoPage, SeoEntry> = {
  home: {
    title: 'QCT Commerce — E-ticaret ve Dijital Büyüme',
    description: 'QCT Commerce, Türkiye’de işletmelerin e-ticaret, web, reklam, arama ve WhatsApp altyapılarını satış odaklı bir sisteme dönüştürür.',
  },
  about: {
    title: 'Hakkımızda — QCT Commerce Türkiye',
    description: 'QCT Commerce’ın Türkiye’deki KOBİ, üretici, perakendeci ve e-ticaret markaları için dijital büyümeye nasıl yaklaştığını keşfedin.',
  },
  services: {
    title: 'E-ticaret ve Dijital Büyüme Hizmetleri',
    description: 'E-ticaret altyapısı, web tasarım, WhatsApp satış, SEO, GEO, AEO, AIO, Meta reklamları ve yapay zekâ otomasyonu hizmetlerini inceleyin.',
  },
  'website-design': {
    title: 'Satış Odaklı Web Tasarım — QCT Commerce',
    description: 'Türkiye’deki işletmeler için teklifinizi açık anlatan, mobil öncelikli, hızlı ve müşteri iletişimini destekleyen web siteleri tasarlıyoruz.',
  },
  'e-commerce': {
    title: 'E-ticaret Altyapısı ve Mağaza Geliştirme',
    description: 'Ürün keşfi, mobil alışveriş, sepet, ödeme ve mağaza yönetimini birlikte planlayan satış odaklı e-ticaret altyapıları kuruyoruz.',
  },
  'ai-automation': {
    title: 'Yapay Zekâ Otomasyonları — QCT Commerce',
    description: 'Talep yönlendirme, veri işleme ve ekip devri gibi tekrarlayan süreçleri azaltan, insan kontrollü yapay zekâ otomasyonları kuruyoruz.',
  },
  'seo-performance': {
    title: 'SEO, GEO, AEO ve AIO Hizmetleri',
    description: 'İşletmenizin Google ve yapay zekâ destekli yanıt sistemlerinde doğru bağlamla bulunması için teknik ve içerik altyapısını geliştiriyoruz.',
  },
  'whatsapp-commerce': {
    title: 'WhatsApp Satış Sistemleri — QCT Commerce',
    description: 'Web sitesi, ürün sayfaları ve reklamları bağlamlı, takip edilebilir ve ekip kontrolündeki WhatsApp satış görüşmelerine bağlıyoruz.',
  },
  'meta-ads': {
    title: 'Meta Reklamları ve Dönüşüm Landing Page',
    description: 'Meta reklamlarını, reklam vaadiyle eşleşen mobil landing page, net CTA ve doğru dönüşüm ölçümüyle birlikte planlıyor ve kuruyoruz.',
  },
  careers: {
    title: 'Kariyer ve İş Birliği — QCT Commerce',
    description: 'QCT Commerce kariyer duyurularını, çalışma ilkelerini ve genel iş birliği başvuruları için paylaşmanız gereken bilgileri inceleyin.',
  },
  contact: {
    title: 'İletişim — QCT Commerce Türkiye',
    description: 'E-ticaret veya dijital büyüme projenizi anlatmak için QCT Commerce’a e-posta, telefon ya da WhatsApp üzerinden ulaşın.',
  },
  blog: {
    title: 'E-ticaret ve Dijital Büyüme Blogu',
    description: 'Türkiye’de e-ticaret altyapısı, Shopify, pazaryeri stratejisi, dönüşüm ve dijital satış sistemleri için uygulamaya dönük rehberler.',
  },
  'blog-shopify': {
    title: 'Shopify Mağaza Kurma Rehberi — Türkiye',
    description: 'Türkiye’de Shopify mağazası kurmadan önce ürün yapısı, ödeme, kargo, mobil deneyim, ölçüm ve operasyon için planlanması gereken adımlar.',
  },
  'blog-mistakes': {
    title: 'E-ticaret Sitesinde Sık Yapılan Hatalar',
    description: 'Ürün sayfası, mobil deneyim, ödeme akışı, ölçüm ve içerik yapısında e-ticaret satışını zorlaştıran temel hataları ve çözüm yollarını inceleyin.',
  },
  'blog-marketplace': {
    title: 'Pazaryerinden Kendi E-ticaret Sitenize Geçiş',
    description: 'Pazaryeri satışlarını kesmeden kendi e-ticaret kanalınızı kurmak için veri, operasyon, maliyet, marka deneyimi ve geçiş planını değerlendirin.',
  },
};

export function getPageSeo(page: SeoPage): SeoEntry {
  return seo[page];
}
