// stores.ts
import { writable, readable } from 'svelte/store';


interface MtcData {
  hours: number;
  minutes: number;
  seconds: number;
  frames: number;
  frameRate: number;
}

export const mtcData = writable<MtcData>({
  hours: 0,
  minutes: 0,
  seconds: 0,
  frames: 0,
  frameRate: 0,
});


// GUI Settings
export const selectedMidiInput = writable('');
export const mtcChecked = writable(false)
export const sppChecked = writable(false)