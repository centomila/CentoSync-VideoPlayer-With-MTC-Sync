<script>
	import VideoComponent from './VideoComponent.svelte';
	import MediaInfoView from './MediaInfoView.svelte';
	import { guiView } from '$lib/stores';
</script>

{#if $guiView === 'video'}
	<!-- View video -->
	<section class="flex  max-w-full items-center justify-items-center  min-h-full max-h-full bg-black">
		<!-- <h2 class="flex h-50 w-full items-center justify-center">VIDEO PLAYER</h2> -->
		<VideoComponent />
	</section>
{:else if $guiView === 'info'}
	<!-- View info -->
	<section>
		<MediaInfoView format="text" />
	</section>
{/if}
