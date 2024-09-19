<script lang="ts">
	import BpmDiv from './tempoComponents/BpmDiv.svelte';
	import TrackPositionDiv from './tempoComponents/TrackPositionDiv.svelte';
	import MidiTimeCodeDiv from './tempoComponents/MidiTimeCodeDiv.svelte';
	import ElapsedFramesDiv from './tempoComponents/ElapsedFramesDiv.svelte';
	import { sppChecked } from '../lib/stores';
</script>

<div class="flex min-h-screen items-center justify-center">
	<div class="mx-auto max-w-screen-lg">
		<div class="text-center text-5xl">
			<TrackPositionDiv />
			{#if $sppChecked}
				<hr class="my-16 border-t border-gray-300" />
				<BpmDiv />
			{/if}
			<hr class="my-16 border-t border-gray-300" />
			<MidiTimeCodeDiv />
			<hr class="my-16 w-full border-t border-gray-300" />
			<ElapsedFramesDiv />
		</div>
	</div>
</div>
