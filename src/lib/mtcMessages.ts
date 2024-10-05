import { get } from 'svelte/store';
import {
	isPlaying,
	mtcData,
	syncModeIsMTC,
	videoOffsetMinutes,
	videoOffsetSeconds,
	videoAlwaysSync,
	alternativeMTCStartStop,
	type MTCData
} from '$lib/stores'; // Import the store
import { seekPosition } from './webMidiInit';
import { videoPlayerStore } from '$lib/videoPlayerStore';

// Constants
const FRAME_RATES = new Uint8Array([24, 25, 29.97, 30]);
const MTC_QUARTER_FRAME_MASK = 0xf;
const MTC_FULL_FRAME_MASK = 0xf0;
const SYNC_TOLERANCE = 0.01; // Tolerance of 0.1 seconds

const isSynchronized = (playerTime: number, mtcTime: number) => {
	return Math.abs(playerTime - mtcTime) <= SYNC_TOLERANCE;
};

// Force resync on play
$: videoPlayerStore.subscribe((player) => {
	if (player && get(syncModeIsMTC)) {
		player.on('play', () => {
			if (get(videoAlwaysSync)) {
				setTimeout(() => {
					const playerTime = player.currentTime();
					const mtcTime = get(mtcData).seekPosition;

					if (typeof playerTime === 'number' && !isSynchronized(playerTime, mtcTime)) {
						console.log('Seeking position');
						console.log('Player time:', playerTime, 'MTC time:', mtcTime);
						seekPosition();
					} else {
						console.log('Player and MTC are synchronized');
					}
				}, 500);
			}
		});
	}
});



// end NOSYSEX MESSAGES CONTINUOS CHECK

// ---------------------------------------------------------------------

// NOSYSEX MESSAGES CONTINUOS CHECK

let intervalId: ReturnType<typeof setInterval> | undefined;
let unsubscribeMtcStreaming: (() => void) | undefined;
function alternativeSyncStart() {
	let previousSeekPosition: number | undefined;
	let isReceivingMTC = false;
	let lastUpdateTime = performance.now();
	let playLoggedTime = 0;

	const MTC_TIMEOUT = 100; // Timeout in milliseconds to consider MTC stopped
	const PLAY_LOG_INTERVAL = 2000; // Minimum interval between "PLAYING" logs

	unsubscribeMtcStreaming = mtcData.subscribe((data) => {
		const currentTime = performance.now();

		if (data.seekPosition !== previousSeekPosition) {
			lastUpdateTime = currentTime;

			if (!isReceivingMTC || currentTime - playLoggedTime > PLAY_LOG_INTERVAL) {
				console.log('PLAYING');
				isReceivingMTC = true;
				playLoggedTime = currentTime;

				isPlaying.set(true);
				videoPlayerStore.play();
			}
		}

		previousSeekPosition = data.seekPosition;
	});

	// Set up an interval to check for STOP condition regularly
	intervalId = setInterval(() => {
		const currentTime = performance.now();
		if (isReceivingMTC && currentTime - lastUpdateTime > MTC_TIMEOUT) {
			console.log('STOP');
			isReceivingMTC = false;
			isPlaying.set(false);
			videoPlayerStore.pause();
		}
	}, MTC_TIMEOUT);
}

function alternativeSyncStop() {
	if (intervalId) {
		clearInterval(intervalId);
		intervalId = undefined;
	}

	if (unsubscribeMtcStreaming) {
		unsubscribeMtcStreaming();
		unsubscribeMtcStreaming = undefined;
	}
}

$: alternativeMTCStartStop.subscribe((value) => {
	if (value) {
		alternativeSyncStart();
	} else {
		alternativeSyncStop();
	}
})

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
		currentData.milliseconds = (totalSeconds % 1) * 1000;
		currentData.elapsedFrames = totalFrames;
		currentData.seekPosition =
			totalSeconds + (get(videoOffsetSeconds) + get(videoOffsetMinutes) * 60);

		return currentData;
	});
}

export function onSysexMessage(midiData: { data: Uint8Array }): void {
	if (get(alternativeMTCStartStop)) {
		return;
	}

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
				currentData.frameRate = 30; // Fallback to 30 fps if no project default
			}

			// Update basic time components
			currentData.hours = hours;
			currentData.minutes = minutes;
			currentData.seconds = seconds;
			currentData.frames = frames;

			// Calculate only the milliseconds for the current second using frames and frame rate
			const frameTimeInMilliseconds = (frames / currentData.frameRate) * 1000;

			// Final precise millisecond calculation (only for the current second)
			currentData.milliseconds = Math.round(frameTimeInMilliseconds);

			// Calculate total frames for elapsed frames
			const totalFrames =
				hours * 3600 * currentData.frameRate +
				minutes * 60 * currentData.frameRate +
				seconds * currentData.frameRate +
				frames;

			// Update derived values
			currentData.elapsedFrames = totalFrames;

			// Calculate seek position in seconds
			currentData.seekPosition =
				hours * 3600 +
				minutes * 60 +
				seconds +
				frames / currentData.frameRate +
				(get(videoOffsetSeconds) + get(videoOffsetMinutes) * 60);

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
