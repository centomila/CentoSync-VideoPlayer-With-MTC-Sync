<script lang="ts">
	import { refreshPorts } from '$lib/webMidiInit';
	import { selectedMidiInputMTC, selectedMidiInputSPP, midiInputs } from '$lib/stores';
</script>

<!-- Frontend -->

<div class="flex w-full justify-between">
	<label class="title text-bold text-left" for="midi-inputs">MIDI Port </label>
	<span
		class="text-xs align-text-bottom font-mono font-light text-primary-500 flex items-center gap-1"
		title="MIDI Timecode Port">MTC</span>
</div>
<select class="select w-full text-left" id="midi-inputs" bind:value={$selectedMidiInputMTC}>
	{#each $midiInputs as input}
		<option value={input.value}>{input.name}</option>
	{/each}
</select>
<div class="flex w-full justify-between">
	<label class="title text-bold text-left" for="midi-inputs">MIDI Port </label>
	<span
		class="text-xs align-text-bottom font-mono font-light text-primary-500 flex items-center gap-1"
		title="MIDI Timecode Port">SPP/CLOCK</span>
</div>
<select class="select w-full text-left" id="midi-inputs" bind:value={$selectedMidiInputSPP}>
	{#each $midiInputs as input}
		<option value={input.value}>{input.name}</option>
	{/each}
</select>
