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
  | 'work'
  | 'headwear-case-study'
  | 'misima-case-study'
  | 'artman-case-study'
  | 'phiaderm-case-study';

type IndexedLang = 'en' | 'sq' | 'mk' | 'sr';

interface SeoEntry {
  title: string;
  description: string;
}

const seo: Record<IndexedLang, Record<SeoPage, SeoEntry>> = {
  en: {
    home: {
      title: 'QCT Studio — Websites, E-commerce & AI for the Balkans',
      description: 'QCT Studio builds websites, e-commerce stores and AI automation for businesses across Albania and North Macedonia.',
    },
    about: {
      title: 'About QCT Studio — Digital Partner for Balkan Businesses',
      description: 'Meet QCT Studio, founded in Istanbul by Teyfik Gökdemir to build trusted websites, e-commerce and digital systems for Balkan businesses.',
    },
    services: {
      title: 'Web, E-commerce, SEO & AI Services — QCT Studio',
      description: 'Explore website design, e-commerce, WhatsApp Commerce, SEO, GEO, Meta Ads landing pages and AI automation for Balkan businesses.',
    },
    'website-design': {
      title: 'Website Design for Balkan Businesses — QCT Studio',
      description: 'Premium website design for established businesses in Albania and North Macedonia that need stronger trust, clarity and mobile performance.',
    },
    'e-commerce': {
      title: 'E-commerce Website Development — QCT Studio',
      description: 'Conversion-focused e-commerce stores with clear product pages, confident checkout and smooth mobile shopping for Balkan businesses.',
    },
    'ai-automation': {
      title: 'AI Automation for Business Workflows — QCT Studio',
      description: 'Practical AI automation that reduces repetitive work, improves lead routing and keeps your team in control of important decisions.',
    },
    'seo-performance': {
      title: 'SEO & GEO for Google and AI Search — QCT Studio',
      description: 'Technical SEO, content structure and GEO readiness that help Balkan businesses appear in Google and modern AI-powered search.',
    },
    'whatsapp-commerce': {
      title: 'WhatsApp Commerce Solutions — QCT Studio',
      description: 'Connect websites, ads and product interest with clearer WhatsApp sales journeys that make enquiries easier to manage and convert.',
    },
    'meta-ads': {
      title: 'Meta Ads Landing Page Design — QCT Studio',
      description: 'Focused landing pages aligned with Meta Ads campaigns to reduce distraction, strengthen message match and generate better enquiries.',
    },
    careers: {
      title: 'Careers at QCT Studio — Join Our Digital Team',
      description: 'Explore opportunities at QCT Studio for responsible, clear communicators who want to build useful digital work for Balkan businesses.',
    },
    contact: {
      title: 'Contact QCT Studio — Start Your Digital Project',
      description: 'Contact QCT Studio about websites, e-commerce, SEO, GEO, landing pages and AI automation for your business in the Balkans.',
    },
    work: {
      title: 'Selected Digital Work & Case Studies — QCT Studio',
      description: 'Explore live website and e-commerce work by QCT Studio for HEADWEAR, Misima Group, Artman Group and Phiaderm across different industries.',
    },
    'headwear-case-study': {
      title: 'HEADWEAR E-commerce Case Study — QCT Studio',
      description: 'See how QCT Studio structured a multilingual e-commerce experience for HEADWEAR performance and outdoor products across devices and markets.',
    },
    'misima-case-study': {
      title: 'Misima Group Corporate Website Case Study — QCT Studio',
      description: 'See how QCT Studio planned, designed and developed the 2025 Misima Group website for cosmetics services, brands and international B2B audiences.',
    },
    'artman-case-study': {
      title: 'Artman Group Corporate Website Case Study — QCT Studio',
      description: 'See how QCT Studio structured the Artman Group corporate website to clarify a broad supply portfolio and support B2B enquiries across Türkiye.',
    },
    'phiaderm-case-study': {
      title: 'Phiaderm Beauty E-commerce Case Study — QCT Studio',
      description: 'Follow QCT Studio’s pre-launch Phiaderm e-commerce work with affiliated agency Rexcode, focused on a refined storefront and secure Shopify foundations.',
    },
  },

  sq: {
    home: {
      title: 'QCT Studio — Faqe interneti, E-commerce dhe AI në Ballkan',
      description: 'QCT Studio ndërton faqe interneti, dyqane online dhe automatizime me AI për biznese në Shqipëri dhe Maqedoninë e Veriut.',
    },
    about: {
      title: 'Rreth QCT Studio — Partner Digjital për Bizneset Ballkanike',
      description: 'Njihuni me QCT Studio, themeluar në Stamboll nga Teyfik Gökdemir për të ndërtuar faqe, e-commerce dhe sisteme digjitale për bizneset ballkanike.',
    },
    services: {
      title: 'Faqe, E-commerce, SEO dhe AI — QCT Studio',
      description: 'Zbuloni dizajn faqesh, e-commerce, WhatsApp Commerce, SEO, GEO, faqe për Meta Ads dhe automatizim me AI për bizneset ballkanike.',
    },
    'website-design': {
      title: 'Dizajn Faqesh për Bizneset Ballkanike — QCT Studio',
      description: 'Dizajn premium faqesh për biznese në Shqipëri dhe Maqedoninë e Veriut që kërkojnë më shumë besim, qartësi dhe performancë në celular.',
    },
    'e-commerce': {
      title: 'Zhvillim Faqesh E-commerce — QCT Studio',
      description: 'Dyqane online me faqe të qarta produktesh, pagesë të sigurt dhe blerje të rrjedhshme në celular për bizneset ballkanike.',
    },
    'ai-automation': {
      title: 'Automatizim me AI për Bizneset — QCT Studio',
      description: 'Automatizim praktik me AI që ul punën e përsëritur, përmirëson menaxhimin e kërkesave dhe ruan kontrollin e ekipit.',
    },
    'seo-performance': {
      title: 'SEO & GEO për Google dhe Kërkimin me AI — QCT Studio',
      description: 'SEO teknike, strukturë përmbajtjeje dhe GEO që ndihmojnë bizneset ballkanike të shfaqen në Google dhe kërkimin modern me AI.',
    },
    'whatsapp-commerce': {
      title: 'Zgjidhje WhatsApp Commerce — QCT Studio',
      description: 'Lidhni faqen, reklamat dhe interesin për produktet me një proces më të qartë shitjeje dhe komunikimi në WhatsApp.',
    },
    'meta-ads': {
      title: 'Dizajn Faqesh për Meta Ads — QCT Studio',
      description: 'Faqe të fokusuara për fushatat Meta Ads që përputhen me mesazhin e reklamës, ulin shpërqendrimet dhe rrisin kërkesat.',
    },
    careers: {
      title: 'Karriera në QCT Studio — Bashkohuni me Ekipin',
      description: 'Shikoni mundësitë në QCT Studio për njerëz të përgjegjshëm që komunikojnë qartë dhe duan të krijojnë punë digjitale me vlerë.',
    },
    contact: {
      title: 'Kontaktoni QCT Studio — Nisni Projektin Tuaj',
      description: 'Kontaktoni QCT Studio për faqe interneti, e-commerce, SEO, GEO, faqe reklamash dhe automatizim me AI në Ballkan.',
    },
    work: {
      title: 'Punë Digjitale dhe Projekte të Zgjedhura — QCT Studio',
      description: 'Shikoni faqe dhe projekte e-commerce aktive nga QCT Studio për HEADWEAR, Misima Group, Artman Group dhe Phiaderm në industri të ndryshme.',
    },
    'headwear-case-study': {
      title: 'HEADWEAR — Projekt E-commerce nga QCT Studio',
      description: 'Shikoni si QCT Studio strukturoi një përvojë shumëgjuhëshe e-commerce për produktet performance dhe outdoor të HEADWEAR.',
    },
    'misima-case-study': {
      title: 'Misima Group — Studim Rasti për Faqen Korporative',
      description: 'Shikoni si QCT Studio planifikoi, dizajnoi dhe zhvilloi në vitin 2025 faqen e Misima Group për shërbime kozmetike, marka dhe audienca B2B.',
    },
    'artman-case-study': {
      title: 'Artman Group — Studim Rasti për Faqen Korporative',
      description: 'Shikoni si QCT Studio strukturoi faqen korporative të Artman Group për të qartësuar një portofol të gjerë furnizimi dhe kërkesat B2B.',
    },
    'phiaderm-case-study': {
      title: 'Phiaderm — Studim Rasti për E-commerce Bukurie',
      description: 'Ndiqni punën para lansimit të QCT Studio për Phiaderm me agjencinë e lidhur Rexcode, me fokus te dyqani i rafinuar dhe baza e sigurt Shopify.',
    },
  },

  mk: {
    home: {
      title: 'QCT Studio — Веб-страници, е-трговија и AI за Балканот',
      description: 'QCT Studio изработува веб-страници, онлајн продавници и AI автоматизации за компании во Албанија и Северна Македонија.',
    },
    about: {
      title: 'За QCT Studio — Дигитален партнер за балкански компании',
      description: 'Запознајте го QCT Studio, основано во Истанбул од Teyfik Gökdemir за веб-страници, е-трговија и дигитални системи за балкански компании.',
    },
    services: {
      title: 'Веб, е-трговија, SEO и AI услуги — QCT Studio',
      description: 'Откријте веб-дизајн, е-трговија, WhatsApp Commerce, SEO, GEO, страници за Meta Ads и AI автоматизација за балкански компании.',
    },
    'website-design': {
      title: 'Дизајн на веб-страници за Балканот — QCT Studio',
      description: 'Премиум веб-дизајн за компании во Албанија и Северна Македонија на кои им треба поголема доверба, јасност и мобилни перформанси.',
    },
    'e-commerce': {
      title: 'Изработка на веб-страници за е-трговија — QCT Studio',
      description: 'Онлајн продавници со јасни производи, сигурна наплата и непречено мобилно купување за балкански компании.',
    },
    'ai-automation': {
      title: 'AI автоматизација за деловни процеси — QCT Studio',
      description: 'Практична AI автоматизација што ја намалува повторливата работа, го подобрува управувањето со барањата и ја задржува контролата на тимот.',
    },
    'seo-performance': {
      title: 'SEO & GEO за Google и AI пребарување — QCT Studio',
      description: 'Техничко SEO, структура на содржина и GEO што им помагаат на балканските компании да се појават во Google и модерното AI пребарување.',
    },
    'whatsapp-commerce': {
      title: 'WhatsApp Commerce решенија — QCT Studio',
      description: 'Поврзете ги веб-страницата, рекламите и интересот за производи со појасен процес за продажба и комуникација преку WhatsApp.',
    },
    'meta-ads': {
      title: 'Дизајн на страници за Meta Ads — QCT Studio',
      description: 'Фокусирани страници за Meta Ads што ја следат пораката на рекламата, ги намалуваат одвлекувањата и создаваат повеќе барања.',
    },
    careers: {
      title: 'Кариера во QCT Studio — Придружете му се на тимот',
      description: 'Истражете ги можностите во QCT Studio за одговорни луѓе што комуницираат јасно и сакаат да создаваат корисна дигитална работа.',
    },
    contact: {
      title: 'Контактирајте го QCT Studio — Започнете проект',
      description: 'Контактирајте го QCT Studio за веб-страници, е-трговија, SEO, GEO, рекламни страници и AI автоматизација на Балканот.',
    },
    work: {
      title: 'Избрани дигитални проекти и студии — QCT Studio',
      description: 'Разгледајте активни веб и e-commerce проекти од QCT Studio за HEADWEAR, Misima Group, Artman Group и Phiaderm во различни индустрии.',
    },
    'headwear-case-study': {
      title: 'HEADWEAR — Студија за е-трговија | QCT Studio',
      description: 'Погледнете како QCT Studio обликува повеќејазично e-commerce искуство за performance и outdoor производите на HEADWEAR.',
    },
    'misima-case-study': {
      title: 'Misima Group — Студија за корпоративна веб-страница',
      description: 'Погледнете како QCT Studio ја планира, дизајнира и разви веб-страницата на Misima Group во 2025 за козметички услуги, брендови и B2B публика.',
    },
    'artman-case-study': {
      title: 'Artman Group — Студија за корпоративна веб-страница',
      description: 'Погледнете како QCT Studio ја структурира веб-страницата на Artman Group за јасно портфолио на снабдување и B2B барања низ Турција.',
    },
    'phiaderm-case-study': {
      title: 'Phiaderm — Студија за Beauty E-commerce',
      description: 'Следете ја работата на QCT Studio за Phiaderm пред лансирање со поврзаната агенција Rexcode, со префинета продавница и сигурна Shopify основа.',
    },
  },

  sr: {
    home: {
      title: 'QCT Studio — Sajtovi, e-commerce i AI za Balkan',
      description: 'QCT Studio izrađuje sajtove, internet prodavnice i AI automatizacije za kompanije u Albaniji, Severnoj Makedoniji i širom Balkana.',
    },
    about: {
      title: 'O QCT Studiju — Digitalni partner za Balkan',
      description: 'Upoznajte QCT Studio, koji je Teyfik Gökdemir osnovao u Istanbulu za izradu sajtova, e-commerce sistema i digitalnih rešenja za Balkan.',
    },
    services: {
      title: 'Sajtovi, e-commerce, SEO i AI usluge — QCT Studio',
      description: 'Istražite dizajn sajtova, e-commerce, WhatsApp Commerce, SEO, GEO, Meta Ads stranice i AI automatizaciju za kompanije na Balkanu.',
    },
    'website-design': {
      title: 'Dizajn sajtova za balkanske kompanije — QCT Studio',
      description: 'Premium dizajn sajtova za kompanije na Balkanu kojima su potrebni snažnije poverenje, jasnije pozicioniranje i bolje mobilne performanse.',
    },
    'e-commerce': {
      title: 'Izrada e-commerce prodavnica — QCT Studio',
      description: 'E-commerce prodavnice sa jasnim stranicama proizvoda, pouzdanom naplatom i jednostavnom mobilnom kupovinom za kompanije na Balkanu.',
    },
    'ai-automation': {
      title: 'AI automatizacija poslovnih procesa — QCT Studio',
      description: 'Praktična AI automatizacija koja smanjuje ponavljajući rad, poboljšava obradu upita i zadržava kontrolu važnih odluka u vašem timu.',
    },
    'seo-performance': {
      title: 'SEO & GEO za Google i AI pretragu — QCT Studio',
      description: 'Tehnički SEO, struktura sadržaja i GEO spremnost koji pomažu balkanskim kompanijama da se pojave na Google-u i u AI pretragama.',
    },
    'whatsapp-commerce': {
      title: 'WhatsApp Commerce rešenja — QCT Studio',
      description: 'Povežite sajt, oglase i interesovanje za proizvode sa jasnijim WhatsApp prodajnim tokom koji olakšava upravljanje upitima i prodajom.',
    },
    'meta-ads': {
      title: 'Dizajn odredišnih stranica za Meta Ads — QCT Studio',
      description: 'Fokusirane stranice usklađene sa Meta Ads kampanjama koje smanjuju ometanja, jačaju poruku oglasa i stvaraju kvalitetnije upite.',
    },
    careers: {
      title: 'Karijera u QCT Studiju — Pridružite se timu',
      description: 'Istražite prilike u QCT Studiju za odgovorne ljude koji jasno komuniciraju i žele da stvaraju koristan digitalni rad za Balkan.',
    },
    contact: {
      title: 'Kontaktirajte QCT Studio — Pokrenite digitalni projekat',
      description: 'Kontaktirajte QCT Studio za sajtove, e-commerce, SEO, GEO, odredišne stranice i AI automatizaciju za vaš biznis na Balkanu.',
    },
    work: {
      title: 'Izabrani digitalni projekti i studije — QCT Studio',
      description: 'Pogledajte aktivne web i e-commerce projekte QCT Studija za HEADWEAR, Misima Group, Artman Group i Phiaderm u različitim industrijama.',
    },
    'headwear-case-study': {
      title: 'HEADWEAR — E-commerce studija | QCT Studio',
      description: 'Pogledajte kako je QCT Studio oblikovao višejezično e-commerce iskustvo za HEADWEAR performance i outdoor proizvode.',
    },
    'misima-case-study': {
      title: 'Misima Group — Studija korporativnog sajta',
      description: 'Pogledajte kako je QCT Studio 2025. planirao, dizajnirao i razvio sajt Misima Group za kozmetičke usluge, brendove i međunarodnu B2B publiku.',
    },
    'artman-case-study': {
      title: 'Artman Group — Studija korporativnog sajta',
      description: 'Pogledajte kako je QCT Studio strukturirao korporativni sajt Artman Group za jasan portfolio snabdevanja i B2B upite širom Turske.',
    },
    'phiaderm-case-study': {
      title: 'Phiaderm — Studija Beauty E-commerce Projekta',
      description: 'Pratite rad QCT Studija na Phiaderm projektu pre lansiranja sa povezanom agencijom Rexcode, uz prefinjenu prodavnicu i sigurnu Shopify osnovu.',
    },
  },


};

export function getPageSeo(page: SeoPage, lang: string): SeoEntry {
  const indexedLang: IndexedLang = lang === 'sq' || lang === 'mk' || lang === 'sr' ? lang : 'en';
  return seo[indexedLang][page];
}
