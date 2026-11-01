import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { chromium } from 'playwright';

// Run `npm run build` first. Uses real built pages; never sends leads or analytics.
const root = resolve('dist');
let server, browser, base;
before(async () => {
  server = createServer(async (req, res) => {
    try {
      let file = resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname));
      if (file !== root && !file.startsWith(root + sep)) throw new Error('Invalid path');
      if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html');
      const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.mp4': 'video/mp4' };
      res.setHeader('Content-Type', types[extname(file)] || 'application/octet-stream');
      res.end(await readFile(file));
    } catch { res.writeHead(404).end(); }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  base = `http://127.0.0.1:${server.address().port}`;
  const channel = process.env.P2_BROWSER_CHANNEL || (process.platform === 'win32' ? 'chrome' : undefined);
  browser = await chromium.launch({ channel, headless: true });
});
after(async () => { await browser?.close(); await new Promise(resolve => server?.close(resolve)); });

async function pageFor(t, path = '/', options = {}) {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, ...options });
  t.after(() => context.close());
  await context.route('**/*', route => new URL(route.request().url()).origin === base ? route.continue() : route.abort());
  const page = await context.newPage();
  await page.goto(base + path);
  return page;
}
async function message(page) {
  return new URL(await page.locator('[data-whatsapp]').getAttribute('href')).searchParams.get('text');
}
async function screenshot(page, name) {
  if (process.env.P2_SCREENSHOT_DIR) await page.screenshot({ path: resolve(process.env.P2_SCREENSHOT_DIR, name + '.png'), animations: 'disabled' });
}
async function assertNoHorizontalOverflow(page, path) {
  const measurement = await page.evaluate(() => {
    const viewportWidth = innerWidth;
    const selector = element => {
      if (element.id) return `#${element.id}`;
      const classes = typeof element.className === 'string' ? element.className.trim().split(/\s+/).filter(Boolean).slice(0, 2) : [];
      return `${element.tagName.toLowerCase()}${classes.map(name => `.${name}`).join('')}`;
    };
    const overflow = [...document.body.querySelectorAll('*')].map(element => {
      const rect = element.getBoundingClientRect();
      return { selector: selector(element), left: Math.round(rect.left), right: Math.round(rect.right), scrollWidth: element.scrollWidth, clientWidth: element.clientWidth, position: getComputedStyle(element).position };
    }).filter(item => item.right > viewportWidth || item.left < 0 || item.scrollWidth > item.clientWidth).slice(0, 24);
    return { scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth, viewportWidth, overflow };
  });
  if (measurement.scrollWidth > measurement.viewportWidth) {
    const isolation = await page.evaluate(() => {
      const width = () => document.documentElement.scrollWidth;
      const baseline = width();
      const cases = [
        ['az-main-platform-section', '.qct-v2 > .qct-ecosystem'],
        ['az-platform-marquee', '.qct-v2 .qct-marquee'],
        ['az-platform-track', '.qct-v2 .qct-marquee-track'],
        ['az-new-edge-section', '.qct-v2 > .qct-edge'],
        ['az-mobile-menu', '#qctm-panel'],
      ];
      const sections = [...document.querySelectorAll('.qct-v2 > section')];
      const results = [];
      const check = (label, element) => {
        if (!element) return;
        const before = element.style.display;
        element.style.setProperty('display', 'none', 'important');
        const after = width();
        element.style.display = before;
        results.push({ label, widthWithout: after, improvement: baseline - after });
      };
      for (const [label, selector] of cases) check(label, document.querySelector(selector));
      for (let i = 0; i < sections.length; i++) check('section-' + i + ':' + sections[i].className, sections[i]);
      return { baseline, results };
    });
    console.error('HORIZONTAL_OVERFLOW_ISOLATION ' + path + ' ' + JSON.stringify(isolation));
  }
  assert.equal(measurement.scrollWidth <= measurement.viewportWidth, true, `Horizontal overflow on ${path}: ${JSON.stringify(measurement)}`);
}

