<script lang="ts">
	import { Drawer, getDrawerStore, initializeStores } from '@skeletonlabs/skeleton';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import type { DrawerSettings, DrawerStore } from '@skeletonlabs/skeleton';
	import HelpGeneralComponent from './helpComponents/HelpGeneralComponent.svelte';
	import { onDestroy, onMount } from 'svelte';

	initializeStores();

	const drawerStore = getDrawerStore();
	const drawersPosition = 'right';
	const drawerBgBackdrop = 'bg-gradient-to-tr from-orange-700/80 via-black-800/50 to-orange-900';
	const drawerBg = 'transparent';
	const drawersRounded = 'rounded-xl';
	const drawersWidth = 'w-1/3';
	const drawersPadding = 'p-8';

	const HelpGeneral: DrawerSettings = {
		id: 'help-general',
		position: drawersPosition,
		rounded: drawersRounded,
		width: drawersWidth,
		padding: drawersPadding,
		meta: { foo: 'bar', fizz: 'buzz', age: 40 }
	};

	const HelpBitwig: DrawerSettings = {
		id: 'help-bitwig',
		position: drawersPosition,
		rounded: drawersRounded,
		width: drawersWidth,
		padding: drawersPadding,
		meta: { foo: 'bar', fizz: 'buzz', age: 40 }
	};

	function openDrawerCustom(selecteDrawer: DrawerSettings) {
		console.log('openDrawer');
		const videoPlayer = document.getElementById('my-video');
		videoPlayer?.classList.add('-z-40');
		drawerStore.open(selecteDrawer);
	}
	function closeDrawerCustom() {
		const videoPlayer = document.getElementById('my-video');
		videoPlayer?.classList.remove('-z-40');
		console.log('closeDrawer');
	}
</script>

<div>
	<Accordion spacing="space-y-0" padding="pl-4 pr-8 py-2" rounded="rounded-none">
		<AccordionItem>
			<svelte:fragment slot="lead"
				><i class="fa-solid fa-exclamation-circle pl-1" /></svelte:fragment
			>
			<svelte:fragment slot="summary"><span>About</span></svelte:fragment>
			<svelte:fragment slot="content">
				<div class="space-y-4 pl-9">
					<button
						class="anchor block w-full text-left"
						on:click={() => {
							openDrawerCustom(HelpGeneral);
						}}>Donate</button
					>
					<button
						class="anchor block w-full text-left"
						on:click={() => {
							openDrawerCustom(HelpBitwig);
						}}>License</button
					>
					<button
					title="Privacy Policy. This app don't collect any information. No analytics, no cookies, no ads."
						class="anchor block w-full text-left"
						on:click={() => {
							openDrawerCustom(HelpBitwig);
						}}>Privacy Policy</button
					>
				</div>
				<span class="block"></span>
			</svelte:fragment>
		</AccordionItem>
		<AccordionItem>
			<svelte:fragment slot="lead"><i class="fa-solid fa-question-circle pl-1" /></svelte:fragment>
			<svelte:fragment slot="summary"><span>Help</span></svelte:fragment>
			<svelte:fragment slot="content">
				<div class="space-y-4 pl-9">

				<button
					class="anchor block w-full text-left"
					on:click={() => {
						openDrawerCustom(HelpGeneral);
					}}>General</button
				>
				<button
					class="anchor block w-full text-left"
					on:click={() => {
						openDrawerCustom(HelpBitwig);
					}}>Bitwig Studio</button
				>
				<button
					class="anchor block w-full text-left"
					on:click={() => {
						openDrawerCustom(HelpBitwig);
					}}>Ableton Live</button
				>
				<button
					class="anchor block w-full text-left"
					on:click={() => {
						openDrawerCustom(HelpBitwig);
					}}>Reason Studio</button
				>

				</div>
				<span class="block"></span>
			</svelte:fragment>
		</AccordionItem>
	</Accordion>
</div>

<Drawer on:backdrop={() => closeDrawerCustom()} zIndex="z-50">
	{#if $drawerStore.id === 'help-general'}
		<!-- (show 'example-1' contents) -->
		<HelpGeneralComponent />
	{:else if $drawerStore.id === 'help-bitwig'}
		<!-- (show 'example-2' contents) -->
		<div class="p-4">
			<p>Help Bitwig</p>
		</div>
	{:else}
		<!-- (fallback contents) -->
	{/if}
</Drawer>
