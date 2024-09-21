<script lang="ts">
	import { WebMidi } from 'webmidi';
	import { selectedMidiInputMTC } from '../lib/stores';
	import {
		onMtcMessage,
		onStartMessage,
		onStopMessage,
		onContinueMessage,
		onSysexMessage
	} from '$lib/mtcMessages';

	// Enable WEBMIDI.js and trigger the onEnabled() function when ready

	WebMidi.enable({ sysex: true })
		.then(() => console.log('System exclusive messages are enabled'))
		.catch((err) => console.log(err));

	WebMidi.addListener('midiaccessgranted', () => {
		if (WebMidi.enabled) {
			console.log('MIDI access granted');
		}
	});

	WebMidi.addListener('connected', () => {
		addMidiInputOptions();
	});

	export let midiInputs = [] as { name: string; value: string }[];

	function addMidiInputOptions() {
		if (WebMidi.inputs.length === 0) {
			midiInputs = [{ name: 'NO MIDI INPUT AVAILABLE', value: '' }];
		} else {
			midiInputs = [
				{ name: 'SELECT A MIDI PORT', value: 'DISABLED' },
				...WebMidi.inputs.map((input) => ({
					name: input.name,
					value: input.name
				}))
			];
			if (WebMidi.inputs.find((input) => input.name === 'loopMIDI Port')) {
				$selectedMidiInputMTC = 'loopMIDI Port';
				startMtcListening();
			} else {
				$selectedMidiInputMTC = 'DISABLED';
			}
			
		}
	}

	function startMtcListening() {
		if (WebMidi.enabled) {
			console.log('MTC listener starting');
			let input = WebMidi.getInputByName($selectedMidiInputMTC);
			if (input) {
				console.info(`Listening for MTC messages from ${input.name}...`);
				input.addListener('sysex', onSysexMessage);
				input.addListener('timecode', onMtcMessage);
				input.addListener('start', onContinueMessage);
				input.addListener('start', onStartMessage);
				input.addListener('continue', onContinueMessage);
				input.addListener('stop', onStopMessage);
			} else {
				console.log(`MIDI input not found`);
			}
		}
	}

	function stopMtcListening() {
		if (WebMidi.enabled) {
			console.log('MTC listener stopping');
			midiInputs.forEach((option) => {
				let input = WebMidi.getInputByName($selectedMidiInputMTC);
				if (input) {
					input.removeListener('sysex', onSysexMessage);
					input.removeListener('timecode', onMtcMessage);
					input.removeListener('start', onContinueMessage);
					input.removeListener('start', onStartMessage);
					input.removeListener('continue', onContinueMessage);
					input.removeListener('stop', onStopMessage);
					console.info(`Stopped listening for MTC messages from ${input.name}...`);
				} else {
					console.log(`MIDI input not found`);
				}
			});
		} else {
			console.log('WEBMIDI not enabled. Cannot stop MTC listener.');
		}
	}

	function restartMtcListening() {
		stopMtcListening();
		startMtcListening();
	}

	$: console.log(`selectedMidiInput changed to: ${$selectedMidiInputMTC}`);
</script>

<!-- Frontend -->

<label class="title text-bold text-left" for="midi-inputs">MIDI PORT</label>
<select
	class="select w-full text-left"
	id="midi-inputs"
	bind:value={$selectedMidiInputMTC}
	on:change={restartMtcListening}
>
	{#each midiInputs as input}
		<option value={input.value}>{input.name}</option>
	{/each}
</select>
