// @ts-check

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://www.vibeperform.com',
	trailingSlash: 'always',
	// Remove base when using custom domain
	integrations: [react()],
	i18n: {
		defaultLocale: 'de',
		locales: ['de', 'en'],
		routing: {
			prefixDefaultLocale: true,
			redirectToDefaultLocale: false,
		},
	},
	vite: {
		plugins: [tailwindcss()],
	},
});
