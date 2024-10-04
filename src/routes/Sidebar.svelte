<script>
  import DelayVideoInputNumber from './DelayVideo-InputNumber.svelte';

	import ToggleSidebar from './sidebar/SidebarToggle.svelte';

	import { onMount } from 'svelte';
	import { appName, appVersion, sidebarIsVisible } from '$lib/stores';
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	import SelectVideoFile from './sidebar/LoadVideoFileInput.svelte';
	import GuiViewSelection from './sidebar/MediaInfo-Checkbox.svelte';
	import MidiPortSelection from './sidebar/MidiPortSelection.svelte';

	import ToggleBpm from './sidebar/widgetsCheckbox/Bpm-Checkbox.svelte';
	import ToggleElapsedFrames from './sidebar/widgetsCheckbox/ElapsedFrames-Checkbox.svelte';
	import ToggleMidiTimeCode from './sidebar/widgetsCheckbox/MTCTimeCode-Checkbox.svelte';
	import ToggleTrackPosition from './sidebar/widgetsCheckbox/DAWTimeCode-Checkbox.svelte';
	import ToggleSyncModeIsMTC from './rightPane/tempoWidgets/ToggleSyncModeIsMTC.svelte';
	import { syncModeIsMTC } from '$lib/stores';

	import ThemeSelector from './sidebar/ThemeSelector.svelte';

	import HelpComponent from './sidebar/HelpMenuDrawer.svelte';

	import Copyright from './sidebar/Copyright.svelte';

	onMount(() => {
		document.title = `${$appName} ${$appVersion} - No video loaded`;
	});
</script>

<div class="m-0 flex flex-row align-top">
	{#if $sidebarIsVisible}
		<aside
			transition:slide={{ delay: 0, duration: 300, easing: quintOut, axis: 'x' }}
			class="border-surface-300-600-token sticky top-0 m-0 flex max-h-screen w-72 flex-col border-r"
		>
			<!-- Header -->
			<header
				class="items-centerborder-surface-300-600-token align-items-top variant-glass-primary m-0 px-4 py-2"
			>
				<h1 class=" text-2xl font-extrabold">
					{$appName}
					<span class=" align-text-top text-xs font-normal text-primary-500">{$appVersion}</span>
				</h1>
			</header>

			<!-- Sidebar content -->
			<div class="flex-grow">
				<div class="border-surface-300-600-token flex w-full flex-col py-0">
					<HelpComponent />
				</div>
				<div class="border-surface-300-600-token flex w-full flex-col items-center border-t p-4">
					<SelectVideoFile />
				</div>
				<div class="border-surface-300-600-token flex flex-col border-t p-4">
					<p class="mb-2 font-bold">Video</p>
					<div class="py-2">
					<GuiViewSelection />
					</div>
					<div class="py-2">
						<DelayVideoInputNumber/>
					</div>
				</div>

				<div class="border-surface-300-600-token flex flex-col border-b border-t p-4">
					<p class="mb-2 font-bold">Widgets</p>
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
	<div class="y-0 left-72 top-0 w-0" id="hideSidebarBtn">
		<ToggleSidebar />
	</div>
</div>
