import type { SeoPage } from '../i18n/seo';

export interface BlogSection {
  heading: string;
  paragraphs: string[];
  items?: string[];
}

export interface BlogArticle {
  slug: string;
  seoKey: SeoPage;
  title: string;
  excerpt: string;
  published: string;
  modified: string;
  intro: string;
  summary: string[];
  sections: BlogSection[];
  relatedService: { label: string; href: string };
}

export const articles: BlogArticle[] = [
  {
    slug: 'shopify-magaza-kurma-rehberi',
    seoKey: 'blog-shopify',
    title: 'Türkiye’de Shopify mağazası kurmadan önce planlanması gerekenler',
    excerpt: 'Platform kararından ödeme ve kargoya, ürün mimarisinden ölçüme kadar satışa hazır bir mağaza için temel hazırlık adımları.',
    published: '2026-05-05',
    modified: '2026-07-19',
    intro: 'Shopify mağazası kurmak tema seçip ürün yüklemekten ibaret değildir. Türkiye’de satış yapacak bir işletmenin platform uygunluğunu, ödeme ve kargo koşullarını, ürün yapısını, yasal metinlerini, mobil deneyimini ve operasyon kapasitesini birlikte planlaması gerekir.',
    summary: [
      'Önce Shopify’ın iş modelinize uygun olup olmadığını değerlendirin.',
      'Ürün, kategori, ödeme, teslimat ve iade akışlarını tasarımdan önce netleştirin.',
      'Mobil alışverişi ve gerçek sipariş senaryolarını yayından önce test edin.',
      'Analytics, reklam ve arama ölçümünü yalnızca gerekli izin ve doğru olay planıyla kurun.',
    ],
    sections: [
      {
        heading: 'Shopify kimler için uygundur?',
        paragraphs: [
          'Shopify; teknik bakım yükünü azaltmak, ürün ve sipariş yönetimini tek panelde toplamak ve hazır bir e-ticaret ekosisteminden yararlanmak isteyen işletmeler için değerlendirilebilir. Ancak platform seçimi yalnızca kullanım kolaylığına göre yapılmamalıdır.',
          'Ürün sayısı, varyant yapısı, entegrasyon ihtiyacı, satış yapılan ülkeler, ekip yetkinliği ve toplam işletme maliyeti kararı etkiler. Özel iş akışları veya farklı veri bağlantıları gerekiyorsa bunların uygulama ve API koşulları proje başında doğrulanmalıdır.',
        ],
        items: [
          'Standart ürün ve sipariş akışına sahip markalar',
          'Teknik sunucu yönetimiyle uğraşmak istemeyen ekipler',
          'Mobil öncelikli, yönetilebilir bir mağaza isteyen işletmeler',
          'Entegrasyon gereksinimlerini önceden tanımlayabilen operasyonlar',
        ],
      },
      {
        heading: 'Ürün ve kategori yapısı nasıl hazırlanır?',
        paragraphs: [
          'Müşteri mağazaya geldiğinde ürünleri işletmenin iç organizasyonuna göre değil, kendi ihtiyacına göre arar. Kategori, filtre ve koleksiyon yapısı gerçek satın alma sorularını karşılamalıdır.',
          'Her ürün sayfasında ürünün ne olduğu, kimler için uygun olduğu, varyantları, ölçü veya teknik bilgileri, teslimat ve iade koşulları açıkça yer almalıdır. Sabit bir kelime sayısı yerine karar vermek için gereken bilginin eksiksiz ve okunabilir olması önemlidir.',
        ],
        items: [
          'Tutarlı ürün adları ve varyant seçenekleri',
          'Karşılaştırmayı kolaylaştıran kategori ve filtreler',
          'Gerçek ürünü doğru gösteren optimize görseller',
          'Stok, teslimat ve iade bilgisinin görünür sunumu',
        ],
      },
      {
        heading: 'Türkiye’de ödeme ve kargo kurulurken ne kontrol edilir?',
        paragraphs: [
          'Ödeme kuruluşlarının Shopify uyumluluğu, sözleşme koşulları, desteklediği para birimleri ve teknik kurulum biçimi doğrudan ilgili sağlayıcıdan doğrulanmalıdır. Komisyon veya onay süresi gibi değişken bilgiler tahminle planlanmamalıdır.',
          'Kargo tarafında desi hesabı, teslimat bölgeleri, ücretsiz kargo koşulu, takip bilgisinin müşteriye iletilmesi ve iade süreci birlikte ele alınmalıdır. Mağazada verilen teslimat sözü, gerçek operasyon kapasitesiyle uyumlu olmalıdır.',
        ],
      },
      {
        heading: 'Yayın öncesi hangi testler yapılır?',
        paragraphs: [
          'Yayın kararı yalnızca ana sayfanın görünümüne bakılarak verilmemelidir. Farklı cihazlarda ürün bulma, varyant seçme, sepete ekleme, indirim uygulama, ödeme, sipariş bildirimi ve iptal/iade iletişimi uçtan uca test edilmelidir.',
          'Arama motoru taranabilirliği, canonical adresler, sitemap, yapılandırılmış veri ve sayfa performansı da kontrol edilmelidir. Analytics kullanılacaksa isteğe bağlı izleme kodları kullanıcı onayından önce çalışmamalıdır.',
        ],
        items: [
          'Mobil ve masaüstü satın alma akışı',
          'Başarılı ve başarısız ödeme senaryoları',
          'Sipariş e-postaları ve operasyon bildirimleri',
          '404, yönlendirme, canonical ve indeksleme kontrolleri',
        ],
      },
      {
        heading: 'Süre ve bütçe neden sabit değildir?',
        paragraphs: [
          'Kurulum süresi ve bütçesi ürün sayısı, içerik hazırlığı, tema kapsamı, veri taşıma, entegrasyon ve test gereksinimlerine göre değişir. Bu nedenle işletme incelenmeden kesin teslim süresi veya fiyat vermek sağlıklı değildir.',
          'İyi bir başlangıç kapsamı; zorunlu satış akışını, sonraki faza bırakılabilecek geliştirmeleri ve yayın için kabul kriterlerini ayrı ayrı tanımlar.',
        ],
      },
    ],
    relatedService: { label: 'E-ticaret altyapısı hizmetini inceleyin', href: '/e-ticaret/' },
  },
  {
    slug: 'e-ticarette-yapilan-hatalar',
    seoKey: 'blog-mistakes',
    title: 'E-ticaret sitesinde satış sürecini zorlaştıran temel hatalar',
    excerpt: 'Hedef kitle, ürün bilgisi, mobil deneyim, ödeme ve ölçüm tarafında sık görülen sorunları sistemli biçimde değerlendirin.',
    published: '2026-05-05',
    modified: '2026-07-19',
    intro: 'E-ticaret sitesindeki sorunlar çoğu zaman tek bir kötü butondan kaynaklanmaz. Belirsiz teklif, eksik ürün bilgisi, zor mobil kullanım, güven vermeyen ödeme akışı ve ölçüm eksikliği birlikte satış sürecini zayıflatır.',
    summary: [
      'Mağaza herkese değil, belirli bir müşteri ihtiyacına açıkça hitap etmelidir.',
      'Ürün sayfası müşterinin karar sorularını eksiksiz yanıtlamalıdır.',
      'Mobil deneyim gerçek cihazlarda ve gerçek görevlerle test edilmelidir.',
      'Trafik, sepete ekleme ve satın alma adımları doğru ölçülmeden sorun kaynağı anlaşılamaz.',
    ],
    sections: [
      {
        heading: '1. Teklif ve hedef kitleyi belirsiz bırakmak',
        paragraphs: [
          'Ziyaretçi mağazanın ne sattığını görebilir; fakat ürünün neden kendisi için uygun olduğunu anlayamayabilir. Ana sayfa, kategori ve reklam mesajları aynı müşteri problemi etrafında tutarlı değilse ilgi dağılır.',
          'Hedef kitle çalışması yalnızca yaş veya konum listesi değildir. Satın alma nedeni, karar engelleri, kullanım bağlamı ve alternatifler anlaşılmalıdır. Bu bilgi ürün anlatımını, görsel dili ve kanal seçimini belirler.',
        ],
      },
      {
        heading: '2. Ürün sayfasını katalog kaydı gibi hazırlamak',
        paragraphs: [
          'Sadece ürün adı, fiyat ve birkaç görsel çoğu kategoride yeterli değildir. Müşteri ürünü fiziksel olarak inceleyemediği için ölçü, malzeme, uyumluluk, kullanım, bakım, teslimat ve iade gibi karar bilgilerini sayfada arar.',
          'Ürün açıklaması ikna edici sıfatlarla doldurulmamalı; doğrulanabilir özellikleri, kullanım sınırlarını ve müşterinin bekleyebileceği deneyimi açıkça anlatmalıdır.',
        ],
        items: [
          'Ürünün temel işlevi ve kullanım alanı',
          'Varyant, ölçü ve teknik özellikler',
          'Teslimat, iade ve destek bilgileri',
          'Erişilebilir görseller ve açıklayıcı alternatif metinler',
        ],
      },
      {
        heading: '3. Mobil akışı yalnızca görünüm olarak kontrol etmek',
        paragraphs: [
          'Responsive görünmek, mobilde kolay kullanılmakla aynı şey değildir. Müşterinin filtre açması, varyant seçmesi, sepete ürün eklemesi ve ödeme alanlarını doldurması gerçek cihazlarda denenmelidir.',
          'Küçük dokunma alanları, ekranı kaplayan sabit öğeler, yatay taşma ve ağır görseller satın alma görevini zorlaştırır. Performans ile kullanılabilirlik birlikte değerlendirilmelidir.',
        ],
      },
      {
        heading: '4. Ödeme ve teslimat bilgisini sona saklamak',
        paragraphs: [
          'Müşteri toplam maliyeti, teslimat biçimini veya iade koşulunu ancak ödeme adımında öğrenirse güven kaybı yaşayabilir. Temel koşullar ürün ve sepet sayfalarında anlaşılır biçimde sunulmalıdır.',
          'Gereksiz alanlar azaltılmalı, hata mesajları neyin düzeltilmesi gerektiğini söylemeli ve ödeme başarısız olduğunda kullanıcı çıkmaza girmemelidir.',
        ],
      },
      {
        heading: '5. Ölçüm olmadan tasarım veya reklam değiştirmek',
        paragraphs: [
          'Satış düşüklüğünün kaynağı trafik kalitesi, ürün bilgisi, fiyat, stok, teknik hata veya ödeme sürtünmesi olabilir. Doğru olay ölçümü olmadan yapılan değişiklikler sorunu çözmek yerine yeni belirsizlik yaratır.',
          'Ölçüm planı sayfa görüntülemenin ötesine geçmeli; ürün görüntüleme, sepete ekleme, ödeme başlangıcı, satın alma ve iletişim tıklamaları gibi iş açısından anlamlı adımları kapsamalıdır. İsteğe bağlı analytics yalnızca kullanıcı izniyle çalışmalıdır.',
        ],
      },
      {
        heading: 'Hatalar hangi sırayla düzeltilir?',
        paragraphs: [
          'Önce çalışmayı engelleyen teknik sorunlar, ardından müşterinin kararını durduran bilgi ve kullanım sorunları ele alınmalıdır. Reklam bütçesini artırmak, bozuk bir ürün veya ödeme akışını telafi etmez.',
          'En doğru öncelik işletmenin verisi, müşteri geri bildirimleri ve operasyon kapasitesi birlikte incelenerek belirlenir.',
        ],
      },
    ],
    relatedService: { label: 'E-ticaret altyapısı yaklaşımımızı inceleyin', href: '/e-ticaret/' },
  },
  {
    slug: 'pazaryerinden-kendi-sitene-gecis',
    seoKey: 'blog-marketplace',
    title: 'Pazaryeri satışından kendi e-ticaret kanalına kontrollü geçiş',
    excerpt: 'Pazaryerini aniden bırakmadan, kendi mağazanızı ikinci ve yönetilebilir bir satış kanalı olarak nasıl planlayabileceğinizi öğrenin.',
    published: '2026-05-07',
    modified: '2026-07-19',
    intro: 'Kendi e-ticaret sitesini kurmak pazaryerini hemen kapatmak anlamına gelmez. Sağlıklı yaklaşım; pazaryerini müşteri edinme kanallarından biri olarak korurken marka deneyimi, içerik, ölçüm ve tekrar satın alma altyapısı üzerinde daha fazla kontrol sağlayan doğrudan satış kanalını aşamalı kurmaktır.',
    summary: [
      'Pazaryeri ve kendi mağazanız rakip değil, farklı görevleri olan kanallar olabilir.',
      'Komisyonu tek başına değil; ödeme, reklam, operasyon ve teknoloji maliyetleriyle birlikte karşılaştırın.',
      'Müşteri verisini izin, aydınlatma ve ilgili mevzuat çerçevesinde yönetin.',
      'Ürün, stok, fiyat ve sipariş akışlarını taşımadan önce operasyon planı oluşturun.',
    ],
    sections: [
      {
        heading: 'Kendi e-ticaret sitesi ne zaman gerekir?',
        paragraphs: [
          'Marka ürünlerini daha ayrıntılı anlatmak, kategori ve kampanya deneyimini kontrol etmek, farklı trafik kaynaklarını ölçmek veya tekrar satın alma iletişimini izinli biçimde yönetmek istediğinde kendi mağazası anlamlı hale gelir.',
          'Bununla birlikte yeni kanal; içerik, müşteri desteği, ödeme, kargo, iade, güvenlik ve teknik bakım sorumluluğu getirir. Ekip bu sorumlulukları karşılayamıyorsa geçiş kapsamı dar tutulmalıdır.',
        ],
      },
      {
        heading: 'Maliyet karşılaştırması nasıl yapılır?',
        paragraphs: [
          'Pazaryeri komisyon oranını ödeme kuruluşu maliyetiyle doğrudan karşılaştırmak eksik sonuç verir. Kendi mağazasında platform, tema veya geliştirme, uygulama, reklam, içerik, destek ve operasyon giderleri de bulunabilir.',
          'Karşılaştırma sipariş başına katkı, müşteri edinme maliyeti, iade etkisi, tekrar satın alma ve ekibin iş yükü üzerinden yapılmalıdır. Oranlar kategoriye ve sözleşmeye göre değiştiği için güncel koşullar ilgili sağlayıcılardan doğrulanmalıdır.',
        ],
      },
      {
        heading: 'Müşteri ve ölçüm verisi nasıl ele alınır?',
        paragraphs: [
          'Kendi mağazası müşteri yolculuğunu daha ayrıntılı ölçme olanağı verebilir; ancak bu, verinin sınırsız kullanılabileceği anlamına gelmez. Aydınlatma, gerekli izinler, veri minimizasyonu ve saklama süreçleri baştan planlanmalıdır.',
          'Analytics ve reklam etiketleri kullanıcı tercihine uygun yüklenmeli; e-posta veya WhatsApp iletişimi için gereken hukuki ve operasyonel koşullar ayrıca değerlendirilmelidir.',
        ],
      },
      {
        heading: 'Geçiş hangi adımlarla ilerler?',
        paragraphs: [
          'En düşük riskli yöntem, sınırlı bir ürün grubu ve açık başarı ölçütleriyle başlamaktır. Yeni mağaza gerçek siparişlerle doğrulandıktan sonra ürün kapsamı ve trafik yatırımı artırılabilir.',
        ],
        items: [
          'Ürün, stok ve fiyat verisinin kaynağını belirleyin.',
          'Kategori, ürün, teslimat ve iade içeriklerini hazırlayın.',
          'Ödeme, kargo ve sipariş bildirimlerini test edin.',
          'Pazaryeri ile mağaza arasındaki stok ve operasyon sorumluluğunu netleştirin.',
          'Organik, reklam ve doğrudan trafik için ayrı ölçüm planı kurun.',
        ],
      },
      {
        heading: 'Pazaryeri tamamen bırakılmalı mı?',
        paragraphs: [
          'Bu karar her işletme için aynı değildir. Pazaryeri yeni müşteri erişimi sağlayabilir; kendi mağazası ise marka anlatımı, içerik ve müşteri deneyimi üzerinde daha fazla kontrol sunabilir.',
          'Kanal bazında kârlılık, operasyon yükü ve müşteri davranışı ölçülmeden keskin bir geçiş yapmak yerine dengeli kanal stratejisi oluşturmak daha sağlıklıdır.',
        ],
      },
    ],
    relatedService: { label: 'E-ticaret altyapısı seçeneklerini inceleyin', href: '/e-ticaret/' },
  },
];

export function getArticle(slug: string): BlogArticle {
  const article = articles.find((item) => item.slug === slug);
  if (!article) throw new Error(`Blog article not found: ${slug}`);
  return article;
}
