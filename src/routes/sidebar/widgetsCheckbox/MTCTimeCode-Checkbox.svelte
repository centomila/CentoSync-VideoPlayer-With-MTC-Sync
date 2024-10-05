<script lang="ts">
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import { midiTimecodeComponent } from '$lib/stores';
</script>

<!-- Frontend -->
<label class="flex cursor-pointer items-center">
	<input class="checkbox mr-4" type="checkbox" bind:checked={$midiTimecodeComponent} />
	<p>MTC Timecode</p>
</label>
