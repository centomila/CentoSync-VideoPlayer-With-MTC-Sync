<script lang="ts">
	import { selectedMidiInputMTC, midiInputs, syncModeIsMTC } from '$lib/stores';
</script>

{#if $syncModeIsMTC}
	<div class="space-y-2">
		<div class="flex w-full justify-between">
			<label class="title text-bold text-left" for="midi-inputs-mtc">MTC/SysEx</label>
			<span
				class="flex items-center gap-1 align-text-bottom font-mono text-xs font-light text-primary-500"
				title="MIDI Timecode Port">MIDI Port 1</span
			>
		</div>
		<select class="select w-full text-left" id="midi-inputs-mtc" bind:value={$selectedMidiInputMTC}>
			{#each $midiInputs as input}
				<option value={input.value}>{input.name}</option>
			{/each}
		</select>
	</div>
{/if}
