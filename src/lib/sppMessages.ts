import { bpm } from '../lib/stores';
import { get } from 'svelte/store';
export { onSPPMessage, onMidiClockMessage };

let currentBpm = 0;

function onMidiClockMessage() {
	handleMidiClock();
}

function onSPPMessage(midiData: any) {
	console.log(sppArrayToTime(midiData.data, currentBpm));
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
			const newBpm = Math.round(60000 / averageClockInterval / 24);
			if (newBpm !== currentBpm) {
				bpm.update((_) => newBpm);
				currentBpm = newBpm;
			}

			clockIntervalSum = 0;
			clockCount = 0;
		}
	}

	lastClockTime = now;
	// console.log(`Received clock message: ${currentBpm}`);
}

function sppArrayToTime(sppArray: any[], bpm: number) {
	// Extract the LSB and MSB from the array
	let lsb = sppArray[1]; // Least significant byte
	let msb = sppArray[2]; // Most significant byte

	// Calculate the 14-bit SPP value from the LSB and MSB
	let sppValue = (msb << 7) | lsb; // Combine MSB and LSB to get the SPP value

	// Convert the SPP value to time in seconds
	let timeInSeconds = (sppValue * 60) / (bpm * 4);

	// Convert time in seconds to HH:MM:SSS format
	let hours = Math.floor(timeInSeconds / 3600);
	let minutes = Math.floor((timeInSeconds % 3600) / 60);
	let seconds = Math.floor(timeInSeconds % 60);
	let milliseconds = Math.floor((timeInSeconds % 1) * 1000);

	// Format the time as HH:MM:SSS and return it
	return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
}
