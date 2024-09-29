<script>
	import { onMount } from 'svelte';
	import { sidebarIsVisible } from '$lib/stores';
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	import SelectVideoFile from './SelectVideoFile.svelte';
	import GuiViewSelection from './GuiViewSelection.svelte';
	import MidiPortSelection from './MidiPortSelection.svelte';

	import ToggleBpm from './tempoComponents/ToggleBpm.svelte';
	import ToggleElapsedFrames from './tempoComponents/ToggleElapsedFrames.svelte';
	import ToggleMidiTimeCode from './tempoComponents/ToggleMidiTimeCode.svelte';
	import ToggleTrackPosition from './tempoComponents/ToggleTrackPosition.svelte';
	import ToggleSyncModeIsMTC from './tempoComponents/ToggleSyncModeIsMTC.svelte';
	import { syncModeIsMTC } from '$lib/stores';

	import ThemeSelector from './ThemeSelector.svelte';

	import HelpComponent from './HelpComponent.svelte';

	import Copyright from './Copyright.svelte';

	
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
	class="variant-glass-primary btn relative left-0 top-0 h-8 w-8 rounded-none hover:translate-x-1 hover:translate-y-1 hover:scale-125"
	title={$sidebarIsVisible ? 'Hide sidebar (H)' : 'Show sidebar (H)'}
>
	{#if $sidebarIsVisible}<i class="fas fa-eye-slash" />{:else}<i class="fas fa-eye" />{/if}
</button>
