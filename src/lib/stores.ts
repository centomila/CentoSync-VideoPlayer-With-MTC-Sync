// stores.ts
import { writable, readable } from 'svelte/store';

interface MidiInputs {
	name: string;
	value: string;
}

export const midiInputs = writable<MidiInputs[]>([]);

// MTC
export interface MTCData {
	hours: number;
	minutes: number;
	seconds: number;
	milliseconds: number;
	frames: number;
	frameRate: number;
	elapsedFrames: number;
	seekPosition: number;
}

export interface SPPData {
	bpm: number;
	hours: number;
	minutes: number;
	seconds: number;
	milliseconds: number;
	frames: number;
	frameRate: number;
	elapsedFrames: number;
	seekPosition: number;
}

export const sppData = writable<SPPData>({
	bpm: 120,
	hours: 0,
	minutes: 0,
	seconds: 0,
	milliseconds: 0,
	frames: 0,
	frameRate: 0,
	elapsedFrames: 0,
	seekPosition: 0
});

export const mtcData = writable<MTCData>({
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


// GUI Settings
export const selectedMidiInputMTC = writable('');

export const trackPositionComponent = writable(true);
export const midiTimecodeComponent = writable(true);
export const elapsedFramesComponent = writable(true);
export const bpmComponent = writable(false);

// SyncSetting
export const syncModeIsMTC = writable(true);

// View

export const guiView = writable('video');
export const theme = writable('centomila');

export const appName = readable('VideoSyncWeb', () => {});
export const appVersion = readable('0.6.4', () => {});
