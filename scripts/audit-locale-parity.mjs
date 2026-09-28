import fs from 'node:fs';
import path from 'node:path';
import { localeParityClusters, blogLocaleClusters, canonicalServiceLinks } from '../src/data/locale-parity.js';
const DIST='dist',SITE='https://qctcommerce.com',errors=[];
const pageFile=p=>p==='/'?path.join(DIST,'index.html'):path.join(DIST,p.replace(/^\//,'').replace(/\/$/,''),'index.html');
const readPage=p=>fs.existsSync(pageFile(p))?fs.readFileSync(pageFile(p),'utf8'):null;
const hrefs=h=>[...h.matchAll(/<a\b[^>]*href=["']([^"']+)["']/gi)].map(m=>m[1]);
const alts=h=>[...h.matchAll(/<link\b[^>]*rel=["']alternate["'][^>]*hreflang=["']([^"']+)["'][^>]*href=["']([^"']+)["'][^>]*>/gi)].map(m=>({lang:m[1],href:m[2]}));
for(const cluster of localeParityClusters){for(const [lang,p] of Object.entries(cluster)){const h=readPage(p);if(!h){errors.push(`${p}: missing ${lang} parity page`);continue;}const a=alts(h);for(const [tl,tp] of Object.entries(cluster)){const hl=tl==='tr'?'tr-TR':tl==='en'?'en':'az-AZ',ex=new URL(tp,SITE).toString();if(!a.some(x=>x.lang===hl&&x.href===ex))errors.push(`${p}: missing ${hl} -> ${tp}`);const escaped=tp.replace(/[.*+?^${}()|[\]\\]/g,'\\for(const cluster of localeParityClusters){for(const [lang,p] of Object.entries(cluster)){const h=readPage(p);if(!h){errors.push(`${p}: missing ${lang} parity page`);continue;}const a=alts(h);for(const [tl,tp] of Object.entries(cluster)){const hl=tl==='tr'?'tr-TR':tl==='en'?'en':'az-AZ',ex=new URL(tp,SITE).toString();if(!a.some(x=>x.lang===hl&&x.href===ex))errors.push(`${p}: missing ${hl} -> ${tp}`);}}}');const switchRe=new RegExp('<a\\\\b[^>]*href=["\\\']'+escaped+'["\\\'][^>]*hreflang=["\\\']'+hl+'["\\\']','i');if(!switchRe.test(h))errors.push(`${p}: language switch does not link to same-page ${hl} counterpart ${tp}`);}}}
for(const [lang,p] of Object.entries({tr:'/hizmetler/',en:'/en/services/',az:'/az/xidmetler/'})){const h=readPage(p);if(!h)continue;const links=new Set(hrefs(h));for(const r of canonicalServiceLinks[lang])if(!links.has(r))errors.push(`${p}: missing core service ${r}`);}
for(const [lang,prefix] of Object.entries({tr:'/blog/',en:'/en/blog/',az:'/az/bloq/'})){const d=path.join(DIST,prefix.replace(/^\//,'').replace(/\/$/,''));const count=fs.existsSync(d)?fs.readdirSync(d,{withFileTypes:true}).filter(e=>e.isDirectory()).length:0;if(count!==13)errors.push(`${prefix}: expected 13 articles, found ${count}`);}
if(blogLocaleClusters.length!==13)errors.push('blog parity map must contain 13 triplets');
const llms=fs.readFileSync(path.join(DIST,'llms.txt'),'utf8');if(/Georgia|\/ka\//i.test(llms))errors.push('llms.txt contains retired Georgia/KA');for(const n of ['/az/','/az/xidmetler/','/lokasyon/','/en/location/'])if(!llms.includes(n))errors.push(`llms.txt missing ${n}`);
const files=[];const walk=d=>{for(const e of fs.readdirSync(d,{withFileTypes:true})){const f=path.join(d,e.name);if(e.isDirectory())walk(f);else if(e.name.endsWith('.html'))files.push(f)}};walk(DIST);
const trParents=files.filter(f=>/dist[\\/]lokasyon[\\/][^\\/]+[\\/]index\.html$/.test(f)).length,enParents=files.filter(f=>/dist[\\/]en[\\/]location[\\/][^\\/]+[\\/]index\.html$/.test(f)).length;
const trSvc=files.filter(f=>/dist[\\/]lokasyon[\\/][^\\/]+[\\/](web-tasarim|e-ticaret|seo-geo)[\\/]index\.html$/.test(f)).length,enSvc=files.filter(f=>/dist[\\/]en[\\/]location[\\/][^\\/]+[\\/](web-design|ecommerce|search-visibility)[\\/]index\.html$/.test(f)).length;
if(trParents!==19||enParents!==19)errors.push(`programmatic parents expected 19/19, found ${trParents}/${enParents}`);
if(trSvc!==12||enSvc!==12)errors.push(`programmatic service pages expected 12/12, found ${trSvc}/${enSvc}`);
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

for(const p of ['/blog/','/en/blog/']){const h=readPage(p);if(h&&!/qct-blog-hero h1[^}]*color:\s*var\(--qct-color-(?:ink|text)\)/is.test(h))errors.push(`${p}: light blog hero lacks explicit dark H1 contrast`);}
for(const cluster of blogLocaleClusters.slice(0,1)){for(const p of [cluster.tr,cluster.en]){const h=readPage(p);if(h&&!/(qct-article(?:__hero)?[^<]*|<style[^>]*>)[\s\S]*h1[^}]*color:\s*var\(--qct-color-(?:ink|text)\)/i.test(h))errors.push(`${p}: light article hero lacks explicit dark H1 contrast`);}}
console.log(`Locale parity audit: ${localeParityClusters.length} triplets; blogs 13/13/13; programmatic parents ${trParents}/${enParents}; service pages ${trSvc}/${enSvc}.`);
if(errors.length){console.error([...new Set(errors)].join('\n'));process.exitCode=1}else console.log('PASS: locale parity, heading contrast, blog depth, llms and programmatic SEO.');
