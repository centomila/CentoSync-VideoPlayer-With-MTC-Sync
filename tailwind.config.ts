import { join } from 'path';
import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';
import { centomilaTheme } from './centomila-theme'


// 1. Import the Skeleton plugin
import { skeleton } from '@skeletonlabs/tw-plugin';

const config = {
	// 2. Opt for dark mode to be handled via the class method
	darkMode: 'selector',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		// 3. Append the path to the Skeleton package
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	theme: {
		extend: {}
	},
	plugins: [
		skeleton({
			themes: {
				preset: [
					{ name: 'skeleton', enhancements: true },
					{ name: 'modern', enhancements: true },
					{ name: 'rocket', enhancements: true },
					{ name: 'seafoam', enhancements: true },
					{ name: 'vintage', enhancements: true },
					{ name: 'sahara', enhancements: true },
					{ name: 'hamlindigo', enhancements: true },
					{ name: 'gold-nouveau', enhancements: true },
					{ name: 'crimson', enhancements: true }
				],
				custom: [
					centomilaTheme
				]
			}
		}),
		forms
	]
} satisfies Config;

export default config;
