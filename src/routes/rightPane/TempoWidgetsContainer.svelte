<script lang="ts">
	import BpmDiv from './tempoWidgets/BpmDiv.svelte';
	import TrackPositionDiv from './tempoWidgets/TrackPositionDiv.svelte';
	import MidiTimeCodeDiv from './tempoWidgets/MidiTimeCodeDiv.svelte';
	import ElapsedFramesDiv from './tempoWidgets/ElapsedFramesDiv.svelte';
	import {
		bpmComponent,
		midiTimecodeComponent,
		elapsedFramesComponent,
		trackPositionComponent
	} from '$lib/stores';

	import { fade } from 'svelte/transition';

	$: enabledComponents = [
		$trackPositionComponent,
		$bpmComponent,
		$midiTimecodeComponent,
		$elapsedFramesComponent
	].filter(Boolean);

	$: gridCols = enabledComponents.length;
	$: divClassess = () => {
		if (gridCols === 1 || gridCols === 2) {
			return 'border-surface-300-600-token flex-auto max-w-md border-r first:border-l-0 last:border-r-0 py-2 lg:px-4';
		} else {
			return 'border-surface-300-600-token flex-auto max-w-md border-r first:border-l-0 last:border-r-0 py-2 lg:px-4';
		}
	};
</script>

<div
	class={gridCols > 0
		? 'border-surface-300-600-token flex flex-grow justify-center border-t variant-glass-surface'
		: 'border-surface-300-600-token flex flex-grow justify-center'}
>
	{#if $midiTimecodeComponent}
		<div class={divClassess()} transition:fade={{ delay: 0, duration: 150 }}>
			<MidiTimeCodeDiv />
		</div>
	{/if}
	{#if $elapsedFramesComponent}
		<div class={divClassess()} transition:fade={{ delay: 0, duration: 150 }}>
			<ElapsedFramesDiv />
		</div>
	{/if}
	{#if $trackPositionComponent}
		<div class={divClassess()} transition:fade={{ delay: 0, duration: 150 }}>
			<TrackPositionDiv />
		</div>
	{/if}
	{#if $bpmComponent}
		<div class={divClassess()} transition:fade={{ delay: 0, duration: 150 }}>
			<BpmDiv />
		</div>
	{/if}
</div>
