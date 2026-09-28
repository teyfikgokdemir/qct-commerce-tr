export interface AzBlogSection { heading: string; paragraphs: string[]; items?: string[]; }
export interface AzBlogPost {
  slug: string; trSlug: string; title: string; description: string; intro: string;
  summary: string[]; sections: AzBlogSection[]; relatedLabel: string; relatedHref: string;
  published: string; modified: string;
}
export const azBlogPosts: AzBlogPost[] = [
{
"slug":"pazaryeri-komissiya-dereceleri-2026","trSlug":"pazaryeri-komisyon-oranlari-2026",
"title":"Türkiyədə pazaryeri komissiyaları 2026: real marjanı necə hesablamaq olar?",
"description":"Trendyol, Hepsiburada, Amazon Türkiyə, n11, Pazarama və ÇiçekSepeti satışlarında komissiya, reklam, logistika və qaytarma xərclərini birlikdə hesablayın.",
"intro":"Pazaryerində yüksək satış dövriyyəsi avtomatik olaraq yüksək mənfəət demək deyil. Komissiya, xidmət haqları, kampaniya endirimi, reklam, çatdırılma və qaytarma xərcləri eyni sifarişdə toplandıqda real marja sürətlə darala bilər.",
"summary":["Tək komissiya faizinə deyil, sifariş üzrə ümumi xərcə baxın.","Cari faizləri kateqoriya və kampaniyaya görə satıcı panelində yoxlayın.","Reklam, logistika və qaytarma payını SKU səviyyəsində hesablayın.","Öz e-ticarət saytınızı pazaryerinə alternativ yox, tamamlayıcı kanal kimi qiymətləndirin.","Qərarı dövriyyə ilə deyil, sifariş başına töhfə marjası ilə verin."],
"sections":[
{"heading":"2026-da pazaryeri marjası niyə daha vacibdir?","paragraphs":["E-ticarət böyüdükcə qiymət, kampaniya və reklam rəqabəti də artır. Azərbaycan şirkəti Türkiyə bazarında satış edirsə, yalnız görünən komissiya faizinə baxmaq əvəzinə eyni sifariş üzrə bütün dəyişən xərcləri bir cədvəldə toplamalıdır."]},
{"heading":"Trendyol və Hepsiburada: cari satıcı şərtlərini əsas götürün","paragraphs":["Komissiya və əlavə kommersiya şərtləri kateqoriya, kampaniya və satıcı müqaviləsinə görə dəyişə bilər. Buna görə internetdə köhnə bir faiz siyahısını deyil, məhsulun yerləşdiyi gün satıcı panelində görünən cari şərtləri əsas götürün."]},
{"heading":"Amazon Türkiyə komissiyalarını necə qiymətləndirmək olar?","paragraphs":["Amazon Türkiyədə satış komissiyası kateqoriyaya görə dəyişir və logistika modeli, proqram və saxlama xərcləri əlavə ola bilər. Müqayisəni eyni məhsul üçün komissiya, fulfillment, reklam və ödəniş vaxtını birlikdə nəzərə alaraq aparın."]},
{"heading":"n11-də komissiya və xidmət haqları","paragraphs":["n11-də kateqoriya komissiyasından başqa marketinq və pazaryeri xidmət haqları tətbiq oluna bilər. Görünən komissiya faizi buna görə sifarişdən faktiki çıxılan ümumi məbləği tam ifadə etməyə bilər."]},
{"heading":"Pazarama və ÇiçekSepeti üçün nəyə baxmaq lazımdır?","paragraphs":["Bu kanallarda da kateqoriya, kampaniya, logistika və satıcı şərtləri dəyişə bilər. Xüsusilə aşağı qiymətli məhsullarda sabit əməliyyat xərclərinin marjaya faizlə təsiri daha yüksək olur."]},
{"heading":"Sifariş üzrə töhfə marjası necə hesablanır?","paragraphs":["Praktik yanaşma: satış gəlirindən məhsul maya dəyərini, pazaryeri kəsintilərini, logistikanı, reklam payını, gözlənilən qaytarma/imtina payını və sifarişə bağlı digər xərcləri çıxın. Qalan məbləğ sabit xərclər və vergilərdən əvvəl sifariş töhfəsini göstərir."]},
{"heading":"Pazaryerini tərk edib yalnız öz saytınıza keçmək lazımdırmı?","paragraphs":["Adətən tam keçid lazım deyil. Pazaryeri hazır tələb və kəşf təmin edir; öz mağazanız isə marka təcrübəsi, müştəri əlaqəsi, SEO, AI görünürlüyü və marja üzərində daha çox nəzarət verir. Hibrid kanal modeli çox vaxt daha dayanıqlıdır."]},
{"heading":"Cari məlumatları haradan yoxlamaq lazımdır?","paragraphs":["Son qərarı platformaların rəsmi satıcı mərkəzləri və öz hesabınızdakı cari kommersiya şərtləri ilə verin. Komissiya və xidmət haqları dəyişə bildiyi üçün bu məlumatları dövri olaraq yenidən yoxlamaq lazımdır."]}
],"relatedLabel":"E-ticarət və kanal strategiyasına baxın","relatedHref":"/az/e-ticaret/","published":"2026-09-22","modified":"2026-09-28"
},
{
"slug":"ikas-qiymetleri-2026","trSlug":"ikas-fiyatlari-2026-kurulum-tema-seo-maliyetleri",
"title":"ikas qiymətləri 2026: paket, qurulum, tema, SEO və əlavə xərclər",
"description":"ikas layihəsində platforma lisenziyası, peşəkar qurulum, tema, məhsul girişi, SEO, inteqrasiya və üçüncü tərəf xərclərini ayrı planlayın.",
"intro":"“ikas nə qədərdir?” sualının tək rəqəmli cavabı yoxdur. Platforma lisenziyası ilə mağazanın satışa hazır vəziyyətə gətirilməsi fərqli xərc qruplarıdır.",
"summary":["Platforma paketini xidmət haqqından ayırın.","Tema, məhsul girişi və miqrasiya əhatəsini əvvəlcədən yazın.","SEO-nu sadəcə paneldəki sahələri doldurmaq kimi qəbul etməyin.","Ən az 12 aylıq ümumi sahibolma xərcini müqayisə edin."],
"sections":[
{"heading":"ikas qiyməti niyə tək rəqəm deyil?","paragraphs":["Layihədə platforma paketi, professional qurulum, tema işi, məhsul məlumatının hazırlanması, miqrasiya, analitika və inteqrasiyalar ayrı iş yükü yaradır. Təklifdə bunların hansının daxil olduğunu açıq göstərmək lazımdır."]},
{"heading":"Peşəkar ikas mağaza qurulması","paragraphs":["Yaxşı qurulum yalnız hesab açmaq deyil. Kateqoriya və menyu, mobil görünüş, məhsul səhifəsi, ödəniş və çatdırılma axını, analitika və əsas texniki SEO canlıya çıxmazdan əvvəl birlikdə yoxlanmalıdır."]},
{"heading":"Tema, məhsullar və miqrasiya","paragraphs":["Xüsusi tema düzəlişləri, məhsul girişi, CSV təmizliyi, kateqoriya uyğunlaşdırması, şəkil optimallaşdırması və köhnə URL-lərin yönləndirilməsi layihənin əhatəsini və qiymətini dəyişir."]},
{"heading":"SEO və ümumi sahibolma xərci","paragraphs":["Peşəkar SEO indeksləmə, arxitektura, axtarış niyyəti, schema, daxili linklər və Search Console nəzarətini əhatə edə bilər. Platformanı müqayisə edərkən yalnız aylıq lisenziyaya yox, 12 aylıq ümumi əməliyyat xərcinə baxın."]}
],"relatedLabel":"ikas mağaza qurulmasına baxın","relatedHref":"/az/ikas-magaza-qurulmasi/","published":"2026-09-21","modified":"2026-09-28"
},
{
"slug":"saytim-google-da-niye-gorunmur","trSlug":"web-sitem-google-da-neden-cikmiyor",
"title":"Saytım Google-da niyə görünmür? 2026 yoxlama siyahısı",
"description":"İndeksləmə, Search Console, robots, canonical, məzmun keyfiyyəti, daxili linklər və şirkət siqnallarını yoxlayın.",
"intro":"Saytın Google-da görünməməsi bir səbəbdən baş vermir. İndeksləmə, canonical/noindex səhvləri, zəif məzmun, daxili link çatışmazlığı və qeyri-müəyyən şirkət məlumatları eyni anda təsir göstərə bilər.",
"summary":["Səhifənin indeksdə olub-olmadığını yoxlayın.","Robots, noindex, canonical və sitemap səhvlərini aradan qaldırın.","Search Console-u URL səviyyəsində analiz edin.","Səhifənin real axtarış niyyətinə birbaşa cavab verdiyinə əmin olun."],
"sections":[
{"heading":"Google səhifəni görə bilir?","paragraphs":["URL Inspection, HTTP statusu, sitemap, robots.txt və daxili linklərdən başlayın. İndekslənməyən səhifədə kontent və backlink işi etmədən əvvəl texniki girişi düzəltmək lazımdır."]},
{"heading":"Canonical və URL quruluşu düzgündür?","paragraphs":["Dublikat URL-lər, parametrli səhifələr və səhv canonical etiketi Google-a hansı səhifənin əsas olduğunu qeyri-müəyyən göstərə bilər. Hər indekslənən səhifə üçün aydın self-canonical quruluş saxlayın."]},
{"heading":"Səhifə sorğuya həqiqətən cavab verir?","paragraphs":["Başlıqda açar söz yazmaq kifayət deyil. İstifadəçinin nə öyrənmək və ya nə almaq istədiyini anlayıb cavabı səhifənin əvvəlində aydın şəkildə vermək lazımdır."]},
{"heading":"Marka və yerli siqnallar ardıcıldır?","paragraphs":["Şirkət adı, xidmətlər, əlaqə məlumatı, xidmət bölgəsi, sosial profillər və strukturlaşdırılmış məlumat bir-biri ilə ziddiyyət təşkil etməməlidir. Azərbaycan şirkəti Türkiyə və ya başqa bazara çıxırsa, bazar və dil siqnalları da ayrıca aydın olmalıdır."]}
],"relatedLabel":"SEO, GEO, AEO və AIO xidmətinə baxın","relatedHref":"/az/seo-geo/","published":"2026-09-21","modified":"2026-09-28"
},
{
"slug":"chatgpt-de-sirketim-nece-gorunsun","trSlug":"chatgpt-de-firmam-nasil-gorunur",
"title":"Şirkətim ChatGPT və AI axtarışlarında necə görünsün?",
"description":"ChatGPT, Gemini, Claude, Perplexity və AI axtarışında şirkətin daha aydın anlaşılması üçün entity, məzmun və mənbə siqnallarını gücləndirin.",
"intro":"Şirkəti ChatGPT-də göstərən tək qeydiyyat forması və ya zəmanətli meta etiketi yoxdur. Məqsəd şirkətin kim olduğunu, nə etdiyini və hansı bazara xidmət göstərdiyini açıq və doğrulana bilən şəkildə təqdim etməkdir.",
"summary":["Şirkət və xidmət məlumatlarını bütün səhifələrdə ardıcıl saxlayın.","Real müştəri suallarına birbaşa cavab verən məzmun yaradın.","Schema görünən məzmunla uyğun olmalıdır.","Marka və xidmət sorğularını, sitat və referral siqnallarını izləyin."],
"sections":[
{"heading":"AI sistemi şirkəti necə anlaya bilər?","paragraphs":["Açıq veb səhifələri, axtarış nəticələri və digər etibarlı mənbələr şirkət haqqında kontekst yaradır. Sayt şirkətin adı, xidmətləri, bazarı, əlaqə yolu və real təcrübəsini bir-birini təsdiqləyən formada təqdim etməlidir."]},
{"heading":"GEO, AEO və AIO nə edir?","paragraphs":["GEO generativ sistemlərin konteksti anlamasına, AEO birbaşa cavab formatına, AIO isə daha geniş AI dəstəkli kəşf kanallarına fokuslanır. Bunlar klassik texniki SEO-nu əvəz etmir, onun üzərində işləyir."]},
{"heading":"Hansı səhifələr AI görünürlüyünü gücləndirir?","paragraphs":["Ətraflı xidmət səhifələri, qiymətlər, müqayisələr, FAQ, real iş nümunələri və aktual bələdçilər ümumi marketinq cümlələrindən daha faydalı kontekst yaradır."]},
{"heading":"Schema təkbaşına kifayətdirmi?","paragraphs":["Xeyr. Strukturlaşdırılmış məlumat görünən məzmunu təsvir edir; zəif, natamam və ya ziddiyyətli məzmunu kompensasiya edə bilməz. Xarici etibar siqnalları və ardıcıl marka məlumatı da vacibdir."]}
],"relatedLabel":"AI görünürlüyü və GEO xidmətinə baxın","relatedHref":"/az/seo-geo/","published":"2026-09-21","modified":"2026-09-28"
},
{
"slug":"veb-sayt-qiymetleri-2026","trSlug":"web-sitesi-yaptirma-fiyatlari-2026",
"title":"Veb sayt qiymətləri 2026: layihənin qiymətini nə dəyişir?",
"description":"Korporativ sayt, e-ticarət və yenilənmə layihələrində səhifə sayı, məhsul, inteqrasiya, miqrasiya və məzmun əhatəsinin qiymətə təsirini anlayın.",
"intro":"Görünüşcə oxşar iki saytın qiyməti çox fərqli ola bilər. Real iş yalnız dizayn deyil; informasiya arxitekturası, mobil UX, məzmun, inteqrasiya, SEO miqrasiyası və QA da layihəyə daxildir.",
"summary":["Funksiya və məzmun əhatəsi səhifə sayı qədər vacibdir.","Məhsul və inteqrasiya sayı e-ticarət qiymətini dəyişir.","Yenilənmədə mövcud SEO və URL tarixçəsi qorunmalıdır.","Lisenziya və üçüncü tərəf xərclərini xidmət haqqından ayırın."],
"sections":[
{"heading":"Korporativ sayt qiymətini nə müəyyən edir?","paragraphs":["Səhifə və şablon sayı, mobil interfeys, mətn və vizual hazırlıq, formalar, analitika, texniki SEO və canlıya çıxış QA-sı əsas iş yükünü formalaşdırır."]},
{"heading":"E-ticarətdə əlavə xərci nə yaradır?","paragraphs":["Platforma seçimi, məhsul və variant sayı, məhsul girişi, ödəniş/kargo inteqrasiyası, kateqoriya quruluşu və mövcud mağazadan miqrasiya qiyməti dəyişdirir."]},
{"heading":"Niyə mövcud saytı yeniləmək bəzən yenisini qurmaqdan çətindir?","paragraphs":["İndekslənən URL-lər, analitika, mövcud inteqrasiyalar və trafik tarixçəsi qorunmalıdır. Səhv miqrasiya vizual olaraq yaxşı nəticə versə də orqanik görünürlüyə zərər verə bilər."]},
{"heading":"Şəffaf qiymət təklifi nə göstərməlidir?","paragraphs":["Başlanğıc əhatə, daxil olan səhifə və məhsul sayı, reviziya limiti, inteqrasiyalar, lisenziyalar, istisnalar və üçüncü tərəf xərcləri ayrıca göstərilməlidir."]}
],"relatedLabel":"Azərbaycan qiymətlərinə baxın","relatedHref":"/az/qiymetler/","published":"2026-09-21","modified":"2026-09-28"
},
{
"slug":"ikas-yoxsa-shopify","trSlug":"ikas-mi-shopify-mi-2026",
"title":"ikas yoxsa Shopify? 2026 müqayisəsi",
"description":"Ödəniş, inteqrasiya, əməliyyat, beynəlxalq satış, SEO və ümumi sahibolma xərci üzrə ikas və Shopify platformalarını müqayisə edin.",
"intro":"ikas və Shopify arasında hamı üçün tək qalib yoxdur. Seçim satış ölkələrinizə, komandanın texniki imkanına, lokal inteqrasiyalara və beynəlxalq böyümə planına görə dəyişir.",
"summary":["Əvvəl satış ölkələrini, ödəniş və əməliyyat ehtiyacını müəyyən edin.","Lokal inteqrasiya rahatlığını qlobal tətbiq ekosistemi ilə müqayisə edin.","SEO nəticəsi platformadan çox tətbiq keyfiyyətindən asılıdır.","12 aylıq ümumi sahibolma xərci ilə qərar verin."],
"sections":[
{"heading":"Azərbaycan və Türkiyə ilə işləyən biznes üçün nə vacibdir?","paragraphs":["Ödəniş provayderləri, kargo, e-faktura, marketplace inteqrasiyaları, dəstək dili və komandanın platformanı idarə etmə bacarığı seçimdə əsas rol oynayır. Sərhədlərarası satış planı varsa valyuta və lokalizasiya ehtiyacları da ayrıca qiymətləndirilməlidir."]},
{"heading":"Shopify nə zaman daha məntiqli ola bilər?","paragraphs":["Çox ölkəyə satış, geniş qlobal tətbiq ekosistemi və beynəlxalq developer dəstəyi tələb edən markalar üçün Shopify daha uyğun ola bilər. Bununla yanaşı lokal ödəniş və əməliyyat inteqrasiyaları əvvəlcədən yoxlanmalıdır."]},
{"heading":"ikas nə zaman daha məntiqli ola bilər?","paragraphs":["Türkiyə bazarında lokal dəstək, yerli inteqrasiyalar və daha aşağı texniki idarəetmə yükü prioritetdirsə ikas praktik seçim ola bilər. Azərbaycan şirkətləri üçün Türkiyə əməliyyatı varsa bu üstünlüklər xüsusilə əhəmiyyətli ola bilər."]},
{"heading":"SEO üçün hansı platforma daha yaxşıdır?","paragraphs":["Heç biri avtomatik SEO nəticəsi vermir. URL quruluşu, kateqoriya arxitekturası, məzmun, schema, performans və daxili link keyfiyyəti platforma seçimindən daha çox təsir göstərə bilər."]}
],"relatedLabel":"E-ticarət platforma seçimlərinə baxın","relatedHref":"/az/e-ticaret/","published":"2026-09-21","modified":"2026-09-28"
},
{
"slug":"mobil-e-ticaret-niye-satmir","trSlug":"mobil-e-ticaret-sitesi-neden-satis-yapmiyor",
"title":"Mobil e-ticarət saytı niyə satış etmir? 2026 bələdçisi",
"description":"Sürət, menyu, filtr, variant, səbət və checkout sürtünməsini yoxlayaraq mobil dönüşüm problemlərini tapın.",
"intro":"Sayt desktopda yaxşı görünə bilər, amma mobil cihazda menyu, filtr, variant, çatdırılma məlumatı və checkout problemləri birlikdə satış itkisi yarada bilər.",
"summary":["Menyu, axtarış və filtrləri real telefonda test edin.","Qiymət, variant, çatdırılma və CTA qərar sahəsinə yaxın olsun.","Səbət və checkout addımlarını sadələşdirin.","Performans göstəricilərini dönüşüm məlumatı ilə birlikdə oxuyun."],
"sections":[
{"heading":"İlk 10 saniyədə istifadəçi nə görür?","paragraphs":["İstifadəçi məhsulu və ya əsas dəyər təklifini, qiyməti və növbəti addımı sürətlə anlamalıdır. İlk ekranda lazımsız vizual yük və qeyri-müəyyən CTA dönüşümü zəiflədə bilər."]},
{"heading":"Menyu, axtarış və filtrlər həqiqətən işləyir?","paragraphs":["Touch sahələri, menyunun bağlanması, arxa fon scroll-u, filtr seçimi və kateqoriya keçidləri real cihazlarda yoxlanmalıdır. Responsive görünmək mobil istifadə rahatlığı demək deyil."]},
{"heading":"Məhsul səhifəsində kritik sürtünmə","paragraphs":["Variant, stok, çatdırılma, qaytarma, ödəniş və zəmanət məlumatları səbətə əlavə etməzdən əvvəl başa düşülən olmalıdır. Xüsusilə mobil ekranda əsas CTA-nın itib getməməsi vacibdir."]},
{"heading":"Checkout niyə yarımçıq qalır?","paragraphs":["Gözlənilməz çatdırılma haqqı, məcburi hesab, uzun formalar və anlaşılmayan səhv mesajları checkout tərkini artıra bilər. Uğursuz ödəniş və geri qayıtma ssenarilərini də test edin."]}
],"relatedLabel":"Mobil e-ticarət yaxşılaşdırmasına baxın","relatedHref":"/az/e-ticaret/","published":"2026-09-21","modified":"2026-09-28"
},
{
"slug":"shopify-magaza-qurulmasi-beledci","trSlug":"shopify-magaza-kurma-rehberi",
"title":"Shopify mağaza qurulması: canlıya çıxmazdan əvvəl nə planlanmalıdır?",
"description":"Shopify layihəsində platforma uyğunluğu, məhsul, kateqoriya, ödəniş, çatdırılma, mobil UX, analitika və canlıya çıxış QA-sını planlayın.",
"intro":"Shopify qurmaq tema seçib məhsul yükləməkdən ibarət deyil. Platforma uyğunluğu, ödəniş, çatdırılma, məhsul quruluşu, mobil UX və əməliyyat birlikdə planlanmalıdır.",
"summary":["Shopify-ın biznes modelinizə uyğunluğunu əvvəl yoxlayın.","Dizayndan əvvəl məhsul, kateqoriya, ödəniş və çatdırılma axınını müəyyən edin.","Mobil alış prosesini real sifariş ssenariləri ilə test edin.","Analitikanı düzgün event-lərlə canlıya çıxmazdan əvvəl hazırlayın."],
"sections":[
{"heading":"Shopify kimə uyğun ola bilər?","paragraphs":["Texniki baxım yükünü azaltmaq, məhsul və sifarişi mərkəzləşdirmək, gələcəkdə bir neçə ölkəyə satış etmək istəyən şirkətlər üçün Shopify uyğun ola bilər. Lokal ödəniş və logistika uyğunluğu isə ayrıca yoxlanmalıdır."]},
{"heading":"Məhsul və kateqoriyalar necə hazırlanmalıdır?","paragraphs":["Kateqoriya və filtrlər daxili anbar məntiqinə deyil, müştərinin məhsulu necə axtardığına görə qurulmalıdır. Məhsul adı, variant, ölçü, material və istifadə məlumatı standartlaşdırılmalıdır."]},
{"heading":"Ödəniş, çatdırılma və canlıya çıxış testləri","paragraphs":["Provayder uyğunluğunu təsdiqləyin; uğurlu alış, uğursuz ödəniş, stok dəyişməsi, bildirişlər, yönləndirmələr, analitika və indeksləmə ssenarilərini canlıya çıxmazdan əvvəl yoxlayın."]}
],"relatedLabel":"Shopify mağaza qurulmasına baxın","relatedHref":"/az/shopify-magaza-qurulmasi/","published":"2026-09-21","modified":"2026-09-28"
},
{
"slug":"e-ticaretde-yaygin-sehvler","trSlug":"e-ticarette-yapilan-hatalar",
"title":"E-ticarətdə satış yolunu zəiflədən yayğın səhvlər",
"description":"Auditoriya, məhsul məlumatı, mobil istifadə, checkout etibarı və ölçüm üzrə e-ticarət problemlərini yoxlayın.",
"intro":"E-ticarət problemi çox vaxt tək bir pis düymədən yaranmır. Qeyri-müəyyən təklif, zəif məhsul məlumatı, çətin mobil istifadə və natamam ölçüm birlikdə dönüşümü aşağı sala bilər.",
"summary":["Təklifi konkret müştəri ehtiyacına uyğunlaşdırın.","Məhsul səhifəsində qərar suallarını cavablandırın.","Mobil axını real cihazlarda test edin.","Dönüşüm mərhələlərini düzgün ölçün."],
"sections":[
{"heading":"Auditoriya qeyri-müəyyəndir və məhsul izahı zəifdir","paragraphs":["Ana səhifə, kateqoriya, məhsul səhifəsi və reklam mesajı eyni müştəri probleminə cavab verməlidir. Məhsulun kimə uyğun olduğu, əsas fərqi və seçim meyarları aydın deyilsə trafik satışa çevrilməyə bilər."]},
{"heading":"Mobil və checkout sürtünməsi","paragraphs":["Responsive dizayn mobil istifadə rahatlığı ilə eyni deyil. Filtrlər, variantlar, səbət, kupon, çatdırılma və checkout real telefonda addım-addım yoxlanmalıdır."]},
{"heading":"Ölçmədən dəyişiklik etmək","paragraphs":["Product view, add-to-cart, checkout və purchase event-ləri düzgün deyilsə hansı dəyişikliyin nəticə verdiyini anlamaq çətinləşir. Dizayn qərarlarını yalnız şəxsi zövqlə deyil, real davranış məlumatı ilə yoxlayın."]}
],"relatedLabel":"E-ticarət yanaşmamıza baxın","relatedHref":"/az/e-ticaret/","published":"2026-09-21","modified":"2026-09-28"
},
{
"slug":"pazaryerinden-oz-saytina-kecid","trSlug":"pazaryerinden-kendi-sitene-gecis",
"title":"Pazaryerindən öz e-ticarət saytınıza nəzarətli keçid",
"description":"Kanal rolları, xərclər, müştəri məlumatı və əməliyyatı müqayisə edərək öz mağazanıza daha aşağı risklə keçid planlayın.",
"intro":"Öz e-ticarət saytınızı qurmaq pazaryerini dərhal bağlamaq demək deyil. Daha sağlam yanaşma birbaşa satış kanalını mərhələli şəkildə böyütməkdir.",
"summary":["Hər satış kanalına aydın rol verin.","Tək komissiya deyil, ümumi xərci müqayisə edin.","Müştəri məlumatını icazə və hüquqi çərçivəyə uyğun idarə edin.","Məhsul, stok və sifariş əməliyyatını əvvəlcədən planlayın."],
"sections":[
{"heading":"Öz mağazanız nə zaman məntiqli olur?","paragraphs":["Marka məhsulu daha detallı izah etmək, istifadəçi təcrübəsinə nəzarət etmək, birinci tərəf ölçüm qurmaq və təkrar alış münasibətini idarə etmək istəyirsə öz mağaza daha dəyərli olur."]},
{"heading":"Xərc və əməliyyat müqayisəsi","paragraphs":["Platforma, ödəniş komissiyası, reklam, məzmun, dəstək, logistika, qaytarma və komanda vaxtını birlikdə hesablayın. Pazaryeri komissiyasını sıfırlamaq öz saytın avtomatik daha ucuz olması demək deyil."]},
{"heading":"Daha aşağı riskli keçid planı","paragraphs":["Əvvəl məhdud məhsul qrupu ilə başlayın; ödəniş, çatdırılma, stok, bildiriş və müştəri dəstəyi ssenarilərini doğrulayın. Sonra reklam və orqanik trafiki mərhələli artırın."]}
],"relatedLabel":"E-ticarət platforma seçimlərinə baxın","relatedHref":"/az/e-ticaret/","published":"2026-09-21","modified":"2026-09-28"
},
{
"slug":"seo-geo-aeo-aio-beledci","trSlug":"ai-overviews-geo-aio-seo-rehberi",
"title":"SEO, GEO, AEO və AIO: 2026 görünürlük bələdçisi",
"description":"Klassik SEO və AI dəstəkli kəşf üçün texniki SEO, birbaşa cavab məzmunu, schema, entity və ölçüm çərçivəsini anlayın.",
"intro":"Axtarış görünürlüyü artıq tək bir açar söz üzrə sıralamadan ibarət deyil. Səhifə aydın suallara cavab verməli və şirkət haqqında doğrulana bilən entity məlumatı yaratmalıdır.",
"summary":["GEO və AIO-dan əvvəl texniki SEO bazasını düzəldin.","Hər səhifəyə aydın axtarış niyyəti və cavab verin.","Schema yalnız görünən məzmunla uyğun olduqda istifadə edin.","Marka, xidmət və mənbə siqnallarını ardıcıl saxlayın."],
"sections":[
{"heading":"SEO, GEO, AEO və AIO arasında fərq nədir?","paragraphs":["SEO tarama və indeksləmə bazasını qurur, AEO birbaşa cavabları strukturlaşdırır, GEO generativ sistemlərin konteksti anlamasını dəstəkləyir, AIO isə daha geniş AI əsaslı kəşf mühitini əhatə edir."]},
{"heading":"Məzmun necə hazırlanmalıdır?","paragraphs":["Sual yönümlü başlıq, səhifənin əvvəlində qısa cavab, sonra şərtlər, istisnalar, nümunələr və tətbiq detalı verin. Marketinq şüarından çox qərar verməyə kömək edən məlumat yaradın."]},
{"heading":"Strukturlaşdırılmış məlumat kifayətdirmi?","paragraphs":["Xeyr. Schema görünən məzmunun maşın tərəfindən anlaşılmasına kömək edir, amma zəif məzmunu və ya yanlış şirkət məlumatını düzəltmir."]},
{"heading":"Nəticəni necə ölçmək lazımdır?","paragraphs":["Klik və sıralamaya əlavə olaraq marka axtarışları, long-tail görünürlük, keyfiyyətli sorğular, Search Console dəyişiklikləri və ölçülə bildiyi halda AI referral trafikini birlikdə izləyin."]}
],"relatedLabel":"SEO, GEO, AEO və AIO xidmətinə baxın","relatedHref":"/az/seo-geo/","published":"2026-09-21","modified":"2026-09-28"
},
{
"slug":"mehsul-tesvirlerini-ai-ile-hazirlamaq","trSlug":"yapay-zeka-ile-urun-aciklamasi-hazirlama",
"title":"AI ilə məhsul təsviri: SEO və satış üçün nəzarətli metod",
"description":"Strukturlaşdırılmış məhsul məlumatı, kateqoriya şablonları və insan yoxlaması ilə AI məhsul təsvirlərini daha təhlükəsiz və faydalı hazırlayın.",
"intro":"AI məhsul təsvirini sürətləndirə bilər, amma yüzlərlə məhsula yoxlanmadan eyni mətn şablonunu tətbiq etmək yanlış, təkrarlanan və zəif səhifələr yarada bilər.",
"summary":["Əvvəl məhsul məlumatı üçün tək doğruluq mənbəyi yaradın.","Kateqoriyaya görə ayrı məzmun şablonları istifadə edin.","İnsan və məhsul sahibi yoxlamasını məcburi edin.","Axtarış niyyəti və alış qərarı məlumatını birlikdə optimallaşdırın."],
"sections":[
{"heading":"AI-a hansı məhsul məlumatı verilməlidir?","paragraphs":["Məhsul adı, model, material, ölçü, uyğunluq, istifadə sahəsi, qulluq, çatdırılma və zəmanət kimi faktları strukturlaşdırılmış formada verin. AI-dan bilmədiyi texniki xüsusiyyəti uydurmasını istəməyin."]},
{"heading":"Güclü məhsul təsviri nə daxil etməlidir?","paragraphs":["Qısa dəyər təklifi, əsas xüsusiyyətlər, istifadə ssenarisi, texniki detal, çatdırılma/qaytarma və real müştəri sualları məhsul səhifəsini həm axtarış, həm də satış üçün gücləndirir."]},
{"heading":"Dublikat məzmun riskini necə azaltmaq olar?","paragraphs":["Sadəcə sifətləri dəyişən bir şablon əvəzinə real variant fərqlərini məhsul datasından istifadə edin. Kateqoriya üzrə ortaq hissələri və məhsula xüsusi faktları ayrıca idarə edin."]},
{"heading":"Yayımdan əvvəl yoxlama siyahısı","paragraphs":["Texniki dəqiqlik, marka dili, oxunaqlılıq, daxili linklər, mobil görünüş, CTA və schema uyğunluğunu insan tərəfindən yoxlayın. Hüquqi və tibbi iddia tələb edən məhsullarda əlavə ekspert təsdiqi vacibdir."]}
],"relatedLabel":"E-ticarət məzmun arxitekturasına baxın","relatedHref":"/az/e-ticaret/","published":"2026-09-21","modified":"2026-09-28"
},
{
"slug":"whatsapp-satis-avtomatlasdirma","trSlug":"whatsapp-satis-otomasyonu-rehberi",
"title":"WhatsApp satış avtomatlaşdırması necə qurulur? B2B bələdçisi",
"description":"Kontekst toplayan, sorğunu doğru komandaya yönləndirən, follow-up-u görünən edən və insan nəzarətini qoruyan WhatsApp satış sistemi qurun.",
"intro":"WhatsApp satış avtomatlaşdırması sonsuz bot cavabları demək deyil. Faydalı sistem konteksti toplayır, təkrarlanan sualları cavablandırır, fürsəti yönləndirir və follow-up prosesini görünən edir.",
"summary":["Avtomatlaşdırmadan əvvəl sorğu növlərini və məsul şəxsi müəyyən edin.","Sayt və reklam kontekstini WhatsApp-a daşıyın.","Bot sərhədi və insana keçid qaydasını aydın yazın.","İcazə, məxfilik və ölçümü başlanğıcdan planlayın."],
"sections":[
{"heading":"WhatsApp satış avtomatlaşdırması hansı problemi həll edir?","paragraphs":["Gec cavab, natamam məlumat, yanlış komandaya yönləndirmə və unudulan follow-up real tələbi itirilmiş satışa çevirə bilər. Sistem bu nöqtələri standartlaşdırmaq üçün istifadə olunur."]},
{"heading":"Əsas axın necə qurulmalıdır?","paragraphs":["Yalnız həqiqətən lazım olan məlumatı toplayın: xidmət və ya məhsul, şirkət, hədəf, miqdar və əlaqə kimi. Müştəri uyğun nöqtədə real insana keçə bilməlidir."]},
{"heading":"Sayt və reklamla necə bağlanır?","paragraphs":["Fərqli xidmət səhifələri və kampaniyalar fərqli başlanğıc mesajı və source etiketi göndərə bilər. Beləliklə satış komandası müştərinin haradan və hansı niyyətlə gəldiyini ilk mesajdan anlayır."]},
{"heading":"Hansı göstəricilər vacibdir?","paragraphs":["İlk cavab müddəti, keyfiyyətli sorğu faizi, təklifə keçid, satış dönüşümü və cavabsız qalan söhbətlər əsas əməliyyat göstəriciləridir. Tək mesaj sayını uğur ölçüsü kimi istifadə etməyin."]}
],"relatedLabel":"WhatsApp satış sistemlərinə baxın","relatedHref":"/az/whatsapp-satis/","published":"2026-09-21","modified":"2026-09-28"
}
];
export function getAzBlogPost(slug:string){const p=azBlogPosts.find(x=>x.slug===slug);if(!p)throw new Error('Azerbaijani article not found: '+slug);return p;}
