import { WebMidi } from 'webmidi';
import { get } from 'svelte/store';
import { selectedMidiInputMTC, midiInputs, syncModeIsMTC } from '$lib/stores';
import { onSPPMessage, onMidiClockMessage } from '$lib/sppMessages';
import {
	onMtcMessage,
	onStartMessage,
	onStopMessage,
	onContinueMessage,
	onSysexMessage
} from '$lib/mtcMessages';

// eslint-disable-next-line
$: selectedMidiInputMTC.subscribe((value) => {
	if (value !== 'DISABLED') {
		stopMtcAndClockListeners();

		// // close connection for all the unselected inputs
		// for (const input of WebMidi.inputs) {
		//     if (input.name === get(selectedMidiInputMTC)) {
		//         input.open();
		//     } else {
		//         input.close();
		//     }
		// }

		startMtcListening();
	} else if (value === 'DISABLED') {
		stopMtcAndClockListeners();
	}
	logListOfInputs();
	console.log(`Selected MIDI input: ${value}`);
});

$: syncModeIsMTC.subscribe((value) => {
	stopMtcAndClockListeners();
	if (value) {
		startMtcListening();
	} else {
		startClockListening();
	}
});

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

function addMidiInputOptions() {
	if (WebMidi.inputs.length === 0) {
		midiInputs.set([{ name: 'NO MIDI INPUT AVAILABLE', value: '' }]);
	} else {
		midiInputs.set([
			{ name: 'SELECT A MIDI PORT', value: 'DISABLED' },
			...WebMidi.inputs.map((input) => ({
				name: input.name,
				value: input.name
			}))
		]);
		if (WebMidi.inputs.find((input) => input.name === 'loopMIDI Port')) {
			console.log('LoopMIDI port found. Set as default because it works well.');
			selectedMidiInputMTC.set('loopMIDI Port');
		}
	}
}

function startMtcListening() {
	if (WebMidi.enabled) {
		const input = getSelectedMidiInput();
		console.log('MTC listener starting on port ', input?.name);
		if (input) {
			console.info(`Listening for MTC messages from ${input.name}...`);
			input.addListener('sysex', onSysexMessage);
			input.addListener('timecode', onMtcMessage);
			input.addListener('start', onStartMessage);
			input.addListener('continue', onContinueMessage);
			input.addListener('stop', onStopMessage);
		} else {
			console.warn(`MIDI input not found`);
		}
	}
}

function stopMtcAndClockListeners() {
	if (WebMidi.enabled) {
		console.log('MTC and clock listener stopping');
		// Remove all listeners
		for (const input of WebMidi.inputs) {
			input.removeListener();
			console.info(`Removed listeners for messages from ${input.name}...`);
		}
	}
}


export function startClockListening() {
	const input = getSelectedMidiInput()
	console.log('SPP listener starting on port ', input?.name);

	if (WebMidi.enabled && input) {
		input.addListener('clock', onMidiClockMessage);
		input.addListener('songposition', onSPPMessage);
		input.addListener('start', onStartMessage);
		input.addListener('continue', onContinueMessage);
		input.addListener('stop', onStopMessage);
	} else if (!WebMidi.enabled) {
		console.warn('WEBMIDI not enabled. Cannot start SPP listener.');
	} else {
		console.warn(`MIDI input not found`);
	}
}

function getSelectedMidiInput() {
	return WebMidi.getInputByName(get(selectedMidiInputMTC));
}

function logListOfInputs() {
	console.table(
		WebMidi.inputs.map((input) => ({
			name: input.name,
			manufacturer: input.manufacturer,
			state: input.state,
			connection: input.connection
		}))
	);
}

export function refreshPorts() {
	console.log('Refreshing MIDI ports');
	logListOfInputs();
	stopMtcAndClockListeners();
	// empty midiInputs store
	midiInputs.set([]);
	addMidiInputOptions();
}
