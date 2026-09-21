import type { SeoPage } from '../i18n/seo';

export interface BlogSection { heading: string; paragraphs: string[]; items?: string[]; }
export interface BlogArticle {
  slug: string; seoKey: SeoPage; title: string; excerpt: string; published: string; modified: string;
  intro: string; summary: string[]; sections: BlogSection[]; relatedService: { label: string; href: string };
}

export const articles: BlogArticle[] = [
  {
    slug: 'pazaryeri-komisyon-oranlari-2026', seoKey: 'blog-marketplace-commission-2026',
    title: 'Pazaryeri komisyon oranları 2026: Trendyol, Hepsiburada, Amazon, n11 ve Pazarama’da kâr marjı nasıl korunur?',
    excerpt: 'Trendyol, Hepsiburada, Amazon Türkiye, n11, Pazarama ve ÇiçekSepeti’nde satış yaparken komisyon, hizmet bedeli, reklam, kargo ve iade maliyetlerinin gerçek kâr marjına etkisini hesaplayın.',
    published: '2026-09-22', modified: '2026-09-22',
    intro: '“Pazaryerinde çok satıyorum ama para kalmıyor” şikâyeti çoğu zaman yalnız komisyon oranından kaynaklanmaz. Komisyon, ek hizmet bedelleri, kampanya indirimi, reklam harcaması, kargo veya fulfillment, iade payı ve ürün maliyeti aynı sipariş üzerinde birleştiğinde ciro büyürken sipariş başına kalan katkı hızla daralabilir. Bu rehber; Trendyol, Hepsiburada, Amazon Türkiye, n11, Pazarama ve ÇiçekSepeti gibi popüler kanalları değerlendirirken hangi rakamlara bakılması gerektiğini açıklar.',
    summary: [
      'Pazaryeri komisyonunu tek başına değil, tüm sipariş maliyetleriyle birlikte hesaplayın.',
      'Trendyol, Hepsiburada, Pazarama ve diğer platformlarda güncel oranı kategori ve satıcı koşullarına göre panelden doğrulayın.',
      'Amazon Türkiye’de resmi satış komisyonları kategoriye göre genel olarak %6 ile %20 arasında değişiyor.',
      'n11’de komisyona ek pazarlama ve pazaryeri hizmet bedelleri bulunabildiği için toplam kesinti komisyon oranından daha yüksek olabilir.',
      'Pazaryerlerini kapatmak yerine kendi e-ticaret sitenizi ikinci bir satış kanalı olarak kurmak, müşteri ilişkisi ve marj kontrolünü güçlendirebilir.'
    ],
    sections: [
      { heading: '2026’da pazaryeri komisyonları neden daha kritik?', paragraphs: ['Türkiye Cumhuriyeti Ticaret Bakanlığı’nın 2025 e-ticaret görünümü verilerine göre Türkiye’nin e-ticaret hacmi 4,57 trilyon TL’yi aştı ve e-ticaret faaliyeti yürüten işletme sayısı 634 bini geçti. Büyüyen pazar daha fazla satış fırsatı yaratırken fiyat rekabetini, reklam maliyetini ve kampanya baskısını da artırıyor. Bu nedenle satıcı için asıl soru “hangi pazaryeri daha çok satış getiriyor?” kadar “hangi kanalda sipariş başına ne kadar para kalıyor?” olmalıdır.'] },
      { heading: 'Trendyol komisyon oranı 2026 kaç?', paragraphs: ['Trendyol’da komisyon oranı kategori, alt kategori, dönemsel kampanya ve satıcı koşullarına göre değişebilir. Bu nedenle internette tek bir “Trendyol komisyon oranı” rakamına güvenmek yerine Satıcı Paneli’ndeki güncel oranı esas alın. Kârlılık hesabında yalnız komisyonu değil kampanya katılımı, reklam bütçesi, kargo, iade ve varsa diğer hizmet bedellerini de aynı sipariş üzerinde değerlendirin.'], items: ['Giyim ve moda gibi yoğun rekabetli kategorilerde kampanya ve reklam baskısını ayrıca hesaplayın.','Ürün fiyatını kampanyaya göre düşürdüğünüzde komisyon tutarı düşse bile ürün maliyeti ve birçok operasyon maliyeti aynı kalabilir.','“Ciro arttı” ile “katkı marjı arttı” aynı şey değildir.'] },
      { heading: 'Hepsiburada komisyon oranları nasıl değerlendirilir?', paragraphs: ['Hepsiburada’da da satıcı maliyeti ürün kategorisi, sözleşme koşulları, kampanya, lojistik ve ek hizmetlere göre değişebilir. Güncel oran için satıcı paneli ve platformun resmi ticari koşulları kaynak kabul edilmelidir. Hepsiburada, Trendyol veya başka bir pazaryerini karşılaştırırken aynı ürün için yalnız komisyon yüzdesini değil, sipariş başına toplam kesintiyi ve ödeme vadesini birlikte karşılaştırın.'] },
      { heading: 'Amazon Türkiye komisyon oranları 2026', paragraphs: ['Amazon Türkiye’nin resmi ücretlendirme sayfasında satış komisyonlarının kategoriye göre genel olarak %6 ile %20 arasında değiştiği belirtiliyor. Örneğin giyim kategorisi %15,5; bilgisayar %7; elektronik %9,5; ayakkabı, çanta ve ilgili aksesuarlar %17 seviyesinde listeleniyor. Bazı kategorilerde ürün fiyatına göre kademeli oran uygulanabiliyor. Amazon ayrıca lojistik modeli ve bazı programlara bağlı ek maliyetlerin oluşabileceğini açıkça belirtiyor.'], items: ['Amazon Türkiye resmi kaynak: satis.amazon.com.tr/ucretlendirme','Komisyon toplam satış fiyatı üzerinden hesaplanabilir; ürün kategorisini doğru eşleştirmek önemlidir.','FBA veya başka lojistik modellerinde komisyon dışında fulfillment ve depolama maliyetlerini ayrıca hesaplayın.'] },
      { heading: 'n11 komisyon ve hizmet bedelleri nasıl çalışıyor?', paragraphs: ['n11’in resmi Mağaza Destek Merkezi güncel komisyon oranlarını kategori bazında yayınlıyor. Bazı alt kategorilerde %18 gibi komisyon oranları görülürken, komisyon dışında pazarlama hizmet bedeli ve pazaryeri hizmet bedeli de uygulanabiliyor. n11’in resmi açıklamasına göre çoğu kategoride pazarlama hizmet bedeli ürün bedelinin %1’i + KDV, pazaryeri hizmet bedeli ise sipariş başına %0,67 + KDV olarak tahsil edilebiliyor. Bu nedenle “komisyon %18” demek, toplam kesintinin yalnızca %18 olduğu anlamına gelmeyebilir.'], items: ['n11 resmi kaynak: magazadestek.n11.com/s/komisyon-oranlari','Ek hizmet bedelleri ve KDV etkisini sipariş bazında ayrı satırlarla takip edin.','Yeni satıcı kampanyaları veya dönemsel indirimler kalıcı oran gibi kabul edilmemelidir.'] },
      { heading: 'Pazarama ve ÇiçekSepeti komisyonları için neye bakılmalı?', paragraphs: ['Pazarama ve ÇiçekSepeti gibi kanallarda da oranlar kategori ve ticari koşula göre değişebildiği için sabit bir internet listesini karar kaynağı yapmak doğru değildir. Satıcı panelindeki güncel komisyon, ödeme vadesi, kargo modeli, kampanya şartları ve ek hizmet bedellerini tek tabloda toplayın. Özellikle düşük fiyatlı ürünlerde sabit operasyon maliyetlerinin sipariş marjına etkisi yüzdesel olarak daha yüksek olabilir.'] },
      { heading: 'Pazaryerinde gerçek kâr marjı nasıl hesaplanır?', paragraphs: ['Muhasebe anlamındaki net kâr ile sipariş bazlı katkı marjını birbirinden ayırın. Operasyonel karar için basit başlangıç formülü şu olabilir: sipariş tahsilatı eksi ürün maliyeti, pazaryeri komisyon ve hizmet bedelleri, kargo/fulfillment, reklama düşen sipariş payı, beklenen iade/iptal payı ve siparişe bağlı diğer maliyetler. Geriye kalan tutar sabit giderler ve vergiler öncesi sipariş katkısını gösterir.'], items: ['Sipariş katkısı = satış geliri − ürün maliyeti − pazaryeri kesintileri − lojistik − reklam payı − iade/iptal payı − siparişe bağlı diğer giderler','Katkı marjı (%) = sipariş katkısı / satış geliri × 100','Her SKU için ayrı hesap yapmak, mağaza ortalamasından daha doğru karar verir.'] },
      { heading: '1.000 TL’lik siparişte komisyon neden tek başına yeterli değildir?', paragraphs: ['Tamamen örnek bir senaryoda 1.000 TL satış yapan bir üründe ürün maliyeti 520 TL, toplam pazaryeri ve hizmet kesintileri 180 TL, kargo/fulfillment 70 TL, reklama düşen pay 50 TL ve iade riskine ayrılan karşılık 30 TL ise sabit gider ve vergiler öncesi sipariş katkısı 150 TL kalır. Aynı üründe kampanya nedeniyle satış fiyatı 900 TL’ye düştüğünde birçok maliyet aynı kaldığı için katkı çok daha hızlı eriyebilir. Bu örnek herhangi bir platformun resmi oranını temsil etmez; amaç neden yalnız komisyon yüzdesine bakılmaması gerektiğini göstermektir.'] },
      { heading: 'En düşük komisyonlu pazaryeri hangisi?', paragraphs: ['Tek bir cevap yoktur. En düşük görünen komisyon, kargo, reklam, hizmet bedeli, ödeme vadesi veya yüksek iade oranı nedeniyle toplamda daha pahalı bir kanal olabilir. Aynı SKU için Trendyol, Hepsiburada, Amazon Türkiye, n11, Pazarama ve varsa diğer kanallarda “sipariş başına net katkı” karşılaştırması yapın. Kararı platform adı değil, ürün bazlı ekonomi vermelidir.'] },
      { heading: 'Pazaryerinden çıkmak mı, kendi e-ticaret sitesini kurmak mı?', paragraphs: ['Çoğu işletme için doğru karar pazaryerini tamamen bırakmak değildir. Pazaryerleri hazır trafik ve hızlı ürün keşfi sağlar; kendi e-ticaret sitesi ise marka deneyimi, müşteri ilişkisi, ürün sunumu, tekrar satış, SEO, Google ve yapay zekâ aramalarında görünürlük gibi alanlarda daha fazla kontrol sağlar. Sağlıklı model, pazaryerini müşteri edinme kanalı; kendi sitenizi ise uzun vadeli marka ve doğrudan satış kanalı olarak birlikte yönetmektir.'] },
      { heading: 'Kendi siteniz pazaryerinden daha kârlı olur mu?', paragraphs: ['Olabilir, fakat otomatik olarak değil. Kendi sitenizde pazaryeri komisyonu azalabilir veya ortadan kalkabilir; buna karşılık ödeme kuruluşu komisyonu, altyapı/lisans, reklam, kargo, yazılım, içerik ve operasyon maliyetleri vardır. Avantaj, bu maliyetleri ve müşteri deneyimini daha doğrudan yönetebilmenizdir. Bu yüzden “komisyonsuz satış” yerine “toplam edinme ve sipariş maliyeti daha kontrollü satış” hedeflenmelidir.'] },
      { heading: 'Pazaryeri kârlılığı için 2026 kontrol listesi', paragraphs: ['Her ay mağaza cirosundan önce SKU bazlı katkı tablosunu kontrol edin. Özellikle kampanya dönemlerinde fiyat indirimi, reklam ve kargo teşvikleri aynı anda değişebildiği için geçen ayın marjıyla karar vermeyin.'], items: ['Her ürün için güncel komisyon oranı','Pazarlama/pazaryeri hizmet bedelleri','Kargo veya fulfillment maliyeti','Reklam harcamasının sipariş başına payı','İade ve iptal oranı','Kampanya indirim maliyeti','Ürün ve paketleme maliyeti','Ödeme vadesi ve nakit akışı','Kendi sitenizdeki aynı ürünün toplam edinme maliyeti'] },
      { heading: 'Güncel oranları nereden doğrulamalısınız?', paragraphs: ['Komisyonlar ve kampanya koşulları değişebildiği için güncel oranı her zaman ilgili platformun resmi satıcı panelinden veya resmi yardım/ücretlendirme sayfasından doğrulayın. Bu rehber 22 Eylül 2026 tarihinde resmi Amazon Türkiye, n11 ve T.C. Ticaret Bakanlığı kaynakları kontrol edilerek hazırlanmıştır.'], items: ['T.C. Ticaret Bakanlığı — Türkiye’de E-Ticaretin Görünümü Raporu 2025','Amazon Türkiye — satis.amazon.com.tr/ucretlendirme','n11 Mağaza Destek Merkezi — magazadestek.n11.com/s/komisyon-oranlari','n11 Komisyon Faturası Detayı — pazarlama ve pazaryeri hizmet bedelleri'] },
    ],
    relatedService: { label: 'Kendi e-ticaret kanalınızı ve pazaryeri geçiş planınızı inceleyin', href: '/e-ticaret/' },
  },
  {
    slug: 'ikas-fiyatlari-2026-kurulum-tema-seo-maliyetleri', seoKey: 'blog-ikas-cost-2026',
    title: 'ikas fiyatları 2026: paket, kurulum, tema, SEO ve ek maliyetler',
    excerpt: 'ikas mağazası kurarken platform paketi, profesyonel kurulum, tema düzenleme, ürün girişi, SEO ve entegrasyon maliyetlerini ayrı ayrı planlayın.',
    published: '2026-09-21', modified: '2026-09-21',
    intro: '“ikas ne kadar?” sorusunun tek rakamlı bir cevabı yoktur. Platformun kendi abonelik veya paket bedeli ile mağazanın profesyonel kurulumu, tema düzenlemesi, ürün aktarımı, SEO çalışması ve üçüncü taraf servisleri farklı maliyet kalemleridir. Sağlıklı bütçe, bu kalemleri birbirine karıştırmadan hesaplanır.',
    summary: ['ikas platform ücretini kurulum hizmetinden ayrı değerlendirin.','Tema, ürün girişi, veri taşıma ve özel entegrasyonların kapsamını baştan netleştirin.','Panelde SEO alanlarının bulunması profesyonel SEO çalışmasının otomatik yapıldığı anlamına gelmez.','12 aylık toplam maliyeti lisans, hizmet, uygulama, ödeme ve operasyon kalemleriyle birlikte hesaplayın.'],
    sections: [
      { heading: 'ikas fiyatı neden tek bir rakam değildir?', paragraphs: ['Bir ikas projesinde en az iki ayrı bütçe vardır: platformun kendi paket/lisans maliyeti ve mağazayı satışa hazırlayan uygulama hizmeti. Bunlara ihtiyaç halinde tema, ürün girişi, veri taşıma, entegrasyon, içerik, SEO ve ölçüm çalışmaları eklenir. Bu nedenle yalnız “kurulum fiyatı” üzerinden karar vermek toplam maliyeti eksik gösterir.'] },
      { heading: '1. ikas paket veya lisans bedeli', paragraphs: ['Platform paketleri ve paketlere dahil özellikler zaman içinde değişebilir. Güncel paket kapsamını satın alma tarihinde ikas’ın resmi kanallarından doğrulamak gerekir. QCT Commerce’te yayınlanan ikas kurulum fiyatı platform aboneliğinin kendisi değil, mağazanın kurulması ve uygulanması için verilen hizmet bedelidir.'] },
      { heading: '2. Profesyonel ikas mağaza kurulumu', paragraphs: ['Standart QCT Commerce ikas mağaza kurulumu 9.900 TL başlangıç fiyatıyla sunulur. Standart kapsam; temel mağaza yapılandırması, mobil düzen, yayına hazırlık ve temel teknik SEO kontrollerini içerir. Ürün sayısı, özel tasarım, veri taşıma ve entegrasyon ihtiyacı arttıkça kapsam ayrıca fiyatlandırılır.'] },
      { heading: '3. Tema ve tasarım maliyeti', paragraphs: ['Hazır temanın marka kimliğine uyarlanması ile özel bileşen veya özel tema geliştirilmesi aynı iş değildir. Ana sayfa blokları, mega menü, ürün kartı, kategori filtreleri, kampanya alanları veya özel mobil davranışlar talep edildiğinde tasarım ve geliştirme süresi ayrıca planlanır. Ücretli tema veya üçüncü taraf tema lisansı gerekiyorsa bu bedel hizmet fiyatından ayrıdır.'] },
      { heading: '4. Ürün girişi ve veri taşıma', paragraphs: ['Ürün adı, fiyat, stok, SKU, kategori, görsel ve varyantların sisteme aktarılması proje maliyetinde ayrı bir operasyon kalemidir. Eski platformdan geçişte CSV temizliği, kategori eşleştirme, görsel URL düzeltme ve eski URL’lerin 301 yönlendirmeleri de gerekebilir. Ürün sayısı büyüdükçe otomasyon kadar kalite kontrol de önem kazanır.'] },
      { heading: '5. ikas SEO maliyeti nasıl düşünülmeli?', paragraphs: ['ikas panelinde başlık, açıklama ve benzeri SEO alanlarının bulunması önemli bir altyapı avantajıdır; fakat profesyonel SEO yalnız bu alanları doldurmak değildir. Teknik indeksleme, kategori mimarisi, arama niyeti, ürün/kategori içerikleri, canonical, schema, iç bağlantılar, Search Console ve AI görünürlüğü ayrı bir çalışma gerektirir. QCT Commerce’te SEO, GEO, AEO ve AIO çalışmaları ihtiyaca göre ayrıca kapsamlanır.'] },
      { heading: '6. Entegrasyon ve üçüncü taraf maliyetleri', paragraphs: ['Ödeme kuruluşu komisyonları, ücretli uygulamalar, bazı pazaryeri veya ERP bağlantıları, alan adı, harici servisler, SMS/e-posta kontörleri veya reklam bütçesi gibi kalemler kullanılan sağlayıcının kendi ücretlendirmesine tabidir. Teklifte hangi ücretin QCT hizmeti, hangisinin üçüncü taraf maliyeti olduğu ayrı yazılmalıdır.'] },
      { heading: '7. ikas toplam maliyet hesabı', paragraphs: ['Karar verirken yalnız ilk kurulum ücretini değil en az 12 aylık toplam sahip olma maliyetini çıkarın. Böylece platform paketi ile profesyonel uygulama, operasyon ve büyüme maliyetlerini aynı tabloda görebilirsiniz.'], items: ['Platform paketi / abonelik','Kurulum ve tasarım hizmeti','Ürün girişi veya veri taşıma','Ücretli tema ve uygulamalar','Ödeme ve entegrasyon maliyetleri','SEO, içerik ve görünürlük çalışmaları','Bakım, destek ve yeni geliştirmeler'] },
      { heading: 'QCT Commerce ikas fiyatı neyi kapsıyor?', paragraphs: ['Sitedeki 9.900 TL başlangıç fiyatı QCT Commerce’in standart ikas kurulum hizmet bedelidir. ikas aboneliği/lisansı, ücretli tema veya uygulama, ödeme sağlayıcı komisyonu, reklam bütçesi ve diğer üçüncü taraf maliyetleri bu rakama dahil değildir; proje kapsamına göre ayrı gösterilir.'] },
    ], relatedService: { label: 'ikas mağaza kurulumu hizmetini inceleyin', href: '/ikas-magaza-kurulumu/' },
  },
  {
    slug: 'web-sitem-google-da-neden-cikmiyor', seoKey: 'blog-google-not-visible',
    title: 'Web sitem Google’da neden çıkmıyor? 2026 kontrol rehberi',
    excerpt: 'İndeksleme, Search Console, robots, canonical, içerik ve yerel görünürlük tarafında Google’da görünmeme sorununu sistemli biçimde teşhis edin.',
    published: '2026-09-21', modified: '2026-09-21',
    intro: 'Bir web sitesinin Google’da görünmemesi tek bir SEO ayarına bağlı değildir. Site hiç indekslenmemiş olabilir, yanlış canonical veya noindex kullanıyor olabilir, önemli sayfalar yeterince güçlü içerik taşımıyor olabilir ya da Google işletmeyi hangi konu ve lokasyonla ilişkilendireceğini net anlayamıyor olabilir. En doğru yaklaşım, teknik erişilebilirlikten başlayıp içerik ve marka sinyallerine doğru ilerlemektir.',
    summary: ['Önce sayfanın gerçekten indekslenip indekslenmediğini kontrol edin.','robots.txt, noindex, canonical ve sitemap hatalarını dışlayın.','Search Console verisini sayfa bazında inceleyin.','İçeriğin gerçek arama niyetini ve işletmenin uzmanlık alanını açıkça yanıtladığından emin olun.'],
    sections: [
      { heading: '1. Google sayfayı görüyor mu?', paragraphs: ['İlk kontrol URL Inspection ve site: alanadı sorgusudur. Sayfa keşfedilmemişse sitemap, iç bağlantı ve taranabilirlik; keşfedilmiş fakat indekslenmemişse içerik kalitesi, tekrar eden sayfalar veya teknik sinyaller incelenmelidir. Ana sayfanın görünmesi tüm hizmet veya kategori sayfalarının indekslendiği anlamına gelmez.'], items: ['Search Console URL Inspection','XML sitemap durumu','Robots.txt engelleri','Meta robots noindex etiketi','HTTP durum kodu ve yönlendirme zinciri'] },
      { heading: '2. Canonical ve URL yapısı doğru mu?', paragraphs: ['Aynı içeriğin farklı URL’lerde açılması, parametreli sayfalar veya yanlış canonical etiketi Google’ın hangi sayfayı esas alacağını karıştırabilir. Özellikle e-ticaret platformlarında filtre, koleksiyon ve varyant URL’leri kontrol edilmelidir. Canonical etiketi, kullanıcının gördüğü ve indekslenmesini istediğiniz URL ile tutarlı olmalıdır.'] },
      { heading: '3. Sayfa gerçekten aranan soruyu cevaplıyor mu?', paragraphs: ['Başlıkta anahtar kelime geçirmek tek başına yeterli değildir. Kullanıcı “web sitesi yaptırma fiyatları”, “ikas kurulum”, “SEO hizmeti” veya “web sitem Google’da çıkmıyor” diye aradığında sayfa bu ihtiyacı doğrudan, açık kapsam ve somut cevaplarla karşılamalıdır. Genel ajans metinleri yerine karar vermeye yardımcı olan içerik daha güçlüdür.'] },
      { heading: '4. Yerel ve marka sinyalleri tutarlı mı?', paragraphs: ['İşletme adı, hizmet tanımları, iletişim bilgileri, adres veya hizmet bölgesi, kurucu ve sosyal/işletme profilleri farklı yerlerde çelişiyorsa arama motorlarının varlık eşleştirmesi zorlaşır. Organization, LocalBusiness veya Service schema yalnız görünür içerikle uyumlu olduğunda fayda sağlar.'] },
      { heading: '5. Sonuç ne kadar sürede değişir?', paragraphs: ['Teknik bir noindex hatası kaldırıldığında yeniden tarama hızlı olabilir; fakat yeni bir hizmet sayfasının rekabetçi sorgularda görünürlük kazanması içerik, otorite ve bağlantı sinyallerine bağlı olarak daha uzun sürebilir. Bu nedenle başarıyı yalnız sıralama ile değil gösterim, tıklama, markalı arama ve nitelikli talep ile birlikte izleyin.'] },
    ], relatedService: { label: 'SEO, GEO, AEO ve AIO analizini inceleyin', href: '/seo-geo/' },
  },
  {
    slug: 'chatgpt-de-firmam-nasil-gorunur', seoKey: 'blog-chatgpt-visibility',
    title: 'ChatGPT’de firmam nasıl görünür? AI görünürlük rehberi',
    excerpt: 'Firmanızın ChatGPT, Gemini ve üretken arama sistemlerinde doğru anlaşılması için marka varlığı, içerik, schema ve kaynak sinyallerini düzenleyin.',
    published: '2026-09-21', modified: '2026-09-21',
    intro: '“ChatGPT’de firmam nasıl görünür?” sorusunun tek bir kayıt formu veya meta etiketi yoktur. Yapay zekâ sistemlerinin bir işletmeyi doğru bağlamda tanıması; açık web üzerindeki tutarlı marka bilgileri, güçlü hizmet sayfaları, kaynak niteliğindeki içerikler, yapılandırılmış veri ve güvenilir üçüncü taraf sinyallerinin birlikte çalışmasına bağlıdır.',
    summary: ['Marka ve hizmet tanımlarınızı tüm kanallarda tutarlı hale getirin.','İnsanların sorduğu gerçek sorulara doğrudan cevap veren içerikler üretin.','Schema verisini görünür içerikle birebir eşleştirin.','AI görünürlüğünü marka adı, hizmet sorguları ve kaynak gösterimi açısından düzenli izleyin.'],
    sections: [
      { heading: 'ChatGPT bir firmayı nasıl anlayabilir?', paragraphs: ['Üretken yapay zekâ sistemleri herkese açık web içeriği, arama sonuçları ve erişebildikleri diğer kaynaklardan işletme hakkında bağlam oluşturabilir. Bu nedenle ana sayfada yalnız slogan değil; şirket adı, ne yaptığı, kimlere hizmet verdiği, hangi pazarda çalıştığı ve nasıl iletişim kurulacağı açık biçimde bulunmalıdır.'] },
      { heading: 'GEO, AEO ve AIO ne işe yarar?', paragraphs: ['GEO üretken motorların içeriği anlamasını ve kaynak olarak değerlendirmesini destekleyen yapı; AEO kullanıcı sorularına açık cevaplar üretme disiplini; AIO ise klasik arama ile AI keşif ortamlarını birlikte ele alan daha geniş görünürlük yaklaşımıdır. Bunların temeli yine teknik SEO ve güvenilir içeriktir.'] },
      { heading: 'Hangi sayfalar AI görünürlüğünü güçlendirir?', paragraphs: ['Hizmet sayfaları, fiyat veya kapsam sayfaları, karşılaştırmalar, sık sorulan sorular, vaka çalışmaları ve güncel rehberler markanın ne yaptığına ilişkin daha fazla doğrulanabilir bağlam sağlar. “Biz en iyiyiz” türü iddialar yerine süreç, kapsam, fiyat başlangıçları, platform deneyimi ve gerçek çalışma örnekleri daha değerlidir.'], items: ['Hakkımızda ve kurucu bilgisi','Hizmet kapsamı sayfaları','Fiyat/kapsam sayfaları','SSS ve kısa cevap içerikleri','Vaka çalışmaları ve güncel bloglar'] },
      { heading: 'Schema yeterli mi?', paragraphs: ['Hayır. Organization, Service, FAQPage veya Article schema işaretlemesi görünür sayfa içeriğinin yerine geçmez. Yapılandırılmış veri, var olan bilgiyi makineye daha açık biçimde tarif eder. Sayfada olmayan bir hizmeti schema içine eklemek güvenilirlik yaratmaz.'] },
      { heading: 'AI görünürlüğü nasıl ölçülür?', paragraphs: ['Marka adınız, hizmet kategorileriniz ve satın alma niyetli sorular için farklı yapay zekâ sistemlerinde düzenli kontroller yapın. Yanıtın doğru marka tanımı verip vermediğini, kaynak gösterip göstermediğini ve sitenize yönlendiren sorguları Search Console ile birlikte değerlendirin.'] },
    ], relatedService: { label: 'AI görünürlük ve GEO çalışmasını inceleyin', href: '/seo-geo/' },
  },
  {
    slug: 'web-sitesi-yaptirma-fiyatlari-2026', seoKey: 'blog-web-pricing-2026',
    title: 'Web sitesi yaptırma fiyatları 2026: fiyat neye göre değişir?',
    excerpt: 'Kurumsal web, e-ticaret ve site yenileme projelerinde fiyatı belirleyen sayfa, ürün, entegrasyon, içerik ve bakım kalemlerini şeffaf biçimde değerlendirin.',
    published: '2026-09-21', modified: '2026-09-21',
    intro: 'Web sitesi fiyatları aynı görünen iki proje arasında bile ciddi biçimde değişebilir. Çünkü asıl maliyet yalnız tasarım ekranı değil; içerik yapısı, mobil deneyim, ürün sayısı, entegrasyon, ödeme, SEO geçişi, veri taşıma ve yayın sonrası test kapsamıdır. Sağlıklı teklif, hangi işin dahil olduğunu açıkça göstermelidir.',
    summary: ['Fiyatı sayfa sayısı kadar işlev ve içerik kapsamı belirler.','E-ticarette ürün, varyant, ödeme ve entegrasyonlar maliyeti etkiler.','Mevcut site yenilemede SEO ve URL geçişi ayrı planlanmalıdır.','Teklifte teslim, bakım, lisans ve üçüncü taraf maliyetlerini ayrı görün.'],
    sections: [
      { heading: 'Kurumsal web sitesi fiyatını ne belirler?', paragraphs: ['Kurumsal sitelerde ana maliyet kalemleri bilgi mimarisi, sayfa şablonları, mobil arayüz, içerik düzenleme, form ve ölçüm kurulumu, teknik SEO ve yayın testidir. Beş sayfalık özel tasarım bir site ile hazır temaya içerik girilen proje aynı kapsam değildir.'] },
      { heading: 'E-ticaret projesinde hangi ek kalemler oluşur?', paragraphs: ['Shopify, ikas, WooCommerce, Ticimax veya IdeaSoft seçimi; ürün ve varyant sayısı, ürün girişi, ödeme-kargo entegrasyonları, kategori yapısı, filtreler ve veri taşıma e-ticaret fiyatını doğrudan etkiler. Ürün sayısı büyüdükçe CSV temizliği ve görsel eşleştirme de ayrı iş kalemine dönüşebilir.'], items: ['Platform kurulumu','Tema ve mobil UX','Ürün/kategori yapısı','Ödeme ve kargo','Ürün girişi veya taşıma','Analytics ve Merchant Center','SEO yönlendirmeleri'] },
      { heading: 'Site yenileme neden bazen yeni siteden zor olabilir?', paragraphs: ['Mevcut sitenin URL’leri, indekslenmiş sayfaları, analitik verisi ve çalışan entegrasyonları korunmalıdır. Görsel yenileme sırasında URL’leri kontrolsüz değiştirmek veya canonical yapılarını bozmak organik görünürlük kaybına yol açabilir. Bu nedenle yenileme fiyatı yalnız “tasarım değişikliği” olarak düşünülmemelidir.'] },
      { heading: 'Şeffaf fiyat teklifi nasıl olmalı?', paragraphs: ['Teklif; temel paket, başlangıç fiyatı, ek sayfa veya ürün bedeli, lisanslar, üçüncü taraf servisleri ve kapsam dışı işleri ayrı göstermelidir. “Her şey dahil” ifadesi yerine neyin teslim edileceğini madde madde görmek daha güvenlidir.'] },
      { heading: 'Düşük fiyat mı, doğru toplam maliyet mi?', paragraphs: ['Ucuz başlangıç fiyatı; sonradan ürün girişi, tema, entegrasyon, hız, SEO veya destek için tekrar ödeme gerektiriyorsa toplam maliyet beklenenden yüksek olabilir. Karar verirken ilk fatura yerine 12 aylık toplam sahip olma maliyetini değerlendirin.'] },
    ], relatedService: { label: 'Şeffaf başlangıç fiyatlarını inceleyin', href: '/fiyatlar/' },
  },
  {
    slug: 'ikas-mi-shopify-mi-2026', seoKey: 'blog-ikas-shopify-2026',
    title: 'ikas mı Shopify mı? Türkiye için 2026 karşılaştırması',
    excerpt: 'ikas ve Shopify’ı Türkiye’de ödeme, entegrasyon, operasyon, uluslararası satış, SEO ve toplam maliyet açısından hangi senaryoda daha uygun olduklarıyla karşılaştırın.',
    published: '2026-09-21', modified: '2026-09-21',
    intro: 'ikas mı Shopify mı sorusunun tek doğru cevabı yoktur. Türkiye merkezli hızlı operasyon, yerel destek ve hazır entegrasyon önceliği olan bir işletmenin ihtiyacı ile uluslararası pazara açılmak, geniş uygulama ekosistemi kullanmak ve çok ülkeliliği büyütmek isteyen markanın ihtiyacı farklıdır.',
    summary: ['Önce satış ülkesi, ödeme ve operasyon gereksinimlerini belirleyin.','Yerel entegrasyon kolaylığı ile global uygulama ekosistemini ayrı değerlendirin.','SEO açısından iki platformda da içerik ve teknik uygulama kalitesi belirleyicidir.','Lisans ücretinden önce toplam sahip olma maliyetini hesaplayın.'],
    sections: [
      { heading: 'Türkiye odaklı işletme için hangi sorular önemli?', paragraphs: ['Ödeme kuruluşları, kargo, e-fatura, pazaryeri, destek dili, ürün yönetimi ve ekibin teknik kapasitesi ilk değerlendirme başlıklarıdır. ikas Türkiye pazarına yönelik yerel süreçleri güçlü biçimde hedeflerken Shopify küresel ekosistem ve uluslararası genişleme tarafında daha geniş seçenek sunar.'] },
      { heading: 'Shopify ne zaman daha anlamlı olabilir?', paragraphs: ['Birden fazla ülkeye satış, çok geniş uygulama ekosistemi, farklı ödeme ve pazarlama araçları, uluslararası tema ve geliştirici ağı önemliyse Shopify avantajlı olabilir. Ancak kullanılacak her uygulamanın maliyet ve performans etkisi ayrıca hesaplanmalıdır.'] },
      { heading: 'ikas ne zaman daha anlamlı olabilir?', paragraphs: ['Türkiye’de hızlı kurulum, yerel destek, hazır pazaryeri ve operasyon bağlantıları, daha az teknik yönetim yükü öncelikliyse ikas güçlü bir seçenek olabilir. Yine de ihtiyaç duyulan spesifik entegrasyonların satın almadan önce doğrulanması gerekir.'] },
      { heading: 'SEO açısından hangisi daha iyi?', paragraphs: ['Platform tek başına SEO sonucu üretmez. URL yapısı, canonical, sitemap, schema, içerik, kategori mimarisi, Core Web Vitals ve ürün verisi uygulamasının kalitesi belirleyicidir. Shopify ve ikas için “otomatik SEO” beklentisi yerine gerçek sayfa yapısını değerlendirmek gerekir.'] },
      { heading: 'Karar matrisi', paragraphs: ['Kararı özellik listesine değil iş modeline bağlayın. Türkiye ağırlıklı satış ve yerel operasyon kolaylığı bir tarafa; global genişleme, uygulama ekosistemi ve özelleştirme ihtiyacı diğer tarafa yazılmalıdır. Her iki platform için 12 aylık lisans, eklenti, ödeme, tema, bakım ve operasyon maliyetini birlikte hesaplayın.'] },
    ], relatedService: { label: 'Shopify ve ikas kurulum hizmetlerini inceleyin', href: '/e-ticaret/' },
  },
  {
    slug: 'mobil-e-ticaret-sitesi-neden-satis-yapmiyor', seoKey: 'blog-mobile-ecommerce-conversion',
    title: 'Mobil e-ticaret sitesi neden satış yapmıyor? 2026 dönüşüm rehberi',
    excerpt: 'Mobilde hız, menü, filtre, varyant, sepet ve ödeme adımlarındaki sürtünmeleri tespit ederek e-ticaret dönüşümünü sistemli biçimde iyileştirin.',
    published: '2026-09-21', modified: '2026-09-21',
    intro: 'Bir e-ticaret sitesi masaüstünde güzel görünüp mobilde satış kaybedebilir. Sorun çoğu zaman tek bir hız skoru değildir; menünün kullanılamaması, filtrelerin zor açılması, varyant seçimlerinin belirsizliği, CTA’nın aşağıda kalması, teslimat bilgisinin geç görünmesi veya ödeme adımlarının gereksiz uzaması birlikte dönüşümü düşürür.',
    summary: ['Mobil menü, arama ve filtreyi gerçek cihazda test edin.','Ürün sayfasında fiyat, varyant, teslimat ve CTA’yı ilk karar alanına yakın tutun.','Sepet ve ödeme adımlarını minimum sürtünmeyle tasarlayın.','Mobil performansı gerçek kullanıcı ve dönüşüm verisiyle birlikte değerlendirin.'],
    sections: [
      { heading: 'İlk 10 saniyede kullanıcı ne görüyor?', paragraphs: ['Mobil kullanıcı sayfaya geldiğinde ne satıldığını, fiyatı veya ana faydayı ve sonraki adımı anlamalıdır. Büyük hero görselleri, uzun sloganlar veya ekranı kaplayan pop-up’lar ürün keşfini geciktirir. Özellikle reklam trafiğinde ilk ekran ile reklam vaadi aynı olmalıdır.'] },
      { heading: 'Menü, arama ve filtre gerçekten çalışıyor mu?', paragraphs: ['Mobil navigasyon yalnız görsel olarak açılmamalı; dokunma alanları yeterli olmalı, kapanabilmeli, arka planda sayfa kaymamalı ve kategoriye ulaşmak için gereksiz adım yaratmamalıdır. Filtre ve sıralama ürün sayısını azaltmaya gerçekten yardımcı olmalıdır.'] },
      { heading: 'Ürün sayfasında en kritik sürtünmeler', paragraphs: ['Varyant, beden, stok, teslimat, iade ve ödeme seçenekleri kullanıcı sepete eklemeden önce anlaşılabilir olmalıdır. Sabit CTA bazı mağazalarda faydalı olabilir; ancak içerik ve çerez/WhatsApp bileşenleriyle çakışmamalıdır.'], items: ['Okunabilir ürün başlığı ve fiyat','Net varyant/beden seçimi','Stok ve teslimat bilgisi','Kolay erişilen sepete ekle','Güven ve iade bilgisi','Performanslı ürün görselleri'] },
      { heading: 'Sepet ve ödeme neden terk edilir?', paragraphs: ['Beklenmeyen kargo bedeli, zorunlu üyelik, uzun form, hata mesajlarının belirsizliği ve yavaş ödeme yönlendirmeleri terk oranını artırabilir. Misafir ödeme, otomatik doldurma ve açık toplam maliyet mobilde özellikle önemlidir.'] },
      { heading: 'Hız tek başına yeterli mi?', paragraphs: ['Core Web Vitals ve açılış hızı önemlidir; ancak hızlı fakat anlaşılmaz bir sayfa da satış yapmaz. LCP, INP ve CLS verilerini ürün görüntüleme, sepete ekleme, checkout başlangıcı ve satın alma oranlarıyla birlikte okuyun.'] },
      { heading: 'Mobil QA kontrolü nasıl yapılır?', paragraphs: ['En az iOS ve Android gerçek cihazlarda ana sayfa, kategori, arama, ürün, sepet, ödeme, menü, WhatsApp, çerez ve form senaryolarını baştan sona test edin. Her sürümden sonra yalnız ekran görüntüsüne değil görev tamamlama akışına bakın.'] },
    ], relatedService: { label: 'E-ticaret ve mobil site iyileştirmesini inceleyin', href: '/e-ticaret/' },
  },

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
    published: '2026-07-08', modified: '2026-07-16',
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
    published: '2026-07-13', modified: '2026-07-18',
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
