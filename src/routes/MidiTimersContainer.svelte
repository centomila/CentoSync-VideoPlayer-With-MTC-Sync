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
	class="flex flex-grow justify-center border-t border-surface-300-600-token"
>
	{#if $trackPositionComponent}
		<div class="flex-grow border-r border-surface-300-600-token py-4 ">
			<TrackPositionDiv />
		</div>
	{/if}
	{#if $midiTimecodeComponent}
	<div class="flex-grow border-r border-surface-300-600-token py-4 ">
		<MidiTimeCodeDiv />
	</div>
	{/if}
	{#if $elapsedFramesComponent}
	<div class="flex-grow border-r border-surface-300-600-token py-4 ">
		<ElapsedFramesDiv />
	</div>
	{/if}
	{#if $bpmComponent}
		<div class="flex-grow border-r border-surface-300-600-token py-4 ">
			<BpmDiv />
		</div>
	{/if}
</div>
