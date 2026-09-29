const checks = [
  {
    url: 'https://qctcommerce.com/',
    verify: async (response, body) =>
      response.ok &&
      body.includes('/styles/qct-v2.css?v=20260929-1') &&
      !body.includes('qct-intro-overlay') &&
      !body.includes('Web sitesi yaptırma fiyatınızı 60 saniyede öğrenin') &&
      body.includes('id="fiyat-hesapla"'),
    label: 'Homepage non-blocking pricing experience and current CSS release',
  },
  {
    url: 'https://qctcommerce.com/lokasyon/kayseri/',
    verify: async (response, body) =>
      response.ok &&
      body.includes('Kayseri pazarında dijital talebi ticari bağlama göre kuruyoruz.') &&
      body.includes('href="/en/location/kayseri/"') &&
      !body.includes('Kayseri için kopya lokasyon sayfası değil') &&
      !body.includes('Mobilya, Üretim, İhracat odaklı şirketlerde bu alanı satış ve talep sürecinin diğer parçalarıyla birlikte kurguluyoruz.'),
    label: 'Kayseri differentiated market copy and locale mapping',
  },
  {
    url: 'https://qctcommerce.com/lokasyon/kayseri/e-ticaret/',
    verify: async (response, body) =>
      response.ok &&
      body.includes('Kayseri pazarında amaç') &&
      body.includes('mobilya ve üretim') &&
      body.includes('href="/en/location/kayseri/ecommerce/"') &&
      !body.includes('Bu sayfa genel lokasyon içeriğinin tekrarı değil') &&
      !body.includes('Kayseri hedefiyle uyumlu, ölçülebilir ve sürdürülebilir uygulama kapsamına dahil edilir.'),
    label: 'Kayseri service copy and same-page locale mapping',
  },
  {
    url: 'https://qctcommerce.com/en/location/kayseri/',
    verify: async (response, body) =>
      response.ok &&
      body.includes('targeting Kayseri') &&
      !body.includes('targeting kayseri') &&
      body.includes('href="/lokasyon/kayseri/"'),
    label: 'English Kayseri native casing and reciprocal locale mapping',
  },
];

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

for (const check of checks) {
  let passed = false;
  let last = '';
  for (let attempt = 1; attempt <= 20; attempt++) {
    try {
      const response = await fetch(check.url, { redirect: 'follow', headers: { 'user-agent': 'QCT-Commerce-Production-QA/2.0', 'cache-control': 'no-cache' } });
      const body = await response.text();
      last = `status=${response.status} url=${response.url} body=${body.slice(0,180).replace(/\s+/g,' ')}`;
      if (await check.verify(response, body)) {
        console.log(`PASS: ${check.label} (attempt ${attempt})`);
        passed = true;
        break;
      }
    } catch (error) {
      last = String(error);
    }
    await wait(15000);
  }
  if (!passed) throw new Error(`Production verification failed: ${check.label}. Last response: ${last}`);
}
