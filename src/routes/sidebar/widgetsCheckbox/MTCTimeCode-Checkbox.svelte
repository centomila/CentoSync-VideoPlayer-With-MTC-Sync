<script lang="ts">
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import { midiTimecodeComponent } from '$lib/stores';
</script>

<!-- Frontend -->
<label class="flex items-center space-x-2 cursor-pointer">
	<input class="checkbox" type="checkbox" bind:checked={$midiTimecodeComponent} />
	<p>MTC Timecode</p>
</label>
