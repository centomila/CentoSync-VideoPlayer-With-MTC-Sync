<script lang="ts">
	import { syncModeIsMTC, alternativeMTCStartStop } from '$lib/stores';
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	const titleHover =
		'If enabled, the video player will start and stop when notice a change in the MTC Timer. This is necessary for DAWs without Start/Stop messages in MTC Mode like FL Studio.';
</script>

<!-- Frontend -->
<div class="w-full space-y-2">
	<div class="flex w-full justify-between">
		<label class="title text-bold text-left" for="midi-inputs">Sync Mode </label>
		<!-- <button class="btn-primary variant-filled btn-icon max-h-5 max-w-5" title="Help"
			><i class="fa fa-2xs fa-question"></i></button
		> -->
	</div>
	<RadioGroup display="flex" flexDirection="flex-row" gap="gap-0" padding="p-0">
		<RadioItem
			bind:group={$syncModeIsMTC}
			name="justify"
			value={true}
			class="min-w-16 py-1"
			title="MIDI TimeCode (MTC)">MTC</RadioItem
		>
		<RadioItem
			bind:group={$syncModeIsMTC}
			name="justify"
			value={false}
			class="min-w-16 py-1"
			title="Song Position Pointer (SPP)">SPP</RadioItem
		>
	</RadioGroup>
	{#if $syncModeIsMTC}
		<label
			title={titleHover}
			class="flex
	cursor-pointer
	items-center
	pt-1"
		>
			<input
				title={titleHover}
				class="checkbox mr-4"
				type="checkbox"
				checked={$alternativeMTCStartStop}
				on:change={() => ($alternativeMTCStartStop = !$alternativeMTCStartStop)}
			/>
			<p>Alternative Start/Stop</p>
		</label>
	{/if}
</div>
