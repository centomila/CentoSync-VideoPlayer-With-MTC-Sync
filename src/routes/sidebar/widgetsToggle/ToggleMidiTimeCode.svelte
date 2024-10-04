<script lang="ts">
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import { midiTimecodeComponent } from '$lib/stores';
</script>

<!-- Frontend -->
<SlideToggle name="slider-label" bind:checked={$midiTimecodeComponent}>MTC Timecode</SlideToggle>
