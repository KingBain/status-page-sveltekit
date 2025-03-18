import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    alias: {
      $lib: path.resolve('./src/lib')
    },
	adapter: adapter({
		pages: 'public',
		assets: 'public',
		fallback: 'index.html' // This tells SvelteKit to generate a fallback file for dynamic routes
	})
  }
};

export default config;
