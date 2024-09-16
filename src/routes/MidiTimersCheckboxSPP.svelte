<script lang="ts">
	import { WebMidi } from 'webmidi';
	import { selectedMidiInputMTC, sppChecked, bpm } from '../lib/stores';
	import {
		onSPPMessage,
		onMidiClockMessage,
		onMidiStartMessage,
		onMidiContinueMessage,
		onMidiStopMessage
	} from '$lib/sppMessages';

	function startSppListening() {
		console.log('MTC listener starting');
		if (WebMidi.enabled) {
			let input = WebMidi.getInputByName($selectedMidiInputMTC);
			if (input) {
				console.info(`Listening for SPP messages from ${input.name}...`);
				input.addListener('clock', onMidiClockMessage);
				input.addListener('start', onMidiStartMessage);
				input.addListener('continue', onMidiContinueMessage);
				input.addListener('stop', onMidiStopMessage);
				input.addListener('songposition', onSPPMessage);
			} else {
				console.log(`MIDI input not found`);
			}
		} else {
			console.log('WEBMIDI not enabled. Cannot start SPP listener.');
		}
	}

	function stopSppListening() {
		if (WebMidi.enabled) {
			let input = WebMidi.getInputByName($selectedMidiInputMTC);
			if (input) {
				input.removeListener('clock', onMidiClockMessage);
				input.removeListener('start', onMidiStartMessage);
				input.removeListener('continue', onMidiContinueMessage);
				input.removeListener('stop', onMidiStopMessage);
				input.removeListener('songposition', onSPPMessage);
				console.info(`Stopped listening for SPP messages from ${input.name}...`);
			} else {
				console.log(`MIDI input not found`);
			}
			console.log('MTC listener stopping');
		} else {
			console.log('WEBMIDI not enabled. Cannot stop SPP listener.');
		}
	}

	$: $sppChecked ? startSppListening() : stopSppListening();
</script>

<!-- Frontend -->
<div class="flex items-center space-x-2">
	<input class="checkbox" type="checkbox" id="SPP" name="SPP" bind:checked={$sppChecked} />
	<label for="SPP" class="whitespace-nowrap">Midi Clock</label>
</div>
