<script lang="ts">
	import {
		theme,
		syncModeIsMTC,
		alternativeMTCStartStop,
		videoAlwaysSync,
		videoOffsetMinutes,
		videoOffsetSeconds,
		trackPositionComponent,
		midiTimecodeComponent,
		elapsedFramesComponent,
		bpmComponent,
		selectedMidiInputSPP,
		selectedMidiInputMTC
	} from '$lib/stores';

	function saveToLocalStorage(): void {
		localStorage.setItem('theme', $theme as string);
		localStorage.setItem('syncModeIsMTC', String($syncModeIsMTC));
		localStorage.setItem('alternativeMTCStartStop', String($alternativeMTCStartStop));
		localStorage.setItem('videoAlwaysSync', String($videoAlwaysSync));
		localStorage.setItem('videoOffsetMinutes', String($videoOffsetMinutes));
		localStorage.setItem('videoOffsetSeconds', String($videoOffsetSeconds));
		localStorage.setItem('trackPositionComponent', String($trackPositionComponent));
		localStorage.setItem('midiTimecodeComponent', String($midiTimecodeComponent));
		localStorage.setItem('elapsedFramesComponent', String($elapsedFramesComponent));
		localStorage.setItem('bpmComponent', String($bpmComponent));
		localStorage.setItem('selectedMidiInputSPP', $selectedMidiInputSPP as string);
		localStorage.setItem('selectedMidiInputMTC', $selectedMidiInputMTC as string);
	}

	function loadFromLocalStorage() {
		// use the selectedTheme variable here
		const themeValue = localStorage.getItem('theme');
		if (themeValue) {
			$theme = themeValue;
		}

		const syncModeIsMTCValue = localStorage.getItem('syncModeIsMTC');
		if (syncModeIsMTCValue) {
			$syncModeIsMTC = syncModeIsMTCValue === 'true';
		}

		const alternativeMTCStartStopValue = localStorage.getItem('alternativeMTCStartStop');
		if (alternativeMTCStartStopValue) {
			$alternativeMTCStartStop = alternativeMTCStartStopValue === 'true';
		}

		const videoAlwaysSyncValue = localStorage.getItem('videoAlwaysSync');
		if (videoAlwaysSyncValue) {
			$videoAlwaysSync = videoAlwaysSyncValue === 'true';
		}

		const videoOffsetMinutesValue = localStorage.getItem('videoOffsetMinutes');
		if (videoOffsetMinutesValue) {
			$videoOffsetMinutes = parseInt(videoOffsetMinutesValue, 10);
		}

		const videoOffsetSecondsValue = localStorage.getItem('videoOffsetSeconds');
		if (videoOffsetSecondsValue) {
			$videoOffsetSeconds = parseInt(videoOffsetSecondsValue, 10);
		}

		const trackPositionComponentValue = localStorage.getItem('trackPositionComponent');
		if (trackPositionComponentValue) {
			$trackPositionComponent = trackPositionComponentValue === 'true';
		}

		const midiTimecodeComponentValue = localStorage.getItem('midiTimecodeComponent');
		if (midiTimecodeComponentValue) {
			$midiTimecodeComponent = midiTimecodeComponentValue === 'true';
		}

		const elapsedFramesComponentValue = localStorage.getItem('elapsedFramesComponent');
		if (elapsedFramesComponentValue) {
			$elapsedFramesComponent = elapsedFramesComponentValue === 'true';
		}

		const bpmComponentValue = localStorage.getItem('bpmComponent');
		if (bpmComponentValue) {
			$bpmComponent = bpmComponentValue === 'true';
		}

		const selectedMidiInputSPPValue = localStorage.getItem('selectedMidiInputSPP');
		if (selectedMidiInputSPPValue) {
			$selectedMidiInputSPP = selectedMidiInputSPPValue as string;
		}

		const selectedMidiInputMTCValue = localStorage.getItem('selectedMidiInputMTC');
		if (selectedMidiInputMTCValue) {
			$selectedMidiInputMTC = selectedMidiInputMTCValue as string;
		}
	}
</script>

<div class="flex w-full items-center justify-between">
	<div>
		<i class="fa-solid fa-sliders text-token pr-4" />
	</div>
	<div class=" gap-2">
		<button
			class="variant-filled-primary btn  font-bold"
			on:click={saveToLocalStorage}
			title="Save configuration"><span class="text-xs">Save</span></button
		>
		<button
			class="variant-filled-primary btn  font-bold"
			on:click={loadFromLocalStorage}
			title="Load configuration"><span class="text-xs">Load</span></button
		>
	</div>
</div>
