<script>
	import GuiViewSelection from './GuiViewSelection.svelte';

	import ThemeSelector from './ThemeSelector.svelte';

	import '../app.css';
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import { AppBar } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import MidiPortSelection from './MidiPortSelection.svelte';
	import MidiTimersCheckboxSPP from './MidiTimersCheckboxSPP.svelte';
	import Footer from './Footer.svelte';
</script>

<div class="flex min-h-screen flex-col" id="drop-zone">
	<header class="w-full">
		<AppBar
			gridColumns="grid-cols-3"
			spacing="p-5"
			slotDefault="place-self-center"
			slotTrail="place-content-end"
			class="variant-glass-surface"
		>
			<svelte:fragment slot="lead">
				<div class="flex items-center space-x-8">
					<MidiPortSelection />
					<MidiTimersCheckboxSPP />
				</div>
			</svelte:fragment>
			<svelte:fragment slot="default">
				<GuiViewSelection />
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<div class="mr-3 space-x-10"><ThemeSelector /></div>
				<LightSwitch />
			</svelte:fragment>
		</AppBar>
	</header>

	<main class="flex flex-grow items-center justify-center">
		<slot></slot>
		<!-- Page content will be injected here -->
	</main>

	<footer class="footer variant-glass-surface bottom-0 w-full bg-gray-950 p-4">
		<Footer />
	</footer>
</div>
