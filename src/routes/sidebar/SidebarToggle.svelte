<script>
	import { onMount } from 'svelte';
	import { sidebarIsVisible } from '$lib/stores';

	onMount(() => {
		window.addEventListener('keydown', (event) => {
			if (event.key === 'h' || event.key === 'H') {
				$sidebarIsVisible = !$sidebarIsVisible;
			}
		});
	});
</script>

<button
	on:click={() => ($sidebarIsVisible = !$sidebarIsVisible)}
	class="hover:opacity-100hover:hue-rotate-180 variant-glass-surface btn relative top-0 z-50 h-12 w-12 cursor-pointer rounded-none border-0 opacity-50 {$sidebarIsVisible
		? '-left-12'
		: '-left-0'}"
	title={$sidebarIsVisible ? 'Hide sidebar (H)' : 'Show sidebar (H)'}
>
	{#if $sidebarIsVisible}<i class="fas fa-eye-slash" />{:else}<i class="fas fa-eye" />{/if}
</button>
