<script lang="ts">
	import { syncModeIsMTC, alternativeMTCStartStop } from '$lib/stores';
	const titleHover =
		'If enabled, the video player will start and stop when notice a change in the MTC Timer. This is necessary for DAWs without Start/Stop messages in MTC Mode like FL Studio.';
</script>

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
