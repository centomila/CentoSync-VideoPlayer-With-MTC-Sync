<script lang="ts">
	import ToggleBpm from './tempoComponents/ToggleBpm.svelte';
	import ToggleElapsedFrames from './tempoComponents/ToggleElapsedFrames.svelte';
	import ToggleMidiTimeCode from './tempoComponents/ToggleMidiTimeCode.svelte';
	import ToggleTrackPosition from './tempoComponents/ToggleTrackPosition.svelte';
	import ToggleSyncModeIsMTC from './tempoComponents/ToggleSyncModeIsMTC.svelte';
	import {syncModeIsMTC} from '$lib/stores';
</script>

<div class="py-2">
	<ToggleSyncModeIsMTC />
</div>
<div class="py-2">
	<ToggleTrackPosition />
</div>
{#if $syncModeIsMTC}
<div class="py-2">
	<ToggleMidiTimeCode />
</div>
{/if}
{#if $syncModeIsMTC}
<div class="py-2">
	<ToggleElapsedFrames />
</div>
{/if}
{#if !$syncModeIsMTC}
<div class="py-2">
	<ToggleBpm />
</div>
{/if}
