<script lang="ts">
	import { bpmComponent, selectedMidiInputSPP } from '$lib/stores';

	// eslint-disable-next-line
	$: $bpmComponent;

	// eslint-disable-next-line
	$: $selectedMidiInputSPP === 'DISABLED' ? ($bpmComponent = false) : $bpmComponent;
</script>

<!-- Frontend -->
<label
	class="flex
	items-center
	{$selectedMidiInputSPP === 'DISABLED' ? 'text-gray-500' : ''}
	cursor-{$selectedMidiInputSPP === 'DISABLED' ? 'not-allowed' : 'pointer'}"
>
	<input
		class="checkbox mr-4"
		type="checkbox"
		checked={$bpmComponent}
		on:change={() => ($bpmComponent = !$bpmComponent)}
		disabled={$selectedMidiInputSPP === 'DISABLED'}
	/>
	<p>Clock (BPM)</p>
</label>
