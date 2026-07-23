export interface WorkFact {
  label: string;
  value: string;
}

export interface WorkItem {
  title: string;
  text: string;
}

export interface WorkCase {
  slug: 'headwear' | 'misima' | 'artman';
  name: string;
  eyebrow: string;
  title: string;
  summary: string;
  sector: string;
  liveUrl: string;
  liveLabel: string;
  image: {
    src: string;
    width: number;
    height: number;
    alt: string;
  };
  need: {
    title: string;
    text: string;
  };
  approach: {
    title: string;
    text: string;
  };
  work: WorkItem[];
  outputs: string[];
  facts: WorkFact[];
  outcome: {
    title: string;
    text: string;
  };
  services: Array<{ label: string; href: string }>;
}

export const workCases: WorkCase[] = [
  {
    slug: 'headwear',
    name: 'HEADWEAR',
    eyebrow: 'Çok dilli e-ticaret deneyimi',
    title: 'HEADWEAR için ürün keşfini ve mobil alışverişi birleştiren mağaza yapısı',
    summary: 'Odaklı ürün kataloğunu, çok dilli gezinmeyi ve mobil satın alma yolculuğunu aynı e-ticaret sistemi içinde düzenleyen çalışma.',
    sector: 'Performans ve outdoor ürünleri',
    liveUrl: 'https://www.head-wear.com/',
    liveLabel: 'HEADWEAR mağazasını ziyaret edin',
    image: {
      src: '/images/work/headwear/headwear-web-deneyimi.webp',
      width: 1600,
      height: 1000,
      alt: 'HEADWEAR e-ticaret sitesinin masaüstü ana sayfa görünümü',
    },
    need: {
      title: 'Odaklı bir ürün gamını farklı dillerde anlaşılır ve satın alınabilir kılmak',
      text: 'Ürün odaklı mağazada ziyaretçinin kullanım amacını hızla anlaması, seçenekleri incelemesi ve küçük ekranlarda satın alma adımına rahatça ilerlemesi gerekiyordu.',
    },
    approach: {
      title: 'Mağazayı müşterinin keşif ve karar verme biçimine göre yapılandırmak',
      text: 'Koleksiyonlar, ürün sayfaları, dil rotaları ve mobil eylemler tek bir alışveriş akışının parçaları olarak ele alındı.',
    },
    work: [
      { title: 'Mağaza ve katalog mimarisi', text: 'Koleksiyon ve ürün şablonları, ürün bilgisinden satın alma adımına doğrudan bir yol oluşturacak şekilde düzenlendi.' },
      { title: 'Çok dilli gezinme', text: 'Dil bazlı rotalar ve navigasyon, farklı pazarlardaki müşterilerin uygun mağaza sürümüne ulaşmasını destekleyecek biçimde kuruldu.' },
      { title: 'Mobil satın alma yolculuğu', text: 'Ürün, eylem ve sonraki adımın telefon ekranlarında açık kalmasına odaklanan arayüz yapısı oluşturuldu.' },
      { title: 'Teknik arama temeli', text: 'Taranabilir koleksiyon ve ürün sayfalarıyla mağaza yapısının arama sistemleri tarafından anlaşılması desteklendi.' },
    ],
    outputs: ['Canlı e-ticaret mağazası', 'Koleksiyon ve ürün sayfası şablonları', 'Çok dilli mağaza rotaları', 'Responsive alışveriş deneyimi'],
    facts: [
      { label: 'Proje türü', value: 'Çok dilli e-ticaret' },
      { label: 'Doğrulanan platform', value: 'Shopify' },
      { label: 'Durum', value: 'Canlı mağaza' },
    ],
    outcome: {
      title: 'Ürün, dil ve cihaz katmanlarını aynı ticaret deneyiminde buluşturan canlı mağaza',
      text: 'Yayındaki sistem; koleksiyon keşfi, ürün bilgisi, hesap, sepet ve satın alma eylemlerini masaüstü ve mobil görünümde erişilebilir bir yapıda sunuyor.',
    },
    services: [
      { label: 'E-ticaret altyapısı', href: '/e-ticaret/' },
      { label: 'Web tasarım', href: '/web-tasarim/' },
      { label: 'SEO, GEO, AEO ve AIO', href: '/seo-geo/' },
    ],
  },
  {
    slug: 'misima',
    name: 'Misima Group',
    eyebrow: 'Kurumsal ve B2B web deneyimi',
    title: 'Misima Group için hizmetleri, markaları ve ürünleri bir araya getiren kurumsal yapı',
    summary: 'QCT’nin 2025’te tamamladığı ilk proje; kozmetik grubunun farklı iş modellerini, marka hizmetlerini ve ürün keşfini anlaşılır bir kurumsal web deneyiminde birleştirdi.',
    sector: 'Kozmetik ve marka yönetimi',
    liveUrl: 'https://www.misima.com.tr/',
    liveLabel: 'Misima Group web sitesini ziyaret edin',
    image: {
      src: '/images/work/misima/misima-web-deneyimi.webp',
      width: 1600,
      height: 1000,
      alt: 'Misima Group kurumsal web sitesinin masaüstü ana sayfa görünümü',
    },
    need: {
      title: 'Birden fazla iş modelini parçalı görünmeden açıklamak',
      text: 'Marka sahipleri, dağıtım ortakları ve ürün alıcıları farklı sorularla siteye ulaşıyor. Grup yapısının, hizmetlerin, markaların ve ürünlerin birbirinden ayrılırken aynı kurumsal bütün içinde kalması gerekiyordu.',
    },
    approach: {
      title: 'Bilgi yapısını farklı ziyaretçi sorularına göre kurmak',
      text: 'Kurumsal anlatı, hizmet mimarisi, marka sunumu ve ürün keşfi; ziyaretçinin ihtiyacına göre ilerleyebileceği açık yollar halinde planlandı.',
    },
    work: [
      { title: 'Web stratejisi', text: 'İş modeli ve farklı hedef kitleler incelenerek sayfaların rolü ve içerik öncelikleri belirlendi.' },
      { title: 'Bilgi mimarisi', text: 'Private label, white label, özel üretim ve dağıtım gibi hizmetler kurumsal anlatı içinde ayrı ve anlaşılır yollara ayrıldı.' },
      { title: 'Arayüz tasarımı', text: 'Kurumsal güven, marka sunumu ve ürün keşfi arasında tutarlı bir görsel ve içerik düzeni oluşturuldu.' },
      { title: 'Web geliştirme', text: 'Kurumsal, hizmet, marka, ürün ve politika sayfalarını kapsayan responsive web deneyimi yayına alındı.' },
    ],
    outputs: ['Canlı kurumsal web sitesi', 'Hizmet ve içerik mimarisi', 'Marka ve ürün sunum sayfaları', 'Responsive arayüz sistemi'],
    facts: [
      { label: 'QCT başlangıcı', value: '2025' },
      { label: 'Portföy sırası', value: 'İlk proje' },
      { label: 'Çalışma kapsamı', value: 'Strateji, tasarım ve geliştirme' },
    ],
    outcome: {
      title: 'Karmaşık hizmet yapısını daha kolay incelenebilir hale getiren canlı web deneyimi',
      text: 'Yayındaki site; kurumsal bilgileri, hizmetleri, markaları ve öne çıkan ürünleri ayrı içerik yollarında sunarken grup anlatısını tek bir dijital çatı altında tutuyor.',
    },
    services: [
      { label: 'Web tasarım', href: '/web-tasarim/' },
      { label: 'SEO, GEO, AEO ve AIO', href: '/seo-geo/' },
      { label: 'Meta reklamları ve landing page', href: '/meta-reklamlari/' },
    ],
  },
  {
    slug: 'artman',
    name: 'Artman Group',
    eyebrow: 'Kurumsal ve B2B web deneyimi',
    title: 'Artman Group için geniş hizmet portföyünü düzenleyen kurumsal web yapısı',
    summary: 'Türkiye genelinde farklı kurumsal ihtiyaçlara yanıt veren geniş hizmet portföyünü, açık kategoriler ve iletişim yollarıyla anlaşılır hale getiren web çalışması.',
    sector: 'Kurumsal tedarik ve operasyon çözümleri',
    liveUrl: 'https://artmangroup.com.tr/',
    liveLabel: 'Artman Group web sitesini ziyaret edin',
    image: {
      src: '/images/work/artman/artman-web-deneyimi.webp',
      width: 1600,
      height: 1000,
      alt: 'Artman Group kurumsal web sitesinin masaüstü ana sayfa görünümü',
    },
    need: {
      title: 'Geniş bir hizmet portföyünü tek kurumsal anlatıda toplamak',
      text: 'Farklı satın alma süreçlerine hitap eden hizmetlerin, ziyaretçiyi yormadan anlaşılması ve Artman Group’un tek çözüm ortağı olarak merkezde kalması gerekiyordu.',
    },
    approach: {
      title: 'Operasyonel genişliği sade bir bilgi mimarisine dönüştürmek',
      text: 'İlgili hizmetler bulunabilir kategorilerde toplandı; şirket bilgileri, hizmet bağlamı ve iletişim yolları kurumsal güveni destekleyecek sırayla yerleştirildi.',
    },
    work: [
      { title: 'Hizmet mimarisi', text: 'Farklı çözümler, satın alma ekiplerinin doğru başlangıç noktasını bulabileceği açık kategorilerde düzenlendi.' },
      { title: 'Kurumsal anlatı', text: 'Şirket, çalışma alanları ve hizmet bağlamı; parçalı bir katalog yerine bütünlüklü bir tedarik yaklaşımı içinde sunuldu.' },
      { title: 'Eylem yolları', text: 'Hizmet keşfinden iletişime uzanan bağlantılar, ziyaretçinin sonraki adımı rahatça görebileceği biçimde yerleştirildi.' },
      { title: 'Arama için içerik yapısı', text: 'Ana hizmet alanları için açıklayıcı sayfa bağlamı ve taranabilir içerik yolları oluşturuldu.' },
    ],
    outputs: ['Canlı kurumsal web sitesi', 'Kategorize edilmiş hizmet yapısı', 'Kurumsal bilgi ve güven sayfaları', 'İletişime yönlenen kullanıcı yolları'],
    facts: [
      { label: 'Pazar', value: 'Türkiye' },
      { label: 'Proje türü', value: 'Kurumsal ve B2B web sitesi' },
      { label: 'Dijital kapsam', value: 'Bilgi mimarisi ve web deneyimi' },
    ],
    outcome: {
      title: 'Geniş portföyü tek kurumsal varlık altında sunan canlı dijital merkez',
      text: 'Yayındaki site, ziyaretçinin hizmet alanlarını ayrı yollar üzerinden incelemesine ve uygun iletişim adımına geçmesine imkân veren bir yapı sunuyor.',
    },
    services: [
      { label: 'Web tasarım', href: '/web-tasarim/' },
      { label: 'SEO, GEO, AEO ve AIO', href: '/seo-geo/' },
      { label: 'WhatsApp satış sistemleri', href: '/whatsapp-satis/' },
    ],
  },
];

export function getWorkCase(slug: WorkCase['slug']): WorkCase {
  const work = workCases.find((item) => item.slug === slug);
  if (!work) throw new Error(`Çalışma bulunamadı: ${slug}`);
  return work;
}
