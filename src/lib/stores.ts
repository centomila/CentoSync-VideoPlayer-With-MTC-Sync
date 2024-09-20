// stores.ts
import { writable } from 'svelte/store';
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
export const sppChecked = writable(false);

// View

export const guiView = writable('video');
