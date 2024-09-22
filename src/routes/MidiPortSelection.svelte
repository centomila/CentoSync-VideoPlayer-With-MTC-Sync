<script lang="ts">
	import { WebMidi } from 'webmidi';
	import { selectedMidiInputMTC } from '$lib/stores';
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
		}
		if (WebMidi.inputs.find((input) => input.name === 'loopMIDI Port')) {
			$selectedMidiInputMTC = 'loopMIDI Port';
		} else {
			$selectedMidiInputMTC = 'DISABLED';
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
			// Remove all listeners
			for (const input of WebMidi.inputs) {
				if (input.hasListener('sysex', onSysexMessage)) {
					input.removeListener('sysex', onSysexMessage);
					console.info(`Stopped listening sysex messages from ${input.name}...`);
				}
				if (input.hasListener('timecode', onMtcMessage)) {
					input.removeListener('timecode', onMtcMessage);
					console.info(`Stopped listening timecode messages from ${input.name}...`);
				}
				if (input.hasListener('start', onStartMessage)) {
					input.removeListener('start', onStartMessage);
					console.info(`Stopped listening start messages from ${input.name}...`);
				}
				if (input.hasListener('continue', onContinueMessage)) {
					input.removeListener('continue', onContinueMessage);
					console.info(`Stopped listening continue messages from ${input.name}...`);
				}
				if (input.hasListener('stop', onStopMessage)) {
					input.removeListener('stop', onStopMessage);
					console.info(`Stopped listening stop messages from ${input.name}...`);
				}
			}
		} else {
			console.log('WEBMIDI not enabled. Cannot stop MTC listener.');
		}
	}

	function refreshPorts() {
		console.log('Refreshing MIDI ports');
		stopMtcListening();
		midiInputs = [];
		addMidiInputOptions();
	}

	$: console.log(`selectedMidiInput changed to: ${$selectedMidiInputMTC}`);
	$: if ($selectedMidiInputMTC !== 'DISABLED') {
		stopMtcListening();
		startMtcListening();
	} else if ($selectedMidiInputMTC === 'DISABLED') {
		stopMtcListening();
	}
</script>

<!-- Frontend -->

<div class="w-full flex justify-between">
	<label class="title text-bold text-left" for="midi-inputs">MIDI PORT </label>
	<button class="btn-primary variant-filled btn-icon max-h-5 max-w-5 " title="Refresh MIDI ports" on:click={refreshPorts}
		><i class="fa fa-2xs fa-refresh"></i></button
	>
</div>
<select class="select w-full text-left" id="midi-inputs" bind:value={$selectedMidiInputMTC}>
	{#each midiInputs as input}
		<option value={input.value}>{input.name}</option>
	{/each}
</select>
