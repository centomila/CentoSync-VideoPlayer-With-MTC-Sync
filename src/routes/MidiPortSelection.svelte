<script lang="ts">
	import { WebMidi } from 'webmidi';
	import { selectedMidiInputMTC } from '../lib/stores';
	import { onMtcMessage, onStartMessage, onStopMessage, onContinueMessage } from '$lib/mtcMessages';

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

	WebMidi.addListener('midiaccessgranted', () => {
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
			midiInputs = [
				{ name: 'DISABLED', value: 'DISABLED' },
				...WebMidi.inputs.map((input) => ({
					name: input.name,
					value: input.name
				}))
			];
			$selectedMidiInputMTC = 'DISABLED';
		}
	}

	function startMtcListening() {
		if (WebMidi.enabled) {
			console.log('MTC listener starting');
			let input = WebMidi.getInputByName($selectedMidiInputMTC);
			if (input) {
				console.info(`Listening for MTC messages from ${input.name}...`);
				input.addListener('timecode', onMtcMessage);
				input.addListener('start', onContinueMessage);
				input.addListener('continue', onContinueMessage);
				input.addListener('stop', onStopMessage);
			} else {
				console.log(`MIDI input not found`);
			}
		}
	}

	function stopMtcListening() {
		if (WebMidi.enabled && $selectedMidiInputMTC === 'DISABLED') {
			console.log('MTC listener stopping');
			midiInputs.forEach((option) => {
				if (option.value !== 'DISABLED') {
					let input = WebMidi.getInputByName(option.value);
					if (input) {
						input.removeListener('timecode', onMtcMessage);
						input.removeListener('start', onContinueMessage);
						input.removeListener('continue', onContinueMessage);
						input.removeListener('stop', onStopMessage);
						console.info(`Stopped listening for MTC messages from ${input.name}...`);
					} else {
						console.log(`MIDI input not found`);
					}
				}
			});
		} else {
			console.log('WEBMIDI not enabled. Cannot stop MTC listener.');
		}
	}

	$: $selectedMidiInputMTC === 'DISABLED' ? stopMtcListening() : startMtcListening();

	$: console.log(`selectedMidiInput changed to: ${$selectedMidiInputMTC}`);
</script>

<!-- Frontend -->

<label class="title text-bold text-left" for="midi-inputs">MIDI PORT</label>
<select class="select w-full text-left" id="midi-inputs" bind:value={$selectedMidiInputMTC}>
	{#each midiInputs as input}
		<option value={input.value}>{input.name}</option>
	{/each}
</select>
