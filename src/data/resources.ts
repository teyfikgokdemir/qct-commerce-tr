import { guideEditorial } from './guide-editorial';
export type Resource = {
  slug: string; title: string; description: string; intro: string; answer: string;
  sections: Array<{ heading: string; text: string; points?: string[] }>;
  example: { title: string; text: string }; faqs: Array<{ q: string; a: string }>;
  related: Array<{ label: string; href: string }>; service: { label: string; href: string };
  table?: { caption: string; headers: string[]; rows: string[][] };
  sources?: Array<{ label: string; href: string }>;
  cta?: { title: string; text: string };
  published?: string; modified?: string;
};

// First publication is verified by commit 56e43e6 (2026-10-05).
export const resources: Resource[] = Object.entries(guideEditorial).map(([slug, editorial]) => ({
  slug, ...editorial, intro: editorial.description, published: '2026-10-05', modified: '2026-10-05',
}));
export const getResource = (slug: string) => resources.find(resource => resource.slug === slug);

export const sectors = [
  ['dis-klinigi-web-sitesi', 'Diş Kliniği Web Sitesi', 'Tedavi sayfaları, hekim profilleri, randevu akışı ve yerel görünürlük ile hasta karar sürecini destekleyen web sitesi yaklaşımı.', ['Tedaviler ve hekimler', 'Randevu talebi ve WhatsApp', 'Yerel SEO ve güven içerikleri'], 'Tedavi bazlı bilgi mimarisi, hekim deneyimi, sık sorulan sorular ve mobil randevu akışı birlikte tasarlanır.'],
  ['avukat-hukuk-web-sitesi', 'Hukuk / Avukat Web Sitesi', 'Uzmanlık alanını net anlatan, güven oluşturan ve mesleki iletişim sınırlarına uygun hukuk web sitesi yaklaşımı.', ['Uzmanlık alanları', 'Ekip ve yayınlar', 'Güvenli iletişim akışı'], 'Hizmet alanları ayrı, anlaşılır sayfalarda anlatılır; iddialı sonuç vaatleri yerine çalışma yaklaşımı ve iletişim yolu öne çıkar.'],
  ['lojistik-firmasi-web-sitesi', 'Lojistik Firması Web Sitesi', 'Hatlar, taşıma türleri, sektör deneyimi ve teklif toplama akışını birleştiren B2B lojistik sitesi yaklaşımı.', ['Hizmet ve taşıma türleri', 'Sektörel çözümler', 'Teklif formu ve CRM'], 'Karar vericinin rotayı, kapasiteyi ve sonraki adımı hızlı anlaması için hizmet mimarisi ve teklif akışı birlikte kurulur.'],
  ['ihracat-firmasi-web-sitesi', 'İhracat Firması Web Sitesi', 'Pazar, ürün grubu ve üretim yetkinliğini çok dilli B2B yapı ile anlatan ihracat sitesi yaklaşımı.', ['Çok dil ve pazar sayfaları', 'Ürün/katalog yapısı', 'Talep toplama'], 'Yerel çeviri yerine hedef pazarın karar bilgileri, teknik dokümanlar ve doğru talep yönlendirmesi planlanır.'],
  ['emlak-web-sitesi', 'Emlak Web Sitesi', 'Portföy keşfi, filtreleme, güven sinyalleri ve görüşme talebini birlikte ele alan emlak sitesi yaklaşımı.', ['Portföy ve filtreler', 'Bölge içerikleri', 'Görüşme talebi'], 'İlan verisi, fotoğraf performansı ve mobil görüşme talebi aynı kullanıcı yolculuğu içinde değerlendirilir.'],
  ['restoran-web-sitesi', 'Restoran Web Sitesi', 'Menü, konum, rezervasyon ve paket servis bilgilerini hızlı karar ekranında buluşturan restoran sitesi yaklaşımı.', ['Menü ve alerjen bilgisi', 'Rezervasyon', 'Konum ve yerel görünürlük'], 'Kullanıcı ilk ekranda mutfağı, konumu ve rezervasyon/paket servis yolunu anlayabilmelidir.'],
  ['guzellik-merkezi-web-sitesi', 'Güzellik Merkezi Web Sitesi', 'Hizmetler, uzmanlar, seans bilgisi ve randevu akışını güven odaklı sunan güzellik merkezi sitesi yaklaşımı.', ['Hizmet sayfaları', 'Ön görüşme/randevu', 'Yerel SEO'], 'Hizmet kapsamı, uzmanlık ve randevu bilgisi şeffaf sunulur; sonuç iddiaları yerine bilgilendirme ve güven öne çıkar.'],
  ['uretici-sanayi-firmasi-web-sitesi', 'Üretici / Sanayi Firması Web Sitesi', 'Kapasite, kalite, ürün teknik bilgisi ve B2B teklif toplama ihtiyacı için üretici web sitesi yaklaşımı.', ['Ürün ve teknik doküman', 'Kapasite ve kalite', 'Bayi/teklif akışı'], 'Satış ekibinin tekrar eden teknik sorularını azaltacak ürün bilgisi ve talep sınıflandırması planlanır.'],
] as const;
