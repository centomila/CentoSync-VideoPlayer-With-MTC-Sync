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

<div class="border-surface-300-600-token flex flex-grow justify-center border-t">
	{#if $trackPositionComponent}
		<div class="border-surface-300-600-token flex-grow border-r py-2 lg:px-4">
			<TrackPositionDiv />
		</div>
	{/if}
	{#if $midiTimecodeComponent}
		<div class="border-surface-300-600-token flex-grow border-r py-2 lg:px-4">
			<MidiTimeCodeDiv />
		</div>
	{/if}
	{#if $elapsedFramesComponent}
		<div class="border-surface-300-600-token flex-grow border-r py-2 lg:px-4">
			<ElapsedFramesDiv />
		</div>
	{/if}
	{#if $bpmComponent}
		<div class="border-surface-300-600-token flex-grow border-r py-2 lg:px-4">
			<BpmDiv />
		</div>
	{/if}
</div>
