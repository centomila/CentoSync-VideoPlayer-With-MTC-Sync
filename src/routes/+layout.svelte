<script>
	import GuiViewSelection from './GuiViewSelection.svelte';
	import ThemeSelector from './ThemeSelector.svelte';
	import '../app.css';
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import MidiPortSelection from './MidiPortSelection.svelte';
	import MidiTimersCheckboxSPP from './MidiTimersCheckboxSPP.svelte';
	import SelectVideoFile from './SelectVideoFile.svelte';
	import { guiView } from '$lib/stores';
	import Footer from './Footer.svelte';
</script>

<div class="bg-surface-100-800-token flex min-h-screen">
	<!-- Sidebar -->
	<aside class="border-surface-300-600-token sticky top-0 flex max-h-screen w-64 flex-col border-r">
		<!-- Header -->
		<header class="border-surface-300-600-token border-b p-4">
			<h1 class="text-center text-2xl font-bold">Video Sync MTC</h1>
		</header>

		<!-- Sidebar content -->
		<div class="flex-grow space-y-4 p-0">
			<div class="border-surface-300-600-token flex w-full flex-col items-center border-t p-4">
				<GuiViewSelection />
			</div>
			<!-- Add more sidebar items here -->
		</div>

		<div
			class="items-left border-surface-300-600-token flex w-full flex-col space-y-4 border-t p-4"
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

	<!-- Main content area -->
	<div class="flex flex-grow flex-col">
		<main class="flex-grow">
			<slot></slot>
			<!-- Page content will be injected here -->
		</main>
	</div>
</div>
