import type { SeoPage } from '../i18n/seo';

export interface BlogSection { heading: string; paragraphs: string[]; items?: string[]; }
export interface BlogArticle {
  slug: string; seoKey: SeoPage; title: string; excerpt: string; published: string; modified: string;
  intro: string; summary: string[]; sections: BlogSection[]; relatedService: { label: string; href: string };
}

export const articles: BlogArticle[] = [
  {
    slug: 'shopify-magaza-kurma-rehberi', seoKey: 'blog-shopify',
    title: 'Türkiye’de Shopify mağazası kurmadan önce planlanması gerekenler',
    excerpt: 'Platform kararından ödeme ve kargoya, ürün mimarisinden ölçüme kadar satışa hazır bir mağaza için temel hazırlık adımları.',
    published: '2026-05-05', modified: '2026-07-19',
    intro: 'Shopify mağazası kurmak tema seçip ürün yüklemekten ibaret değildir. Türkiye’de satış yapacak bir işletmenin platform uygunluğunu, ödeme ve kargo koşullarını, ürün yapısını, yasal metinlerini, mobil deneyimini ve operasyon kapasitesini birlikte planlaması gerekir.',
    summary: ['Shopify’ın iş modelinize uygunluğunu değerlendirin.','Ürün, kategori, ödeme ve teslimat akışlarını tasarımdan önce netleştirin.','Mobil alışverişi gerçek sipariş senaryolarıyla test edin.','Analytics ve reklam ölçümünü izinli ve doğru olay planıyla kurun.'],
    sections: [
      { heading: 'Shopify kimler için uygundur?', paragraphs: ['Shopify; teknik bakım yükünü azaltmak, ürün ve sipariş yönetimini tek panelde toplamak isteyen işletmeler için güçlü bir seçenek olabilir. Platform kararı ürün sayısı, varyant yapısı, entegrasyonlar, hedef ülkeler ve toplam işletme maliyetiyle birlikte verilmelidir.'] },
      { heading: 'Ürün ve kategori yapısı nasıl hazırlanır?', paragraphs: ['Kategori, filtre ve koleksiyon yapısı işletmenin iç stok mantığına değil müşterinin arama biçimine göre kurulmalıdır. Ürün sayfası ölçü, malzeme, kullanım, teslimat ve iade gibi karar bilgilerini açıkça sunmalıdır.'] },
      { heading: 'Ödeme, kargo ve yayın testleri', paragraphs: ['Ödeme kuruluşu uyumluluğu ve kargo koşulları doğrudan sağlayıcılardan doğrulanmalıdır. Yayından önce mobil ve masaüstü satın alma, başarısız ödeme, sipariş bildirimi, yönlendirme, canonical ve indeksleme senaryoları test edilmelidir.'] },
    ], relatedService: { label: 'E-ticaret altyapısı hizmetini inceleyin', href: '/e-ticaret/' },
  },
  {
    slug: 'e-ticarette-yapilan-hatalar', seoKey: 'blog-mistakes',
    title: 'E-ticaret sitesinde satış sürecini zorlaştıran temel hatalar',
    excerpt: 'Hedef kitle, ürün bilgisi, mobil deneyim, ödeme ve ölçüm tarafında sık görülen sorunları sistemli biçimde değerlendirin.',
    published: '2026-05-22', modified: '2026-07-11',
    intro: 'E-ticaret sitesindeki sorunlar çoğu zaman tek bir kötü butondan kaynaklanmaz. Belirsiz teklif, eksik ürün bilgisi, zor mobil kullanım, güven vermeyen ödeme akışı ve ölçüm eksikliği birlikte satış sürecini zayıflatır.',
    summary: ['Teklif belirli bir müşteri ihtiyacına açıkça hitap etmelidir.','Ürün sayfası karar sorularını yanıtlamalıdır.','Mobil akış gerçek cihazlarda test edilmelidir.','Dönüşüm adımları doğru ölçülmelidir.'],
    sections: [
      { heading: 'Belirsiz hedef kitle ve zayıf ürün anlatımı', paragraphs: ['Ana sayfa, kategori ve reklam mesajları aynı müşteri problemi etrafında tutarlı değilse ilgi dağılır. Sadece ürün adı, fiyat ve birkaç görsel de çoğu kategoride karar vermek için yeterli değildir.'] },
      { heading: 'Mobil ve ödeme sürtünmesi', paragraphs: ['Responsive görünmek, mobilde kolay kullanılmakla aynı şey değildir. Filtre, varyant, sepet ve ödeme görevleri gerçek cihazlarda denenmeli; teslimat ve toplam maliyet bilgisi son adıma saklanmamalıdır.'] },
      { heading: 'Ölçüm olmadan değişiklik yapmak', paragraphs: ['Satış düşüklüğünün kaynağı trafik, ürün bilgisi, stok, teknik hata veya ödeme sürtünmesi olabilir. Ürün görüntüleme, sepete ekleme, ödeme başlangıcı ve satın alma ölçülmeden yapılan değişiklikler yeni belirsizlik üretir.'] },
    ], relatedService: { label: 'E-ticaret yaklaşımımızı inceleyin', href: '/e-ticaret/' },
  },
  {
    slug: 'pazaryerinden-kendi-sitene-gecis', seoKey: 'blog-marketplace',
    title: 'Pazaryeri satışından kendi e-ticaret kanalına kontrollü geçiş',
    excerpt: 'Pazaryerini aniden bırakmadan, kendi mağazanızı ikinci ve yönetilebilir bir satış kanalı olarak nasıl planlayabileceğinizi öğrenin.',
    published: '2026-06-12', modified: '2026-07-03',
    intro: 'Kendi e-ticaret sitesini kurmak pazaryerini hemen kapatmak anlamına gelmez. Sağlıklı yaklaşım, pazaryerini müşteri edinme kanalı olarak korurken doğrudan satış kanalını aşamalı kurmaktır.',
    summary: ['Kanallara farklı görevler verin.','Maliyetleri bütün olarak karşılaştırın.','Müşteri verisini izinli yönetin.','Ürün, stok ve sipariş akışını önceden planlayın.'],
    sections: [
      { heading: 'Kendi mağazası ne zaman anlamlıdır?', paragraphs: ['Marka ürünleri daha ayrıntılı anlatmak, deneyimi kontrol etmek, trafik kaynaklarını ölçmek veya tekrar satın almayı yönetmek istediğinde kendi mağazası anlamlı hale gelir.'] },
      { heading: 'Maliyet ve operasyon karşılaştırması', paragraphs: ['Komisyon tek başına karşılaştırma ölçütü değildir. Platform, ödeme, reklam, içerik, destek, iade ve ekip iş yükü sipariş başına katkıyla birlikte değerlendirilmelidir.'] },
      { heading: 'Düşük riskli geçiş planı', paragraphs: ['Sınırlı ürün grubu ve açık başarı ölçütleriyle başlayın. Ödeme, kargo, stok ve sipariş bildirimleri gerçek işlemlerle doğrulandıktan sonra ürün kapsamını ve trafik yatırımını artırın.'] },
    ], relatedService: { label: 'E-ticaret altyapısı seçeneklerini inceleyin', href: '/e-ticaret/' },
  },
  {
    slug: 'ai-overviews-geo-aio-seo-rehberi', seoKey: 'blog-ai-search',
    title: 'Google AI Overviews, GEO ve AIO: 2026 arama görünürlüğü rehberi',
    excerpt: 'Yapay zekâ destekli aramada markanızın anlaşılması, kaynak gösterilmesi ve klasik SEO görünürlüğünün korunması için uygulanabilir yol haritası.',
    published: '2026-07-08', modified: '2026-07-20',
    intro: 'Google’ın yapay zekâ destekli arama deneyimleri Türkiye’de yaygınlaşırken görünürlük artık yalnızca belirli bir anahtar kelimede sıralama almaktan ibaret değil. Sayfanın açık bir soruyu yanıtlaması, doğrulanabilir varlık bilgileri sunması ve hem kullanıcı hem makine için anlaşılır bir yapı kurması gerekiyor.',
    summary: ['Teknik SEO temelini GEO ve AIO çalışmasının önünde tutun.','Her sayfada tek bir arama niyetini açık ve kanıtlanabilir biçimde yanıtlayın.','Organization, Service, Product, FAQ ve Article verilerini görünür içerikle uyumlu kullanın.','Marka, uzmanlık ve kaynak sinyallerini site genelinde tutarlı hale getirin.'],
    sections: [
      { heading: 'SEO, GEO, AEO ve AIO arasındaki fark nedir?', paragraphs: ['SEO taranabilirlik, indekslenebilirlik ve organik sıralama temelidir. AEO doğrudan cevap üretmeye, GEO üretken arama sistemlerinin içeriği bağlamlandırmasına, AIO ise yapay zekâ destekli keşif ortamlarında markanın bütünsel görünürlüğüne odaklanır. Bunlar birbirinin alternatifi değil aynı bilgi mimarisinin katmanlarıdır.'] },
      { heading: 'AI Overviews için içerik nasıl hazırlanır?', paragraphs: ['Başlığı gerçek kullanıcı sorusuna yaklaştırın; ilk bölümde kısa ve net cevap verin; ardından koşulları, istisnaları ve uygulama adımlarını açıklayın. Belirsiz pazarlama cümleleri yerine ölçülebilir özellikler, süreçler ve doğrulanabilir örnekler kullanın.'], items: ['Açık soru-cevap başlıkları','Kısa cevap ve ayrıntılı açıklama dengesi','Uzman veya kurum kimliği','Güncel yayın ve değişiklik tarihi','İlgili hizmet ve içeriklere bağlamsal iç bağlantılar'] },
      { heading: 'Yapılandırılmış veri tek başına yeterli mi?', paragraphs: ['Hayır. Schema işaretlemesi görünür içerikte bulunmayan iddiaları telafi etmez. Yapılandırılmış veri, kullanıcıya gösterilen başlık, açıklama, yazar, tarih, hizmet ve SSS içeriğiyle birebir uyumlu olmalıdır.'] },
      { heading: 'Başarı nasıl ölçülür?', paragraphs: ['Klasik tıklama ve sıralama verilerine ek olarak markalı aramalar, uzun kuyruklu sorgular, Search Console görünürlük değişimleri, nitelikli form veya WhatsApp talepleri ve içeriklerin satış sürecinde kullanımını birlikte değerlendirin.'] },
    ], relatedService: { label: 'SEO, GEO, AEO ve AIO hizmetini inceleyin', href: '/seo-geo/' },
  },
  {
    slug: 'yapay-zeka-ile-urun-aciklamasi-hazirlama', seoKey: 'blog-ai-product-content',
    title: 'Yapay zekâ ile ürün açıklaması hazırlama: SEO ve satış için doğru yöntem',
    excerpt: 'AI ile hızlı ürün içeriği üretirken benzer metin, yanlış bilgi ve zayıf dönüşüm risklerini azaltan ürün veri ve editör kontrol sistemi.',
    published: '2026-07-13', modified: '2026-07-20',
    intro: 'Yapay zekâ ürün açıklamalarını hızlandırabilir; fakat ham çıktıyı yüzlerce ürüne kopyalamak yanlış özellik, birbirine benzeyen sayfalar ve güven kaybı yaratabilir. Sağlıklı yöntem, önce ürün verisini yapılandırmak ve yapay zekâyı kontrollü bir içerik üretim katmanı olarak kullanmaktır.',
    summary: ['Önce ürün verisinin doğruluk kaynağını belirleyin.','Her kategori için ayrı içerik şablonu oluşturun.','AI çıktısını insan editör ve ürün sorumlusu kontrolünden geçirin.','Açıklamayı arama niyeti, karar bilgisi ve marka diliyle birlikte optimize edin.'],
    sections: [
      { heading: 'Yapay zekâya hangi ürün verileri verilmeli?', paragraphs: ['Ürün adı, model, malzeme, ölçü, uyumluluk, kullanım alanı, bakım, teslimat ve garanti gibi alanlar yapılandırılmış olmalıdır. Eksik veri varsa modelden tahmin etmesi değil eksik alanı işaretlemesi istenmelidir.'] },
      { heading: 'İyi ürün açıklaması hangi bölümlerden oluşur?', paragraphs: ['Kısa değer önerisi, temel özellikler, kullanım senaryosu, teknik detaylar, teslimat veya iade koşulları ve sık sorular karar sırasına göre sunulmalıdır. Metin yalnızca anahtar kelime tekrarı için uzatılmamalıdır.'], items: ['Ürünün ne olduğu ve kime uygun olduğu','Ayırt edici ve doğrulanabilir özellikler','Ölçü, malzeme ve uyumluluk bilgileri','Kullanım, bakım ve güvenlik notları','Teslimat, iade ve destek bağlantıları'] },
      { heading: 'Benzer içerik riski nasıl azaltılır?', paragraphs: ['Aynı şablonun kelimelerini değiştirerek çoğaltmak yerine varyantlar arasındaki gerçek farkları veri alanlarından üretin. Kategori sayfası genel ihtiyacı, ürün sayfası ise spesifik seçimi yanıtlamalıdır.'] },
      { heading: 'Yayın öncesi kontrol listesi', paragraphs: ['Ürün sorumlusu teknik doğruluğu, editör okunabilirliği, SEO sorumlusu başlık ve iç bağlantıları, e-ticaret ekibi ise mobil görünüm ve dönüşüm öğelerini kontrol etmelidir.'] },
    ], relatedService: { label: 'E-ticaret içerik ve ürün mimarisini inceleyin', href: '/e-ticaret/' },
  },
  {
    slug: 'whatsapp-satis-otomasyonu-rehberi', seoKey: 'blog-whatsapp-automation',
    title: 'WhatsApp satış otomasyonu nasıl kurulur? B2B işletmeler için rehber',
    excerpt: 'Reklam ve web taleplerini kaybetmeden karşılamak, doğru ekibe yönlendirmek ve insan kontrollü takip kurmak için WhatsApp satış sistemi.',
    published: '2026-07-18', modified: '2026-07-20',
    intro: 'WhatsApp satış otomasyonu müşteriye durmadan bot mesajı göndermek değildir. Doğru sistem, ilk talebi bağlamıyla toplar, temel soruları yanıtlar, nitelikli fırsatı doğru kişiye aktarır ve satış ekibinin takibini görünür hale getirir.',
    summary: ['Otomasyondan önce talep türlerini ve ekip sorumluluklarını tanımlayın.','Web ve reklam kaynak bilgisini WhatsApp konuşmasına taşıyın.','Botun sınırlarını ve insana devir kurallarını açıkça belirleyin.','İzin, veri minimizasyonu ve performans ölçümünü baştan planlayın.'],
    sections: [
      { heading: 'WhatsApp satış otomasyonu hangi problemi çözer?', paragraphs: ['Yoğun talep dönemlerinde geç cevap, eksik bilgi, yanlış kişiye yönlendirme ve takip unutulması satış kaybına dönüşür. Otomasyon bu tekrar eden ilk adımları standartlaştırır; fiyat, teklif ve istisna kararlarını ise insanda bırakır.'] },
      { heading: 'Temel akış nasıl tasarlanır?', paragraphs: ['Kaynak, ürün veya hizmet ilgisi, şirket bilgisi, şehir, miktar ve zamanlama gibi gerçekten gerekli alanlar kısa adımlarla toplanmalıdır. Kullanıcı her aşamada temsilciye geçebilmelidir.'], items: ['Karşılama ve açık amaç bildirimi','Talep kategorisi seçimi','Gerekli minimum bilgilerin toplanması','Öncelik ve ekip yönlendirmesi','İnsan devri ve takip kaydı'] },
      { heading: 'Web sitesi ve reklamlarla nasıl bağlanır?', paragraphs: ['Her kampanya ve hizmet sayfası farklı başlangıç mesajı veya kaynak etiketi taşıyabilir. Böylece ekip müşterinin hangi tekliften geldiğini konuşma başlamadan görür ve aynı soruları tekrar sormaz.'] },
      { heading: 'Hangi metrikler izlenmeli?', paragraphs: ['İlk yanıt süresi, insan devrine kadar geçen süre, nitelikli talep oranı, teklif oluşturma, satışa dönüşüm ve yanıtsız kalan konuşmalar düzenli izlenmelidir. Mesaj sayısı tek başına başarı ölçütü değildir.'] },
    ], relatedService: { label: 'WhatsApp satış sistemleri hizmetini inceleyin', href: '/whatsapp-satis/' },
  },
];

export function getArticle(slug: string): BlogArticle {
  const article = articles.find((item) => item.slug === slug);
  if (!article) throw new Error(`Blog article not found: ${slug}`);
  return article;
}
