// stores.ts
import { writable, readable, get } from 'svelte/store';
// MTC
interface MtcData {
	hours: number;
	minutes: number;
	seconds: number;
	milliseconds: number;
	frames: number;
	frameRate: number;
	elapsedFrames: number;
}

export const mtcData = writable<MtcData>({
	hours: 0,
	minutes: 0,
	seconds: 0,
	milliseconds: 0,
	frames: 0,
	frameRate: 0,
	elapsedFrames: 0
});

// Midi Clock

export const bpm = writable(120);

// GUI Settings
export const selectedMidiInput = writable('');
export const mtcChecked = writable(false);
export const sppChecked = writable(false);
