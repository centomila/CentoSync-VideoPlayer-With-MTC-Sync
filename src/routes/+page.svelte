<script>
	import VideoComponent from './VideoComponent.svelte';

	import MediaInfoView from './MediaInfoView.svelte';
	import MidiTimersContainer from './MidiTimersContainer.svelte';
	import { guiView } from '$lib/stores';
</script>

{#if $guiView === 'mtc'}
	<!-- View mtc -->
	<section>
		<MidiTimersContainer />
	</section>
{:else if $guiView === 'video'}
	<!-- View video -->
	<section class="flex h-full w-full items-center justify-items-center bg-black">
		<!-- <h2 class="flex h-50 w-full items-center justify-center">VIDEO PLAYER</h2> -->
		<VideoComponent />
	</section>
{:else if $guiView === 'info'}
	<!-- View info -->
	<section>
		<MediaInfoView format="text" />
	</section>
{/if}
