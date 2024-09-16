<script lang="ts">
	import { WebMidi } from 'webmidi';
	import { selectedMidiInputMTC, sppChecked, bpm } from '../lib/stores';

	function startSppListening() {
		console.log('MTC listener starting');
		if (WebMidi.enabled) {
			let input = WebMidi.getInputByName($selectedMidiInputMTC);
			if (input) {
				console.info(`Listening for SPP messages from ${input.name}...`);
				input.addListener('clock', onMidiClockMessage);
				input.addListener('start', onMidiStartMessage);
				input.addListener('continue', onMidiContinueMessage);
				input.addListener('stop', onMidiStopMessage);
				input.addListener('songposition', onSPPMessage);
			} else {
				console.log(`MIDI input not found`);
			}
		} else {
			console.log('WEBMIDI not enabled. Cannot start SPP listener.');
		}
	}

	function stopSppListening() {
		if (WebMidi.enabled) {
			let input = WebMidi.getInputByName($selectedMidiInputMTC);
			if (input) {
				input.removeListener('clock', onMidiClockMessage);
				input.removeListener('start', onMidiStartMessage);
				input.removeListener('continue', onMidiContinueMessage);
				input.removeListener('stop', onMidiStopMessage);
				input.removeListener('songposition', onSPPMessage);
				console.info(`Stopped listening for SPP messages from ${input.name}...`);
			} else {
				console.log(`MIDI input not found`);
			}
			console.log('MTC listener stopping');
		} else {
			console.log('WEBMIDI not enabled. Cannot stop SPP listener.');
		}
	}

	function onMidiClockMessage() {
		handleMidiClock();
	}

	function onMidiStartMessage(midiData: any) {
		console.log(midiData.data);
		console.log(`Received start message:`);
	}

	function onMidiContinueMessage(midiData: any) {
		if (midiData.type === 'continue') {
			console.log('Received continue message');
		}
	}

	function onMidiStopMessage(midiData: any) {
		if (midiData.type === 'stop') {
			console.log('Received stop message');
		}
	}

	function onSPPMessage(midiData: any) {
		// console.log(sppArrayToTime(midiData.data, $bpm));
	}

	let lastClockTime: number | null = null;
	let clockIntervalSum: number = 0;
	let clockCount: number = 0;

	function handleMidiClock(): void {
		const now = performance.now();
		if (lastClockTime !== null) {
			const interval: number = now - lastClockTime;
			clockIntervalSum += interval;
			clockCount++;

			if (clockCount === 24) {
				// 24 clock messages per quarter note
				const averageClockInterval = clockIntervalSum / 24;
				$bpm = 60000 / (averageClockInterval * 24); // Calculate BPM

				clockIntervalSum = 0; // Reset sum
				clockCount = 0; // Reset count
			}
		}

		lastClockTime = now;

		// console.log(`BPM: ${bpm}`);
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

	$: $sppChecked ? startSppListening() : stopSppListening();
</script>

<!-- Frontend -->
<div class="flex items-center space-x-2">
	<input class="checkbox" type="checkbox" id="SPP" name="SPP" bind:checked={$sppChecked} />
	<label for="SPP">Midi Clock</label>
</div>
