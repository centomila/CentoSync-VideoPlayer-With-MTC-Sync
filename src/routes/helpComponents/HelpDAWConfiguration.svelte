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

<div class="space-y-8 p-8 text-justify" use:tocCrawler={{ mode: 'generate' }}>
	<h2 class="h2 mb-4">DAW Configuration</h2>
	<TableOfContents />

	<p>
		{$appName} should work with any DAW on Windows, Mac, and Linux. {$appName} requires a browser with
		WebMIDI capabilities. Check
		<a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_MIDI_API" class="anchor"
			>https://developer.mozilla.org/en-US/docs/Web/API/Web_MIDI_API</a
		> for more details.
	</p>
	<h3 class="h3 font-bold">Bitwig Studio</h3>
	<p>Bitwig Studio has native support for the <i>Sync Mode: <b>MTC Timecode</b></i>.</p>
	<p>
		Go to <b>Settings</b> > <b>Synchronization</b> and look for the MIDI port that you want to use
		for sending messages to <b>{$appName}</b>. Once you have found it, enable these options:
	</p>
	<ul class="list-inside space-y-2">
		<li>
			<span class="inline-block min-w-20"><kbd class="kbd">🕑</kbd></span>Enable <b>MIDI Clock</b>
		</li>
		<li>
			<span class="inline-block min-w-20"><kbd class="kbd">▶️</kbd></span>Enable
			<b>MIDI Clock Start/Stop messages</b>
		</li>
		<li>
			<span class="inline-block min-w-20"><kbd class="kbd">MTC</kbd></span>Enable
			<b>MTC (MIDI Time Code)</b>
		</li>
	</ul>
	<p>
		Set the MTC Rate according to the framerate of your video. If your video is 60 fps or 120 fps,
		set it to 30. If your video is 50 fps, set it to 25.
	</p>

	<LightBoxCustom imgSrc="./Bitwig-Help-MTC.png" imgAlt="Bitwig Studio MTC Mode" />

	<h3 class="h3 font-bold">FL Studio</h3>
	<h4 class="h4 font-bold">MIDI Time Code (MTC)</h4>
	<p>FL Studio has native support for the <i>Sync Mode: <b>MTC Timecode</b></i> but in this mode don't send start/stop messages.</p>
	<p>
		Go to <b>Options</b> > <b>MIDI Settings</b> and look for the MIDI port that you want to use for
		sending messages to <b>{$appName}</b>. Once you have found it, enable these options:
	</p>
	<ul class="list-inside list-disc space-y-2">
		<li>Enable <b>Send Master Sync</b></li>
		<li>Set the port on 0</li>
		<li>From the <b>Synchronization Type</b> dropdown, select <b>MTC XX fps (non drop)</b></li>
	</ul>
	<p>
		Set the MTC Rate according to the framerate of your video. If your video is 60 fps or 120 fps,
		set it to 30. If your video is 50 fps, set it to 25.
	</p>

	<LightBoxCustom imgSrc="./FLStudio-Help-MTC.png" imgAlt="FL Studio MTC Mode" />

	<h3 class="h3 font-bold">Ableton Live</h3>

	<h3 class="h3 font-bold">Reason Studio</h3>
</div>
