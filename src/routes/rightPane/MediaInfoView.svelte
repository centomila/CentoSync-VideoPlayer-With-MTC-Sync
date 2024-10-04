<script lang="ts">
	import { onMount, onDestroy, afterUpdate } from 'svelte';
	import { createMediaInfoHandler } from '$lib/MediaInfo';
	import { loadedFiles } from '$lib/stores';
	import type { MediaInfoFormat } from '$lib/MediaInfo';
	import { fade } from 'svelte/transition';

	export let format: MediaInfoFormat = 'text';

	let mediaInfoHandler = createMediaInfoHandler(format);
	let results: (string | Record<string, unknown>)[] = [];
	let isAnalyzing = false;

	$: if ($loadedFiles.files) {
		analyzeFiles($loadedFiles.files);
	}

	async function analyzeFiles(files: FileList | null) {
		if (!files || files.length === 0 || isAnalyzing) {
			return;
		}

		isAnalyzing = true;
		results = [];

		try {
			for (let i = 0; i < files.length; i++) {
				const file = files[i];
				try {
					const result = await mediaInfoHandler.analyzeFile(file);
					results = [...results, result];
				} catch (error) {
					console.log(`Analyzing file ${file.name}:`, error);
					results = [...results, `Analyzing ${file.name}`];
				}
			}
		} finally {
			isAnalyzing = false;
		}
	}

	onMount(async () => {
		if ($loadedFiles.files) {
			await analyzeFiles($loadedFiles.files);
		}
	});

	onDestroy(() => {
		mediaInfoHandler.close();
	});

	afterUpdate(() => {
		if ($loadedFiles.files && results.length === 0 && !isAnalyzing) {
			analyzeFiles($loadedFiles.files);
		}
	});
</script>

<!-- <input type="file" multiple bind:files={$loadedFiles.files} /> -->

<div class="mx-auto my-auto max-w-screen-lg py-10">
	{#if isAnalyzing}
		<pre
			class="text-xxl"
			transition:fade={{
				delay: 0,
				duration: 150
			}}>Analyzing {$loadedFiles.currentFileName}</pre>
	{:else if results.length > 0}
		<h2 class="title h2 text-center font-bold">{$loadedFiles.currentFileName}</h2>
		<div transition:fade={{ delay: 0, duration: 150 }}>
			{#each results as result}
				{#if typeof result === 'string'}
					<pre class="text-wrap text-xl">{result}</pre>
				{:else}
					<pre>{JSON.stringify(result, null, 2)}</pre>
				{/if}
			{/each}
		</div>
	{:else}
		<div class="flex items-center justify-center">
			<h2 class="title text-center text-xl">I have nothing to analyze. Load a video.</h2>
		</div>
	{/if}
</div>
