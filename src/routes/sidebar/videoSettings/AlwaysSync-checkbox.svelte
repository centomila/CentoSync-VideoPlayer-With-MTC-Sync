<script lang="ts">
	import { videoAlwaysSync } from '$lib/stores';

	// eslint-disable-next-line
	$: $videoAlwaysSync;
	const titleHover =
		'If enabled, the video player will force synchronization to the last known time even when the playback is paused. Disable this option if you want to manually scrub through the video';
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
