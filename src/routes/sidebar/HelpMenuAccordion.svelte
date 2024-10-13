<script lang="ts">
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import type { DrawerSettings } from '@skeletonlabs/skeleton';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	const drawerStore = getDrawerStore();

	function openDrawerCustom(selecteDrawer: DrawerSettings) {
		console.log('openDrawer');
		const videoPlayer = document.getElementById('my-video');
		videoPlayer?.classList.add('-z-40');
		drawerStore.open(selecteDrawer);
	}

	const drawerConfig = {
		position: 'right' as const, // or 'left', 'top', or 'bottom'
		rounded: 'rounded-xl',
		width: 'w-1/3',
		padding: 'p-8'
	};

	const HelpGeneralDrawer = { id: 'help-general', ...drawerConfig };
	const HelpPrivacyDrawer = { id: 'help-privacy-policy', ...drawerConfig };
	const HelpLicenseDrawer = { id: 'help-license', ...drawerConfig };
	const HelpSupportThisProjectDrawer = { id: 'help-support-this-project', ...drawerConfig };
	const HelpDAWConfigurationDrawer = { id: 'help-daw-configuration', ...drawerConfig };
</script>

<Accordion spacing="space-y-0" padding="px-4 py-2" rounded="rounded-none" transitions>
	<AccordionItem
		class="border-surface-300-600-token border-b"
		hover="bg-surface-300-600-token hover:bg-surface-600-300-token hover:text-surface-50-900-token"
	>
		<svelte:fragment slot="lead"><i class="fa fa-star w-4 text-center" /></svelte:fragment>
		<svelte:fragment slot="summary"><span class="font-bold">About</span></svelte:fragment>
		<svelte:fragment slot="content">
			<div class="space-y-4 pl-9 pt-2">
				<button
					class="anchor w-full text-left"
					on:click={() => {
						openDrawerCustom(HelpSupportThisProjectDrawer);
					}}>Support this project</button
				>
				<button
					class="anchor w-full text-left"
					on:click={() => {
						openDrawerCustom(HelpLicenseDrawer);
					}}>License</button
				>
				<button
					title="Privacy Policy. This app don't collect any information. No analytics, no cookies, no ads."
					class="anchor w-full text-left"
					on:click={() => {
						openDrawerCustom(HelpPrivacyDrawer);
					}}>Privacy Policy</button
				>
			</div>
			<span class="block"></span>
		</svelte:fragment>
	</AccordionItem>
	<AccordionItem
		class="border-surface-300-600-token border-b"
		hover="bg-surface-300-600-token hover:bg-surface-600-300-token hover:text-surface-50-900-token"
	>
		<svelte:fragment slot="lead"><i class="fa fa-question w-4 text-center" /></svelte:fragment>
		<svelte:fragment slot="summary"><span class="font-bold">Help</span></svelte:fragment>
		<svelte:fragment slot="content">
			<div class="space-y-4 pl-9 pt-2">
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
