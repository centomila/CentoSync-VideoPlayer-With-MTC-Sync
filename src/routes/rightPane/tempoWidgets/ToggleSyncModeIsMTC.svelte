<script lang="ts">
	import { syncModeIsMTC } from '$lib/stores';
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
</script>

<!-- Frontend -->
<div class="space-y-2">
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
</div>
