<script lang="ts">
  import LightBoxCustom from './LightBoxCustom.svelte';

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

	
	
</script>

<div class="space-y-8 p-8" use:tocCrawler={{ mode: 'generate' }}>
	<h2 class="h2 mb-4">DAW Configuration</h2>
	<TableOfContents />

	<h3 class="h3 font-bold">Bitwig Studio</h3>
	<p>
		Upon loading the page, your browser will request permission to access the MIDI ports on your
		system. Please grant this permission for the app to function correctly.
	</p>

<LightBoxCustom imgSrc="./Bitwig-Help-MTC.png" imgAlt="Bitwig Studio MTC Mode"/>

	
	<h3 class="h3 font-bold">Ableton Live</h3>

	<h3 class="h3 font-bold">Reason Studio</h3>

	<h3 class="h3 font-bold">FL Studio</h3>

	
</div>
