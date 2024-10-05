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
	items-center
	space-x-2"
>
	<input
		title={titleHover}
		class="checkbox"
		type="checkbox"
		checked={$videoAlwaysSync}
		on:change={() => ($videoAlwaysSync = !$videoAlwaysSync)}
	/>
	<p>Always Sync</p>
</label>
