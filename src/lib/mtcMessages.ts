import { mtcData } from '../lib/stores'; // Import the store

const FRAME_RATES = new Uint8Array([24, 25, 29.97, 30]);
const MTC_QUARTER_FRAME_MASK = 0xf;
const MTC_FULL_FRAME_MASK = 0xf0;

let lastFrameTime = performance.now();
let quarterFrameCount = 0;

export function onMtcMessage(midiData: any) {
	const data = midiData.data[1];
	const msgType = data >> 4;
	const value = data & MTC_QUARTER_FRAME_MASK;

	const frameRate = FRAME_RATES[value >> 1];

	mtcData.update((currentData) => {
		let newData = { ...currentData };

		switch (msgType) {
			case 0:
				newData.frames = (newData.frames & MTC_FULL_FRAME_MASK) | value;
				break;
			case 1:
				newData.frames = (newData.frames & MTC_QUARTER_FRAME_MASK) | (value << 4);
				break;
			case 2:
				newData.seconds = (newData.seconds & MTC_FULL_FRAME_MASK) | value;
				break;
			case 3:
				newData.seconds = (newData.seconds & MTC_QUARTER_FRAME_MASK) | (value << 4);
				break;
			case 4:
				newData.minutes = (newData.minutes & MTC_FULL_FRAME_MASK) | value;
				break;
			case 5:
				newData.minutes = (newData.minutes & MTC_QUARTER_FRAME_MASK) | (value << 4);
				break;
			case 6:
				newData.hours = (newData.hours & MTC_FULL_FRAME_MASK) | value;
				break;
			case 7:
				newData.hours = (newData.hours & MTC_QUARTER_FRAME_MASK) | ((value & 0x1) << 4);
				newData.frameRate = frameRate;
				break;
		}
		newData.milliseconds =
			(newData.hours * 60 * 60 * 1000 +
				newData.minutes * 60 * 1000 +
				newData.seconds * 1000 +
				(newData.frames / newData.frameRate) * 1000) %
			1000;
		newData.elapsedFrames =
			newData.hours * 60 * 60 * newData.frameRate +
			newData.minutes * 60 * newData.frameRate +
			newData.seconds * newData.frameRate +
			newData.frames;
		return newData;
	});

	const currentTime = performance.now();
	lastFrameTime = currentTime;
	quarterFrameCount = 0;
}

export function onStartMessage(midiData: any) {
	console.log(midiData.data);
	console.log(`Received start message:`);
}

export function onContinueMessage(midiData: any) {
	if (midiData.type === 'continue') {
		console.log('Received continue message');
	}
}

export function onStopMessage(midiData: any) {
	if (midiData.type === 'stop') {
		console.log('Received stop message');
	}
}
