<script lang="ts">
	import { syncModeIsMTC } from '$lib/stores';
</script>

<!-- Frontend -->
<div class="flex w-full justify-between">
	<label class="title text-bold text-left" for="midi-inputs">Sync Mode </label>
	<!-- <button class="btn-primary variant-filled btn-icon max-h-5 max-w-5" title="Help"
		><i class="fa fa-2xs fa-question"></i></button
	> -->
</div>
<select bind:value={$syncModeIsMTC} class="select w-full">
	<option value={true}>MIDI TimeCode (MTC)</option>
	<option value={false}>Song Position Pointer (SPP)</option>
</select>
