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
	$: divClassess = () => {
		if (gridCols === 1 || gridCols === 2) {
			return 'border-surface-300-600-token flex-auto max-w-md first:border-l border-r py-2 lg:px-4';
		} else {
			return 'border-surface-300-600-token flex-auto max-w-md border-r py-2 lg:px-4';
		}
	};
</script>

<div class="border-surface-300-600-token flex flex-grow justify-center border-t">
	{#if $trackPositionComponent}
		<div class="{divClassess()}">
			<TrackPositionDiv />
		</div>
	{/if}
	{#if $midiTimecodeComponent}
		<div class={divClassess()}>
			<MidiTimeCodeDiv />
		</div>
	{/if}
	{#if $elapsedFramesComponent}
		<div class={divClassess()}>
			<ElapsedFramesDiv />
		</div>
	{/if}
	{#if $bpmComponent}
		<div class={divClassess()}>
			<BpmDiv />
		</div>
	{/if}
</div>
