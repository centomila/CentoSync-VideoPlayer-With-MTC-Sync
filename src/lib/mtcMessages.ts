import { get } from 'svelte/store';
import { mtcData } from '$lib/stores'; // Import the store
import { videoPlayerStore } from '$lib/videoPlayerStore';

$: mtcData;

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
		currentData.seekPosition =
			currentData.hours * 60 * 60 +
			currentData.minutes * 60 +
			currentData.seconds +
			currentData.milliseconds / 1000;
		return currentData;
	});

	const currentTime = performance.now();
	lastFrameTime = currentTime;
	
}

export function onSysexMessage(midiData: any) {
	const data = midiData.data; // Example: [240, 127, 127, 1, 1, 96, 0, 2, 0, 247]

	// Ensure this is the expected SysEx message type
	if (data[0] === 0xF0 && data[1] === 0x7F && data[2] === 0x7F && data[3] === 0x01 && data[4] === 0x01) {
		// Extract and decode MTC data
		const hours = (data[5] & 0x1F);        // 5 bits for hours (0-23)
		const minutes = (data[6] & 0x3F);      // 6 bits for minutes (0-59)
		const seconds = (data[7] & 0x3F);      // 6 bits for seconds (0-59)
		const frames = (data[8] & 0x1F);       // 5 bits for frames (0-29 typically)

		// Assuming 30 fps (adjust if your DAW uses a different frame rate)
		const framesPerSecond = get(mtcData).frameRate || 30;
		const milliseconds = Math.floor((frames / framesPerSecond) * 1000);

		// Update Svelte store (mtcData) using the decoded MTC data
		mtcData.update((currentData) => {
			currentData.hours = hours;
			currentData.minutes = minutes;
			currentData.seconds = seconds;
			currentData.milliseconds = milliseconds;

			// Calculate total seconds
			const totalSeconds = (hours * 3600) + (minutes * 60) + seconds + (milliseconds / 1000);
			currentData.seekPosition = totalSeconds;

			return currentData;
		});
	}
	seekPosition();
}


let seekTimeout: ReturnType<typeof setTimeout> | null = null;

export function onStartMessage(midiData: { type: string } | null) {
	startPlaying();
	seekPosition();
}

export function onContinueMessage(midiData: { type: string } | null) {
	startPlaying();
	seekPosition();
}

export function seekPosition() {
	
		console.log('Received continue message');

		// Clear any existing timeout
		if (seekTimeout !== null) {
			clearTimeout(seekTimeout);
		}

		// Set a new timeout to debounce seek operations
		seekTimeout = setTimeout(() => {
			const currentData = get(mtcData);
			if (currentData === undefined) {
				console.error('MTC data is undefined');
				return;
			}
			const seekTime = currentData.seekPosition;
			console.log('Seeking to:', seekTime);
			videoPlayerStore.seek(seekTime);
		}, 10); // 0ms debounce
	
}

export function startPlaying() {
	videoPlayerStore.play();
}

export function onStopMessage(midiData: { type: string } | null) {
	if (midiData === null) {
		console.error('Received null stop message');
		return;
	}
	if (midiData.type === 'stop') {
		console.log('Received stop message');
		videoPlayerStore.pause();

		// Clear any pending seek operation
		if (seekTimeout !== null) {
			clearTimeout(seekTimeout);
			seekTimeout = null;
		}
	}
}
