<!-- This component is used to select the MIDI input port from which the MIDI time code -->
<script lang="ts">
	import { WebMidi } from 'webmidi';
	import { selectedMidiInput } from '../lib/stores';

	// Enable WEBMIDI.js and trigger the onEnabled() function when ready
	WebMidi.enable()
		.then(onEnabled)
		.catch((err) => alert(err));

	function onEnabled() {
		// Display available MIDI input devices
		if (WebMidi.inputs.length < 1) {
			console.log('No device detected.');
		} else {
			console.log('MIDI enabled!');
		}
	}

	WebMidi.addListener('midiaccessgranted', (e) => {
		if (WebMidi.enabled) {
			console.log('MIDI access granted');
		}
	});

	WebMidi.addListener('connected', (e) => {
		addMidiInputOptions();
	});

	export let midiInputs = [] as { name: string; value: string }[];

	function addMidiInputOptions() {
		if (WebMidi.inputs.length === 0) {
			midiInputs = [{ name: 'NO MIDI INPUT AVAILABLE', value: '' }];
		} else {
			midiInputs = WebMidi.inputs.map((input) => ({
				name: input.name,
				value: input.name
			}));
		}
	}

	$: console.log(`selectedMidiInput changed to: ${$selectedMidiInput}`);
</script>

<!-- Frontend -->
<div class="flex items-center justify-end space-x-4">
	<label class="whitespace-nowrap" for="midi-inputs">MIDI PORT</label>
	<select class="select w-64" id="midi-inputs" bind:value={$selectedMidiInput}>
		{#each midiInputs as input}
			<option value={input.value}>{input.name}</option>
		{/each}
	</select>
</div>
