<script lang="ts">
	import BpmDiv from './tempoComponents/BpmDiv.svelte';
	import TrackPositionDiv from './tempoComponents/TrackPositionDiv.svelte';
	import MidiTimeCodeDiv from './tempoComponents/MidiTimeCodeDiv.svelte';
	import ElapsedFramesDiv from './tempoComponents/ElapsedFramesDiv.svelte';
	import { sppChecked } from '../lib/stores';
</script>

<div class="text-center">
	<hr class="mb-4 w-full border-t border-gray-300" />
	<TrackPositionDiv />
	{#if $sppChecked}
		<hr class="my-4 border-t border-gray-300" />
		<BpmDiv />
	{/if}
	<hr class="my-4 border-t border-gray-300" />
	<MidiTimeCodeDiv />
	<hr class="my-4 w-full border-t border-gray-300" />
	<ElapsedFramesDiv />
	<hr class="my-4 w-full border-t border-gray-300" />
</div>
