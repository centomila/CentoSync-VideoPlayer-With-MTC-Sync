<script lang="ts">
	import { onMount } from 'svelte';
	import { guiView } from '$lib/stores';

	$: $guiView;

	function setGuiView(event: Event) {
		guiView.update(() => (event.target as HTMLButtonElement).value);
	}

	const views = {
		mtc: 'MTC',
		video: 'Video Sync',
		info: 'Info Video'
	};
</script>

<div class="variant-filled btn-group">
	{#each Object.entries(views) as [key, value]}
		<button
			class={$guiView === key
				? 'variant-filled-primary w-40 hover:variant-soft-primary'
				: 'variant-filled w-40 hover:variant-soft'}
			value={key}
			on:click={setGuiView}
		>
			{value}
		</button>
	{/each}
</div>
