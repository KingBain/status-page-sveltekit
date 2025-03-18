import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	json: {
		stringify: true // Ensures JSON can be imported directly
	  }
});
