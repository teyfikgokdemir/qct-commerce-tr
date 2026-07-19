import en from "./en.json";
import sq from "./sq.json";
import mk from "./mk.json";
import sr from "./sr.json";

const dictionaries = { en, sq, mk, sr };

export const languages = {
  en: "EN",
  sq: "SQ",
  mk: "MK",
  sr: "SR",
};

export const languageNames = {
  en: "English",
  sq: "Shqip",
  mk: "Македонски",
  sr: "Srpski",
};

export const defaultLang = "en";

export function getLangFromUrl(url) {
  const [, lang] = url.pathname.split("/");
  if (lang in dictionaries) return lang;
  return defaultLang;
}

export function useTranslations(lang) {
  const dict = dictionaries[lang] ?? dictionaries[defaultLang];
  return function t(key) {
    return dict[key] ?? key;
  };
}

export function getHomeUrl(lang) {
  return lang === defaultLang ? "/" : `/${lang}/`;
}

// path should start and end with "/", e.g. "/website-design/"
export function getLocalizedUrl(lang, path) {
  return lang === defaultLang ? path : `/${lang}${path}`;
}

// Strip the locale prefix from a raw URL pathname, e.g. "/sq/about/" -> "/about/",
// "/about/" -> "/about/", "/mk/" -> "/". Mirrors the logic BaseLayout.astro uses to
// build hreflang tags, so components (like the language switcher) can link to the
// translated version of the *current* page instead of always falling back to home.
export function getPathWithoutLocale(pathname) {
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] && parts[0] in dictionaries && parts[0] !== defaultLang) {
    return "/" + parts.slice(1).join("/") + (parts.length > 1 ? "/" : "");
  }
  return pathname.endsWith("/") || pathname === "" ? pathname || "/" : pathname + "/";
}
