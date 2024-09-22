<script>
	import { onMount } from 'svelte';
	import { appName, appVersion } from '$lib/stores';

	import SelectVideoFile from './SelectVideoFile.svelte';
	import GuiViewSelection from './GuiViewSelection.svelte';
	import SlideToggleTimersContainer from './SlideToggleTimersContainer.svelte';
	import MidiPortSelection from './MidiPortSelection.svelte';

	import ThemeSelector from './ThemeSelector.svelte';
	import { LightSwitch } from '@skeletonlabs/skeleton';

	import Copyright from './Copyright.svelte';

	onMount(() => {
		document.title = `${$appName} ${$appVersion} - No video loaded`;
	});
</script>

<aside class="border-surface-300-600-token sticky top-0 flex max-h-screen flex-col border-r pt-1">
	<!-- Header -->
	<header class="border-surface-300-600-token py-4">
		<div class="transition-all duration-300 hover:scale-125">
			<h1 class="text-center text-2xl font-bold">{$appName}</h1>
			<p class="text-center text-xs">Version {$appVersion}</p>
		</div>
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
			<SlideToggleTimersContainer />
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
	<footer class="border-surface-300-600-token border-t">
		<Copyright />
	</footer>
</aside>
