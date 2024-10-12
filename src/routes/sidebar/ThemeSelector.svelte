<script lang="ts">
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { theme } from '$lib/stores';
	import { onMount } from 'svelte';

	const themeList = [
		'bitwig',
		'centomila',
		'skeleton',
		'modern',
		'rocket',
		'seafoam',
		'vintage',
		'sahara',
		'hamlindigo',
		'gold-nouveau',
		'crimson'
	];

	function setTheme(currentTheme: string) {
		if (typeof document !== 'undefined') {
			document.body.setAttribute('data-theme', currentTheme);
		}
	}

	// Use onMount to ensure DOM is ready
	onMount(() => {
		setTheme($theme);
	});

	// Reactive statement
	$: if (typeof window !== 'undefined') {
		setTheme($theme);
	}
</script>

<div class="space-y-2">
	<div class="flex w-full justify-between items-center">
		<i class="fa-solid fa-palette" />
		<select bind:value={$theme} class="select capitalize max-w-36 py-1 text-xs" id="theme-selector">
			{#each themeList as t}
				<option value={t}>{t}</option>
			{/each}
		</select>
		<LightSwitch title="Dark Mode"  class=" h-2" />
	</div>
</div>
