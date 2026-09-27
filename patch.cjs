const fs = require('fs');

const css = `
<style is:global>
@media (max-width:999px) {
  .qct-mobile-accordion-toggle {
    width: 100% !important;
    display: grid !important;
    grid-template-columns: 1fr auto !important;
    align-items: center !important;
    gap: 14px !important;
    min-height: 76px !important;
    padding: 14px 16px !important;
    cursor: pointer !important;
    background: #151a16 !important;
    color: #f3eadf !important;
    border: none !important;
    text-align: left !important;
    border-radius: 0 !important;
  }
  .qct-mobile-accordion-toggle>span {
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
  .qct-mobile-accordion-toggle[aria-expanded="false"] i::after { content: '+' !important; }
  .qct-mobile-accordion-toggle[aria-expanded="true"] i::after { content: '−' !important; }
  
  .qct-mobile-section__grid[hidden] {
    display: none !important;
  }
  .qct-mobile-section--accordion > .qct-mobile-section__grid:not([hidden]) {
    display: grid !important;
  }
}
</style>
`;

fs.appendFileSync('src/components/Header.astro', css);
