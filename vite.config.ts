import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { normalizePath } from 'vite'
import path from 'node:path'

export default defineConfig({
	plugins: [viteStaticCopy({
		targets: [
			{
				src: normalizePath(path.resolve(__dirname, 'node_modules', 'mediainfo.js', 'dist', 'MediaInfoModule.wasm')),
				dest: '.',
			}
		]
	}),
	sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});

