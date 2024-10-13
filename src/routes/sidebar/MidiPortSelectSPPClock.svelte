<script lang="ts">
	import { selectedMidiInputSPP, midiInputs } from '$lib/stores';
</script>

<div class="space-y-2">
	<div class="flex w-full justify-between">
		<label class="title text-bold text-left" for="midi-inputs-spp">SPP/Clock</label>
		<span
			class="flex items-center gap-1 align-text-bottom font-mono text-xs font-light text-primary-500"
			title="MIDI Timecode Port">MIDI Port 2</span
		>
	</div>
	<select class="select w-full text-left" id="midi-inputs-spp" bind:value={$selectedMidiInputSPP}>
		{#each $midiInputs as input}
			<option value={input.value}>{input.name}</option>
		{/each}
	</select>
</div>
