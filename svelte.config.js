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
			pages: '__sapper__/export',
			assets: '__sapper__/export',
			fallback: 'index.html'
		}),
		// prerender all routes (generate static pages)
		prerender: {
			entries: ['*']
		}

	}
};

export default config;
