<script lang="ts">
	import '../app.css';
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import { Drawer, getDrawerStore, initializeStores } from '@skeletonlabs/skeleton';
	import type { DrawerSettings } from '@skeletonlabs/skeleton';

	import HelpGeneralComponent from './helpComponents/HelpGeneralComponent.svelte';
	import HelpPrivacyPolicy from './helpComponents/HelpPrivacyPolicy.svelte';
	import HelpLicense from './helpComponents/HelpLicense.svelte';
	import HelpSupportThisProject from './helpComponents/HelpSupportThisProject.svelte';
	import HelpDawConfiguration from './helpComponents/HelpDAWConfiguration.svelte';

	import Sidebar from './Sidebar.svelte';
	import { startWebMidi } from '$lib/webMidiInit';
	startWebMidi();

	initializeStores();
	const drawerStore = getDrawerStore();



	function closeDrawerCustom() {
		const videoPlayer = document.getElementById('my-video');
		videoPlayer?.classList.remove('-z-40');
		console.log('closeDrawer');
	}
</script>

<Drawer on:backdrop={() => closeDrawerCustom()} zIndex="z-50">
	{#if $drawerStore.id === 'help-general'}
		<HelpGeneralComponent />
	{:else if $drawerStore.id === 'help-privacy-policy'}
		<HelpPrivacyPolicy />
	{:else if $drawerStore.id === 'help-license'}
		<HelpLicense />
	{:else if $drawerStore.id === 'help-support-this-project'}
		<HelpSupportThisProject />
	{:else if $drawerStore.id === 'help-daw-configuration'}
		<HelpDawConfiguration />
	{:else}
		<!-- (fallback contents) -->
	{/if}
</Drawer>

<div class="flex min-h-screen">
	<!-- Sidebar -->
	<Sidebar />

	<!-- Main content area -->

	<main class="w-full p-0">
		<slot></slot>
		<!-- Page content will be injected here -->
	</main>
</div>