test('premium infrastructure routes have reciprocal language alternatives, self canonicals and mobile-safe layouts', async t => {
  const routes = [
    { path: '/yeni-nesil-web-altyapisi/', lang: 'tr-TR', alternates: ['/yeni-nesil-web-altyapisi/', '/en/next-generation-web-foundation/', '/az/yeni-nesil-veb-infrastrukturu/'] },
    { path: '/en/next-generation-web-foundation/', lang: 'en', alternates: ['/yeni-nesil-web-altyapisi/', '/en/next-generation-web-foundation/', '/az/yeni-nesil-veb-infrastrukturu/'] },
    { path: '/az/yeni-nesil-veb-infrastrukturu/', lang: 'az-AZ', alternates: ['/yeni-nesil-web-altyapisi/', '/en/next-generation-web-foundation/', '/az/yeni-nesil-veb-infrastrukturu/'] },
  ];
  for (const route of routes) {
    const page = await pageFor(t, route.path);
    assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), `https://qctcommerce.com${route.path}`);
    assert.equal(await page.locator(`link[rel="alternate"][hreflang="${route.lang}"]`).getAttribute('href'), `https://qctcommerce.com${route.path}`);
    for (const alternate of route.alternates) assert.equal(await page.locator(`link[rel="alternate"][hreflang]:not([hreflang="x-default"])[href="https://qctcommerce.com${alternate}"]`).count(), 1, `Missing alternate ${alternate}`);
    await assertNoHorizontalOverflow(page, route.path);
  }
});

test('premium infrastructure is discoverable in every service index and gets a scope-only calculator quote', async t => {
  for (const [path, href] of [['/hizmetler/', '/yeni-nesil-web-altyapisi/'], ['/en/services/', '/en/next-generation-web-foundation/'], ['/az/xidmetler/', '/az/yeni-nesil-veb-infrastrukturu/']]) {
    const page = await pageFor(t, path);
    assert.equal(await page.locator(`main a[href="${href}"]`).count(), 1, `Missing premium-service link in content on ${path}`);
  }
  for (const [path, href, expectedTotal, expectedMessage, serviceSelector, totalSelector, whatsappSelector] of [
    ['/', '/yeni-nesil-web-altyapisi/', 'Özel teklif', 'özel teklif talep ediyorum', '[data-service]', '[data-total]', '[data-whatsapp]'],
    ['/en/', '/en/next-generation-web-foundation/', 'Custom quote', 'scoped proposal', '[data-service]', '[data-total]', '[data-whatsapp]'],
    ['/az/', '/az/yeni-nesil-veb-infrastrukturu/', 'Xüsusi təklif', 'xüsusi təklif', '[data-az-service]', '[data-az-total]', '[data-az-whatsapp]'],
  ]) {
    const page = await pageFor(t, path);
    assert.equal(await page.locator('.qct-edge').count(), 1, `Missing QCT EDGE launch section on ${path}`);
    assert.equal(await page.locator(`.qct-edge a[href="${href}"]`).count(), 1, `Missing QCT EDGE service link on ${path}`);
    assert.equal(await page.locator('.qct-edge').getByText('PERFORMANCE', { exact: true }).count(), 1);
    assert.equal(await page.locator('.qct-edge').getByText('VISIBILITY', { exact: true }).count(), 1);
    assert.equal(await page.locator('.qct-edge').getByText('COMMERCE', { exact: true }).count(), 1);
    assert.equal(await page.locator('.qct-edge').getByText(/34[.,]900/).count(), 0, `Unapproved price claim on ${path}`);
    await page.locator(serviceSelector).selectOption('premium-infrastructure');
    assert.equal(await page.locator(totalSelector).textContent(), expectedTotal);
    const whatsappMessage = new URL(await page.locator(whatsappSelector).getAttribute('href')).searchParams.get('text');
    assert.ok(whatsappMessage.includes(expectedMessage));
    await assertNoHorizontalOverflow(page, path);
  }
});


