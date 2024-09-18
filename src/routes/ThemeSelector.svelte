<script lang="ts">
import { onMount } from 'svelte';



	let selectedTheme = 'skeleton';
	const themeList = [
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

<select class="select w-40 capitalize" bind:value={selectedTheme} on:change={setTheme}>
	{#each themeList as theme}
		<option value={theme}>{theme}</option>
	{/each}
</select>
