<script lang="ts">
	import { Drawer, getDrawerStore, initializeStores } from '@skeletonlabs/skeleton';
	import type { DrawerSettings, DrawerStore } from '@skeletonlabs/skeleton';
	import HelpGeneralComponent from './helpComponents/HelpGeneralComponent.svelte';
	import { onDestroy, onMount } from 'svelte';

	initializeStores();

	let drawerIsOpened: boolean = false;

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

<div class="p-8">
	<h3 class="mb-2 text-center font-extrabold">Help</h3>
	<div class="grid grid-cols-1 gap-1">
		<button
			on:click={() => {
				openDrawerCustom(HelpGeneral);
			}}>General</button
		>
		<button on:click={() => drawerStore.open(HelpBitwig)}>Bitwig</button>
	</div>
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
