<script>
	import Sidebar from './Sidebar.svelte';

	import GuiViewSelection from './GuiViewSelection.svelte';
	import ThemeSelector from './ThemeSelector.svelte';
	import '../app.css';
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import MidiPortSelection from './MidiPortSelection.svelte';
	import MidiTimersCheckboxSPP from './MidiTimersCheckboxSPP.svelte';
	import SelectVideoFile from './SelectVideoFile.svelte';
	import MidiTimersContainer from './MidiTimersContainer.svelte';
	import Footer from './Footer.svelte';
</script>

<div class="bg-surface-100-800-token flex min-h-screen">
	<!-- Sidebar -->
	<Sidebar />

	<!-- Main content area -->

	<main class="w-full p-0">
		<slot></slot>
		<!-- Page content will be injected here -->
	</main>
</div>
