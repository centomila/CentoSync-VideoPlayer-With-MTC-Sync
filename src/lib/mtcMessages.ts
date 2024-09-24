import { get } from 'svelte/store';
import { mtcData, type MTCData } from '$lib/stores'; // Import the store
import { seekPosition } from './webMidiInit';

// Constants
const FRAME_RATES = new Uint8Array([24, 25, 29.97, 30]);
const MTC_QUARTER_FRAME_MASK = 0xf;
const MTC_FULL_FRAME_MASK = 0xf0;

export function onMtcMessage(midiData: { data: Uint8Array }): void {
	const data = midiData.data[1];
	const msgType = data >> 4;
	const value = data & MTC_QUARTER_FRAME_MASK;

	const frameRate = FRAME_RATES[value >> 1];

	mtcData.update((currentData: MTCData) => {
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

		// Calculate total frames
		const totalFrames =
			currentData.hours * 3600 * currentData.frameRate +
			currentData.minutes * 60 * currentData.frameRate +
			currentData.seconds * currentData.frameRate +
			currentData.frames;

		// Calculate total seconds with high precision
		const totalSeconds = totalFrames / currentData.frameRate;

		// Update derived values
		currentData.milliseconds = Math.round((totalSeconds % 1) * 1000);
		currentData.elapsedFrames = Math.round(totalFrames);
		currentData.seekPosition = totalSeconds;

		return currentData;
	});
}

export function onSysexMessage(midiData: { data: Uint8Array }): void {
	const data = midiData.data;

	// Ensure this is the expected SysEx message type
	if (
		data[0] === 0xf0 &&
		data[1] === 0x7f &&
		data[2] === 0x7f &&
		data[3] === 0x01 &&
		data[4] === 0x01 &&
		data.length >= 9 // Ensure we have enough data
	) {
		// Extract and decode MTC data
		const hours = data[5] & 0x1f; // 5 bits for hours (0-23)
		const minutes = data[6] & 0x3f; // 6 bits for minutes (0-59)
		const seconds = data[7] & 0x3f; // 6 bits for seconds (0-59)
		const frames = data[8] & 0x1f; // 5 bits for frames (0-29 typically)

		mtcData.update((currentData: MTCData) => {
			// Handle frame rate
			if (currentData.frameRate === 0) {
				console.warn(
					'Frame rate not set. Using project default or 30 fps. For accurate timing, ensure frame rate is set before seeking (Just press play in your DAW once 😉).'
				);
				// You might want to get the project's default frame rate here
				// currentData.frameRate = getProjectDefaultFrameRate();
				currentData.frameRate = 30; // Fallback to 30 fps if no project default
			}

			// Update basic time components
			currentData.hours = hours;
			currentData.minutes = minutes;
			currentData.seconds = seconds;
			currentData.frames = frames;

			// Calculate total frames
			const totalFrames =
				hours * 3600 * currentData.frameRate +
				minutes * 60 * currentData.frameRate +
				seconds * currentData.frameRate +
				frames;

			// Calculate total seconds with high precision
			const totalSeconds = totalFrames / currentData.frameRate;

			// Update derived values
			currentData.milliseconds = Math.round((totalSeconds % 1) * 1000);
			currentData.elapsedFrames = Math.round(totalFrames);
			currentData.seekPosition = totalSeconds;

			return currentData;
		});

		// Update video player and seek position
		console.log('SysEx message received');
		seekPosition();
	}
}

// Function to get the current MTC data safely
export function getSafeMtcData(): MTCData {
	const currentData = get(mtcData);
	if (currentData.frameRate === 0) {
		console.warn(
			'Frame rate not set. Using 30 fps as default.<br>For accurate timing, ensure frame rate is set before reading MTC data by playing sending MTC messages for at least 30 frames (just press play in the DAW).'
		);
		return { ...currentData, frameRate: 30 };
	}
	return currentData;
}
