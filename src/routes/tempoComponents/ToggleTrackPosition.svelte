<script lang="ts">
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import { trackPositionComponent } from '$lib/stores';
</script>

<!-- Frontend -->
<SlideToggle name="slider-label" bind:checked={$trackPositionComponent}>DAW Timecode</SlideToggle>
