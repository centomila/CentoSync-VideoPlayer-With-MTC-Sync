<script lang="ts">
	import { onMount, onDestroy, afterUpdate } from 'svelte';
	import { createMediaInfoHandler } from '$lib/MediaInfo';
	import { loadedFiles, sidebarIsVisible } from '$lib/stores';
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

{#if isAnalyzing}
	<div class="mx-auto my-auto max-w-screen-lg justify-center py-10 text-center">
		<pre
			class="text-xxl"
			transition:fade={{
				delay: 0,
				duration: 150
			}}>Analyzing {$loadedFiles.currentFileName}</pre>
	</div>
{:else if results.length > 0}
	<div class="mx-auto my-auto max-w-screen-lg px-4 py-8">
		<!-- <h2 class="title h2 text-center font-bold">{$loadedFiles.currentFileName}</h2> -->
		<div transition:fade={{ delay: 0, duration: 150 }}>
			{#each results as result}
				{#if typeof result === 'string'}
					<pre class="text-wrap text-xl">{result}</pre>
				{:else}
					<pre>{JSON.stringify(result, null, 2)}</pre>
				{/if}
			{/each}
		</div>
	</div>
{:else}
	<div
		class="fixed right-0 top-0 flex h-screen items-center justify-center text-center transition-all
			{$sidebarIsVisible ? ' left-80' : 'left-0'}"
	>
		<div class="title z-50 mx-auto space-y-8 text-center text-xl">
			<p>I don't have anything to analyze 🥺</p>
			<hr />
			<p>Please load a video using the button above or drag it into this window.</p>
		</div>
	</div>
{/if}
