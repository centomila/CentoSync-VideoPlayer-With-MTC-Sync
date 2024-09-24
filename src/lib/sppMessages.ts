import { get } from 'svelte/store';
import {  sppData } from '$lib/stores';
import type { SPPData } from '$lib/stores';
import type { MessageEvent } from 'webmidi';
export { onSPPMessage, onMidiClockMessage };

let currentBpm = 0;
$: sppData.subscribe((data: SPPData) => {
	if (data.bpm !== 0) {
		currentBpm = data.bpm;
	}
});

function onMidiClockMessage(): void {
	const now = performance.now();
	if (lastClockTime !== null) {
		const interval = now - lastClockTime;
		clockIntervalSum += interval;
		clockCount++;

		if (clockCount === 24) {
			const averageClockInterval = clockIntervalSum / 24;
			const newBpm = 60000 / averageClockInterval / 24;
			if (newBpm !== currentBpm) {
				sppData.update((data: SPPData) => {
					return { ...data, bpm: newBpm };
				});
				currentBpm = newBpm;
			}

			clockIntervalSum = 0;
			clockCount = 0;
		}
	}

	lastClockTime = now;
}

function onSPPMessage(midiData: MessageEvent) {
	console.log(midiData);
	sppArrayToTime(midiData, get(sppData).bpm);
}

let lastClockTime: number | null = null;
let clockIntervalSum: number = 0;
let clockCount: number = 0;

function sppArrayToTime(midiData: MessageEvent, bpm: number) {
	// Extract the LSB and MSB from the array
	const lsb = midiData.data[1]; // Least significant byte
	const msb = midiData.data[2]; // Most significant byte

	console.log({ lsb, msb });

	// Calculate the 14-bit SPP value from the LSB and MSB
	const sppValue = (msb << 7) | lsb; // Combine MSB and LSB to get the SPP value

	// Convert the SPP value to time in seconds
	const timeInSeconds = (sppValue * 60) / (bpm * 4);

	// Convert time in seconds to HH:MM:SSS format
	const hours = timeInSeconds / 3600;
	const minutes = (timeInSeconds % 3600) / 60;
	const seconds = timeInSeconds % 60;
	const milliseconds = (timeInSeconds % 1) * 1000;

	sppData.update((data: SPPData) => {
		data.hours = hours;
		data.minutes = minutes;
		data.seconds = seconds;
		data.milliseconds = milliseconds;
		data.seekPosition = timeInSeconds;
		data.bpm = bpm;
		data.elapsedFrames = 0;
		data.frameRate = 0;
		data.secondsOnSPP = timeInSeconds;
		console.log(data);
		return data;
	});
}