test('QCT EDGE is accessible from primary top-level navigation and mobile menu across all locales, replacing About', async t => {
  const links = [
    ['/yeni-nesil-web-altyapisi/', 'QCT EDGE'],
    ['/en/next-generation-web-foundation/', 'QCT EDGE'],
    ['/az/yeni-nesil-veb-infrastrukturu/', 'QCT EDGE'],
  ];
  for (const [route, label] of links) {
    const page = await pageFor(t, route);
    const desktop = page.locator(`#masthead .desktop-only-menu .primary-menu > li > a[href="${route}"]`);
    const mobile = page.locator(`#qctm-panel .qctm-primary a[href="${route}"]`);
    assert.equal(await desktop.count(), 1, route + ' desktop primary QCT EDGE link');
    assert.equal(await mobile.count(), 1, route + ' mobile primary QCT EDGE link');
    assert.match(await desktop.textContent(), /QCT EDGE/);
    assert.equal(await desktop.getAttribute('aria-current'), 'page', route + ' desktop active state');
    assert.equal(await mobile.getAttribute('aria-current'), 'page', route + ' mobile active state');
    const subLink = page.locator(`#masthead .desktop-only-menu .sub-menu a[href="${route}"]`);
    assert.equal(await subLink.count(), 0, route + ' must not be in Services sub-menu');
    const aboutInHeader = page.locator(`#masthead .desktop-only-menu .primary-menu a[href*="hakkimizda"], #masthead .desktop-only-menu .primary-menu a[href*="haqqimizda"], #masthead .desktop-only-menu .primary-menu a[href$="/about/"]`);
    assert.equal(await aboutInHeader.count(), 0, route + ' About must be removed from header primary menu');
  }
});

test('QCT EDGE launch packages and gift terms are consistent across all published locales', async t => {
  const cases = [
    {home:'/',detail:'/yeni-nesil-web-altyapisi/',gift:'3 AY DİNAMİK SEO HEDİYE',start:'24.900 TL',startLabel:'başlangıç'},
    {home:'/en/',detail:'/en/next-generation-web-foundation/',gift:'3 MONTHS OF DYNAMIC SEO INCLUDED',start:'24,900 TL',startLabel:'starter'},
    {home:'/az/',detail:'/az/yeni-nesil-veb-infrastrukturu/',gift:'3 AY DİNAMİK SEO HƏDİYYƏ',start:'24.900 TL',startLabel:'başlanğıc'},
  ];
  for (const item of cases) {
    const home = await pageFor(t, item.home);
    const banner = await home.locator('.qct-edge-launch').textContent();
    assert.ok(banner.includes(item.start), item.home+' starting price');
    assert.ok(banner.includes(item.startLabel), item.home+' clean starting price label without legacy KDV');
    assert.ok(!banner.includes('KDV dahil') && !banner.includes('KDV daxil') && !banner.includes('VAT included'), item.home+' KDV/VAT label removed');
    assert.ok(banner.includes(item.gift), item.home+' gift');
    const page = await pageFor(t, item.detail);
    const cards = page.locator('.premium-launch__plan');
    assert.equal(await cards.count(), 3, item.detail+' package count');
    const offer = await page.locator('.premium-launch').textContent();
    for (const name of ['QCT EDGE Start','QCT EDGE Pro','QCT EDGE Business']) assert.ok(offer.includes(name), item.detail+' '+name);
    assert.ok(offer.includes(item.start), item.detail+' starting price');
    for (const priceLabel of await page.locator('.premium-launch__starting').allTextContents()) {
      assert.ok(priceLabel.toLowerCase().includes('başlangıç') || priceLabel.toLowerCase().includes('starting') || priceLabel.toLowerCase().includes('başlanğıc'), item.detail+' starting package label');
    }
    assert.match(offer, /(?:%20|20%)/, item.detail+' Türkiye VAT rate in terms');
    assert.ok(offer.includes(item.gift), item.detail+' gift');
    assert.match(offer, /2026/);
    assert.equal(await page.locator('.premium-launch__plan a[href^="https://wa.me/"]').count(), 3);
    await assertNoHorizontalOverflow(page, item.detail);
  }
});

