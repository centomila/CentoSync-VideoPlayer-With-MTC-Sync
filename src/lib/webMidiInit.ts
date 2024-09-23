import { WebMidi } from 'webmidi';
import { get } from 'svelte/store';
import { selectedMidiInputMTC, midiInputs } from '$lib/stores';
import {
    onMtcMessage,
    onStartMessage,
    onStopMessage,
    onContinueMessage,
    onSysexMessage
} from '$lib/mtcMessages';

$: selectedMidiInputMTC.subscribe((value) => {
    if (value !== 'DISABLED') {
        stopMtcListening();
        startMtcListening();
    } else if (value === 'DISABLED') {
        stopMtcListening();
    }
    console.log(`Selected MIDI input: ${value}`);
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
        console.log('MTC listener starting');
        let input = WebMidi.getInputByName(get(selectedMidiInputMTC));
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
            input.removeListener();
            console.info(`Removed listeners for messages from ${input.name}...`);
        }
    }
}

export function refreshPorts() {
    console.log('Refreshing MIDI ports');
    console.table(WebMidi.inputs.map((input) => ({
        name: input.name,
        manufacturer: input.manufacturer,
        state: input.state,
        connection: input.connection
    })));
    stopMtcListening();
    // empty midiInputs store
    midiInputs.set([]);
    addMidiInputOptions();
}
