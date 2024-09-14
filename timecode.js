/**
 * Array of MTC frame rates supported by this software.
 * @type {Uint8Array}
 */
const FRAME_RATES = new Uint8Array([24, 25, 29.97, 30]);

/**
 * The name of the selected MIDI input.
 * @type {string}
 */
let midiMTCName = null;

/**
 * The previously selected MIDI input.
 * @type {MIDIInput}
 */
let previousMidiMTCName = null;

/**
 * The current MTC timecode.
 * @type {Object}
 * @property {number} hours - The hours part of the timecode.
 * @property {number} minutes - The minutes part of the timecode.
 * @property {number} seconds - The seconds part of the timecode.
 * @property {number} frames - The frames part of the timecode.
 * @property {number} frameRate - The frame rate of the timecode.
 */
export let mtcData = {
  hours: 0,
  minutes: 0,
  seconds: 0,
  frames: 0,
  frameRate: 30,
};

/**
 * The time of the last frame in milliseconds since the Unix epoch.
 * @type {number}
 */
let lastFrameTime = performance.now();

/**
 * The number of quarter frames dropped since the last frame.
 * @type {number}
 */
let quarterFrameCount = 0;

/**
 * The number of milliseconds of frame dropping allowed before a dropped frame is
 * reported.
 * @type {number}
 */
const frameDropThreshold = 5 / 1000; // seconds

/**
 * Expose variables and functions to the global window object.
 * @type {Object}
 */
window.timecode = {
  // expose variables
  mtcData,
  lastFrameTime,
  quarterFrameCount,
  frameDropThreshold,
};

/**
 * Expose functions to the global window object.
 * @type {Object}
 */
window.MTCDisplay = {
  initMidi,
  onMtcMessage,
  startMtcListening,
  stopMtcListening,
  getFps,
  getTimecode,
  getAudioTrackTime,
  removeMidiInputOptions,
  stopWebMidi,
};

// Initialize the high-precision clock when the user clicks anywhere on the page
// This is important if the user leaves the page and comes back later, as the
// performance.now() clock will have been reset.
document.addEventListener('click', () => {
  lastFrameTime = performance.now();
  console.log('High-precision clock resumed');
});

/**
 * Returns the current frame rate of the MTC timecode.
 * @returns {number} The frame rate of the MTC timecode.
 */
export function getFps() {
  return mtcData.frameRate;
}

/**
 * Returns the current MTC timecode as a Uint32Array.
 * @returns {Uint32Array} The current MTC timecode as a Uint32Array.
 */
export function getTimecode() {
  return Uint32Array.from([mtcData.hours, mtcData.minutes, mtcData.seconds, mtcData.frames]);
}

/**
 * Returns the current audio track time as a Float64Array.
 * @returns {Float64Array} The current audio track time as a Float64Array.
 */
export function getAudioTrackTime() {
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

/**
 * Initializes the WebMIDI API and adds options to the select element for
 * selecting the MIDI input port.
 * @returns {Promise<void>} A promise that resolves when the WebMIDI API is
 * enabled or rejects with an error.
 */
function initMidi() {
  return WebMidi.enable(function (err) {
    if (err) {
      console.log('WebMidi could not be enabled.', err);
    } else {
      console.log('WebMidi enabled!');
      addMidiInputOptions();
    }
  });
}

// Initialize the WebMIDI API when the page is loaded
window.addEventListener('DOMContentLoaded', initMidi);

function startMtcListening(inputName) {
  const input = WebMidi.getInputByName(inputName);

  if (input) {
    console.info(`Listening for MTC messages from ${input.name}...`);
    if (previousMidiMTCName) {
      previousMidiMTCName.removeListener('timecode', 'all', onMtcMessage);
    }
    input.addListener('timecode', 'all', onMtcMessage);
    previousMidiMTCName = input;
  } else {
    console.log('MIDI input not found');
  }
}

/**
 * Stops listening for MTC messages from the previously selected MIDI port.
 * @returns {void}
 */
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

function selectMidiInput(midiInputName) {
  stopMtcListening();
  startMtcListening(midiInputName);
}

document.getElementById('midi-inputs').addEventListener('change', function () {
  selectMidiInput(document.getElementById('midi-inputs').value);
});

function addMidiInputOptions() {
  const midiInputElement = document.getElementById('midi-inputs');
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
  const midiInputElement = document.getElementById('midi-inputs');
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

function onMtcMessage(e) {
  const data = e.data[1];
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

export function padZero(num) {
  return num.toString().padStart(3, '0');
}

export function getTotalFrames() {
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

  document.getElementById('timecode').innerText = `${hours}:${minutes}:${seconds}  ;  ${frames}`;
  document.getElementById('fps').innerText = fps;
  document.getElementById('totalframes').innerText = totalFrames;
  document.getElementById('audioTrackTime').innerText = audioTrackTimeDisplay;
}

