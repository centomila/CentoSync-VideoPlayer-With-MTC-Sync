<script lang="ts">
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import { elapsedFramesComponent } from '$lib/stores';
</script>

<!-- Frontend -->

<SlideToggle name="slider-label" bind:checked={$elapsedFramesComponent}>Elapsed Frames</SlideToggle>