test('QCT EDGE editorial design keeps offer, value strip and service journey usable on mobile and desktop', async t => {
  const routes = [
    { home: '/', detail: '/yeni-nesil-web-altyapisi/' },
    { home: '/en/', detail: '/en/next-generation-web-foundation/' },
    { home: '/az/', detail: '/az/yeni-nesil-veb-infrastrukturu/' },
  ];
  for (const route of routes) {
    const home = await pageFor(t, route.home);
    assert.equal(await home.locator('.qct-edge-topline').count(), 1, route.home + ' editorial heading');
    assert.equal(await home.locator('.qct-edge-grid > .qct-edge-story').count(), 1, route.home + ' text panel');
    assert.equal(await home.locator('.qct-edge-grid > .qct-edge-launch').count(), 1, route.home + ' offer card');
    assert.equal(await home.locator('.qct-edge > .qct-shell > .qct-edge-benefits article').count(), 3, route.home + ' value strip');
    await assertNoHorizontalOverflow(home, route.home);

    const page = await pageFor(t, route.detail);
    assert.equal(await page.locator('h1#edge-detail-title').count(), 1);
    assert.equal(await page.locator('.premium-hero__steps li').count(), 3);
    assert.equal(await page.locator('.premium-grid article').count(), 4);
    assert.equal(await page.locator('.premium-process__grid article').count(), 4);
    assert.equal(await page.locator('.premium-card-index, .premium-process__number, .premium-hero__number').count(), 0,
      route.detail + ' numbered cards must be absent');
    assert.equal(await page.locator('.premium-launch__plan').count(), 3);
    assert.equal(await page.locator('.premium-hero a[href="#packages"]').count(), 1);
    assert.equal(await page.locator('.premium-final a[href^="https://wa.me/"]').count(), 1);
    await assertNoHorizontalOverflow(page, route.detail);

    const desktop = await pageFor(t, route.detail, { viewport: { width: 1440, height: 900 } });
    // The shared desktop header has its own unrelated overflow behavior in EN.
    // Guard the new EDGE content at desktop width without masking mobile page overflow above.
    const sectionPaddings = await desktop.evaluate(() => {
      const selectors = ['.premium-problem', '.premium-scope', '.premium-launch', '.premium-process', '.premium-faq-section'];
      return selectors.map(selector => ({
        selector,
        top: parseFloat(getComputedStyle(document.querySelector(selector)).paddingTop),
      }));
    });
    assert.ok(sectionPaddings.every(item => item.top <= 78),
      route.detail + ' excessive section spacing: ' + JSON.stringify(sectionPaddings));
    const desktopBounds = await desktop.evaluate(() => {
      const selectors = ['.premium-hero__copy', '.premium-hero__panel', '.premium-launch__plan', '.premium-process__grid'];
      return selectors.flatMap(selector => [...document.querySelectorAll(selector)].map(element => {
        const { left, right } = element.getBoundingClientRect();
        return { selector, left: Math.round(left), right: Math.round(right), viewport: innerWidth };
      }));
    });
    assert.ok(desktopBounds.length >= 6, route.detail + ' desktop elements missing');
    assert.ok(desktopBounds.every(b => b.left >= -1 && b.right <= b.viewport + 1),
      route.detail + ' EDGE desktop layout overflows: ' + JSON.stringify(desktopBounds));
  }
});

