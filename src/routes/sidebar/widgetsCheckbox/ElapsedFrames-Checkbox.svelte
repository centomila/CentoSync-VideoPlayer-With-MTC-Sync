<script lang="ts">
	import { elapsedFramesComponent } from '$lib/stores';
</script>

<!-- Frontend -->

<label class="flex cursor-pointer items-center ">
	<input class="checkbox mr-4" type="checkbox" bind:checked={$elapsedFramesComponent} />
	<p>Elapsed Frames</p>
</label>
