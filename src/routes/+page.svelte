<script>
	import VideoComponent from './rightPane/VideoComponent.svelte';
	import VideoFileTopBar from './rightPane/VideoFileTopBar.svelte';
	import MediaInfoView from './rightPane/MediaInfoView.svelte';
	import MidiTimersContainer from './rightPane/TempoWidgetsContainer.svelte';
	import { mediaInfoView } from '$lib/stores';
	import { fade } from 'svelte/transition';
</script>

<!-- View video -->
<section
	class="flex max-h-full min-h-full max-w-full flex-col shadow-neutral-900"
	transition:fade={{ delay: 0, duration: 150 }}
>
	<VideoFileTopBar />
	<VideoComponent />
	<MidiTimersContainer />

	<div
		id="mediaInfoView"
		class:hidden={!$mediaInfoView}
		transition:fade={{ delay: 0, duration: 150 }}
	>
		<!-- View info -->
		<section>
			<MediaInfoView format="text" />
		</section>
	</div>
</section>