test('commercial SEO routes expose a connected, intent-specific internal link cluster', async t => {
  const cases = [
    { url: '/e-ticaret/', selector: '.qct-ecommerce-pathways__grid', links: ['/ikas-magaza-kurulumu/', '/shopify-magaza-kurulumu/', '/blog/ikas-mi-shopify-mi-2026/'] },
    { url: '/fiyatlar/', selector: '.qct-pricing-list', links: ['/ikas-magaza-kurulumu/', '/shopify-magaza-kurulumu/', '/blog/ikas-mi-shopify-mi-2026/'] },
    { url: '/ikas-magaza-kurulumu/', selector: '.qct-platform-checklist', links: ['/blog/ikas-fiyatlari-2026-kurulum-tema-seo-maliyetleri/', '/blog/ikas-mi-shopify-mi-2026/'] },
    { url: '/shopify-magaza-kurulumu/', selector: '.qct-platform-checklist', links: ['/blog/shopify-magaza-kurma-rehberi/', '/blog/ikas-mi-shopify-mi-2026/'] },
    { url: '/blog/ikas-mi-shopify-mi-2026/', selector: '.qct-article__topic-links', links: ['/blog/ikas-fiyatlari-2026-kurulum-tema-seo-maliyetleri/', '/blog/shopify-magaza-kurma-rehberi/'] },
    { url: '/blog/ikas-fiyatlari-2026-kurulum-tema-seo-maliyetleri/', selector: '.qct-article__topic-links', links: ['/blog/ikas-mi-shopify-mi-2026/', '/fiyatlar/'] },
    { url: '/blog/shopify-magaza-kurma-rehberi/', selector: '.qct-article__topic-links', links: ['/blog/ikas-mi-shopify-mi-2026/', '/shopify-magaza-kurulumu/'] },
  ];
  for (const { url, selector, links } of cases) {
    const page = await pageFor(t, url);
    const section = page.locator(selector);
    assert.equal(await section.count(), 1, `Missing internal-link cluster on ${url}`);
    for (const href of links) assert.equal(await section.locator(`a[href="${href}"]`).count(), 1, `Missing ${href} on ${url}`);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `Horizontal overflow on ${url}`);
  }
});

test('ikas and Shopify service pages link to platform-prefilled calculator', async t => {
  for (const name of ['ikas', 'shopify']) {
    const page = await pageFor(t, name === 'ikas' ? '/ikas-magaza-kurulumu/' : '/shopify-magaza-kurulumu/');
    assert.equal(await page.locator(`a[href="/?platform=${name}#fiyat-hesapla"]`).count(), 2);
  }
});

test('platform-prefilled quote records exactly one completed interaction without fake leads', async t => {
  const page = await pageFor(t, '/?platform=ikas#fiyat-hesapla');
  await page.waitForFunction(() => typeof window.qctTrackEvent === 'function');
  // The production-only analytics runtime intentionally does not emit on localhost.
  // Spy on UI dispatch without hitting GA4 or weakening hostname protection.
  await page.evaluate(() => {
    window.__pricingTestEvents = [];
    window.qctTrackEvent = (name, params) => window.__pricingTestEvents.push({ name, params });
  });
  const eventCount = (name) => page.evaluate((eventName) =>
    (window.__pricingTestEvents || []).filter(item => item.name === eventName).length, name);
  assert.equal(await page.locator('[data-service]').inputValue(), 'ecommerce');
  assert.equal(await page.locator('[data-platform]').inputValue(), 'ikas');
  assert.equal(await eventCount('pricing_start'), 0);
  assert.equal(await eventCount('pricing_complete'), 0);
  await page.locator('[data-products]').selectOption('10');
  assert.equal(await eventCount('pricing_start'), 1);
  assert.equal(await eventCount('pricing_complete'), 1);
  await page.getByRole('checkbox', { name: 'Ek dil', exact: false }).check();
  await page.locator('[data-products]').selectOption('25');
  await page.locator('[data-platform]').selectOption('shopify');
  assert.equal(await eventCount('pricing_complete'), 1, 'Changes must not inflate completed pricing sessions');
  assert.equal(await eventCount('generate_lead'), 0, 'Completing the calculator is not a submitted lead');
  assert.ok((await message(page)).includes('Shopify'));
});

test('Shopify and ikas pages explain the platform-specific setup steps and cost boundary', async t => {
  const scenarios = [
    {path:'/shopify-magaza-kurulumu/', title:'Shopify mağaza açma hazırlığı', faq:'Shopify mağaza kurulum süresi ne kadar?'},
    {path:'/ikas-magaza-kurulumu/', title:'ikas mağaza açma hazırlığı', faq:'ikas mağaza açmak için hangi bilgiler gerekiyor?'},
  ];
  for (const scenario of scenarios) {
    const page = await pageFor(t, scenario.path);
    assert.equal(await page.getByRole('heading',{name:scenario.title}).count(),1);
    assert.equal(await page.getByText(scenario.faq,{exact:true}).count(),1);
    assert.equal(await page.locator('.qct-platform-checklist a[href="/blog/ikas-mi-shopify-mi-2026/"]').count(),1);
    assert.equal(await page.locator('.qct-platform-checklist__cost').count(),1);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),true);
  }
});

