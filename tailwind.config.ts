import { join } from 'path';
import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';

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
			themes:
			{
				preset: [
					{ name: "skeleton", enhancements: false },
					{ name: "modern", enhancements: false },
					{ name: "rocket", enhancements: false },
					{ name: "seafoam", enhancements: false },
					{ name: "vintage", enhancements: false },
					{ name: "sahara", enhancements: false },
					{ name: "hamlindigo", enhancements: false },
					{ name: "gold-nouveau", enhancements: false },
					{ name: "crimson", enhancements: false }
				]
			},
			
		}),
		forms
	]
} satisfies Config;

export default config;
