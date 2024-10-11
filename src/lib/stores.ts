// stores.ts
import { writable, readable } from 'svelte/store';

// View

export const mediaInfoView = writable(false);
export const theme = writable('bitwig');

export const appName = readable('CentoSync', () => {});
export const appVersion = readable('0.9.0', () => {});
export const gitHubUrl = readable(
	'https://github.com/centomila/CentoSync-VideoPlayer-With-MTC-Sync',
	() => {}
);

interface MidiInputs {
	name: string;
	value: string;
}

export const isPlaying = writable(false);
export const lastTimeReceivedPlay = writable(0);

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
	secondsOnSPP: number;
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
	seekPosition: 0,
	secondsOnSPP: 0
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
export const sidebarIsVisible = writable(true);
export const selectedMidiInputMTC = writable('');
export const selectedMidiInputSPP = writable('');

export const trackPositionComponent = writable(true);
export const midiTimecodeComponent = writable(true);
export const elapsedFramesComponent = writable(true);
export const bpmComponent = writable(false);

// SyncSetting
export const syncModeIsMTC = writable(true);

export const videoOffsetSeconds = writable(0);
export const videoOffsetMinutes = writable(0);
export const videoAlwaysSync = writable(true);
export const alternativeMTCStartStop = writable(false);

// Sidebar Accordion

export const videoOffsetAccordionOpen = writable(false);
export const widgetsAccordionOpen = writable(false);
export const midiSettingsAccordionOpen = writable(false);
export const themeAccordionOpen = writable(false);
