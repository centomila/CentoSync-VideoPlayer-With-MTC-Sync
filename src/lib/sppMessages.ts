import { bpm } from '$lib/stores';
import type { MessageEvent } from 'webmidi';
export { onSPPMessage, onMidiClockMessage };

let currentBpm = 0;

function onMidiClockMessage() {
	handleMidiClock();
}

function onSPPMessage(midiData: MessageEvent) {
	console.log(midiData);
	console.log(sppArrayToTime(midiData, currentBpm));
}

let lastClockTime: number | null = null;
let clockIntervalSum: number = 0;
let clockCount: number = 0;

function handleMidiClock(): void {
	const now = performance.now();
	if (lastClockTime !== null) {
		const interval = now - lastClockTime;
		clockIntervalSum += interval;
		clockCount++;

		if (clockCount === 24) {
			const averageClockInterval = clockIntervalSum / 24;
			const newBpm = 60000 / averageClockInterval / 24;
			if (newBpm !== currentBpm) {
				bpm.update(() => newBpm);
				currentBpm = newBpm;
			}

			clockIntervalSum = 0;
			clockCount = 0;
		}
	}

	lastClockTime = now;
	// console.log(`Received clock message: ${currentBpm}`);
}

function sppArrayToTime(midiData: MessageEvent, bpm: number) {
	// Extract the LSB and MSB from the array
	const lsb = midiData.data[1]; // Least significant byte
	const msb = midiData.data[2]; // Most significant byte

	console.log({ lsb, msb });

	// Calculate the 14-bit SPP value from the LSB and MSB
	const sppValue = (msb << 7) | lsb; // Combine MSB and LSB to get the SPP value

	// Convert the SPP value to time in seconds
	const timeInSeconds = (sppValue * 60) / (Math.round(bpm) * 4);

	// Convert time in seconds to HH:MM:SSS format
	const hours = Math.floor(timeInSeconds / 3600);
	const minutes = Math.floor((timeInSeconds % 3600) / 60);
	const seconds = Math.floor(timeInSeconds % 60);
	const milliseconds = Math.floor((timeInSeconds % 1) * 1000);

	// Format the time as HH:MM:SSS and return it
	return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
}
