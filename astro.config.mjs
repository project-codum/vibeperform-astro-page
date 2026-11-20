// @ts-check

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import { defineConfig } from 'astro/config';
import { localHomepagePreview, privatePreviewFlags } from './scripts/local-homepage-preview.mjs';

// https://astro.build/config
export default defineConfig({
	site: 'https://www.vibeperform.com',
	cacheDir: './.cache/astro',
	trailingSlash: 'always',
	// Remove base when using custom domain
	integrations: [react(), localHomepagePreview()],
	i18n: {
		defaultLocale: 'de',
		locales: ['de', 'en'],
		routing: {
			prefixDefaultLocale: true,
			redirectToDefaultLocale: false,
		},
	},
	vite: {
		cacheDir: '.cache/vite',
		define: privatePreviewFlags,
		plugins: [tailwindcss()],
	},
});
