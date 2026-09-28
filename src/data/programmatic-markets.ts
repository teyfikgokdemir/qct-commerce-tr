export type ProgrammaticMarket = {
  id: string;
  name: string;
  type: "city" | "country";
  areaServed: string[];
  audience: string;
  marketAngle: string;
  commercialContext: string;
  priorityServices: string[];
  industries: string[];
  alternateId: string;
};

export const trMarkets: ProgrammaticMarket[] = [
  { id:"istanbul", name:"İstanbul", type:"city", areaServed:["İstanbul","Türkiye"], audience:"İstanbul merkezli büyüme odaklı şirketler ve e-ticaret markaları", marketAngle:"yüksek rekabetli dijital pazarda hız, güven ve dönüşüm", commercialContext:"İstanbul’da görünürlük tek başına yeterli değil; marka güveni, mobil hız, teklif akışı ve ölçüm altyapısı birlikte çalışmalı.", priorityServices:["Kurumsal web tasarım","E-ticaret altyapısı","SEO / GEO görünürlüğü"], industries:["E-ticaret","B2B","Hizmet şirketleri"], alternateId:"istanbul" },
  { id:"ankara", name:"Ankara", type:"city", areaServed:["Ankara","Türkiye"], audience:"Ankara’daki kurumsal, teknoloji ve hizmet şirketleri", marketAngle:"kurumsal güveni ölçülebilir dijital talebe dönüştürme", commercialContext:"Ankara odaklı projelerde net hizmet mimarisi, güçlü referans anlatımı ve karar vericiyi hızla yönlendiren teklif akışı öne çıkar.", priorityServices:["Kurumsal web sitesi","Lead generation","Teknik SEO"], industries:["Teknoloji","Danışmanlık","B2B hizmetler"], alternateId:"ankara" },
  { id:"izmir", name:"İzmir", type:"city", areaServed:["İzmir","Türkiye"], audience:"İzmir merkezli markalar, üreticiler ve ihracatçılar", marketAngle:"yerel görünürlüğü ulusal ve uluslararası talebe bağlama", commercialContext:"İzmir’de üretim, hizmet ve e-ticaret odaklı işletmeler için çok dilli içerik, hızlı teklif toplama ve arama görünürlüğü aynı mimaride kurgulanabilir.", priorityServices:["Web tasarım","Çok dilli SEO","E-ticaret"], industries:["İhracat","Üretim","E-ticaret"], alternateId:"izmir" },
  { id:"bursa", name:"Bursa", type:"city", areaServed:["Bursa","Türkiye"], audience:"Bursa’daki üretici, tedarikçi ve B2B şirketler", marketAngle:"ürün ve üretim kabiliyetini dijital satış aracına dönüştürme", commercialContext:"Bursa merkezli üretici firmalarda katalog yapısı, teknik ürün içeriği, RFQ akışı ve ihracat pazarlarına uygun çok dilli sayfalar kritik olur.", priorityServices:["B2B web tasarım","İhracat landing page","SEO / GEO"], industries:["Üretim","Otomotiv tedarik","B2B"], alternateId:"bursa" },
  { id:"antalya", name:"Antalya", type:"city", areaServed:["Antalya","Türkiye"], audience:"Antalya’daki hizmet, turizm ve e-ticaret işletmeleri", marketAngle:"mobil odaklı talep ve rezervasyon/satış akışlarını güçlendirme", commercialContext:"Antalya projelerinde mobil kullanıcı deneyimi, çok dilli içerik ve hızlı iletişim akışı dönüşüm performansını doğrudan etkiler.", priorityServices:["Mobil web deneyimi","Çok dilli site","Dönüşüm optimizasyonu"], industries:["Turizm","Hizmet","E-ticaret"], alternateId:"antalya" },
  { id:"gaziantep", name:"Gaziantep", type:"city", areaServed:["Gaziantep","Türkiye"], audience:"Gaziantep’teki üretici ve ihracatçı işletmeler", marketAngle:"ürün portföyünü ihracat talebine uygun dijital vitrinde sunma", commercialContext:"Gaziantep merkezli firmalarda ürün gruplarının doğru ayrıştırılması, ihracat pazarlarına özel sayfalar ve hızlı RFQ akışı güçlü bir ticari temel oluşturur.", priorityServices:["İhracat web sitesi","B2B katalog","SEO / GEO"], industries:["Gıda","Üretim","İhracat"], alternateId:"gaziantep" },
  { id:"kocaeli", name:"Kocaeli", type:"city", areaServed:["Kocaeli","Türkiye"], audience:"Kocaeli’deki sanayi ve B2B şirketleri", marketAngle:"teknik kabiliyeti güven veren dijital satış sistemine çevirme", commercialContext:"Sanayi şirketlerinde ürün/hizmet mimarisi, teknik içerik ve teklif toplama süreci birlikte tasarlandığında web sitesi gerçek bir satış destek aracına dönüşür.", priorityServices:["Kurumsal web","B2B lead generation","Teknik SEO"], industries:["Sanayi","Lojistik","B2B"], alternateId:"kocaeli" },
  { id:"adana", name:"Adana", type:"city", areaServed:["Adana","Türkiye"], audience:"Adana’daki üretici, tarım-gıda ve hizmet şirketleri", marketAngle:"yerel ticari gücü dijital talep üretimine bağlama", commercialContext:"Adana odaklı projelerde ürün/hizmet sunumunun sadeleştirilmesi, mobil hız ve Google arama niyetine uygun sayfa kümeleri önceliklidir.", priorityServices:["Web tasarım","Yerel SEO","E-ticaret"], industries:["Gıda","Üretim","Hizmet"], alternateId:"adana" },
  { id:"kayseri", name:"Kayseri", type:"city", areaServed:["Kayseri","Türkiye"], audience:"Kayseri’deki üretici, mobilya ve B2B işletmeleri", marketAngle:"üretim gücünü ürün odaklı dijital talebe dönüştürme", commercialContext:"Kayseri firmaları için kategori mimarisi, katalog görünürlüğü ve ihracat odaklı çok dilli landing page’ler önemli bir büyüme kanalı oluşturabilir.", priorityServices:["B2B web tasarım","Ürün katalogları","Çok dilli SEO"], industries:["Mobilya","Üretim","İhracat"], alternateId:"kayseri" },
  { id:"konya", name:"Konya", type:"city", areaServed:["Konya","Türkiye"], audience:"Konya’daki makine, üretim ve ihracat şirketleri", marketAngle:"teknik ürünleri arama niyetiyle eşleştirme", commercialContext:"Konya merkezli üreticilerde ürün teknik özelliklerini, kullanım alanlarını ve teklif çağrılarını doğru sayfa yapısına dönüştürmek organik talebi destekler.", priorityServices:["Teknik web sitesi","B2B SEO","İhracat landing page"], industries:["Makine","Tarım ekipmanları","Üretim"], alternateId:"konya" },
  { id:"denizli", name:"Denizli", type:"city", areaServed:["Denizli","Türkiye"], audience:"Denizli’deki tekstil, üretim ve ihracat firmaları", marketAngle:"ürün koleksiyonlarını uluslararası alıcıya uygun sunma", commercialContext:"Denizli projelerinde ürün koleksiyonları, kalite/üretim bilgisi ve çok dilli talep sayfaları özellikle ihracat hedefli firmalar için önemlidir.", priorityServices:["İhracat sitesi","Ürün koleksiyonları","Çok dilli SEO"], industries:["Tekstil","Üretim","İhracat"], alternateId:"denizli" },
  { id:"mersin", name:"Mersin", type:"city", areaServed:["Mersin","Türkiye"], audience:"Mersin’deki ticaret, lojistik ve ihracat işletmeleri", marketAngle:"ticari bağlantıları dijital talep ve teklif akışına dönüştürme", commercialContext:"Mersin odaklı B2B yapılarda hizmet alanları, ticaret koridorları ve teklif toplama sayfaları açık biçimde ayrıştırılmalıdır.", priorityServices:["B2B web","İhracat landing page","Lead generation"], industries:["Lojistik","Dış ticaret","Gıda"], alternateId:"mersin" },
  { id:"eskisehir", name:"Eskişehir", type:"city", areaServed:["Eskişehir","Türkiye"], audience:"Eskişehir’deki teknoloji, üretim ve hizmet şirketleri", marketAngle:"uzmanlığı sade, hızlı ve güvenilir dijital deneyime dönüştürme", commercialContext:"Eskişehir projelerinde güçlü bilgi mimarisi, hızlı mobil deneyim ve nitelikli iletişim formları özellikle hizmet ve B2B firmalarında öne çıkar.", priorityServices:["Web tasarım","Teknik SEO","Dönüşüm optimizasyonu"], industries:["Teknoloji","Üretim","Hizmet"], alternateId:"eskisehir" },
  { id:"samsun", name:"Samsun", type:"city", areaServed:["Samsun","Türkiye"], audience:"Samsun’daki bölgesel ticaret ve üretim işletmeleri", marketAngle:"bölgesel görünürlüğü ulusal müşteri kazanımına genişletme", commercialContext:"Samsun merkezli şirketlerde yerel güven sinyalleri ile ulusal hizmet/ürün sayfalarını aynı yapıda birleştirmek sürdürülebilir görünürlük sağlar.", priorityServices:["Kurumsal web","Yerel + ulusal SEO","E-ticaret"], industries:["Ticaret","Üretim","Hizmet"], alternateId:"samsun" },
  { id:"sakarya", name:"Sakarya", type:"city", areaServed:["Sakarya","Türkiye"], audience:"Sakarya’daki sanayi, üretim ve hizmet şirketleri", marketAngle:"B2B kabiliyeti dijital teklif sistemine bağlama", commercialContext:"Sakarya odaklı sanayi şirketlerinde hizmet/ürün sayfaları, referanslar ve RFQ yapısı karar vericinin ihtiyaç duyduğu bilgiyi hızlı vermelidir.", priorityServices:["B2B web","RFQ akışı","SEO / GEO"], industries:["Sanayi","Otomotiv","Hizmet"], alternateId:"sakarya" },
  { id:"almanya", name:"Almanya", type:"country", areaServed:["Germany","Türkiye"], audience:"Almanya pazarına satış yapan veya Almanya’da müşteri kazanmak isteyen şirketler", marketAngle:"çok dilli güven, teknik kalite ve arama niyetini tek yapıda birleştirme", commercialContext:"Almanya hedefinde yalnızca çeviri yeterli değildir. Almanca arama niyetleri, güven unsurları, ürün/hizmet kanıtları ve net iletişim akışı birlikte ele alınmalıdır.", priorityServices:["Almanca landing page","B2B web tasarım","SEO / GEO"], industries:["B2B","Üretim","E-ticaret"], alternateId:"germany" },
  { id:"ingiltere", name:"İngiltere", type:"country", areaServed:["United Kingdom","Türkiye"], audience:"Birleşik Krallık pazarına satış yapan veya İngilizce talep üretmek isteyen şirketler", marketAngle:"net değer önerisi, kanıt ve dönüşüm odaklı İngilizce deneyim", commercialContext:"Birleşik Krallık hedefinde hizmet veya ürünün değeri hızlı anlaşılmalı; vaka çalışmaları, fiyat/teklif mantığı ve mobil dönüşüm akışı gereksiz sürtünmeyi azaltmalıdır.", priorityServices:["İngilizce web sitesi","E-ticaret","SEO / GEO"], industries:["E-ticaret","SaaS / hizmet","B2B"], alternateId:"uk" },
  { id:"azerbaycan", name:"Azerbaycan", type:"country", areaServed:["Azerbaijan","Türkiye"], audience:"Türkiye–Azerbaycan ekseninde dijital satış ve kurumsal görünürlük hedefleyen şirketler", marketAngle:"yakın ticari ilişkiyi profesyonel dijital müşteri deneyimiyle destekleme", commercialContext:"Azerbaycan hedefli projelerde Türkçe/Azerbaycanca içerik uyumu, hızlı iletişim ve hizmet kapsamının açık sunulması ticari görüşmeye geçişi kolaylaştırır.", priorityServices:["Kurumsal web","Çok dilli içerik","Lead generation"], industries:["Hizmet","Ticaret","E-ticaret"], alternateId:"azerbaijan" },
  { id:"dubai", name:"Dubai", type:"city", areaServed:["Dubai","United Arab Emirates","Türkiye"], audience:"Dubai ve BAE’de müşteri kazanmak isteyen şirketler", marketAngle:"premium marka algısını hızlı, çok dilli ve dönüşüm odaklı deneyimle destekleme", commercialContext:"Dubai hedefli projelerde güçlü ilk izlenim, İngilizce öncelikli içerik, mobil hız ve WhatsApp/teklif akışı birlikte optimize edilmelidir.", priorityServices:["Premium web tasarım","İngilizce landing page","Lead generation"], industries:["Hizmet","Ticaret","E-ticaret"], alternateId:"dubai" }
];

