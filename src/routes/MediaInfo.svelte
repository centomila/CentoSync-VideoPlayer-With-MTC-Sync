<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import mediaInfoFactory from 'mediainfo.js';
	import type { MediaInfo, ReadChunkFunc } from 'mediainfo.js';

	let mediaInfo: MediaInfo<'text'> | undefined;
	let result = '';

	const makeReadChunk =
		(file: File): ReadChunkFunc =>
		async (chunkSize: number, offset: number) => {
			return new Uint8Array(await file.slice(offset, offset + chunkSize).arrayBuffer());
		};

	const handleChange = async (ev: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
		const file = (ev.currentTarget as HTMLInputElement).files?.[0];
		if (file && mediaInfo) {
			try {
				result = await mediaInfo.analyzeData(file.size, makeReadChunk(file));
			} catch (error: unknown) {
				console.error(error);
			}
		}
	};

	onMount(async () => {
		try {
			mediaInfo = await mediaInfoFactory({ format: 'text' });
		} catch (error: unknown) {
			console.error(error);
		}
	});

	onDestroy(() => {
		if (mediaInfo) {
			mediaInfo.close();
		}
	});
</script>

<input type="file" placeholder="Select file..." on:change={handleChange} />
<pre>{result}</pre>
