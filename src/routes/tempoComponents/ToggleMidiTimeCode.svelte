<script lang="ts">
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import { midiTimecodeComponent } from '$lib/stores';
</script>

<!-- Frontend -->
<div class="items-left flex space-x-2">
	<SlideToggle name="slider-label" bind:checked={$midiTimecodeComponent}>MTC Timecode</SlideToggle>
</div>
