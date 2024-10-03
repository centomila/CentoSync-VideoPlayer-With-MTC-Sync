<script lang="ts">
	import { refreshPorts } from '$lib/webMidiInit';
	import { selectedMidiInputMTC, selectedMidiInputSPP, midiInputs } from '$lib/stores';
</script>

<!-- Frontend -->

<div class="flex w-full justify-between">
	<label class="title text-bold text-left" for="midi-inputs">MTC/SysEx</label>
	<span
		class="flex items-center gap-1 align-text-bottom font-mono text-xs font-light text-primary-500"
		title="MIDI Timecode Port">MIDI Port 1</span
	>
</div>
<select class="select w-full text-left" id="midi-inputs" bind:value={$selectedMidiInputMTC}>
	{#each $midiInputs as input}
		<option value={input.value}>{input.name}</option>
	{/each}
</select>
<div class="flex w-full justify-between">
	<label class="title text-bold text-left" for="midi-inputs">SPP/Clock</label>
	<span
		class="flex items-center gap-1 align-text-bottom font-mono text-xs font-light text-primary-500"
		title="MIDI Timecode Port">MIDI Port 2</span
	>
</div>
<select class="select w-full text-left" id="midi-inputs" bind:value={$selectedMidiInputSPP}>
	{#each $midiInputs as input}
		<option value={input.value}>{input.name}</option>
	{/each}
</select>
