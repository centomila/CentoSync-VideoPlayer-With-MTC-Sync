<script>
	import '../app.css';
	import { AppBar } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import MidiPortSelection from './MidiPortSelection.svelte';
	import MidiTimersCheckboxSPP from './MidiTimersCheckboxSPP.svelte';
	import Footer from './Footer.svelte';
</script>

<div class="flex min-h-screen flex-col">
	<header>
		<AppBar
			gridColumns="grid-cols-3"
			slotDefault="place-self-center"
			slotTrail="place-content-end"
			shadow="shadow-lg"
		>
			<svelte:fragment slot="lead">
				<span class="text-lg">MTC Display</span>
			</svelte:fragment>
			<svelte:fragment slot="default">
				<div class="flex items-center space-x-8">
					<MidiPortSelection />
					<MidiTimersCheckboxSPP />
				</div>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<div class="flex items-center justify-end">
					<LightSwitch />
				</div>
			</svelte:fragment>
		</AppBar>
	</header>

	<main class="flex flex-grow items-center justify-center">
		<slot></slot>
		<!-- Page content will be injected here -->
	</main>

	<footer class="footer bottom-0 w-full bg-gray-950 py-5 text-center">
		<Footer />
	</footer>
</div>
