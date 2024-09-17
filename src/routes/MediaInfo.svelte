<script lang="ts">
  import { onMount, onDestroy, afterUpdate } from 'svelte';
  import { createMediaInfoHandler } from '$lib/MediaInfo';
  import { loadedFiles } from '$lib/stores';
  import type { MediaInfoFormat } from '$lib/MediaInfo';

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
          console.error(`Error analyzing file ${file.name}:`, error);
          results = [...results, `Error analyzing ${file.name}`];
        }
      }
    } finally {
      isAnalyzing = false;
    }
  }

  onMount(async () => {
    await mediaInfoHandler.init();
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
  <p>Analyzing files...</p>
{:else if results.length > 0}
  {#each results as result, index}
    <h3>File {index + 1}</h3>
    {#if typeof result === 'string'}
      <pre>{result}</pre>
    {:else}
      <pre>{JSON.stringify(result, null, 2)}</pre>
    {/if}
  {/each}
{:else}
  <p>No files analyzed yet.</p>
{/if}