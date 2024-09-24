<script lang="ts">
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import { bpmComponent } from '$lib/stores';

	// eslint-disable-next-line
	$: $bpmComponent;
</script>

<!-- Frontend -->
<SlideToggle name="slider-label" bind:checked={$bpmComponent}>Midi Clock (BPM)</SlideToggle>
