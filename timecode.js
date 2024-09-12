// MTC frame rates
const FRAME_RATES = new Uint8Array([24, 25, 29.97, 30]);

let midiMTCName = null;
let previousMidiMTCName = null;

export let mtcData = {
  hours: 0,
  minutes: 0,
  seconds: 0,
  frames: 0,
  frameRate: 30,
};

// Use high-precision clock
let lastFrameTime = performance.now();
let quarterFrameCount = 0;
const frameDropThreshold = 5 / 1000; // seconds

window.timecode = {
  // expose variables
  mtcData,
  lastFrameTime,
  quarterFrameCount,
  frameDropThreshold,
};

// Initialize the high-precision clock when the user clicks anywhere on the page
document.addEventListener('click', () => {
    lastFrameTime = performance.now();
    console.log('High-precision clock resumed');
});

export function getFps() {
  return mtcData.frameRate;
}

export function getTimecode() {
  return new Uint32Array([
    mtcData.hours,
    mtcData.minutes,
    mtcData.seconds,
    mtcData.frames,
  ]);
}

export function getAudioTrackTime() {
  const hours = mtcData.hours;
  const minutes = mtcData.minutes;
  const seconds = mtcData.seconds;
  const framesAsSeconds = mtcData.frames / mtcData.frameRate;
  return new Float64Array([
    hours,
    minutes,
    seconds,
    Math.floor(
      (hours * 3600 + minutes * 60 + seconds + framesAsSeconds) * 1000
    ) % 1000,
  ]);
}

function initMidiAndAddListeners() {
  let midiInputElement = document.getElementById('midi-inputs');

  WebMidi.enable(function (err) {
    if (err) {
      console.log('WebMidi could not be enabled.', err);
    } else {
      console.log('WebMidi enabled!');

      if (midiInputElement.options.length === 0) {
        // Add a SELECT YOUR MIDI INPUT option
        midiInputElement.innerHTML = '<option value="">SELECT YOUR MIDI INPUT</option>';

        WebMidi.inputs.forEach(function (input) {
          console.log(input.name);
          // add values to id="midi-inputs"
          midiInputElement.innerHTML +=
            '<option value="' + input.name + '">' + input.name + '</option>';
        });
      }

      const input = WebMidi.getInputByName(midiInputElement.value);

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
  });
}

document
  .getElementById('midi-inputs')
  .addEventListener('change', initMidiAndAddListeners);

initMidiAndAddListeners();

const MTC_QUARTER_FRAME_MASK = 0xf;
const MTC_FULL_FRAME_MASK = 0xf0;

function onMtcMessage(e) {
  const data = e.data[1];
  const msgType = data >> 4;
  const value = data & MTC_QUARTER_FRAME_MASK;

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
      mtcData.frameRate = FRAME_RATES[value >> 1];
      break;
  }

  // if (++quarterFrameCount === 4) {
  const currentTime = performance.now();
  const frameTime = currentTime - lastFrameTime;
  const expectedFrameTime = (1 / mtcData.frameRate) * 2; // Two frames worth of time

  // if (lastFrameTime !== 0 && frameTime > expectedFrameTime + frameDropThreshold) {
  //   console.warn(`Possible frame drop detected. Time since last frame: ${frameTime.toFixed(2)}s`);
  // }

  lastFrameTime = currentTime;
  quarterFrameCount = 0;
  requestAnimationFrame(updateTimecodeDisplay);
  // }
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

function updateTimecodeDisplay() {
  document.getElementById('timecode').innerText = `${padZero(
    mtcData.hours
  )}:${padZero(mtcData.minutes)}:${padZero(mtcData.seconds)}  ;  ${padZero(
    mtcData.frames,
    1
  )}`;
  document.getElementById('fps').innerText = `${padZero(getFps(), 2)}`;
  document.getElementById('totalframes').innerText = `${getTotalFrames()}`;
  document.getElementById('audioTrackTime').innerText = `${
    getAudioTrackTime()[0]
  }:${getAudioTrackTime()[1]}:${getAudioTrackTime()[2]}.${padZero(
    getAudioTrackTime()[3],
    3
  )}`;
}
