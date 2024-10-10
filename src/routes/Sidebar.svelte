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

	import SelectVideoFile from './sidebar/LoadVideoFileInput.svelte';
	import MediaInfoCheckbox from './sidebar/MediaInfo-Checkbox.svelte';
	import MidiPortSelection from './sidebar/MidiPortSelection.svelte';

	import BpmCheckbox from './sidebar/widgetsCheckbox/Bpm-Checkbox.svelte';
	import ElapsedFramesCheckbox from './sidebar/widgetsCheckbox/ElapsedFrames-Checkbox.svelte';
	import MidiTimeCodeCheckbox from './sidebar/widgetsCheckbox/MTCTimeCode-Checkbox.svelte';
	import TrackPositionCheckbox from './sidebar/widgetsCheckbox/DAWTimeCode-Checkbox.svelte';
	import ToggleSyncModeIsMTC from './rightPane/tempoWidgets/ToggleSyncModeIsMTC.svelte';

	import ThemeSelector from './sidebar/ThemeSelector.svelte';

	import HelpComponent from './sidebar/HelpMenuAccordion.svelte';

	import Copyright from './sidebar/Copyright.svelte';
	import AlwaysSyncCheckbox from './sidebar/videoSettings/AlwaysSync-checkbox.svelte';

	onMount(() => {
		document.title = `${$appName} ${$appVersion} - No video loaded`;
	});
</script>

<div class="m-0 flex flex-row align-top">
	{#if $sidebarIsVisible}
		<aside
			transition:slide={{ delay: 0, duration: 300, easing: quintOut, axis: 'x' }}
			class="border-surface-300-600-token sticky top-0 m-0 flex min-h-screen w-72 flex-col border-r"
		>
			<!-- Header -->
			<header
				class="items-centerborder-surface-300-600-token align-items-top variant-glass-primary m-0 px-4 py-2"
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
					class="variant-glass-secondary border-surface-300-600-token flex w-full flex-row items-center border-t p-4"
				>
					<SaveLoadProfile />
				</div>
				<div class="border-surface-300-600-token flex flex-col space-y-2 border-t">
					<Accordion spacing="space-y-0" padding="px-4 py-2" rounded="rounded-none">
						<AccordionItem class="border-surface-300-600-token border-b">
							<svelte:fragment slot="lead"><i class="fa-solid fa-video" /></svelte:fragment>
							<svelte:fragment slot="summary"
								><span class="font-semibold">Video Offset</span></svelte:fragment
							>
							<svelte:fragment slot="content">
								<div class="py-2">
									<DelayVideoInputNumber />
								</div>
								<div class="py-2">
									<AlwaysSyncCheckbox />
								</div>
							</svelte:fragment>
						</AccordionItem>
					</Accordion>
				</div>

				<div class="border-surface-300-600-token flex flex-col space-y-2 border-b">
					<Accordion spacing="" padding="px-4 py-2" rounded="rounded-none">
						<AccordionItem class="border-surface-300-600-token border-b">
							<svelte:fragment slot="lead"><i class="fa-solid fa-layer-group" /></svelte:fragment>
							<svelte:fragment slot="summary"
								><span class="font-semibold">Widgets</span></svelte:fragment
							>
							<svelte:fragment slot="content">
								<div class="py-2">
									<TrackPositionCheckbox />
								</div>
								{#if $syncModeIsMTC}
									<div class="py-2">
										<MidiTimeCodeCheckbox />
									</div>
								{/if}
								{#if $syncModeIsMTC}
									<div class="py-2">
										<ElapsedFramesCheckbox />
									</div>
								{/if}
								<div class="py-2">
									<BpmCheckbox />
								</div>
								<div class="py-2">
									<MediaInfoCheckbox />
								</div>
							</svelte:fragment>
						</AccordionItem>
						<AccordionItem
							class="border-surface-300-600-token border-b" open
						>
							<svelte:fragment slot="lead"><i class="fa-solid fa-gear" /></svelte:fragment>
							<svelte:fragment slot="summary"
								><span
									class={`font-semibold ${$selectedMidiInputMTC === 'DISABLED' && $selectedMidiInputSPP === 'DISABLED' ? 'text-error-500-400-token' : ''}`}
								>
									MIDI Settings
								</span>
							</svelte:fragment>
							<svelte:fragment slot="content">
								<div class="py-2">
									<MidiPortSelection />
								</div>
							</svelte:fragment>
						</AccordionItem>
						<AccordionItem class="border-surface-300-600-token" open>
							<svelte:fragment slot="lead"><i class="fa-solid fa-palette" /></svelte:fragment>
							<svelte:fragment slot="summary"
								><span class="font-semibold">Theme</span></svelte:fragment
							>
							<svelte:fragment slot="content">
								<div class="py-2">
									<ThemeSelector />
								</div>
							</svelte:fragment>
						</AccordionItem>
					</Accordion>
				</div>
			</div>

			<!-- Footer -->
			<div class="border-surface-300-600-token space-y-4 border-t font-normal">
				<HelpComponent />
			</div>

			<footer class="border-surface-300-600-token border-t">
				<Copyright />
			</footer>
		</aside>
	{/if}
	<div class="y-0 left-72 top-0 w-0" id="hideSidebarBtn">
		<ToggleSidebar />
	</div>
</div>
