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

<div class=" border-0 {$sidebarIsVisible ? '' : 'left-0'}">
	<button
		on:click={() => ($sidebarIsVisible = !$sidebarIsVisible)}
		class="		
		variant-glass-surface
		min-w-16
		cursor-pointer
		rounded-none
		border-0
		px-6
		py-4
		opacity-50
		shadow-2xl
		transition-all
		duration-300
		hover:variant-filled-tertiary
		hover:opacity-100"
		title={$sidebarIsVisible ? 'Hide sidebar (H)' : 'Show sidebar (H)'}
	>
		{#if $sidebarIsVisible}<i class="fas fa-angle-left" />{:else}<i
				class="fas fa-angle-right"
			/>{/if}
	</button>
</div>
