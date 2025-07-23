// src/lib/utils/i18n.ts
import { register, init, getLocaleFromNavigator, locale } from 'svelte-i18n';

// 1) Register all your JSON bundles
const modules = import.meta.glob('../locales/*.json', { query: '?json' });
for (const path in modules) {
  const m = path.match(/\/([\w-]+)\.json$/);
  if (!m) continue;
  const loc = m[1];           // e.g. "en", "fr", etc.
  register(loc, modules[path]);
}

// 2) Determine the initial locale:
//    - If they’ve chosen one before, use that.
//    - Otherwise, fall back to their browser setting.
//    - Lastly, default to "en".
const saved = typeof localStorage !== 'undefined'
  ? localStorage.getItem('locale')
  : null;
const nav = getLocaleFromNavigator();  // e.g. "en", "es", etc.
const initial = saved || nav || 'en';

// 3) Bootstrap the store
init({
  fallbackLocale: 'en',    // if they pick something we don’t have
  initialLocale: initial
});

// 4) Whenever the locale changes, save it
locale.subscribe((l) => {
  if (l && typeof localStorage !== 'undefined') {
    localStorage.setItem('locale', l);
  }
});