test('Kocaeli and Istanbul location pages have distinct task-oriented local content, not fictitious office claims', async t => {
  for (const scenario of [
    {path:'/lokasyon/kocaeli/',title:'Kocaeli için üç somut dijital iş senaryosu',link:'/sektorler/uretici-sanayi-firmasi-web-sitesi/'},
    {path:'/lokasyon/istanbul/',title:'İstanbul işletmeleri için üç farklı başlangıç',link:'/blog/ikas-mi-shopify-mi-2026/'},
  ]) {
    const page = await pageFor(t, scenario.path);
    const area = page.locator('.qct-market-focus');
    assert.equal(await area.getByRole('heading',{name:scenario.title}).count(),1);
    assert.equal(await area.locator(`a[href="${scenario.link}"]`).count(),1);
    assert.equal(await area.locator('article').count(),3);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),true);
  }
});

test('shopify deep link preselects the expected calculator option', async t => {
  const page = await pageFor(t, '/?platform=shopify#fiyat-hesapla');
  assert.equal(await page.locator('[data-service]').inputValue(), 'ecommerce');
  assert.equal(await page.locator('[data-platform]').inputValue(), 'shopify');
});

test('platform comparison offers direct quote and service routes', async t => {
  const page = await pageFor(t, '/blog/ikas-mi-shopify-mi-2026/');
  const section = page.locator('.qct-article__platform-guide');
  assert.equal(await section.count(), 1);
  for (const path of ['/ikas-magaza-kurulumu/', '/shopify-magaza-kurulumu/', '/?platform=ikas#fiyat-hesapla', '/?platform=shopify#fiyat-hesapla']) {
    assert.equal(await section.locator(`a[href="${path}"]`).count(), 1, `Missing link ${path}`);
  }
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
});

test('quote includes platform, product scope, every selected addon and unchanged price', async t => {
  const page = await pageFor(t);
  await page.locator('[data-service]').selectOption('ecommerce');
  await page.locator('[data-platform]').selectOption('shopify');
  await page.locator('[data-products]').selectOption('10');
  for (const label of ['SEO + GEO', 'Merchant Center', 'GA4 + Search Console', 'Ek dil', 'Hız optimizasyonu']) {
    await page.getByRole('checkbox', { name: label, exact: false }).check();
  }
  assert.equal(await page.locator('[data-total]').textContent(), '20.760 TL’den');
  const text = await message(page);
  for (const expected of ['Yeni e-ticaret sitesi', 'Shopify', '1–10 ürün', 'SEO + GEO', 'Merchant Center', 'GA4 + Search Console', 'Ek dil', 'Hız optimizasyonu', '20.760 TL']) {
    assert.ok(text.includes(expected), `Missing quote detail: ${expected}`);
  }
  await page.getByRole('checkbox', { name: 'Teknik SEO — bağımsız', exact: false }).check();
  await page.getByRole('checkbox', { name: 'Ek dil', exact: false }).uncheck();
  const changed = await message(page);
  assert.ok(changed.includes('Teknik SEO — bağımsız çalışma'));
  assert.ok(!changed.includes('SEO + GEO'));
  assert.ok(!changed.includes('Ek dil'));
  assert.equal(await page.locator('[data-total]').textContent(), '16.860 TL’den');
});

for (const path of ['/', '/en/']) {
  test(`mobile cost exclusions stay visible and inside calculator: ${path}`, async t => {
    const page = await pageFor(t, path, { viewport: { width: 320, height: 740 } });
    const note = page.locator('.qct-external-cost-note');
    assert.equal(await note.isVisible(), true);
    const [box, calculator] = await Promise.all([note.boundingBox(), page.locator('.qct-calculator').boundingBox()]);
    assert.ok(box.x >= calculator.x && box.x + box.width <= calculator.x + calculator.width + 1);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    await page.locator('[data-cookie-reject]').click();
    await note.scrollIntoViewIfNeeded();
    if (path === '/') await screenshot(page, 'qct-p2-mobile-calculator');
  });
}

