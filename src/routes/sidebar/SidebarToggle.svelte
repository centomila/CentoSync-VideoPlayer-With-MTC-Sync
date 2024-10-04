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
	class="variant-glass-surface btn relative left-0 top-0  rounded-none border-0 h-12 w-12"
	title={$sidebarIsVisible ? 'Hide sidebar (H)' : 'Show sidebar (H)'}
>
	{#if $sidebarIsVisible}<i class="fas fa-eye-slash" />{:else}<i class="fas fa-eye" />{/if}
</button>
