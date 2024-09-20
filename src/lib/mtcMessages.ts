import { mtcData } from '$lib/stores'; // Import the store
import { videoPlayerStore } from '$lib/videoPlayerStore';

$: mtcData 

const FRAME_RATES = new Uint8Array([24, 25, 29.97, 30]);
const MTC_QUARTER_FRAME_MASK = 0xf;
const MTC_FULL_FRAME_MASK = 0xf0;

// @ts-ignore
let lastFrameTime = performance.now();

export function onMtcMessage(midiData: any) {
	const data = midiData.data[1];
	const msgType = data >> 4;
	const value = data & MTC_QUARTER_FRAME_MASK;

	const frameRate = FRAME_RATES[value >> 1];

	mtcData.update((currentData) => {
		switch (msgType) {
			case 0:
				currentData.frames = (currentData.frames & MTC_FULL_FRAME_MASK) | value;
				break;
			case 1:
				currentData.frames = (currentData.frames & MTC_QUARTER_FRAME_MASK) | (value << 4);
				break;
			case 2:
				currentData.seconds = (currentData.seconds & MTC_FULL_FRAME_MASK) | value;
				break;
			case 3:
				currentData.seconds = (currentData.seconds & MTC_QUARTER_FRAME_MASK) | (value << 4);
				break;
			case 4:
				currentData.minutes = (currentData.minutes & MTC_FULL_FRAME_MASK) | value;
				break;
			case 5:
				currentData.minutes = (currentData.minutes & MTC_QUARTER_FRAME_MASK) | (value << 4);
				break;
			case 6:
				currentData.hours = (currentData.hours & MTC_FULL_FRAME_MASK) | value;
				break;
			case 7:
				currentData.hours = (currentData.hours & MTC_QUARTER_FRAME_MASK) | ((value & 0x1) << 4);
				currentData.frameRate = frameRate;
				break;
		}
		currentData.milliseconds =
			(currentData.hours * 60 * 60 * 1000 +
				currentData.minutes * 60 * 1000 +
				currentData.seconds * 1000 +
				(currentData.frames / currentData.frameRate) * 1000) %
			1000;
		currentData.elapsedFrames =
			currentData.hours * 60 * 60 * currentData.frameRate +
			currentData.minutes * 60 * currentData.frameRate +
			currentData.seconds * currentData.frameRate +
			currentData.frames;
		return currentData;
	});

	const currentTime = performance.now();
	lastFrameTime = currentTime;
}

export function onStartMessage(midiData: any) {
	console.log(midiData.data);
	console.log(`Received start message:`);
	videoPlayerStore.play();
}

export function onContinueMessage(midiData: any) {
	if (midiData.type === 'continue') {
		console.log('Received continue message');
		videoPlayerStore.play();
	}
}

export function onStopMessage(midiData: any) {
	if (midiData.type === 'stop') {
		console.log('Received stop message');
	}
}
