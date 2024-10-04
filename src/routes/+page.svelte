<script>
	import VideoComponent from './VideoComponent.svelte';
	import MediaInfoView from './MediaInfoView.svelte';
	import { mediaInfoView } from '$lib/stores';
	import { fade } from 'svelte/transition';
</script>

<!-- View video -->
<section
	class="flex max-h-full min-h-full max-w-full items-center justify-items-center shadow-2xl shadow-neutral-950"
	transition:fade={{ delay: 0, duration: 150 }}
>
	<VideoComponent />
</section>