for (const path of ['/', '/en/', '/az/']) {
  test(`mobile menu traps focus, blocks background, restores trigger: ${path}`, async t => {
    const page = await pageFor(t, path);
    const toggle = page.locator('[data-qctm-toggle]');
    const panel = page.locator('[data-qctm-panel]');
    await page.locator('footer').evaluate(el => { el.inert = true; });
    await toggle.click();
    assert.equal(await panel.getAttribute('aria-modal'), 'true');
    assert.equal(await page.evaluate(() => document.querySelector('main').closest('[inert]') !== null), true);
    const links = await panel.locator('a[hreflang]').evaluateAll(nodes => nodes.map(n => n.getAttribute('hreflang')));
    assert.deepEqual(links, ['tr-TR', 'en', 'az-AZ']);
    // Shift+Tab from close reaches brand, then wraps to last project link.
    assert.equal(await page.evaluate(() => document.activeElement.classList.contains('qctm-close')), true);
    assert.ok(await page.evaluate(() => {
      const header = getComputedStyle(document.querySelector('.site-header'));
      const banner = getComputedStyle(document.querySelector('[data-cookie-consent]'));
      return Number(header.zIndex) > Number(banner.zIndex);
    }), 'The menu must paint above the cookie banner');
    if (path === '/') await screenshot(page, 'qct-p2-mobile-menu');
    await page.keyboard.press('Shift+Tab');
    await page.keyboard.press('Shift+Tab');
    assert.equal(await page.evaluate(() => document.activeElement.classList.contains('qctm-project')), true);
    await page.keyboard.press('Tab');
    assert.equal(await page.evaluate(() => document.activeElement.classList.contains('qctm-brand')), true);
    for (let i = 0; i < 25; i++) {
      await page.keyboard.press('Tab');
      assert.equal(await panel.evaluate(el => el.contains(document.activeElement)), true);
    }
    await page.keyboard.press('Escape');
    assert.equal(await toggle.getAttribute('aria-expanded'), 'false');
    assert.equal(await toggle.evaluate(el => document.activeElement === el), true);
    assert.equal(await page.evaluate(() => document.querySelector('main').closest('[inert]') !== null), false);
    assert.equal(await page.locator('footer').evaluate(el => el.inert), true);
    await toggle.click();
    await page.locator('[data-qctm-close]').click();
    assert.equal(await toggle.evaluate(el => document.activeElement === el), true);
    await toggle.click();
    await page.setViewportSize({ width: 1280, height: 900 });
    assert.equal(await page.evaluate(() => document.body.classList.contains('qctm-lock')), false);
    assert.equal(await page.evaluate(() => document.querySelector('main').closest('[inert]') !== null), false);
  });
}

