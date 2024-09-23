<script lang="ts">
import { refreshPorts } from '$lib/webMidiInit';
import { selectedMidiInputMTC, midiInputs } from '$lib/stores';



</script>

<!-- Frontend -->

<div class="w-full flex justify-between">
	<label class="title text-bold text-left" for="midi-inputs">MIDI PORT </label>
	<button class="btn-primary variant-filled btn-icon max-h-5 max-w-5 " title="Refresh MIDI ports" on:click={refreshPorts}
		><i class="fa fa-2xs fa-refresh"></i></button
	>
</div>
<select class="select w-full text-left" id="midi-inputs" bind:value={$selectedMidiInputMTC}>
	{#each $midiInputs as input}
		<option value={input.value}>{input.name}</option>
	{/each}
</select>
