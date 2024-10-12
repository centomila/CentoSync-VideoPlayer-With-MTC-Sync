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
{$sidebarIsVisible ? '' : 'left-0'}"
>
	<button
		on:click={() => ($sidebarIsVisible = !$sidebarIsVisible)}
		class="
		variant-glass-tertiary
		btn
		relative
	
		top-0
		z-50
		h-16
		w-16
		-translate-x-4
		-translate-y-4
		scale-50
		cursor-pointer
		rounded-none
		border-0
		border-transparent
		transition-all
		duration-300
		hover:-translate-x-0
		hover:-translate-y-0
		hover:scale-100
		hover:opacity-100"
		title={$sidebarIsVisible ? 'Hide sidebar (H)' : 'Show sidebar (H)'}
	>
		{#if $sidebarIsVisible}<i class="fas fa-eye-slash" />{:else}<i class="fas fa-eye" />{/if}
	</button>
</div>
