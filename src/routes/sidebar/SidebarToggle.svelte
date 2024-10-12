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

<div
	class="fixed
z-50
border-0
bottom-0
{$sidebarIsVisible ? '' : 'left-0'}"
>
	<button
		on:click={() => ($sidebarIsVisible = !$sidebarIsVisible)}
		class="
		variant-glass-tertiary
		btn
		relative
		h-12
		w-12
		shadow-2xl
		rounded-none
		rounded-tr-md
		cursor-pointer
		
		transition-all
		duration-300
		hover:opacity-100"
		title={$sidebarIsVisible ? 'Hide sidebar (H)' : 'Show sidebar (H)'}
	>
		{#if $sidebarIsVisible}<i class="fas fa-eye-slash" />{:else}<i class="fas fa-eye" />{/if}
	</button>
</div>
