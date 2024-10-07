<script>
	import VideoComponent from './rightPane/VideoComponent.svelte';
	import MediaInfoView from './rightPane/MediaInfoView.svelte';
	import { mediaInfoView } from '$lib/stores';
	import { fade } from 'svelte/transition';
</script>

<!-- View video -->
<section
	class="flex max-h-full min-h-full max-w-full items-center justify-items-center shadow-neutral-900"
	transition:fade={{ delay: 0, duration: 150 }}
>
	<VideoComponent />
</section>
