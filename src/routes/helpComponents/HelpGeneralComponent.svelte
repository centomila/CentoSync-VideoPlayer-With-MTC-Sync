<script lang="ts">
	import { appName } from '$lib/stores';
	import ToggleSyncModeIsMtc from '../rightPane/tempoWidgets/ToggleSyncModeIsMTC.svelte';
	import MidiPortSelection from '../sidebar/MidiPortSelection.svelte';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import MidiTimeCodeDiv from '../rightPane/tempoWidgets/MidiTimeCodeDiv.svelte';
	import TrackPositionDiv from '../rightPane/tempoWidgets/TrackPositionDiv.svelte';
	import SelectVideoFile from '../sidebar/LoadVideoFileInput.svelte';
	import { TableOfContents, tocCrawler } from '@skeletonlabs/skeleton';
	import ToggleSidebar from '../sidebar/SidebarToggle.svelte';
</script>

<div class="space-y-8 p-8" use:tocCrawler={{ mode: 'generate' }}>
	<h2 class="h2 mb-4">Help General</h2>
	<TableOfContents />
	<section class="space-y-4">
		<p>
			<b>{$appName}</b> synchronizes the seek time of a video player with a Digital Audio Workstation
			(DAW) using either MTC (MIDI Time Code) or MIDI Clock with SPP (Song Position Pointer).
		</p>
	</section>
	<hr />

	<section class="space-y-4">
		<h4 class="h4 font-bold">System Configuration</h4>
		<h5 class="h5 font-bold">Setting Up Virtual MIDI Ports</h5>
		<p>
			If you're using the same computer for both the web app and your DAW, you'll need to set up a
			Virtual MIDI Port. Here's how to do it on different operating systems:
		</p>
		<Accordion>
			<AccordionItem>
				<svelte:fragment slot="lead"></svelte:fragment>
				<svelte:fragment slot="summary"><h5 class="h5 font-bold">Windows</h5></svelte:fragment>
				<svelte:fragment slot="content">
					<p>
						On Windows, you can use the free <a
							href="https://www.tobias-erichsen.de/software/loopmidi.html"
							target="_blank"
							class="anchor">loopMIDI by Tobias Erichsen</a
						>. Here's how to set it up:
					</p>
					<ol class="list-inside list-decimal space-y-4">
						<li>Download and install loopMIDI from the official website.</li>
						<li>Launch loopMIDI.</li>
						<li>
							In the main window, type a name for your virtual MIDI port in the "New port-name"
							field (e.g., "loopMIDI Port" as in the default).
						</li>
						<li>Click the "+" button to create the port.</li>
						<li>Your new virtual MIDI port will appear in the list and is now ready to use.</li>
						<li>In your DAW, select this virtual MIDI port as the output for MIDI sync.</li>
						<li>In the web app, select the same virtual MIDI port as the input.</li>
					</ol>
					<p>
						Note: loopMIDI runs in the background, so you may want to configure it to start
						automatically with Windows to ensure it's always available. You can enable this
						behaviour by right clicking the loopMIDI icon in the systray and selecting <i
							>Autostart loopMIDI</i
						>
					</p>
				</svelte:fragment>
			</AccordionItem>
			<AccordionItem>
				<svelte:fragment slot="summary"><h5 class="h5 font-bold">macOS</h5></svelte:fragment>
				<svelte:fragment slot="content">
					<p>
						macOS has a built-in virtual MIDI bus called the IAC (Inter-Application Communication)
						Driver. Here's how to set it up:
					</p>
					<ol class="list-inside list-decimal space-y-4">
						<li>Open the Audio MIDI Setup application (use Spotlight to find it quickly).</li>
						<li>From the "Window" menu, select "Show MIDI Studio".</li>
						<li>In the MIDI Studio window, double-click on the "IAC Driver" icon.</li>
						<li>In the IAC Driver properties window, check the "Device is online" box.</li>
						<li>Under the "Ports" section, click the "+" button to add a new port.</li>
						<li>Name the port something recognizable (e.g., "DAW to Web Sync").</li>
						<li>Click "Apply" to save your changes.</li>
					</ol>
					<p>
						Your virtual MIDI port is now set up. Select this IAC Bus as the MIDI output in your DAW
						and as the input in the web app.
					</p>
				</svelte:fragment>
			</AccordionItem>
			<AccordionItem>
				<svelte:fragment slot="summary"><h5 class="h5 font-bold">Linux</h5></svelte:fragment>
				<svelte:fragment slot="content">
					<p>
						There are several ways to create a virtual MIDI port on Linux. Here's one method using
						ALSA's `snd-virmidi` module:
					</p>
					<ol class="list-inside list-decimal space-y-4">
						<li>Open a terminal window.</li>
						<li>
							Load the virtual MIDI module by running: <code>sudo modprobe snd-virmidi</code>
						</li>
						<li>
							This creates four virtual MIDI ports. You can verify them by running: <code
								>sudo aconnect -l</code
							>
						</li>
						<li>Look for entries like "Virtual Raw MIDI (16)" in the output.</li>
						<li>These virtual ports can now be used in your DAW and the web app.</li>
					</ol>
					<p>
						For a more permanent solution, you can add `snd-virmidi` to your list of modules to load
						at boot:
					</p>
					<ol class="list-inside list-decimal space-y-4">
						<li>
							Open the file `/etc/modules` with root privileges: <code>sudo nano /etc/modules</code>
						</li>
						<li>Add a new line with just `snd-virmidi`</li>
						<li>Save the file and exit the editor.</li>
						<li>Reboot your system for the changes to take effect.</li>
					</ol>
					<p>
						Alternatively, you can use JACK (JACK Audio Connection Kit) which provides more advanced
						routing capabilities. The setup for JACK varies depending on your Linux distribution and
						specific requirements.
					</p>
				</svelte:fragment>
			</AccordionItem>
		</Accordion>
		<h5 class="h5 font-bold">Browser</h5>
		<p>
			Upon loading the page, your browser will request permission to access the MIDI ports on your
			system. Please grant this permission for the app to function correctly. If the port list is
			still empty after you granted permissions, try refreshing the page.
		</p>
		<p class="blockquote">
			Note: <b>{$appName}</b> requires a desktop browser, as WebMidi is not currently available on mobile
			browsers.
		</p>
	</section>

	<hr />

	<section class="space-y-4">
		<h4 class="h4 font-bold">MIDI Port</h4>
		<p>
			Select the MIDI port that will receive MTC or SPP/Clock messages. If you don't see any port,
			be sure that MIDI permission is granted (check in your browser address bar).
		</p>
		<p>
			SPP/Clock port is optional for MTC mode. It's better using a separate port to avoid drifting,
			but not mandatory.
		</p>
		<div class="space-y-4 border border-primary-600 p-4">
			<MidiPortSelection />
		</div>
	</section>

	<hr />

	<section class="space-y-4">
		<h4 class="h4 font-bold">Sync Mode</h4>
		<p>
			{$appName} offers two different synchronization modes: MTC (MIDI Time Code) and SPP (Song Position
			Pointer).
		</p>
		<p>MTC is the default and recommended mode.</p>

		<div class="space-y-4 border border-primary-600 p-4">
			<ToggleSyncModeIsMtc />
		</div>
		<span class="block py-1"></span>

		<h5 class="h5 font-bold">MTC (MIDI Time Code)</h5>
		<p>In MTC mode, your DAW sends updates every quarter frame with the current cursor position.</p>

		<p>
			This precise timing allows for accurate synchronization between the video player and the DAW.
		</p>

		<p>
			When using MTC messages, some DAWs like <i>Bitwig Studio</i> can also send SysEX messages and SPP
			messages to signal the start and stop events.
		</p>

		<p>
			If you are using a DAW that don't send these messages (like for example <i>FL Studio</i>), you
			need to enable the option <i>Alternative Start/Stop</i>. This option will continuously check
			for MTC messages.
		</p>

		<span class="block py-1"></span>

		<h5 class="h5 font-bold">MIDI Clock with SPP (Song Position Pointer)</h5>
		<p>SPP is available on all DAWs that can send MIDI Clock messages to an external MIDI port.</p>
		<p>This mode uses two types of MIDI messages for synchronization:</p>
		<ul class="list-inside list-disc">
			<li>
				<strong>MIDI Clock:</strong> A continuous stream of timing pulses (24 per quarter note) to maintain
				tempo sync.
			</li>
			<li>
				<strong>Song Position Pointer (SPP):</strong> Sent only when necessary to indicate a specific
				position in the song.
			</li>
		</ul>
		<p>Here's how Song Position Pointer (SPP) works:</p>
		<ol class="list-inside list-decimal space-y-4">
			<li>
				SPP is sent when the DAW starts or resumes playback, indicating the starting position in
				MIDI beats (where each beat represents a 16th note interval).
			</li>
			<li>
				If you jump to a new position in the song, SPP will be sent again with the new position.
			</li>
			<li>
				SPP is not sent continuously during playback. Instead, MIDI Clock messages or
				Start/Continue/Stop messages manage ongoing synchronization.
			</li>
		</ol>

		<p class="blockquote">
			<b>NOTE:</b> In SPP mode, the time will reset to 0 if playback starts after bar 1024. This corresponds
			to 34:08.000 at 120 BPM. To extend the time, you can run your project at half the tempo, effectively
			doubling the duration. This limitation is due to the MIDI standard.
		</p>
	</section>

	<hr />

	<section class="space-y-4">
		<h4 class="h4 font-bold">Usage</h4>
		<h5 class="h5 font-bold">Syncing the video</h5>
		<p>
			Once the application has been configured with the desired sync mode and MIDI port, {$appName} is
			ready to operate.
		</p>
		<ol class="list-inside list-decimal space-y-4">
			<li class="list-item">
				Load the video you want to see synced with your DAW. You can do this in three different
				ways:
				<span class="ml-1 block">- <i>Drag And Drop</i>a video file into the window </span>
				<span class="my-2block">OR...</span>
				<span class="ml-1 block"
					>- Click the LOAD A VIDEO button. A select file dialog will appear.</span
				>
				<div class="my-4 flex border border-primary-600 p-4 text-center">
					<SelectVideoFile />
				</div>
				<span class="my-2 block">OR...</span>
				<span class="ml-1 block"
					>- Press the <kbd class="kbd">L</kbd> key on your keyboard while the browser is in focus. A
					select file dialog will appear</span
				>
			</li>
			<li class="list-item">Start playback in your DAW ▶️</li>
			<li class="list-item">
				The video player will start playback and automatically synchronize with your DAW's timeline.
			</li>
		</ol>

		<div class="pl-8">
			<h6 class="h6 font-bold">Notes about the video player:</h6>
			<ul class="list-inside list-disc space-y-4">
				<li>
					The player can read any video format that is supported by your browser.<br class="mb-1" />
				</li>
				<li>
					Video decoding can be a demanding task, especially on older hardware. Consider loading
					lower quality videos if you are using the same machine where is running your DAW.
				</li>
				<li>
					The player calculates the time based on the current second as a floating-point number
					(e.g. 126.23456843).
				</li>
				<li>
					{$appName} use <i>Video.js</i> for video playback. See their websites for more
					informations about the supported formats:
					<a target="_blank" class="anchor" href="https://videojs.com/html5-video-support/"
						>https://videojs.com/html5-video-support/</a
					>
				</li>
			</ul>
		</div>

		<h5 class="h5 pt-4 font-bold">Hiding the sidebar</h5>
		<p>
			The sidebar can be hidden by clicking the <kbd class="kbd"
				>HIDE SIDEBAR <i class="fa fa-eye" /></kbd
			> button on the top
		</p>
		<p>
			The sidebar can also be hidden by pressing the key <kbd class="kbd">H</kbd>. Press
			<kbd class="kbd">H</kbd> a second time to show the sidebar again.
		</p>
	</section>

	<hr />

	<section class="space-y-4">
		<h4 class="h4 font-bold">Widgets</h4>
		<p>
			Above the video, there are 4 widgets showing the current track position in various formats:
		</p>
		<h5 class="h5 font-bold">DAW Timecode</h5>
		<p>This widget show the current track position in the DAW timecode format:</p>
		<ul class="list-inside list-disc">
			<li>Hours (H)</li>
			<li>Minutes (M)</li>
			<li>Seconds (S)</li>
			<li>Milliseconds (MS)</li>
		</ul>

		<div class="my-4 space-y-4 border border-primary-600 p-4">
			<TrackPositionDiv />
		</div>
		<p class="blockquote">
			<b>Note:</b> milliseconds after the first decimal are estimates and may not display the exact same
			time as your DAW, except when the milliseconds are exactly .000. Video synchronization is not affected
			by this. This timer it's only a visual indicator. Refer to the DAW time to see the real track time.
		</p>

		<hr class="mx-auto max-w-xs" />
		<h5 class="h5 font-bold">MTC Timecode</h5>
		<p>This widget show the current track position in the MTC timecode format:</p>
		<ul class="list-inside list-disc">
			<li>Hours (H)</li>
			<li>Minutes (M)</li>
			<li>Seconds (S)</li>
			<li>Frames (FF)</li>
			<li>Frames per Second (FPS)</li>
		</ul>
		<div class="my-4 space-y-4 border border-primary-600 p-4">
			<MidiTimeCodeDiv />
		</div>
	</section>
</div>
