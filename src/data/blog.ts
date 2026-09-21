import type { SeoPage } from '../i18n/seo';

export interface BlogSection { heading: string; paragraphs: string[]; items?: string[]; }
export interface BlogArticle {
  slug: string; seoKey: SeoPage; title: string; excerpt: string; published: string; modified: string;
  intro: string; summary: string[]; sections: BlogSection[]; relatedService: { label: string; href: string };
}

export const articles: BlogArticle[] = [
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
