import fs from 'node:fs';
import path from 'node:path';
import { localeParityClusters, blogLocaleClusters, canonicalServiceLinks } from '../src/data/locale-parity.js';
const DIST='dist',SITE='https://qctcommerce.com',errors=[];
const pageFile=p=>p==='/'?path.join(DIST,'index.html'):path.join(DIST,p.replace(/^\//,'').replace(/\/$/,''),'index.html');
const readPage=p=>fs.existsSync(pageFile(p))?fs.readFileSync(pageFile(p),'utf8'):null;
const hrefs=h=>[...h.matchAll(/<a\b[^>]*href=["']([^"']+)["']/gi)].map(m=>m[1]);
const alts=h=>[...h.matchAll(/<link\b[^>]*rel=["']alternate["'][^>]*hreflang=["']([^"']+)["'][^>]*href=["']([^"']+)["'][^>]*>/gi)].map(m=>({lang:m[1],href:m[2]}));
for(const cluster of localeParityClusters){for(const [lang,p] of Object.entries(cluster)){const h=readPage(p);if(!h){errors.push(`${p}: missing ${lang} parity page`);continue;}const a=alts(h);for(const [tl,tp] of Object.entries(cluster)){const hl=tl==='tr'?'tr-TR':tl==='en'?'en':'az-AZ',ex=new URL(tp,SITE).toString();if(!a.some(x=>x.lang===hl&&x.href===ex))errors.push(`${p}: missing ${hl} -> ${tp}`);}}}
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
console.log(`Locale parity audit: ${localeParityClusters.length} triplets; blogs 13/13/13; programmatic parents ${trParents}/${enParents}; service pages ${trSvc}/${enSvc}.`);
if(errors.length){console.error([...new Set(errors)].join('\n'));process.exitCode=1}else console.log('PASS: locale parity, services, blogs, llms and programmatic SEO.');
