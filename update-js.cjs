const fs = require('fs');

const css = `
<style is:global>
@media (max-width: 999px) {
  .site-menu-toggle { touch-action: manipulation; }
  .mobile-nav-close { touch-action: manipulation; }
  
  .main-navigation {
    display: flex !important;
    flex-direction: column !important;
    background: #0f1210 !important;
    color: #f3eadf !important;
    padding: calc(14px + env(safe-area-inset-top,0px)) 16px calc(14px + env(safe-area-inset-bottom,0px)) !important;
  }
  
  .mobile-nav-head {
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    position: sticky !important;
    top: 0 !important;
    z-index: 5 !important;
    margin: -2px -2px 12px !important;
    padding: 2px 2px 10px !important;
    background: linear-gradient(180deg, #0f1210 82%, rgba(15,18,16,0)) !important;
    border-bottom: 1px solid rgba(200,255,61,.12) !important;
  }
  
  .mobile-nav-title {
    color: #c8ff3d !important;
    font-size: .85rem !important;
    font-weight: 700 !important;
    letter-spacing: .08em !important;
    text-transform: uppercase !important;
  }
  
  .mobile-nav-close {
    width: 38px !important;
    height: 38px !important;
    border-radius: 12px !important;
    border: 1px solid rgba(200,255,61,.16) !important;
    background: #151a16 !important;
    color: #c8ff3d !important;
    font-size: 18px !important;
    display: grid !important;
    place-items: center !important;
    cursor: pointer !important;
  }
  
  .mobile-only-panel {
    display: flex !important;
    flex-direction: column !important;
    gap: 18px !important;
    width: 100% !important;
  }
  
  .qct-mobile-primary {
    display: grid !important;
    grid-template-columns: 1fr 1fr !important;
    gap: 8px !important;
  }
  
  .qct-mobile-primary__link {
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    gap: 12px !important;
    min-height: 54px !important;
    padding: 12px 13px !important;
    border: 1px solid rgba(243,234,223,.10) !important;
    border-radius: 14px !important;
    background: #1d1b18 !important;
    color: #c8ff3d !important;
    text-decoration: none !important;
    font-size: 1rem !important;
    font-weight: 800 !important;
    letter-spacing: -.025em !important;
  }
  
  .qct-mobile-primary__link span:last-child {
    color: #ff5f4d !important;
    font-size: .75rem !important;
  }
  
  .qct-mobile-groups {
    display: grid !important;
    gap: 12px !important;
  }
  
  .qct-mobile-section--accordion {
    display: block !important;
    border: 1px solid rgba(200,255,61,.12) !important;
    border-radius: 16px !important;
    background: #151a16 !important;
    overflow: hidden !important;
  }
  
  .qct-mobile-accordion-toggle {
    width: 100% !important;
    display: grid !important;
    grid-template-columns: 1fr auto !important;
    align-items: center !important;
    gap: 14px !important;
    min-height: 64px !important;
    padding: 14px 16px !important;
    border: 0 !important;
    background: transparent !important;
    color: #f3eadf !important;
    cursor: pointer !important;
    text-align: left !important;
  }
  
  .qct-mobile-accordion-toggle > span {
    display: grid !important;
    gap: 4px !important;
  }
  
  .qct-mobile-accordion-toggle strong {
    color: #f3eadf !important;
    font-size: 1.05rem !important;
    font-weight: 900 !important;
    letter-spacing: -.02em !important;
  }
  
  .qct-mobile-accordion-toggle small {
    color: rgba(243,234,223,.58) !important;
    font-size: .68rem !important;
  }
  
  .qct-mobile-accordion-toggle i {
    color: #c8ff3d !important;
    font-style: normal !important;
    font-size: 1.45rem !important;
    font-weight: 600 !important;
    line-height: 1 !important;
  }
  
  .qct-mobile-accordion-toggle[aria-expanded="false"] i::after { content: '+'; }
  .qct-mobile-accordion-toggle[aria-expanded="true"] i::after { content: '−'; }
  .qct-mobile-accordion-toggle[aria-expanded="true"] { border-bottom: 1px solid rgba(200,255,61,.12) !important; }
  
  .qct-mobile-section__grid {
    display: grid !important;
    grid-template-columns: repeat(2, minmax(0,1fr)) !important;
    gap: 1px !important;
    background: rgba(200,255,61,.08) !important;
  }
  
  .qct-mobile-section__grid[hidden] {
    display: none !important;
  }
  
  .qct-mobile-section__grid a {
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    gap: 8px !important;
    min-height: 44px !important;
    padding: 10px 11px !important;
    background: #101411 !important;
    color: #f3eadf !important;
    text-decoration: none !important;
    font-size: .72rem !important;
    line-height: 1.2 !important;
    font-weight: 760 !important;
  }
  
  .qct-mobile-section__grid a span:last-child {
    color: #c8ff3d !important;
  }
  
  .qct-mobile-section__grid a[aria-current="page"] {
    color: #c8ff3d !important;
    background: #182016 !important;
  }
  
  .qct-mobile-bottom {
    position: sticky !important;
    bottom: 0 !important;
    z-index: 6 !important;
    display: grid !important;
    grid-template-columns: auto 1fr !important;
    align-items: center !important;
    gap: 10px !important;
    margin: auto -4px 0 !important;
    padding: 10px 4px calc(8px + env(safe-area-inset-bottom,0px)) !important;
    border-top: 1px solid rgba(255,255,255,.08) !important;
    background: linear-gradient(180deg,rgba(23,22,20,.88),#171614 24%) !important;
    backdrop-filter: blur(16px) !important;
    -webkit-backdrop-filter: blur(16px) !important;
  }
  
  .qct-mobile-languages {
    display: flex !important;
    align-items: center !important;
    gap: 5px !important;
    flex-wrap: nowrap !important;
  }
  
  .qct-mobile-languages a {
    display: grid !important;
    place-items: center !important;
    width: 34px !important;
    height: 34px !important;
    border: 1px solid rgba(200,255,61,.18) !important;
    border-radius: 999px !important;
    color: #c8ff3d !important;
    background: #1d1b18 !important;
    font-size: .62rem !important;
    font-weight: 900 !important;
    text-decoration: none !important;
  }
  
  .qct-mobile-languages a.active {
    background: #ff5f4d !important;
    color: #171614 !important;
    border-color: #ff5f4d !important;
  }
  
  .qct-mobile-project {
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    min-height: 42px !important;
    padding: 0 14px !important;
    border-radius: 11px !important;
    background: #c8ff3d !important;
    color: #171614 !important;
    font-size: .78rem !important;
    font-weight: 850 !important;
    text-decoration: none !important;
  }
  
  .qct-mobile-project span:last-child {
    color: #ff5f4d !important;
    font-size: 1.1rem !important;
  }
  
  body.has-open-menu .site-menu-toggle {
    opacity: 0 !important;
    pointer-events: none !important;
  }
}
</style>
`;

