// stores.ts
	import { writable } from 'svelte/store';

  export const selectedMidiInput = writable('');

  export const mtcChecked = writable(false)
  export const sppChecked = writable(false)
