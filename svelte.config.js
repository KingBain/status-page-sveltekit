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
		paths: {
			base: process.env.BASE_PATH ?? ''
		  },
		adapter: adapter({
			pages: '__sapper__/export',
			assets: '__sapper__/export',
			fallback: '404.html'
		}),
		// prerender all routes (generate static pages)
		prerender: {
			entries: ['*']
		}

	}
};

export default config;
