type AnalyticsParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    qctTrackEvent?: (name: string, params?: AnalyticsParams) => void;
  }
}

const consentKey = 'qct-analytics-consent';

const hasConsent = () => {
  try {
    return window.localStorage.getItem(consentKey) === 'granted';
  } catch {
    return false;
  }
};

const cleanParams = (params: AnalyticsParams = {}) =>
  Object.fromEntries(Object.entries(params).filter(([, value]) => value !== undefined && value !== ''));

export const trackEvent = (name: string, params: AnalyticsParams = {}) => {
  if (!name || !hasConsent() || typeof window.gtag !== 'function') return;

  window.gtag('event', name, cleanParams({
    page_path: window.location.pathname,
    page_title: document.title,
    language: document.documentElement.lang || undefined,
    ...params,
  }));
};

window.qctTrackEvent = trackEvent;

document.addEventListener('click', (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;

  const link = target.closest('a[href]');
  if (!(link instanceof HTMLAnchorElement)) return;

  const href = link.getAttribute('href') || '';
  const label = (link.textContent || link.getAttribute('aria-label') || '').trim().replace(/\s+/g, ' ').slice(0, 120) || undefined;

  if (/^(?:https?:\/\/)?(?:www\.)?wa\.me\//i.test(href) || href.includes('api.whatsapp.com')) {
    trackEvent('whatsapp_click', {
      cta_label: label,
      service: link.dataset.analyticsService,
      platform: link.dataset.analyticsPlatform,
      product_scope: link.dataset.analyticsProductScope,
      pricing_value: link.dataset.analyticsPricingValue ? Number(link.dataset.analyticsPricingValue) : undefined,
    });
    return;
  }

  if (href.startsWith('tel:')) {
    trackEvent('phone_click', { cta_label: label });
    return;
  }

  if (href.startsWith('mailto:')) {
    trackEvent('email_click', { cta_label: label });
    return;
  }

  try {
    const url = new URL(link.href, window.location.href);
    if (
      url.origin === window.location.origin &&
      ['/iletisim/', '/en/contact/'].includes(url.pathname)
    ) {
      trackEvent('cta_click', {
        cta_label: label,
        destination: url.pathname,
      });
    }
  } catch {
    // Navigation must never depend on analytics.
  }
});
