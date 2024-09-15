<script lang="ts">
	import { WebMidi } from 'webmidi';

	async function initMidi() {
		try {
			await WebMidi.enable();
			console.log('WebMidi enabled!');
		} catch (err) {
			console.log('WebMidi could not be enabled.', err);
		}
	}
	initMidi();

	let midiInputs = [] as { name: string; value: string }[];
	function updateMidiInputOptions() {
		if (WebMidi.inputs.length === 0) {
			midiInputs = [{ name: 'SELECT YOUR MIDI INPUT', value: '' }];
		} else {
			midiInputs = WebMidi.inputs.map((input) => ({
				name: input.name,
				value: input.name,
			}));
		}
	}

	if (WebMidi.enabled) {
		console.log('MIDI access granted!');
		updateMidiInputOptions();
	}
</script>

<select class="select" id="midi-inputs">
	{#each midiInputs as input}
		<option value={input.value}>{input.name}</option>
	{/each}
</select>
