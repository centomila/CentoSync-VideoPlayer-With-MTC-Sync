<script>
	import ToggleBpm from './tempoComponents/ToggleBpm.svelte';
	import ToggleElapsedFrames from './tempoComponents/ToggleElapsedFrames.svelte';
	import ToggleMidiTimeCode from './tempoComponents/ToggleMidiTimeCode.svelte';
	import ToggleTrackPosition from './tempoComponents/ToggleTrackPosition.svelte';
</script>

<div class="py-2">
	<ToggleTrackPosition />
</div>
<div class="py-2">
	<ToggleMidiTimeCode />
</div>
<div class="py-2">
	<ToggleElapsedFrames />
</div>
<div class="py-2">
	<ToggleBpm />
</div>
