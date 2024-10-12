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
	<div class="flex w-full items-center justify-between">
		<label for="theme-selector"><i class="fa-solid fa-palette" /></label>
		<select bind:value={$theme} class="select max-w-36 py-1 text-xs capitalize border-1 border-surface-300-600-token bg-surface-300-900-token" id="theme-selector">
			{#each themeList as t}
				<option value={t}>{t}</option>
			{/each}
		</select>

		<LightSwitch
			title="Dark Mode"
			bgLight="bg-surface-200"
			fillLight="fill-surface-400"
			bgDark="bg-surface-500"
			fillDark="fill-surface-900"
			
		/>
	</div>
</div>
