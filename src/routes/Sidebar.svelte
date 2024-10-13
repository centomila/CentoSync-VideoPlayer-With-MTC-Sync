<script lang="ts">
	import HeaderCentoSync from './HeaderCentoSync.svelte';

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

	import MidiPortSelection from './sidebar/MidiPortSelection.svelte';

	import BpmCheckbox from './sidebar/widgetsCheckbox/Bpm-Checkbox.svelte';
	import ElapsedFramesCheckbox from './sidebar/widgetsCheckbox/ElapsedFrames-Checkbox.svelte';
	import MidiTimeCodeCheckbox from './sidebar/widgetsCheckbox/MTCTimeCode-Checkbox.svelte';
	import TrackPositionCheckbox from './sidebar/widgetsCheckbox/DAWTimeCode-Checkbox.svelte';
	import MediaInfoCheckbox from './sidebar/MediaInfo-Checkbox.svelte';

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
		class="
		border-surface-300-600-token
		sticky
		top-0
		m-0
		flex
		h-screen
		w-80
		max-w-80
		flex-col
		overflow-scroll
		border-r
		
		transition-all
		duration-300"
	>
		<!-- Header -->
		<HeaderCentoSync />

		<div class=" flex w-full flex-row items-center p-4">
			<SaveLoadProfile />
		</div>

		<!-- Sidebar content -->
		<div class="flex-grow">
			<div class="border-surface-300-600-token flex flex-col space-y-2 border-t">
				<Accordion spacing="space-y-0" padding="px-4 py-4" rounded="rounded-none">
					<AccordionItem
						class="border-surface-300-600-token border-b"
						hover="transition-all variant-glass-surface hover:bg-surface-600-300-token hover:text-surface-50-900-token"
					>
						<svelte:fragment slot="lead"><i class=" fa fa-video w-4 text-center" /></svelte:fragment
						>
						<svelte:fragment slot="summary"
							><div><span class="font-semibold">Video Player</span></div></svelte:fragment
						>
						<svelte:fragment slot="content">
							<div class="space-y-2 pb-2">
								<DelayVideoInputNumber />
							</div>
						</svelte:fragment>
					</AccordionItem>

					<AccordionItem
						class="border-surface-300-600-token border-b"
						hover="transition-all variant-glass-surface hover:bg-surface-600-300-token hover:text-surface-50-900-token"
					>
						<svelte:fragment slot="lead"
							><i class=" fa fa-layer-group w-4 text-center" /></svelte:fragment
						>
						<svelte:fragment slot="summary"
							><span class="font-semibold">Widgets</span></svelte:fragment
						>
						<svelte:fragment slot="content">
							<div class="space-y-2 pb-2">
								<TrackPositionCheckbox />
								{#if $syncModeIsMTC}
									<MidiTimeCodeCheckbox />
								{/if}
								{#if $syncModeIsMTC}
									<ElapsedFramesCheckbox />
								{/if}
								<BpmCheckbox />
								<MediaInfoCheckbox />
							</div>
						</svelte:fragment>
					</AccordionItem>
					<AccordionItem
						class="border-surface-300-600-token border-b"
						hover="transition-all variant-glass-surface hover:bg-surface-600-300-token hover:text-surface-50-900-token"
						open
					>
						<svelte:fragment slot="lead"
							><i
								class={`font-semibold ${$selectedMidiInputMTC === 'DISABLED' && $selectedMidiInputSPP === 'DISABLED' ? 'fa  fa-gear text-error-500-400-token w-4 text-center' : ' fa fa-gear w-4 text-center'}`}
							/></svelte:fragment
						>
						<svelte:fragment slot="summary"
							><span
								class={`font-semibold ${$selectedMidiInputMTC === 'DISABLED' && $selectedMidiInputSPP === 'DISABLED' ? 'text-error-500-400-token' : ''}`}
								>MIDI Settings
							</span>
						</svelte:fragment>
						<svelte:fragment slot="content">
							<div class="space-y-2 pb-2">
								<MidiPortSelection />
								<AlwaysSyncCheckbox />
							</div>
						</svelte:fragment>
					</AccordionItem>
					<!-- <AccordionItem class="border-surface-300-600-token"  hover="transition-all variant-glass-surface hover:bg-surface-600-300-token hover:text-surface-50-900-token"
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
			<div class="bg-surface-300-600-token border-surface-300-600-token border-b p-4 shadow-2xl">
				<ThemeSelector />
			</div>

			<Copyright />
		</footer>
	</aside>
{/if}
