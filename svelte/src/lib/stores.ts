// stores.ts
import { writable, readable } from 'svelte/store';

// GUI Settings
export const selectedMidiInput = writable('');
export const mtcChecked = writable(false)
export const sppChecked = writable(false)

