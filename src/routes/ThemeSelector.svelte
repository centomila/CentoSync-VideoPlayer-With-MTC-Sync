<script lang="ts">
	import { onMount } from 'svelte';
	import { LightSwitch } from '@skeletonlabs/skeleton';

	let selectedTheme = 'centomila';
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
		document.body.setAttribute('data-theme', selectedTheme);
	}

	onMount(setTheme);
</script>

<div class="flex justify-between">
	<label class="title text-bold text-left" for="theme-selector">Theme</label>
	<LightSwitch title="Dark Mode" />
</div>
<select
	bind:value={selectedTheme}
	on:change={setTheme}
	class="select w-full capitalize"
	id="theme-selector"
>
	{#each themeList as theme}
		<option value={theme}>{theme}</option>
	{/each}
</select>
