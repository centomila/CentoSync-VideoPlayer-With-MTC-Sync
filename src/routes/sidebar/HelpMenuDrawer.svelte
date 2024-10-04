<script lang="ts">
	import { Drawer, getDrawerStore, initializeStores } from '@skeletonlabs/skeleton';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import type { DrawerSettings } from '@skeletonlabs/skeleton';
	import HelpGeneralComponent from '../helpComponents/HelpGeneralComponent.svelte';
	import HelpPrivacyPolicy from '../helpComponents/HelpPrivacyPolicy.svelte';
	import HelpLicense from '../helpComponents/HelpLicense.svelte';
	import HelpSupportThisProject from '../helpComponents/HelpSupportThisProject.svelte';
	import HelpDawConfiguration from '../helpComponents/HelpDAWConfiguration.svelte';

	initializeStores();

	const drawerStore = getDrawerStore();

	const drawerConfig = {
		position: 'right' as 'right', // or 'left', 'top', or 'bottom'
		rounded: 'rounded-xl',
		width: 'w-1/3',
		padding: 'p-8'
	};

	const HelpGeneralDrawer = { id: 'help-general', ...drawerConfig };
	const HelpPrivacyDrawer = { id: 'help-privacy-policy', ...drawerConfig };
	const HelpLicenseDrawer = { id: 'help-license', ...drawerConfig };
	const HelpSupportThisProjectDrawer = { id: 'help-support-this-project', ...drawerConfig };
	const HelpDAWConfigurationDrawer = { id: 'help-daw-configuration', ...drawerConfig };

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
							openDrawerCustom(HelpSupportThisProjectDrawer);
						}}>Support this project</button
					>
					<button
						class="anchor block w-full text-left"
						on:click={() => {
							openDrawerCustom(HelpLicenseDrawer);
						}}>License</button
					>
					<button
						title="Privacy Policy. This app don't collect any information. No analytics, no cookies, no ads."
						class="anchor block w-full text-left"
						on:click={() => {
							openDrawerCustom(HelpPrivacyDrawer);
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
							openDrawerCustom(HelpGeneralDrawer);
						}}>General</button
					>
					<button
						class="anchor block w-full text-left"
						on:click={() => {
							openDrawerCustom(HelpDAWConfigurationDrawer);
						}}>DAW Configuration</button
					>
				</div>
				<span class="block"></span>
			</svelte:fragment>
		</AccordionItem>
	</Accordion>
</div>

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
