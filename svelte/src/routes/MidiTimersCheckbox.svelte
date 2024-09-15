<script lang="ts">
	import { WebMidi } from 'webmidi';
	import { selectedMidiInput, mtcChecked, sppChecked } from '../lib/stores';
	import { onMtcMessage } from '$lib/mtcMessages';

	function startMtcListening() {
		console.log('MTC listener starting');
		let input = WebMidi.getInputByName($selectedMidiInput);
		if (input) {
			console.info(`Listening for MTC messages from ${input.name}...`);
			input.addListener('timecode', onMtcMessage);
		} else {
			console.log(`MIDI input not found`);
		}
	}

	function stopMtcListening() {
		if (WebMidi.enabled) {	
			let input = WebMidi.getInputByName($selectedMidiInput);
			if (input) {
				input.removeListener('timecode', onMtcMessage);
			} else {
				console.log(`MIDI input not found`);
			}
			console.log('MTC listener stopping');
		} else {
			console.log('WEBMIDI not enabled. Cannot stop MTC listener.');
		}
	}

	function startSppListening() {
		console.log('SPP listener starting');
	}

	function stopSppListening() {
		console.log('SPP listener stopping');
	}

	$: $mtcChecked ? startMtcListening() : stopMtcListening();
	$: $sppChecked ? stopSppListening() : stopSppListening();
</script>

<!-- Frontend -->
<div class="flex items-center space-x-2">
	<input class="checkbox" type="checkbox" id="MTC" name="MTC" bind:checked={$mtcChecked} />
	<label for="MTC">MTC</label>
	<input class="checkbox" type="checkbox" id="SPP" name="SPP" bind:checked={$sppChecked} />
	<label for="SPP">Song Position</label>
</div>
