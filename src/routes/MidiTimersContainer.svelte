<script lang="ts">
	import BpmDiv from './tempoComponents/BpmDiv.svelte';
	import TrackPositionDiv from './tempoComponents/TrackPositionDiv.svelte';
	import MidiTimeCodeDiv from './tempoComponents/MidiTimeCodeDiv.svelte';
	import ElapsedFramesDiv from './tempoComponents/ElapsedFramesDiv.svelte';
	import {
		bpmComponent,
		midiTimecodeComponent,
		elapsedFramesComponent,
		trackPositionComponent
	} from '$lib/stores';

	$: enabledComponents = [
		$trackPositionComponent,
		$bpmComponent,
		$midiTimecodeComponent,
		$elapsedFramesComponent
	].filter(Boolean);

	$: gridCols = enabledComponents.length;
</script>

<div
	class="flex-col w-full justify-center pb-4 text-center"
>
	{#if $trackPositionComponent}
		<div class="border-b border-surface-300-600-token py-4 last:border-b-0">
			<TrackPositionDiv />
		</div>
	{/if}
	{#if $bpmComponent}
		<div class="border-b border-surface-300-600-token py-4 last:border-b-0">
			<BpmDiv />
		</div>
	{/if}
	{#if $midiTimecodeComponent}
		<div class="border-b border-surface-300-600-token py-4 last:border-b-0">
			<MidiTimeCodeDiv />
		</div>
	{/if}
	{#if $elapsedFramesComponent}
		<div class="border-b border-surface-300-600-token py-4 last:border-b-0">
			<ElapsedFramesDiv />
		</div>
	{/if}
</div>