export const enMarkets: ProgrammaticMarket[] = trMarkets.map((m) => {
  const enName = ({
    "almanya":"Germany","ingiltere":"United Kingdom","azerbaycan":"Azerbaijan","dubai":"Dubai",
    "istanbul":"Istanbul","ankara":"Ankara","izmir":"Izmir","bursa":"Bursa","antalya":"Antalya",
    "gaziantep":"Gaziantep","kocaeli":"Kocaeli","adana":"Adana","kayseri":"Kayseri","konya":"Konya",
    "denizli":"Denizli","mersin":"Mersin","eskisehir":"Eskisehir","samsun":"Samsun","sakarya":"Sakarya"
  } as Record<string,string>)[m.id] ?? m.name;

  return {
    ...m,
    id: m.alternateId,
    name: enName,
    audience: ({
      "almanya":"Companies selling into Germany or building demand in the German market",
      "ingiltere":"Companies targeting customers in the United Kingdom",
      "azerbaycan":"Companies building digital sales across the Turkey–Azerbaijan corridor",
      "dubai":"Companies targeting buyers and decision-makers in Dubai and the UAE"
    } as Record<string,string>)[m.id] ?? `Businesses operating in or targeting ${enName}`,
    marketAngle: ({
      "almanya":"combine multilingual trust, technical credibility and search intent",
      "ingiltere":"turn a clear value proposition and proof into qualified enquiries",
      "azerbaycan":"support close commercial ties with a professional digital buying journey",
      "dubai":"support premium positioning with a fast, multilingual conversion journey"
    } as Record<string,string>)[m.id] ?? "connect local relevance with measurable digital demand",
    commercialContext: ({
      "almanya":"For Germany, translation alone is not enough. German-language search intent, trust signals, proof of capability and clear contact paths need to work as one system.",
      "ingiltere":"For the UK, buyers should understand the offer quickly. Case studies, clear scope and a friction-light mobile enquiry flow matter more than decorative complexity.",
      "azerbaycan":"For Azerbaijan, clear service scope, fast contact paths and language consistency help move visitors from interest to a commercial conversation.",
      "dubai":"For Dubai and the UAE, premium first impression, English-first content, mobile speed and direct enquiry or WhatsApp flows should be designed together."
    } as Record<string,string>)[m.id] ?? `For ${enName}, we align information architecture, search intent, mobile performance and conversion paths instead of treating the page as a simple location swap.`,
    priorityServices: m.id === "almanya" ? ["German landing pages","B2B web design","SEO / GEO"] :
      m.id === "ingiltere" ? ["English website","E-commerce","SEO / GEO"] :
      m.id === "azerbaycan" ? ["Corporate website","Multilingual content","Lead generation"] :
      m.id === "dubai" ? ["Premium web design","English landing pages","Lead generation"] :
      ["Web design","E-commerce","SEO / GEO"],
    industries: ({
      "almanya":["B2B","Manufacturing","E-commerce"],
      "ingiltere":["E-commerce","Professional services","B2B"],
      "azerbaycan":["Services","Trade","E-commerce"],
      "dubai":["Services","Trade","E-commerce"],
      "istanbul":["E-commerce","B2B","Professional services"],
      "ankara":["Technology","Consulting","B2B services"],
      "izmir":["Export","Manufacturing","E-commerce"],
      "bursa":["Manufacturing","Automotive supply","B2B"],
      "antalya":["Tourism","Services","E-commerce"],
      "gaziantep":["Food","Manufacturing","Export"],
      "kocaeli":["Industry","Logistics","B2B"],
      "adana":["Food","Manufacturing","Services"],
      "kayseri":["Furniture","Manufacturing","Export"],
      "konya":["Machinery","Agricultural equipment","Manufacturing"],
      "denizli":["Textiles","Manufacturing","Export"],
      "mersin":["Logistics","International trade","Food"],
      "eskisehir":["Technology","Manufacturing","Services"],
      "samsun":["Trade","Manufacturing","Services"],
      "sakarya":["Industry","Automotive","Services"]
    } as Record<string,string[]>)[m.id] ?? ["B2B","E-commerce","Services"],
    alternateId: m.id
  };
});
