<script lang="ts">
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import { bpmComponent, selectedMidiInputSPP } from '$lib/stores';

	// eslint-disable-next-line
	$: $bpmComponent;

	$: $selectedMidiInputSPP === 'DISABLED' ? ($bpmComponent = false) : $bpmComponent;
</script>

<!-- Frontend -->
<SlideToggle
	name="slider-label"
	disabled={$selectedMidiInputSPP === 'DISABLED'}
	bind:checked={$bpmComponent}>Midi Clock (BPM)</SlideToggle
>
