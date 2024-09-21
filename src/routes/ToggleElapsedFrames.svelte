<script lang="ts">
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import { elapsedFramesComponent } from '$lib/stores';
</script>

<!-- Frontend -->
<div class="flex items-left space-x-2">
	<SlideToggle name="slider-label" bind:checked={$elapsedFramesComponent}>Elapsed Frames</SlideToggle>
</div>