for (const path of ['/', '/en/', '/az/']) {
  test(`marquee pause/resume is keyboard accessible and honours reduced motion: ${path}`, async t => {
    const page = await pageFor(t, path);
    const control = page.locator('[data-marquee-toggle]');
    assert.equal(await control.count(), 1, 'Missing marquee control');
    await control.focus();
    await page.keyboard.press('Enter');
    assert.equal(await control.getAttribute('aria-pressed'), 'true');
    assert.equal(await page.locator('.qct-marquee-track').evaluate(el => getComputedStyle(el).animationPlayState), 'paused');
    await page.keyboard.press('Space');
    assert.equal(await control.getAttribute('aria-pressed'), 'false');
    await page.emulateMedia({ reducedMotion: 'reduce' });
    assert.equal(await page.locator('.qct-marquee-track').evaluate(el => getComputedStyle(el).animationName), 'none');
  });
  test(`video manual pause survives visibility changes and resume works: ${path}`, async t => {
    const page = await pageFor(t, path);
    assert.equal(await page.locator('[data-film-toggle], .qct-film-toggle').count(), 0, 'Brand video must have no overlay button in the DOM');
    const video = page.locator('[data-qct-brand-film]');
    assert.equal(await video.getAttribute('role'), null, 'Keep native video semantics instead of an invalid button role');
    assert.equal(await video.getAttribute('tabindex'), '0', 'Video must remain keyboard focusable');
    assert.equal(await video.getAttribute('aria-pressed'), null, 'Non-button video must not expose aria-pressed');
    await video.scrollIntoViewIfNeeded();
    await page.waitForFunction(() => !document.querySelector('[data-qct-brand-film]').paused);
    await video.click();
    assert.equal(await video.evaluate(el => el.paused), true);
    await page.locator('h1').scrollIntoViewIfNeeded();
    await video.scrollIntoViewIfNeeded();
    assert.equal(await video.evaluate(el => el.paused), true);
    await video.focus();
    await page.keyboard.press('Enter');
    await page.waitForFunction(() => !document.querySelector('[data-qct-brand-film]').paused);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForFunction(() => document.querySelector('[data-qct-brand-film]').paused);
  });
  test(`reduced motion prevents initial video autoplay: ${path}`, async t => {
    const page = await pageFor(t, path, { reducedMotion: 'reduce' });
    await page.locator('[data-qct-brand-film]').scrollIntoViewIfNeeded();
    assert.equal(await page.locator('[data-qct-brand-film]').evaluate(el => el.paused), true);
    assert.equal(await page.locator('[data-film-toggle]').count(), 0);
    assert.equal(await page.locator('[data-qct-brand-film]').getAttribute('aria-pressed'), null);
  });
}

test('desktop layout stays within viewport with usable motion controls', async t => {
  const page = await pageFor(t, '/', { viewport: { width: 1440, height: 1000 } });
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  await screenshot(page, 'qct-p2-desktop');
  assert.equal(await page.locator('[data-film-toggle]').count(), 0, 'No video overlay control should exist');
  await page.locator('[data-qct-brand-film]').scrollIntoViewIfNeeded();
  await screenshot(page, 'qct-p2-motion-controls');
});

test('marketplace quote keeps selected channel and never invents a fixed price', async t => {
  const page = await pageFor(t);
  await page.locator('[data-service]').selectOption('marketplace');
  await page.locator('[data-platform]').selectOption('amazon-us');
  await page.locator('[data-products]').selectOption('25');
  assert.equal(await page.locator('[data-total]').textContent(), 'Özel teklif');
  const quote = await message(page);
  assert.ok(quote.includes('Amazon Amerika'));
  assert.ok(quote.includes('11–25 ürün'));
  assert.ok(quote.includes('özel teklif talep ediyorum'));
  assert.ok(!quote.includes('TL’den'));
  assert.equal(await page.locator('[data-whatsapp]').getAttribute('aria-disabled'), 'false');
});

for (const path of ['/pazaryeri-kurulumu/', '/amazon-turkiye-magaza-kurulumu/', '/amazon-amerika-magaza-kurulumu/']) {
  test(`marketplace logo strip and navigation stay visible: ${path}`, async t => {
    const page = await pageFor(t, path, { viewport: { width: 390, height: 844 } });
    assert.equal(await page.locator('.marketplace-channel-viewport').count(), 1);
    assert.equal(await page.locator('.marketplace-channel-set').count(), 2);
    assert.equal(await page.locator('.marketplace-channel-set').first().locator('.marketplace-channel').count(), 5);
    assert.equal(await page.locator('.marketplace-channel-track').evaluate(el => getComputedStyle(el).animationName), 'marketplace-marquee');
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    await page.locator('[data-qctm-toggle]').click();
    await page.getByRole('button', { name: /Hizmetler/ }).click();
    assert.equal(await page.locator('[data-qctm-group-panel] a[href="/pazaryeri-kurulumu/"]').count(), 1);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    assert.equal(await page.locator('.marketplace-channel-track').evaluate(el => getComputedStyle(el).animationName), 'none');
  });
}
