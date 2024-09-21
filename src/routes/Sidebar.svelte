<script>
	import GuiViewSelection from './GuiViewSelection.svelte';
	import ThemeSelector from './ThemeSelector.svelte';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import MidiPortSelection from './MidiPortSelection.svelte';
	import MidiTimersCheckboxSPP from './MidiTimersCheckboxSPP.svelte';
	import SelectVideoFile from './SelectVideoFile.svelte';
	import MidiTimersContainer from './MidiTimersContainer.svelte';
	import Footer from './Footer.svelte';
	import {  appName, appVersion } from '$lib/stores';

	$: $appName, $appVersion
</script>

	<aside class="border-surface-300-600-token sticky top-0 flex max-h-screen flex-col border-r">
		<!-- Header -->
		<header class="border-surface-300-600-token border-b p-4">
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
			<!-- Add more sidebar items here -->
			<MidiTimersContainer />
		</div>

		<div
			class="border-surface-300-600-token flex w-full flex-col items-center space-y-4 border-t p-4"
		>
			<MidiPortSelection />
			<MidiTimersCheckboxSPP />
		</div>
		<!-- Footer -->
		<div class="border-surface-300-600-token flex flex-col items-center space-y-4 border-t p-4">
			<ThemeSelector />
			<LightSwitch title="Dark Mode" />
		</div>
		<footer class="border-surface-300-600-token border-t p-4">
			<Footer />
		</footer>
	</aside>

