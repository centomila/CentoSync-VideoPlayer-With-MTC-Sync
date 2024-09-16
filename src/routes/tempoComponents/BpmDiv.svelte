<script lang="ts">
	import { bpm } from '../../lib/stores';

	$: bpmFormatted = $bpm;
</script>

<h3 class="mb-8 font-extrabold">BPM</h3>
<div class="grid grid-cols-1 gap-2">
	<div class="text-center font-mono font-light">{bpmFormatted}</div>
</div>
