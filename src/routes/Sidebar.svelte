<script>
	import { onMount } from 'svelte';
	import { appName, appVersion } from '$lib/stores';
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	import SelectVideoFile from './SelectVideoFile.svelte';
	import GuiViewSelection from './GuiViewSelection.svelte';
	import SlideToggleTimersContainer from './SlideToggleTimersContainer.svelte';
	import MidiPortSelection from './MidiPortSelection.svelte';

	import ThemeSelector from './ThemeSelector.svelte';
	import { LightSwitch } from '@skeletonlabs/skeleton';

	import Copyright from './Copyright.svelte';

	let sideBarToggle = true;
	onMount(() => {
		document.title = `${$appName} ${$appVersion} - No video loaded`;

		window.addEventListener('keydown', (event) => {
			if (event.key === 'h' || event.key === 'H') {
				sideBarToggle = !sideBarToggle;
			}
		});
	});
</script>

<div class="flex flex-row">
	{#if sideBarToggle}
		<aside
			transition:slide={{ delay: 0, duration: 300, easing: quintOut, axis: 'x' }}
			class="border-surface-300-600-token sticky top-0 flex max-h-screen flex-col border-r pt-1"
		>
			<!-- Header -->
			<header class="border-surface-300-600-token py-4">
				<h1 class="text-center text-2xl font-bold">{$appName}</h1>
				<p class="text-center text-xs">Version {$appVersion}</p>
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

			<div class="border-surface-300-600-token space-y-4 border-t p-4">
				<MidiPortSelection />
			</div>
			<!-- Footer -->
			<div class="border-surface-300-600-token space-y-4 border-t p-4">
				<ThemeSelector />
			</div>
			<footer class="border-surface-300-600-token border-t">
				<Copyright />
			</footer>
		</aside>
	{/if}

	<div class="relative h-0 w-0">
		<button
			on:click={() => (sideBarToggle = !sideBarToggle)}
			class="variant-glass-primary btn relative left-0 top-0 z-50 h-8 w-8 rounded-none hover:translate-x-1 hover:translate-y-1 hover:scale-125"
			title={sideBarToggle ? 'Hide sidebar (H)' : 'Show sidebar (H)'}
		>
			{#if sideBarToggle}<i class="fas fa-eye-slash" />{:else}<i class="fas fa-eye" />{/if}
		</button>
	</div>
</div>
