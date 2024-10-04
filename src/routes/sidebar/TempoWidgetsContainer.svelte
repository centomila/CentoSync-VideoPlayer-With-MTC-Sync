<script lang="ts">
	import BpmDiv from '../tempoComponents/BpmDiv.svelte';
	import TrackPositionDiv from '../tempoComponents/TrackPositionDiv.svelte';
	import MidiTimeCodeDiv from '../tempoComponents/MidiTimeCodeDiv.svelte';
	import ElapsedFramesDiv from '../tempoComponents/ElapsedFramesDiv.svelte';
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

<div class={gridCols > 0 ? 'flex flex-grow justify-center border-surface-300-600-token border-t ' : 'flex flex-grow justify-center border-surface-300-600-token'}>
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
