<script lang="ts">
	import { onMount } from 'svelte';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { theme } from '$lib/stores';

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

	function setTheme() {
		// use the selectedTheme variable here
		localStorage.setItem('theme', $theme);
		document.body.setAttribute('data-theme', $theme);
	}
	function getTheme() {
		// use the selectedTheme variable here
		$theme = localStorage.getItem('theme') || 'centomila';
		document.body.setAttribute('data-theme', $theme);
	}

	onMount(getTheme);
</script>

<div class="flex justify-between">
	<label class="title text-bold text-left" for="theme-selector"><i class="fa-solid fa-palette pr-4"></i>Theme</label>
	<LightSwitch title="Dark Mode" />
</div>
<select
	bind:value={$theme}
	on:change={setTheme}
	class="select w-full capitalize"
	id="theme-selector"
>
	{#each themeList as theme}
		<option value={theme}>{theme}</option>
	{/each}
</select>
