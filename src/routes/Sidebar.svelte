<script>
	import GuiViewSelection from './GuiViewSelection.svelte';
	import ThemeSelector from './ThemeSelector.svelte';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import MidiPortSelection from './MidiPortSelection.svelte';
	import ToggleBpm from './tempoComponents/ToggleBpm.svelte';
	import ToggleElapsedFrames from './tempoComponents/ToggleElapsedFrames.svelte';
	import SelectVideoFile from './SelectVideoFile.svelte';
	import { appName, appVersion } from '$lib/stores';
	import { onMount } from 'svelte';
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import Copyright from './Copyright.svelte';
	import ToggleMidiTimeCode from './tempoComponents/ToggleMidiTimeCode.svelte';

	onMount(() => {
		document.title = `${$appName} ${$appVersion} - No video loaded`;
	});
</script>

<aside class="border-surface-300-600-token sticky top-0 flex max-h-screen flex-col border-r">
	<!-- Header -->
	<header class="border-surface-300-600-token p-4">
		<h1 class="text-center text-2xl font-bold">{$appName}</h1>
		<pre class="text-xxl text-center">{$appVersion}</pre>
	</header>

	<!-- Sidebar content -->
	<div class="flex-grow">
		<div class="border-surface-300-600-token flex w-full flex-col items-center border-t p-4">
			<SelectVideoFile />
		</div>
		<div class="border-surface-300-600-token flex w-full flex-col items-center border-t p-4">
			<GuiViewSelection />
		</div>
		<div class="border-surface-300-600-token flex flex-col border-t p-4">
			<div class="py-2">
				<SlideToggle name="slider-label" checked>(label)</SlideToggle>
			</div>
			<div class="py-2">
				<ToggleMidiTimeCode />
			</div>

			<div class="py-2">
				<ToggleElapsedFrames />
			</div>

			<div class="py-2">
				<ToggleBpm />
			</div>
		</div>
	</div>

	<div
		class="border-surface-300-600-token flex w-full flex-col items-center space-y-4 border-t p-4"
	>
		<MidiPortSelection />
	</div>
	<!-- Footer -->
	<div class="border-surface-300-600-token flex flex-col items-center space-y-4 border-t p-4">
		<ThemeSelector />
		<LightSwitch title="Dark Mode" />
	</div>
	<footer class="border-surface-300-600-token border-t p-4">
		<Copyright />
	</footer>
</aside>
