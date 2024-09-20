<script lang="ts">
	import { mtcData } from '../../lib/stores';

	$: ({ elapsedFrames: mtcElapsedFrames } = $mtcData);
</script>

<h3 class="mb-4 font-extrabold">Elapsed Frames</h3>
<p class="items-center">
	<span id="elapsedFrames" class="font-mono">{mtcElapsedFrames}</span>
</p>
