const checks = [
  {
    url: 'https://qctcommerce.com/lokasyon/kayseri/',
    verify: async (response, body) =>
      response.ok &&
      body.includes('Kayseri') &&
      body.includes('application/ld+json'),
    label: 'Kayseri programmatic market page',
  },
  {
    url: 'https://qctcommerce.com/lokasyon/kayseri/e-ticaret/',
    verify: async (response, body) =>
      response.ok &&
      body.includes('Kayseri') &&
      body.includes('E-Ticaret') &&
      body.includes('Service'),
    label: 'Kayseri programmatic service page',
  },
];

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

for (const check of checks) {
  let passed = false;
  let last = '';
  for (let attempt = 1; attempt <= 20; attempt++) {
    try {
      const response = await fetch(check.url, { redirect: 'follow', headers: { 'user-agent': 'QCT-Commerce-Production-QA/1.0' } });
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
