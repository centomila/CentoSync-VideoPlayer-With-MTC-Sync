<script lang="ts">
	import { videoAlwaysSync } from '$lib/stores';

	// eslint-disable-next-line
	$: $videoAlwaysSync;
	const titleHover =
		'If enabled, the video player will force to synchronize to the last know time even when the playback is paused. Mandatory for DAWs without SysEx messages like FL Studio.';
</script>

<!-- Frontend -->
<label
	title={titleHover}
	class="flex
	cursor-pointer
	items-center"
>
	<input
		title={titleHover}
		class="checkbox mr-4"
		type="checkbox"
		checked={$videoAlwaysSync}
		on:change={() => ($videoAlwaysSync = !$videoAlwaysSync)}
	/>
	<p>Always Sync</p>
</label>
