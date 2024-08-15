/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {

		extend: {
			fontFamily: {
				'medium': ['Medium'],
				'montreal': ['Montreal', 'monospace'],
			},
			colors: {
				'background': '#fafafa',
				'accent': '#0000FF'
			}
		},
	},
	plugins: [],
}