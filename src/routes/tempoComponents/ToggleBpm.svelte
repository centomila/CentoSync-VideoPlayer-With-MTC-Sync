<script lang="ts">
	import { WebMidi } from 'webmidi';
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import { selectedMidiInputMTC, bpmComponent } from '$lib/stores';
	import { onSPPMessage, onMidiClockMessage } from '$lib/sppMessages';

	function startClockListening() {
		const selectedInput = WebMidi.getInputByName($selectedMidiInputMTC);

		if (WebMidi.enabled && selectedInput) {
			selectedInput.addListener('clock', onMidiClockMessage);
			selectedInput.addListener('songposition', onSPPMessage);
		} else if (!WebMidi.enabled) {
			console.log('WEBMIDI not enabled. Cannot start SPP listener.');
		} else {
			console.log(`MIDI input not found`);
		}

		return;
	}

	function stopClockListening() {
		if (WebMidi.enabled) {
			const input = WebMidi.getInputByName($selectedMidiInputMTC);

			if (input) {
				input.removeListener('clock', onMidiClockMessage);
				input.removeListener('songposition', onSPPMessage);
			}
		}

		return;
	}

	$: $bpmComponent ? startClockListening() : stopClockListening();
</script>

<!-- Frontend -->
<SlideToggle name="slider-label" bind:checked={$bpmComponent}>Midi Clock (BPM)</SlideToggle>

