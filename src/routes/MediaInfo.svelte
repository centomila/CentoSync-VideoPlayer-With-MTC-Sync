<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { createMediaInfoHandler } from '$lib/MediaInfo';
  import { loadedFiles } from '$lib/stores';

  let mediaInfoHandler = createMediaInfoHandler();
  let result = '';

  $: $loadedFiles;

  const handleChange = async (ev: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
    const file = (ev.currentTarget as HTMLInputElement).files?.[0];
    if (file) {
      result = await mediaInfoHandler.analyzeFile(file);
    }
  };

  onMount(async () => {
    await mediaInfoHandler.init();
  });

  onDestroy(() => {
    mediaInfoHandler.close();
  });
</script>

<input type="file" placeholder="Select file..." bind:files={$loadedFiles.files} on:change={handleChange} />
<pre>{result}</pre>