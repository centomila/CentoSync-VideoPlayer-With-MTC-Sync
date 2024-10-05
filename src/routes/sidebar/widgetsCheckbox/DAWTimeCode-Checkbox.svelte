<script lang="ts">
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import { trackPositionComponent } from '$lib/stores';
</script>

<!-- Frontend -->
<label class="flex cursor-pointer items-center space-x-2">
	<input class="checkbox" type="checkbox" bind:checked={$trackPositionComponent} />
	<p>DAW Timecode</p>
</label>
