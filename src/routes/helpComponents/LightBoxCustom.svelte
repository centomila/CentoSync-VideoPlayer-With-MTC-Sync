<script lang="ts">
	import { appName, appVersion } from '$lib/stores';
	import ToggleSyncModeIsMtc from '../tempoComponents/ToggleSyncModeIsMTC.svelte';
	import MidiPortSelection from '../MidiPortSelection.svelte';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import MidiTimeCodeDiv from '../tempoComponents/MidiTimeCodeDiv.svelte';
	import TrackPositionDiv from '../tempoComponents/TrackPositionDiv.svelte';
	import SelectVideoFile from '../SelectVideoFile.svelte';
	import { TableOfContents, tocCrawler } from '@skeletonlabs/skeleton';
	import ToggleSidebar from '../ToggleSidebar.svelte';
	import { Lightbox } from 'svelte-lightbox';

	export let imgSrc = '';
	export let imgAlt = '';
</script>

<Lightbox transitionDuration={100}>
	<div
		class="transition:ease-in-out
        transition:duration-300
        bg-surface-50-900-token
        w-full rounded
        p-1
        transition-all
        hover:brightness-110
        hover:filter
        hover:transition-all"
	>
		<img src={imgSrc} alt={imgAlt} title={imgAlt} class="block w-full" />
		<span class="block p-2 text-center">{imgAlt}</span>
	</div>
</Lightbox>
