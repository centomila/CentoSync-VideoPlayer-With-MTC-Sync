<script lang="ts">
	import { WebMidi } from 'webmidi';
	import {selectedMidiInput} from '../lib/stores';	

	function startMtcListening() {
	    // console.log(`selectedMidiInput changed to: ${$selectedMidiInput}`);
		
		console.log('MTC listener starting');
		let input = WebMidi.getInputByName($selectedMidiInput);

		if (input) {
			console.info(`Listening for MTC messages from ${input.name}...`);
			input.addListener('timecode', onMtcMessageConsole);
		} else {
			console.log(`MIDI input not found`);
		}

	}
	
	function onMtcMessageConsole() {
		console.log('Received MTC message:');
	}
	function stopMtcListening() {
		let input = WebMidi.getInputByName($selectedMidiInput);
		if (input) {
			input.removeListener('timecode', onMtcMessageConsole);
		} else {
			console.log(`MIDI input not found`);
		}
		
		console.log('MTC listener stopping');
	}

	function toggleMtc() {
		const checkbox = document.getElementById('MTC') as HTMLInputElement;
		if (checkbox.checked) {
			startMtcListening();
			checkbox.checked = true;
			console.log('MTC listener started');
		} else {
			stopMtcListening();
			checkbox.checked = false;
			console.log('MTC listener stopped');
		}
	}
</script>

<!-- Frontend -->
<div class="flex items-center space-x-2">
	<input class="checkbox" type="checkbox" id="MTC" name="MTC" on:change={toggleMtc} />
	<label for="MTC">MTC</label>
	<input class="checkbox" type="checkbox" id="SPP" name="SPP" />
	<label for="SPP">Song Position</label>
</div>
