<script lang="ts">
	import { mtcData } from '../../lib/stores';

	$: ({ elapsedFrames: mtcElapsedFrames } = $mtcData);
</script>

<div class="px-4">
	<!-- <h3 class="mb-2 font-extrabold">Elapsed Frames</h3> -->
	<div class="grid grid-cols-1 gap-1">
		<div class="text-center font-mono font-light text-gray-500">Elapsed Frames</div>
		<div id="elapsedFrames" class="text-center font-mono lg:text-2xl font-light">
			{mtcElapsedFrames}
		</div>
	</div>
</div>
