<script lang="ts">
	import { onMount } from 'svelte';

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

<label class="title text-bold text-left" for="theme-selector">Theme</label>
<select bind:value={selectedTheme} on:change={setTheme} class="select w-full" id="theme-selector">
	{#each themeList as theme}
		<option value={theme}>{theme}</option>
	{/each}
</select>
