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

<div class="w-full">
	<Lightbox title={imgAlt} transitionDuration={100}>
		<img src={imgSrc} alt={imgAlt} title={imgAlt} class="my-4 border border-primary-600" />
	</Lightbox>
	<span>{imgAlt}</span>
</div>
