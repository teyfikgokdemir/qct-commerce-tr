export type AzMarket = {
  id:string;
  name:string;
  areaServed:string[];
  audience:string;
  commercialContext:string;
  marketAngle:string;
  industries:string[];
};

export type AzMarketService = {
  id:'veb-dizayn'|'e-ticaret'|'seo-geo';
  slug:string;
  name:string;
  corePath:string;
  intent:string;
  outcome:string;
  deliverables:string[];
};

export const azMarkets:AzMarket[] = [
  {
    id:'baki', name:'Bakı', areaServed:['Bakı','Azərbaycan'],
    audience:'Bakıdakı böyümə yönümlü şirkətlər, xidmət biznesləri, istehsalçılar və e-ticarət markaları',
    commercialContext:'Bakı bazarında rəqəmsal rəqabət yüksəkdir. Güvən verən təqdimat, sürətli mobil təcrübə, aydın xidmət və məhsul arxitekturası, ölçülə bilən müraciət axını birlikdə işləməlidir.',
    marketAngle:'yüksək rəqabətli bazarda güvəni və rəqəmsal tələbi artırmaq',
    industries:['E-ticarət','B2B xidmətləri','Tikinti və daşınmaz əmlak','Peşəkar xidmətlər']
  },
  {
    id:'gence', name:'Gəncə', areaServed:['Gəncə','Azərbaycan'],
    audience:'Gəncə və qərb bölgəsində fəaliyyət göstərən istehsal, xidmət və pərakəndə şirkətləri',
    commercialContext:'Gəncə üçün rəqəmsal layihələrdə yerli etibar, mobil istifadə, məhsul və xidmətlərin aydın təqdimatı və satış komandalarına düzgün yönləndirilən müraciətlər əsas rol oynayır.',
    marketAngle:'yerli görünürlüğü daha keyfiyyətli müraciət və satış imkanlarına çevirmək',
    industries:['İstehsal','Pərakəndə','Xidmət','Kənd təsərrüfatı']
  },
  {
    id:'sumqayit', name:'Sumqayıt', areaServed:['Sumqayıt','Azərbaycan'],
    audience:'Sumqayıtdakı sənaye, istehsal, distribusiya və B2B şirkətləri',
    commercialContext:'Sumqayıt bazarında texniki məhsulların, istehsal imkanlarının və korporativ etibarın düzgün rəqəmsal təqdimatı xüsusilə vacibdir. Kataloq, RFQ və çoxdilli satış səhifələri birlikdə qurula bilər.',
    marketAngle:'istehsal və B2B imkanlarını ölçülə bilən rəqəmsal satış kanalına çevirmək',
    industries:['Sənaye','İstehsal','Distribusiya','B2B']
  },
  {
    id:'naxcivan', name:'Naxçıvan', areaServed:['Naxçıvan','Azərbaycan'],
    audience:'Naxçıvanda fəaliyyət göstərən ticarət, xidmət və regional satış şirkətləri',
    commercialContext:'Naxçıvan üçün onlayn görünürlük coğrafi məsafəni azaltmalı, xidmət və məhsul məlumatını sürətli çatdırmalı və WhatsApp, forma və telefon kimi əlaqə kanallarını vahid axında toplamalıdır.',
    marketAngle:'regional əlçatanlığı, etibarı və birbaşa müraciət imkanlarını gücləndirmək',
    industries:['Ticarət','Xidmət','Pərakəndə','Turizm']
  },
  {
    id:'mingecevir', name:'Mingəçevir', areaServed:['Mingəçevir','Azərbaycan'],
    audience:'Mingəçevirdəki xidmət, ticarət, sənaye və regional bizneslər',
    commercialContext:'Mingəçevirdə rəqəmsal sistem sadəcə təqdimat saytı deyil, yerli axtarışdan müraciətə qədər aydın yol yaratmalıdır. Mobil sürət və düzgün xidmət səhifələri bu axının əsas hissəsidir.',
    marketAngle:'yerli axtarış görünürlüğünü və mobil müraciət axınını yaxşılaşdırmaq',
    industries:['Xidmət','Ticarət','Sənaye','Təhsil']
  },
  {
    id:'lenkeran', name:'Lənkəran', areaServed:['Lənkəran','Azərbaycan'],
    audience:'Lənkəran və cənub bölgəsindəki turizm, qida, kənd təsərrüfatı və xidmət biznesləri',
    commercialContext:'Lənkəran bazarında məhsul mənşəyi, yerli güvən, mobil kəşf və turizm və qida kimi vizual kateqoriyalarda güclü təqdimat xüsusilə əhəmiyyətlidir.',
    marketAngle:'yerli üstünlükləri daha görünən, etibarlı və satışa yönəlmiş rəqəmsal təqdimata çevirmək',
    industries:['Turizm','Qida','Kənd təsərrüfatı','Xidmət']
  }
];

export const azMarketServices:AzMarketService[] = [
  {
    id:'veb-dizayn', slug:'veb-dizayn', name:'Veb dizayn',
    corePath:'/az/veb-dizayn/',
    intent:'şirkətin xidmətlərini və etibar siqnallarını mobil və masaüstündə aydın təqdim etmək',
    outcome:'Sürətli, aydın və müraciətə yönəldilmiş korporativ veb təcrübə.',
    deliverables:['Məlumat arxitekturası və dönüşüm axını','Mobil öncəli interfeys','Texniki SEO və strukturlaşdırılmış məlumat']
  },
  {
    id:'e-ticaret', slug:'e-ticaret', name:'E-ticarət',
    corePath:'/az/e-ticaret/',
    intent:'məhsul kəşfini, mobil alış yolunu və satış ölçümünü eyni sistemdə qurmaq',
    outcome:'Daha rahat məhsul kəşfi, daha az checkout sürtünməsi və ölçülə bilən satış axını.',
    deliverables:['Kateqoriya və məhsul arxitekturası','Mobil məhsul və checkout təcrübəsi','Analitika və satış hadisələri']
  },
  {
    id:'seo-geo', slug:'seo-geo', name:'SEO, GEO, AEO və AIO',
    corePath:'/az/seo-geo/',
    intent:'Google və AI əsaslı axtarış mühitlərində düzgün və ölçülə bilən görünürlük yaratmaq',
    outcome:'Texniki əsas, lokal niyyət və faydalı məzmun üzərindən davamlı axtarış görünürlüğü.',
    deliverables:['Texniki SEO və indekslənmə','Lokal və kommersiya niyyətli məzmun','Schema, entity və AI görünürlük siqnalları']
  }
];

export const azMarketPath = (marketId:string) => `/az/lokasiya/${marketId}/`;
export const azMarketServicePath = (marketId:string, service:AzMarketService) => `/az/lokasiya/${marketId}/${service.slug}/`;
