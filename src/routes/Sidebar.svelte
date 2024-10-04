<script>
	import ToggleSidebar from './ToggleSidebar.svelte';

	import { onMount } from 'svelte';
	import { appName, appVersion, sidebarIsVisible } from '$lib/stores';
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
		document.title = `${$appName} ${$appVersion} - No video loaded`;
	});
</script>

<div class="flex flex-row">
	{#if $sidebarIsVisible}
		<aside
			transition:slide={{ delay: 0, duration: 300, easing: quintOut, axis: 'x' }}
			class="border-surface-300-600-token sticky top-0 flex max-h-screen w-72 flex-col border-r pt-1"
		>
			<!-- Header -->
			<header class="border-surface-300-600-token py-4">
				<h1 class="text-center text-2xl font-bold">{$appName}</h1>
				<p class="text-center text-xs">Version {$appVersion}</p>
			</header>

			<!-- Sidebar content -->
			<div class="flex-grow">
				<div class="border-surface-300-600-token flex w-full flex-col border-t py-0">
					<HelpComponent />
				</div>
				<div class="border-surface-300-600-token flex w-full flex-col items-center border-t p-4">
					<SelectVideoFile />
				</div>
				<div class="border-surface-300-600-token flex flex-col border-t p-4">
					<GuiViewSelection />
				</div>

				<div class="border-surface-300-600-token flex flex-col border-b border-t p-4">
					<p class="font-bold mb-2">Widgets</p>
					<div class="py-2">
						<ToggleTrackPosition />
					</div>
					{#if $syncModeIsMTC}
						<div class="py-2">
							<ToggleMidiTimeCode />
						</div>
					{/if}
					{#if $syncModeIsMTC}
						<div class="py-2">
							<ToggleElapsedFrames />
						</div>
					{/if}
					<div class="py-2">
						<ToggleBpm />
					</div>
				</div>
			</div>

			<div class="border-surface-300-600-token space-y-4 border-t p-4">
				<MidiPortSelection />
			</div>
			<div class="border-surface-300-600-token space-y-4 border-t p-4">
				<ToggleSyncModeIsMTC />
			</div>
			<!-- Footer -->
			<div class="border-surface-300-600-token space-y-4 border-t p-4 font-normal">
				<ThemeSelector />
			</div>

			<footer class="border-surface-300-600-token border-t">
				<Copyright />
			</footer>
		</aside>
	{/if}

	<div class="relative h-0 w-0" id="hideSidebarBtn">
		<ToggleSidebar />
	</div>
</div>
