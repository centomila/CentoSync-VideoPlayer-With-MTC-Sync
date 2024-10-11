<script lang="ts">
	import SaveLoadProfile from './SaveLoadProfile.svelte';

	import DelayVideoInputNumber from './sidebar/videoSettings/DelayVideo-InputNumber.svelte';

	import ToggleSidebar from './sidebar/SidebarToggle.svelte';

	import { onMount } from 'svelte';
	import {
		appName,
		appVersion,
		sidebarIsVisible,
		syncModeIsMTC,
		selectedMidiInputMTC,
		selectedMidiInputSPP
	} from '$lib/stores';
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';

	import MediaInfoCheckbox from './sidebar/MediaInfo-Checkbox.svelte';
	import MidiPortSelection from './sidebar/MidiPortSelection.svelte';

	import BpmCheckbox from './sidebar/widgetsCheckbox/Bpm-Checkbox.svelte';
	import ElapsedFramesCheckbox from './sidebar/widgetsCheckbox/ElapsedFrames-Checkbox.svelte';
	import MidiTimeCodeCheckbox from './sidebar/widgetsCheckbox/MTCTimeCode-Checkbox.svelte';
	import TrackPositionCheckbox from './sidebar/widgetsCheckbox/DAWTimeCode-Checkbox.svelte';

	import ThemeSelector from './sidebar/ThemeSelector.svelte';

	import HelpComponent from './sidebar/HelpMenuAccordion.svelte';

	import Copyright from './sidebar/Copyright.svelte';
	import AlwaysSyncCheckbox from './sidebar/videoSettings/AlwaysSync-checkbox.svelte';

	onMount(() => {
		document.title = `${$appName} ${$appVersion} - No video loaded`;
	});
</script>

{#if $sidebarIsVisible}
	<aside
		transition:slide={{ delay: 0, duration: 300, easing: quintOut, axis: 'x' }}
		class="border-surface-300-600-token sticky top-0 z-10 m-0 flex h-screen w-80 flex-col overflow-scroll border-r shadow-2xl"
	>
		<!-- Header -->
		<header
			class="items-centerborder-surface-300-600-token align-items-top variant-filled-primary m-0 px-4 py-2"
		>
			<h1 class=" text-2xl font-extrabold">
				{$appName}
				<span class=" align-text-top text-xs font-normal text-primary-800">{$appVersion}</span>
			</h1>
		</header>

		<!-- Sidebar content -->
		<div class="flex-grow">
			<!-- <div class="border-surface-300-600-token flex w-full flex-col items-center border-t p-0">
					<SelectVideoFile />
				</div> -->
			<div
				class="variant-glass-surface border-surface-300-600-token flex w-full flex-row items-center border-t p-4"
			>
				<SaveLoadProfile />
			</div>
			<div class="border-surface-300-600-token flex flex-col space-y-2 border-t">
				<Accordion spacing="space-y-0" padding="px-4 py-2" rounded="rounded-none" transitions>
					<AccordionItem
						class="border-surface-300-600-token border-b"
						hover="hover:bg-surface-500 hover:text-primary-500"
					>
						<svelte:fragment slot="lead"><i class=" fa fa-video w-4 text-center" /></svelte:fragment
						>
						<svelte:fragment slot="summary"
							><div><span class="font-semibold">Video Player</span></div></svelte:fragment
						>
						<svelte:fragment slot="content">
							<div class="">
								<DelayVideoInputNumber />
							</div>
							<div class="">
								<AlwaysSyncCheckbox />
							</div>
							<div class="">
								<MediaInfoCheckbox />
							</div>
						</svelte:fragment>
					</AccordionItem>
				</Accordion>
			</div>

			<div class="border-surface-300-600-token flex flex-col space-y-2">
				<Accordion spacing="" padding="px-4 py-2" rounded="rounded-none">
					<AccordionItem
						class="border-surface-300-600-token border-b"
						hover="hover:bg-surface-500 hover:text-primary-500"
					>
						<svelte:fragment slot="lead"
							><i class=" fa fa-layer-group w-4 text-center" /></svelte:fragment
						>
						<svelte:fragment slot="summary"
							><span class="font-semibold">Widgets</span></svelte:fragment
						>
						<svelte:fragment slot="content">
							<div>
								<TrackPositionCheckbox />
							</div>
							{#if $syncModeIsMTC}
								<div>
									<MidiTimeCodeCheckbox />
								</div>
							{/if}
							{#if $syncModeIsMTC}
								<div>
									<ElapsedFramesCheckbox />
								</div>
							{/if}
							<div>
								<BpmCheckbox />
							</div>
						</svelte:fragment>
					</AccordionItem>
					<AccordionItem
						class="border-surface-300-600-token border-b"
						hover="hover:bg-surface-500 hover:text-primary-500"
					>
						<svelte:fragment slot="lead"><i class=" fa fa-gear w-4 text-center" /></svelte:fragment>
						<svelte:fragment slot="summary"
							><span
								class={`font-semibold ${$selectedMidiInputMTC === 'DISABLED' && $selectedMidiInputSPP === 'DISABLED' ? 'text-error-500-400-token' : ''}`}
								>MIDI Settings
							</span>
						</svelte:fragment>
						<svelte:fragment slot="content">
							<div class="py-2">
								<MidiPortSelection />
							</div>
						</svelte:fragment>
					</AccordionItem>
					<!-- <AccordionItem class="border-surface-300-600-token"  hover="hover:bg-surface-500 hover:text-primary-500">
							<svelte:fragment slot="lead"><i class=" fa w-4 text-center fa-palette" /></svelte:fragment>
							<svelte:fragment slot="summary"
								><span class="font-semibold">Theme</span></svelte:fragment
							>
							<svelte:fragment slot="content">
								<div class="py-2">
									<ThemeSelector />
								</div>
							</svelte:fragment>
						</AccordionItem> -->
				</Accordion>
			</div>
		</div>

		<!-- Footer -->

		<footer class="border-surface-300-600-token bottom-0 border-t">
			<div class="border-surface-300-600-token space-y-4 border-b font-normal">
				<HelpComponent />
			</div>
			<div class="border-surface-300-600-token border-b p-4">
				<ThemeSelector />
			</div>

			<Copyright />
		</footer>
	</aside>
{/if}
<div class="top-0 w-0 border-0" id="hideSidebarBtn">
	<ToggleSidebar />
</div>
