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
</script>

<div class="space-y-8 p-4" use:tocCrawler={{ mode: 'generate' }}>
	<h2 class="h2 mb-4">Help General</h2>
	<TableOfContents />
	<p>
		<b>{$appName}</b> synchronizes the seek time of a video player with a Digital Audio Workstation (DAW)
		using either MTC (MIDI Time Code) or MIDI Clock with SPP (Song Position Pointer).
	</p>
	<p>
		Note: This application requires a desktop browser, as WebMidi is not currently available on
		mobile browsers.
	</p>
	<hr />
	<h3 class="h3 font-bold">Configuration</h3>
	<p>
		Upon loading the page, your browser will request permission to access the MIDI ports on your
		system. Please grant this permission for the app to function correctly.
	</p>
	<p>
		If you're using the same computer for both the web app and your DAW, you'll need to set up a <i
			>Virtual MIDI Port</i
		> to enable communication between them.
	</p>

	<!-- Previous content remains the same -->

	<h4 class="h4 font-bold">Setting Up Virtual MIDI Ports</h4>
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
				<ol class="list-inside list-decimal space-y-2">
					<li>Download and install loopMIDI from the official website.</li>
					<li>Launch loopMIDI.</li>
					<li>
						In the main window, type a name for your virtual MIDI port in the "New port-name" field
						(e.g., "loopMIDI Port" as in the default).
					</li>
					<li>Click the "+" button to create the port.</li>
					<li>Your new virtual MIDI port will appear in the list and is now ready to use.</li>
					<li>In your DAW, select this virtual MIDI port as the output for MIDI sync.</li>
					<li>In the web app, select the same virtual MIDI port as the input.</li>
				</ol>
				<p>
					Note: loopMIDI runs in the background, so you may want to configure it to start
					automatically with Windows to ensure it's always available. You can enable this behaviour
					by right clicking the loopMIDI icon in the systray and selecting <i>Autostart loopMIDI</i>
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
				<ol class="list-inside list-decimal space-y-2">
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
				<ol class="list-inside list-decimal space-y-2">
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
				<ol class="list-inside list-decimal space-y-2">
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
	<!-- Rest of the content remains the same -->

	<hr />

	<h4 class="h4 font-bold">MIDI Port</h4>
	<p>
		Select the MIDI port that will receive MTC or SPP/Clock messages. If you don't see any port, be
		sure that MIDI permission is granted (check in your browser address bar)
	</p>
	<div class="border-primary-50-900-token my-8 space-y-4 border p-4">
		<MidiPortSelection />
	</div>

	<h4 class="h4 font-bold">Sync Mode</h4>
	<p>
		{$appName} offers two different synchronization modes: MTC (MIDI Time Code) and SPP (Song Position
		Pointer). MTC is the default and recommended mode.
	</p>
	<p>
		Both modes can show the <i>DAW Timecode timer</i> widget with HH:MM:SS.MS. Note that milliseconds
		after the first decimal are estimates and may not display the exact same time as your DAW, except
		when the milliseconds are exactly .000. Video synchronization is not affected by this. This timer
		it's only a visual indicator. Refer to the DAW time to see the real track time.
	</p>

	<div class="border-primary-50-900-token my-8 space-y-4 border p-4">
		<ToggleSyncModeIsMtc />
	</div>
	<h5 class="h5 font-bold">MTC (MIDI Time Code)</h5>
	<p>
		In MTC mode, your DAW sends updates every quarter frame with the current cursor position. This
		information includes:
	</p>
	<ul class="list-inside list-disc">
		<li>Hours (HH)</li>
		<li>Minutes (MM)</li>
		<li>Seconds (SS)</li>
		<li>Frames (FF)</li>
	</ul>
	<div class="border-primary-50-900-token my-8 space-y-4 border p-4">
		<MidiTimeCodeDiv />
	</div>
	<p>This precise timing allows for accurate synchronization between your video player and DAW.</p>
	<hr />
	<h5 class="h5 font-bold">MIDI Clock with SPP (Song Position Pointer)</h5>
	<p>This mode uses two types of MIDI messages for synchronization:</p>
	<ul class="list-inside list-disc">
		<li>
			<strong>MIDI Clock:</strong> A continuous stream of timing pulses (24 per quarter note) to maintain
			tempo sync.
		</li>
		<li>
			<strong>Song Position Pointer (SPP):</strong> Sent only when necessary to indicate a specific position
			in the song.
		</li>
	</ul>
	<p>Here's how Song Position Pointer (SPP) works:</p>
	<ol class="list-inside list-decimal space-y-2">
		<li>
			SPP is sent when the DAW starts or resumes playback, indicating the starting position in MIDI
			beats (where each beat represents a 16th note interval).
		</li>
		<li>
			If you jump to a new position in the song, SPP will be sent again with the new position.
		</li>
		<li>
			SPP is not sent continuously during playback. Instead, MIDI Clock messages or
			Start/Continue/Stop messages manage ongoing synchronization.
		</li>
	</ol>
	<div class="border-primary-50-900-token my-8 space-y-4 border p-4">
		<TrackPositionDiv />
	</div>
	<p>
		NOTE: In SPP Mode, this timer is updated only on start and when you manually change the cursor
		position.
	</p>
	<h4 class="h4 font-bold">Usage</h4>
	<h5 class="h5 font-bold">Syncing the video</h5>
	<p>Once the application has been configured with the desired sync mode and MIDI port:</p>
	<ol class="list-inside list-decimal space-y-2">
		<li>
			Load your video into the player by clicking the LOAD A VIDEO button or by dragging and
			dropping a video file into the window.
			<div class="border-primary-50-900-token my-8 flex border p-4 text-center">
				<SelectVideoFile />
			</div>
		</li>
		<li>Start playback in your DAW</li>
		<li>
			The video player will start playback and automatically synchronize with your DAW's timeline.
			The player calculates the time based on the current second as a floating-point number (e.g.,
			126.23456843).
		</li>
	</ol>

	<h5 class="h5 font-bold">Hiding the sidebar</h5>
	<p> The sidebar can be hidden by clicking the HIDE SIDEBAR button.</p>
	<!-- <ToggleSidebar /> -->
</div>
