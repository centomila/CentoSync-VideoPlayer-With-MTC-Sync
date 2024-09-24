<script lang="ts">
	import { sppData } from '$lib/stores';
	import type { SPPData } from '$lib/stores';

	$: bpmFormatted = $sppData.bpm ? parseFloat($sppData.bpm.toFixed(2)) : 0;
</script>

<div class="px-4">
	<!-- <h3 class="mb-2 font-extrabold">Beats Per Minute</h3> -->
	<div class="grid grid-cols-1 gap-1">
		<div class="text-center font-mono font-light text-primary-500">BPM</div>
		<div class="text-center font-mono font-light lg:text-2xl">
			{bpmFormatted}
		</div>
	</div>
</div>
