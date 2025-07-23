// src/lib/utils/i18n.ts
import { register, init } from 'svelte-i18n';

// 1) Grab all JSON under src/lib/locales (that you just created)
const modules = import.meta.glob('../locales/*.json', { query: '?json' });

for (const path in modules) {
  const m = path.match(/\/([\w-]+)\.json$/);
  if (!m) continue;
  const locale = m[1];            // e.g. "en"
  register(locale, modules[path]); // tell svelte-i18n how to load it
}

// 2) Initialize the i18n store
init({
  fallbackLocale: 'en',  // fallback if an unknown locale is used
  initialLocale: 'en'    // start in English until we override
});
