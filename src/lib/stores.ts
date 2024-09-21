// stores.ts
import { writable, readable } from 'svelte/store';
// MTC
interface MtcData {
	hours: number;
	minutes: number;
	seconds: number;
	milliseconds: number;
	frames: number;
	frameRate: number;
	elapsedFrames: number;
	seekPosition: number;
}

export const mtcData = writable<MtcData>({
	hours: 0,
	minutes: 0,
	seconds: 0,
	milliseconds: 0,
	frames: 0,
	frameRate: 0,
	elapsedFrames: 0,
	seekPosition: 0
});

// files

interface LoadedFiles {
	files: FileList | undefined;
	currentFileName: string;
}

export const loadedFiles = writable<LoadedFiles>({
	files: undefined,
	currentFileName: 'Load a video'
});

// Midi Clock

export const bpm = writable(120);

// GUI Settings
export const selectedMidiInputMTC = writable('');

export const trackPositionComponent = writable(true);
export const midiTimecodeComponent = writable(true);
export const elapsedFramesComponent = writable(true);
export const bpmComponent = writable(false);

// View

export const guiView = writable('video');

export const appName = readable('Zimmer Time MTC', () => {});
export const appVersion = readable('0.5.1', () => {});
