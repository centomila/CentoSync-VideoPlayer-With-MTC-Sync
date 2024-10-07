<script lang="ts">
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { theme } from '$lib/stores';
	import { onMount } from 'svelte';

	const themeList = [
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
	<div class="flex w-full justify-between">
		<label class="title text-bold text-left" for="theme-selector">Theme</label>
		<LightSwitch title="Dark Mode" />
	</div>
	<select bind:value={$theme} class="select w-full capitalize" id="theme-selector">
		{#each themeList as t}
			<option value={t}>{t}</option>
		{/each}
	</select>
</div>
