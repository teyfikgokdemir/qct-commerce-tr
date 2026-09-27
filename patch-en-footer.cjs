const fs = require('fs');
let c = fs.readFileSync('src/components/Footer.astro', 'utf8');

// Add English location links block right before </footer> or the English section
const enLinks = `
{isEnglish && (
<nav class="site-footer__locations" aria-label="Locations" style="display:none;">
  <a href="/en/location/istanbul/">Istanbul</a>
  <a href="/en/location/ankara/">Ankara</a>
  <a href="/en/location/izmir/">Izmir</a>
  <a href="/en/location/bursa/">Bursa</a>
  <a href="/en/location/antalya/">Antalya</a>
  <a href="/en/location/gaziantep/">Gaziantep</a>
  <a href="/en/location/kocaeli/">Kocaeli</a>
  <a href="/en/location/adana/">Adana</a>
  <a href="/en/location/kayseri/">Kayseri</a>
  <a href="/en/location/konya/">Konya</a>
  <a href="/en/location/denizli/">Denizli</a>
  <a href="/en/location/mersin/">Mersin</a>
  <a href="/en/location/eskisehir/">Eskisehir</a>
  <a href="/en/location/samsun/">Samsun</a>
  <a href="/en/location/sakarya/">Sakarya</a>
  <a href="/en/location/germany/">Germany</a>
  <a href="/en/location/uk/">United Kingdom</a>
  <a href="/en/location/azerbaijan/">Azerbaijan</a>
  <a href="/en/location/dubai/">Dubai</a>
</nav>
)}`;

// Insert before </footer>
if (!c.includes('/en/location/istanbul/')) {
  c = c.replace('</footer>', enLinks + '\n</footer>');
  fs.writeFileSync('src/components/Footer.astro', c);
  console.log('English location links added to Footer.');
} else {
  console.log('Already patched.');
}