fs.appendFileSync('src/components/Header.astro', css);

let mainJs = fs.readFileSync('public/scripts/main.js', 'utf8');

const accordionLogic = `
	var mobileAccordionToggles = document.querySelectorAll('[data-mobile-accordion-toggle]');
	mobileAccordionToggles.forEach(function (toggle) {
		toggle.addEventListener('click', function (event) {
			event.preventDefault();
			event.stopPropagation();
			var isExpanded = toggle.getAttribute('aria-expanded') === 'true';
			var panel = toggle.nextElementSibling;
			
			if (isExpanded) {
				toggle.setAttribute('aria-expanded', 'false');
				if (panel && panel.hasAttribute('data-mobile-accordion-panel')) {
					panel.hidden = true;
				}
			} else {
				toggle.setAttribute('aria-expanded', 'true');
				if (panel && panel.hasAttribute('data-mobile-accordion-panel')) {
					panel.hidden = false;
				}
			}
		});
	});
`;

mainJs = mainJs.replace('var submenuToggles = document.querySelectorAll(\'[data-submenu-toggle]\');', 'var submenuToggles = document.querySelectorAll(\'[data-submenu-toggle]\');\n' + accordionLogic);

fs.writeFileSync('public/scripts/main.js', mainJs);

console.log("Done");
