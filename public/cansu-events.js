(() => {
  const current = document.currentScript;
  const site = current?.dataset.site;
  const endpoint = 'https://cansu.teyfikgokdemir.com/api/conversions';
  if (!site) return;

  const context = () => {
    const query = new URLSearchParams(location.search);
    let referrerHost = '';
    try { referrerHost = document.referrer ? new URL(document.referrer).hostname : ''; } catch {}
    return {
      site,
      landing_path: location.pathname,
      referrer_host: referrerHost,
      utm_source: query.get('utm_source') || '',
      utm_medium: query.get('utm_medium') || '',
      event_quality: 'browser',
    };
  };

  const send = (eventType, extra = {}) => {
    const payload = JSON.stringify({ ...context(), ...extra, event_type: eventType });
    try {
      if (navigator.sendBeacon) {
        const blob = new Blob([payload], { type: 'application/json' });
        if (navigator.sendBeacon(endpoint, blob)) return;
      }
    } catch {}
    fetch(endpoint, { method:'POST', headers:{'content-type':'application/json'}, body:payload, keepalive:true, mode:'cors', credentials:'omit' }).catch(() => {});
  };

  const classify = (href) => {
    const value = String(href || '').trim().toLowerCase();
    if (value.startsWith('tel:')) return 'phone_click';
    if (value.startsWith('mailto:')) return 'email_click';
    if (value.includes('wa.me/') || value.includes('api.whatsapp.com/') || value.includes('whatsapp.com/send')) return 'whatsapp_click';
    return null;
  };

  document.addEventListener('click', (event) => {
    const anchor = event.target instanceof Element ? event.target.closest('a[href]') : null;
    if (!anchor) return;
    const type = classify(anchor.getAttribute('href'));
    if (type) send(type);
  }, { capture:true });

  window.CansuEvents = Object.freeze({ track: send });
})();
