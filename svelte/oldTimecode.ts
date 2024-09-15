import { WebMidi, Input } from "webmidi";

const FRAME_RATES = new Uint8Array([24, 25, 29.97, 30]);

let midiMTCName = null;

let previousMidiMTCName: any = null;

let mtcData = {
    hours: 0,
    minutes: 0,
    seconds: 0,
    frames: 0,
    frameRate: 30,
};


let lastFrameTime = performance.now();


let quarterFrameCount = 0;


const frameDropThreshold = 5 / 1000; // seconds


// Initialize the high-precision clock when the user clicks anywhere on the page
// This is important if the user leaves the page and comes back later, as the
// performance.now() clock will have been reset.
document.addEventListener('click', () => {
    lastFrameTime = performance.now();
    console.log('High-precision clock resumed');
});


function getFps() {
    return mtcData.frameRate;
}

function getTimecode() {
    return Uint32Array.from([mtcData.hours, mtcData.minutes, mtcData.seconds, mtcData.frames]);
}


function getAudioTrackTime() {
    return new Float64Array([
        mtcData.hours,
        mtcData.minutes,
        mtcData.seconds,
        Math.trunc(
            (mtcData.hours * 3600 +
                mtcData.minutes * 60 +
                mtcData.seconds +
                mtcData.frames / mtcData.frameRate) *
            1000
        ) % 1000,
    ]);
}


function initMidi() {
    return WebMidi.enable({
        callback: function (err: Error) {
            if (err) {
                console.log('WebMidi could not be enabled.', err);
            } else {
                console.log('WebMidi enabled!');
                addMidiInputOptions();
            }
        }
    });
}
initMidi();



function startMtcListening(inputName: string) {
    const input = WebMidi.getInputByName(inputName);

    if (input) {
        console.info(`Listening for MTC messages from ${input.name}...`);
        if (previousMidiMTCName) {
            previousMidiMTCName.removeListener('timecode', onMtcMessage);
        }
        input.addListener('timecode', onMtcMessage);
        previousMidiMTCName = input;
    } else {
        console.log('MIDI input not found');
    }
}


function stopMtcListening() {
    if (previousMidiMTCName) {
        // Remove the event listener for MTC messages from the previously
        // selected MIDI port.
        previousMidiMTCName.removeListener('timecode', 'all', onMtcMessage);

        // Set the previously selected MIDI port to null so that we don't
        // try to remove the event listener from it again.
        previousMidiMTCName = null;
    }
}

function selectMidiInput(midiInputName: string) {
    stopMtcListening();
    startMtcListening(midiInputName);
}

const midiInputElement = document.getElementById('midi-inputs') as HTMLSelectElement;
midiInputElement.addEventListener('change', function () {
    selectMidiInput(midiInputElement.value);
});

// already imported in midiselection.ts
function addMidiInputOptions() {
    const fragment = document.createDocumentFragment();

    if (midiInputElement.options.length === 0) {
        // Add a SELECT YOUR MIDI INPUT option
        const option = document.createElement('option');
        option.value = '';
        option.textContent = 'SELECT YOUR MIDI INPUT';
        fragment.appendChild(option);

        WebMidi.inputs.forEach(input => {
            const option = document.createElement('option');
            option.value = input.name;
            option.textContent = input.name;
            fragment.appendChild(option);
        });

        midiInputElement.appendChild(fragment);
    }
}

function removeMidiInputOptions() {
    stopMtcListening();
    while (midiInputElement.options.length > 0) {
        midiInputElement.remove(0);
    }
}

function stopWebMidi() {
    WebMidi.disable();
    removeMidiInputOptions();
}

const MTC_QUARTER_FRAME_MASK = 0xf;
const MTC_FULL_FRAME_MASK = 0xf0;

function onMtcMessage(midiData: any) {
    const data = midiData.data[1];
    const msgType = data >> 4;
    const value = data & MTC_QUARTER_FRAME_MASK;

    const frameRate = FRAME_RATES[value >> 1];

    switch (msgType) {
        case 0:
            mtcData.frames = (mtcData.frames & MTC_FULL_FRAME_MASK) | value;
            break;
        case 1:
            mtcData.frames = (mtcData.frames & MTC_QUARTER_FRAME_MASK) | (value << 4);
            break;
        case 2:
            mtcData.seconds = (mtcData.seconds & MTC_FULL_FRAME_MASK) | value;
            break;
        case 3:
            mtcData.seconds =
                (mtcData.seconds & MTC_QUARTER_FRAME_MASK) | (value << 4);
            break;
        case 4:
            mtcData.minutes = (mtcData.minutes & MTC_FULL_FRAME_MASK) | value;
            break;
        case 5:
            mtcData.minutes =
                (mtcData.minutes & MTC_QUARTER_FRAME_MASK) | (value << 4);
            break;
        case 6:
            mtcData.hours = (mtcData.hours & MTC_FULL_FRAME_MASK) | value;
            break;
        case 7:
            mtcData.hours =
                (mtcData.hours & MTC_QUARTER_FRAME_MASK) | ((value & 0x1) << 4);
            mtcData.frameRate = frameRate;
            break;
    }

    const currentTime = performance.now();
    const frameTime = currentTime - lastFrameTime;
    const expectedFrameTime = (1 / frameRate) * 2; // Two frames worth of time

    lastFrameTime = currentTime;
    quarterFrameCount = 0;
    requestAnimationFrame(updateTimecodeDisplay);

    if (frameTime < expectedFrameTime) {
        // Wait until the next frame
        setTimeout(() => {
            requestAnimationFrame(updateTimecodeDisplay);
        }, expectedFrameTime - frameTime);
    }
}

function padZero(num: number, length = 3) {
    return num.toString().padStart(length, '0');
}

function getTotalFrames() {
    return (
        mtcData.hours * 60 * 60 * mtcData.frameRate +
        mtcData.minutes * 60 * mtcData.frameRate +
        mtcData.seconds * mtcData.frameRate +
        mtcData.frames
    );
}


/**
 * Updates the display of timecode and related information.
 */
function updateTimecodeDisplay() {
    const hours = padZero(mtcData.hours);
    const minutes = padZero(mtcData.minutes);
    const seconds = padZero(mtcData.seconds);
    const frames = padZero(mtcData.frames, 1);
    const fps = padZero(getFps(), 2);
    const totalFrames = getTotalFrames();
    const audioTrackTime = getAudioTrackTime();
    const audioTrackTimeDisplay = `${audioTrackTime[0]}:${audioTrackTime[1]}:${audioTrackTime[2]}.${padZero(
        audioTrackTime[3],
        3
    )}`;

    (document.getElementById('timecode') as HTMLElement).innerText = `${hours}:${minutes}:${seconds}  ;  ${frames}`;
    (document.getElementById('fps') as HTMLElement).innerText = fps;
    (document.getElementById('totalframes') as HTMLElement).innerText = totalFrames.toString();
    (document.getElementById('audioTrackTime') as HTMLElement).innerText = audioTrackTimeDisplay;
}

