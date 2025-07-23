// src/lib/utils/i18n.ts
import { register, init, locale as $locale } from 'svelte-i18n';
import { browser } from '$app/environment'; // <— SvelteKit helper

// 1) Register all your JSON bundles
const modules = import.meta.glob('../locales/*.json', { query: '?json' });
for (const path in modules) {
  const m = path.match(/\/([\w-]+)\.json$/);
  if (!m) continue;
  register(m[1], modules[path]);
}

// 2) Initialize with a known locale (SSR & client)
init({
  fallbackLocale: 'en',
  initialLocale:  'en'
});

// 3) Only in the browser do we subscribe & write to localStorage
if (browser) {
  $locale.subscribe((l) => {
    if (typeof l === 'string') {
      localStorage.setItem('locale', l);
    }
  });
}
