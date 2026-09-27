const fs = require('fs');
let c = fs.readFileSync('src/components/Footer.astro', 'utf8');

const target = `<nav class="site-footer__locations" aria-label="Bölgeler" style="display:none;">`;
const replacement = `{(!isEnglish && !isGeorgian) && (
<nav class="site-footer__locations" aria-label="Bölgeler" style="display:none;">`;

const endTarget = `</nav>`;
const endReplacement = `</nav>
)}`;

// Only replace if not already wrapped
if (!c.includes('{(!isEnglish && !isGeorgian) && (')) {
  c = c.replace(target, replacement);
  // find the very next </nav> after replacement
  let split = c.split(replacement);
  let afterNav = split[1].replace('</nav>', endReplacement);
  c = split[0] + replacement + afterNav;
  fs.writeFileSync('src/components/Footer.astro', c);
  console.log("Footer patched.");
} else {
  console.log("Already patched.");
}
