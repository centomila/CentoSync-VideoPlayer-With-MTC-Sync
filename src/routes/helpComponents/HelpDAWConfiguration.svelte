<script lang="ts">
	import LightBoxCustom from '../LightBoxCustom.svelte';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';

	import { appName } from '$lib/stores';
	import { TableOfContents, tocCrawler } from '@skeletonlabs/skeleton';
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

	<Accordion>
		<AccordionItem
			class="border-surface-300-600-token border-b"
			hover="hover:bg-surface-500 hover:text-primary-500"
		>
			<svelte:fragment slot="lead"><i class="fa fa-circle w-4 text-center" /></svelte:fragment>
			<svelte:fragment slot="summary"
				><span class="font-semibold">Bitwig Studio</span></svelte:fragment
			>
			<svelte:fragment slot="content">
				<h3 class="h3 font-bold">Bitwig Studio</h3>
				<h4 class="h4 font-bold">MIDI Time Code (MTC)</h4>
				<p>Bitwig Studio has native support for the <i>Sync Mode: <b>MTC Timecode</b></i>.</p>
				<p>
					Go to <b>Settings</b> > <b>Synchronization</b> and look for the MIDI port that you want to
					use for sending messages to <b>{$appName}</b>. Once you have found it, enable these
					options:
				</p>
				<ul class="list-inside space-y-2">
					<li>
						<span class="inline-block min-w-20"><kbd class="kbd">🕑</kbd></span>Enable the button
						<b>MIDI Clock</b>
					</li>
					<li>
						<span class="inline-block min-w-20"><kbd class="kbd">▶️</kbd></span>Enable the button
						<b>MIDI Clock Start/Stop messages</b>
					</li>
					<li>
						<span class="inline-block min-w-20"><kbd class="kbd">MTC</kbd></span>Enable the button
						<b>MTC (MIDI Time Code)</b>
					</li>
				</ul>
				<p>
					Set the MTC Rate according to the framerate of your video. If your video is 60 fps or 120
					fps, set it to 30. If your video is 50 fps, set it to 25.
				</p>

				<LightBoxCustom imgSrc="./Bitwig-Help-MTC.png" imgAlt="Bitwig Studio MTC Mode" />
			</svelte:fragment>
		</AccordionItem>

		<AccordionItem
			class="border-surface-300-600-token border-b"
			hover="hover:bg-surface-500 hover:text-primary-500"
		>
			<svelte:fragment slot="lead"><i class="fa fa-circle w-4 text-center" /></svelte:fragment>
			<svelte:fragment slot="summary"><span class="font-semibold">FL Studio</span></svelte:fragment>
			<svelte:fragment slot="content">
				<h3 class="h3 font-bold">FL Studio</h3>
				<h4 class="h4 font-bold">MIDI Time Code (MTC)</h4>
				<p>
					FL Studio has native support for the <i>Sync Mode: <b>MTC Timecode</b></i> but in this mode
					don't send start/stop messages.
				</p>
				<p>
					Go to <b>Options</b> > <b>MIDI Settings</b> and look for the MIDI port that you want to
					use for sending messages to <b>{$appName}</b>. Once you have found it, enable these
					options:
				</p>
				<ul class="list-inside list-disc space-y-2">
					<li>Enable <b>Send Master Sync</b></li>
					<li>Set the port on 0</li>
					<li>
						From the <b>Synchronization Type</b> dropdown, select <b>MTC XX fps (non drop)</b>
					</li>
				</ul>
				<p>
					Set the MTC Rate according to the framerate of your video. If your video is 60 fps or 120
					fps, set it to 30. If your video is 50 fps, set it to 25.
				</p>
				<p>
					In {$appName} you also <b>need</b> to enable the option <i>Alternative Start/Stop</i>.
				</p>

				<LightBoxCustom imgSrc="./FLStudio-Help-MTC.png" imgAlt="FL Studio - MTC Mode" />
			</svelte:fragment>
		</AccordionItem>

		<AccordionItem
			class="border-surface-300-600-token border-b"
			hover="hover:bg-surface-500 hover:text-primary-500"
		>
			<svelte:fragment slot="lead"><i class="fa fa-circle w-4 text-center" /></svelte:fragment>
			<svelte:fragment slot="summary"
				><span class="font-semibold">Reason Studio</span></svelte:fragment
			>
			<svelte:fragment slot="content">
				<h3 class="h3 font-bold">Reason Studio</h3>
				<h4 class="h4 font-bold">Song Position Pointer (SPP Mode)</h4>

				<LightBoxCustom imgSrc="./Reason-Help-SPP.png" imgAlt="Reason Studio - SPP Mode" />
			</svelte:fragment>
		</AccordionItem>

		<AccordionItem
			class="border-surface-300-600-token border-b"
			hover="hover:bg-surface-500 hover:text-primary-500"
		>
			<svelte:fragment slot="lead"><i class="fa fa-circle w-4 text-center" /></svelte:fragment>
			<svelte:fragment slot="summary"
				><span class="font-semibold">NI Maschine 2</span></svelte:fragment
			>
			<svelte:fragment slot="content">
				<h3 class="h3 font-bold">NI Maschine 2</h3>
				<h4 class="h4 font-bold">Song Position Pointer (SPP Mode)</h4>

				<LightBoxCustom imgSrc="./Maschine-Help-SPP.png" imgAlt="NI Maschine 2 - SPP Mode" />
			</svelte:fragment>
		</AccordionItem>

		<AccordionItem
			class="border-surface-300-600-token border-b"
			hover="hover:bg-surface-500 hover:text-primary-500"
		>
			<svelte:fragment slot="lead"><i class="fa fa-circle w-4 text-center" /></svelte:fragment>
			<svelte:fragment slot="summary"
				><span class="font-semibold">Ableton Live</span></svelte:fragment
			>
			<svelte:fragment slot="content">
				<h3 class="h3 font-bold">Ableton Live</h3>
				<h4 class="h4 font-bold">MIDI Time Code (MTC)</h4>
				<p>
					MTC Mode is available only when using Ableton Live with a specific MAX Plugin, therefore
					requires an Ableton Live <b>Suite</b> license.
				</p>
				<p>
					Download <b>LiveMTC</b> from
					<a href="https://www.showsync.com/tools" class="anchor">https://www.showsync.com/tools</a
					>. Instructions on installation and use are on the same page.
				</p>

				<h4 class="h4 font-bold">Song Position Pointer (SPP Mode)</h4>
				<p>SPP Mode is available in all Ableton Live versions.</p>
			</svelte:fragment>
		</AccordionItem>
	</Accordion>
</div>
