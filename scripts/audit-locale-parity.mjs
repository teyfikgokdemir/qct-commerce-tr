import fs from 'node:fs';
import path from 'node:path';
import { localeParityClusters, blogLocaleClusters, canonicalServiceLinks } from '../src/data/locale-parity.js';
import { getLocaleSwitchTargets } from '../src/data/locale-routing.js';
const DIST='dist',SITE='https://qctcommerce.com',errors=[];
const pageFile=p=>p==='/'?path.join(DIST,'index.html'):path.join(DIST,p.replace(/^\//,'').replace(/\/$/,''),'index.html');
const readPage=p=>fs.existsSync(pageFile(p))?fs.readFileSync(pageFile(p),'utf8'):null;
const hrefs=h=>[...h.matchAll(/<a\b[^>]*href=["']([^"']+)["']/gi)].map(m=>m[1]);
const alts=h=>[...h.matchAll(/<link\b[^>]*rel=["']alternate["'][^>]*hreflang=["']([^"']+)["'][^>]*href=["']([^"']+)["'][^>]*>/gi)].map(m=>({lang:m[1],href:m[2]}));
for(const cluster of localeParityClusters){
  for(const [lang,p] of Object.entries(cluster)){
    const h=readPage(p);
    if(!h){errors.push(`${p}: missing ${lang} parity page`);continue;}
    const a=alts(h);
    const resolved=getLocaleSwitchTargets(p);
    if(!resolved || resolved.tr!==cluster.tr || resolved.en!==cluster.en || resolved.az!==cluster.az){
      errors.push(`${p}: locale switch resolver does not preserve same-page TR/EN/AZ targets`);
    }
    for(const [tl,tp] of Object.entries(cluster)){
      const hl=tl==='tr'?'tr-TR':tl==='en'?'en':'az-AZ';
      const ex=new URL(tp,SITE).toString();
      if(!a.some(x=>x.lang===hl&&x.href===ex)) errors.push(`${p}: missing ${hl} -> ${tp}`);
    }
  }
}
for(const [lang,p] of Object.entries({tr:'/hizmetler/',en:'/en/services/',az:'/az/xidmetler/'})){const h=readPage(p);if(!h)continue;const links=new Set(hrefs(h));for(const r of canonicalServiceLinks[lang])if(!links.has(r))errors.push(`${p}: missing core service ${r}`);}
for(const [lang,prefix] of Object.entries({tr:'/blog/',en:'/en/blog/',az:'/az/bloq/'})){const d=path.join(DIST,prefix.replace(/^\//,'').replace(/\/$/,''));const count=fs.existsSync(d)?fs.readdirSync(d,{withFileTypes:true}).filter(e=>e.isDirectory()).length:0;if(count!==17)errors.push(`${prefix}: expected 17 articles, found ${count}`);}
if(blogLocaleClusters.length!==17)errors.push('blog parity map must contain 13 triplets');
const llms=fs.readFileSync(path.join(DIST,'llms.txt'),'utf8');if(/Georgia|\/ka\//i.test(llms))errors.push('llms.txt contains retired Georgia/KA');for(const n of ['/az/','/az/xidmetler/','/lokasyon/','/en/location/'])if(!llms.includes(n))errors.push(`llms.txt missing ${n}`);
const files=[];const walk=d=>{for(const e of fs.readdirSync(d,{withFileTypes:true})){const f=path.join(d,e.name);if(e.isDirectory())walk(f);else if(e.name.endsWith('.html'))files.push(f)}};walk(DIST);
const trParents=files.filter(f=>/dist[\\/]lokasyon[\\/][^\\/]+[\\/]index\.html$/.test(f)).length,enParents=files.filter(f=>/dist[\\/]en[\\/]location[\\/][^\\/]+[\\/]index\.html$/.test(f)).length;
const trSvc=files.filter(f=>/dist[\\/]lokasyon[\\/][^\\/]+[\\/](web-tasarim|e-ticaret|seo-geo)[\\/]index\.html$/.test(f)).length,enSvc=files.filter(f=>/dist[\\/]en[\\/]location[\\/][^\\/]+[\\/](web-design|ecommerce|search-visibility)[\\/]index\.html$/.test(f)).length;
if(trParents!==19||enParents!==19)errors.push(`programmatic parents expected 19/19, found ${trParents}/${enParents}`);
if(trSvc!==57||enSvc!==57)errors.push(`programmatic service pages expected 57/57, found ${trSvc}/${enSvc}`);
if(readPage('/az/azerbaycan/'))errors.push('duplicate AZ market route exists; /az/ must remain canonical');
const internationalCss=fs.readFileSync(path.join(DIST,'styles','international.css'),'utf8');
const qctV2Css=fs.readFileSync(path.join(DIST,'styles','qct-v2.css'),'utf8');
if(/\.site-main\s+h1\s*\{[^}]*color\s*:\s*#fff/si.test(internationalCss)) errors.push('international.css contains a broad white H1 rule outside an explicit dark hero');
for(const required of ['.qct-v2 .qct-hero h1{color:var(--qct-ink)!important','-webkit-text-fill-color:var(--qct-ink)!important','.qct-v2 .qct-hero-copy>*,.qct-v2 .qct-calculator{opacity:1!important']) if(!qctV2Css.includes(required)) errors.push('qct-v2.css missing shared TR/EN/AZ light-hero contrast guard: '+required);
const css=fs.readFileSync(path.join('public','styles','international.css'),'utf8');
if(/\.site-main h1\s*\{[^}]*color:\s*#fffaf5/is.test(css)) errors.push('international.css: unsafe global white H1 rule returned; white headings must be scoped to dark hero containers');
const enSource=fs.readFileSync(path.join('src','data','blog-en.ts'),'utf8');
const azSource=fs.readFileSync(path.join('src','data','az-blog.ts'),'utf8');
const enMatch=enSource.match(/export const articlesEn:[^=]+=\s*(\[[\s\S]*\]);\s*export function/);
const azMatch=azSource.match(/export const azBlogPosts:[^=]+=\s*(\[[\s\S]*\]);\s*export function/);
if(!enMatch||!azMatch){errors.push('blog depth audit: could not parse EN/AZ article arrays')}else{
  const ens=JSON.parse(enMatch[1]), azs=JSON.parse(azMatch[1]);
  for(const en of ens){
    const az=azs.find(x=>x.trSlug===en.trSlug);
    if(!az){errors.push('AZ blog missing counterpart for '+en.trSlug);continue;}
    if(az.summary.length<en.summary.length) errors.push(az.slug+': AZ summary is shallower than EN');
    if(az.sections.length!==en.sections.length) errors.push(az.slug+': AZ section count '+az.sections.length+' does not match EN '+en.sections.length);
    const azChars=JSON.stringify(az.sections).length,enChars=JSON.stringify(en.sections).length;
    if(azChars<enChars*.72) errors.push(az.slug+': AZ article body is materially shorter than EN counterpart');
  }
}

const stripHtml=(html)=>html.replace(/<script[\s\S]*?<\/script>/gi,' ').replace(/<style[\s\S]*?<\/style>/gi,' ').replace(/<[^>]+>/g,' ').replace(/&[a-z#0-9]+;/gi,' ').replace(/\s+/g,' ').trim();
for(const cluster of blogLocaleClusters){
  for(const [lang,p] of Object.entries(cluster)){
    const html=readPage(p);
    if(!html){errors.push(`${p}: missing rendered blog article for completeness audit`);continue;}
    const article=html.match(/<article\b[\s\S]*?<\/article>/i)?.[0] || html.match(/<main\b[\s\S]*?<\/main>/i)?.[0] || '';
    const text=stripHtml(article);
    const h2Count=(article.match(/<h2\b/gi)||[]).length;
    if(text.length<1200) errors.push(`${p}: blog article appears too shallow (${text.length} visible chars; minimum 1200)`);
    if(h2Count<3) errors.push(`${p}: blog article has only ${h2Count} H2 sections; minimum 3`);
    if(/\b(?:lorem ipsum|todo|tbd|placeholder|coming soon)\b/i.test(text)) errors.push(`${p}: placeholder content detected`);
  }
}
const homeSources={
  tr:fs.readFileSync(path.join('src','components','QctCommerceV2.astro'),'utf8'),
  en:fs.readFileSync(path.join('src','components','QctCommerceV2En.astro'),'utf8'),
  az:fs.readFileSync(path.join('src','components','AzerbaijaniHome.astro'),'utf8')
};
const requiredHomeSections=['qct-hero','qct-platforms qct-ecosystem','qct-pathways','qct-benefits','qct-image-story','qct-offers','qct-search-faq','qct-close'];
for(const [lang,source] of Object.entries(homeSources)){
  for(const cls of requiredHomeSections) if(!source.includes(`<section class="${cls}`)) errors.push(`${lang} homepage structural parity: missing ${cls}`);
  if(!source.includes('qct-intro-overlay')) errors.push(`${lang} homepage structural parity: missing intro overlay`);
  if(!source.includes('qct-brand-film')) errors.push(`${lang} homepage structural parity: missing brand film`);
}
if(!homeSources.en.includes("base: 6900")||homeSources.en.includes("base: 4900")) errors.push('EN homepage pricing parity: redesign must use 6900 TL');
if(!homeSources.en.includes('data-ecommerce-price="0"')) errors.push('EN homepage pricing parity: 1–10 ecommerce product entry must be included');
if(!homeSources.az.includes('1.190 AZN-dən başlayır')) errors.push('AZ homepage pricing parity: ecommerce FAQ must match 1.190 AZN entry price');
const blogIndexTr=fs.readFileSync(path.join('src','components','BlogIndex.astro'),'utf8');
const blogIndexEn=fs.readFileSync(path.join('src','components','BlogIndexEn.astro'),'utf8');
const blogArticleTr=fs.readFileSync(path.join('src','components','BlogArticle.astro'),'utf8');
const blogArticleEn=fs.readFileSync(path.join('src','components','BlogArticleEn.astro'),'utf8');
for(const [name,source] of [['TR blog index',blogIndexTr],['EN blog index',blogIndexEn],['TR blog article',blogArticleTr],['EN blog article',blogArticleEn]]){
  if(!/h1\s*\{[^}]*color:\s*var\(--qct-color-(?:ink|text)\)/is.test(source)) errors.push(name+': light-background H1 contrast is not explicitly dark');
}
const headerSource=fs.readFileSync(path.join('src','components','Header.astro'),'utf8');
const mobileSource=fs.readFileSync(path.join('src','components','MobileMenu.astro'),'utf8');
if(!headerSource.includes('getLocaleSwitchTargets(currentPath)')) errors.push('Header must use central same-page locale resolver');
if(!headerSource.includes('azHref={azHref}')) errors.push('Header must pass resolved AZ target to mobile menu');
if(!mobileSource.includes('href={azHref}')) errors.push('Mobile language switch must use resolved AZ target');

console.log(`Locale parity audit: ${localeParityClusters.length} triplets; blogs 17/17/17; programmatic parents ${trParents}/${enParents}; service pages ${trSvc}/${enSvc}.`);
if(errors.length){console.error([...new Set(errors)].join('\n'));process.exitCode=1}else console.log('PASS: locale parity, heading contrast, blog depth, llms and programmatic SEO.');
