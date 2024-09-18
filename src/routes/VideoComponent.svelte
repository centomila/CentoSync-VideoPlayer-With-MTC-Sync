<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import videojs from 'video.js';
	import type Player from 'video.js/dist/types/player';
	import { loadedFiles } from '$lib/stores';

	$: $loadedFiles;


	const defaultVideo = './Question-Mark.mp4';

	let player: Player | null = null;
	let videoElement: HTMLVideoElement;

	function updatePlayer() {
		if (player && $loadedFiles.files?.[0]) {
			player.src({
				src: URL.createObjectURL($loadedFiles.files[0]),
				type: $loadedFiles.files[0].type
			});
			console.log($loadedFiles.files[0].type);
		}
	}

	$: $loadedFiles, updatePlayer();

	function initializePlayer() {
		if (videoElement && !player) {
			player = videojs(videoElement, {
				autoSetup: true,
				width: window.parent.innerWidth / 1.2,
				height: window.parent.innerHeight / 1.2,
				enableSmoothSeeking: true,
				responsive: true,
				controls: true,
				muted: true,
				sources: [
					{
						src: $loadedFiles.files?.[0] ? URL.createObjectURL($loadedFiles.files[0]) : defaultVideo,
						type: $loadedFiles.files?.[0]?.type || 'video/mp4'
					}
				]
			});
		}
	}

	onMount(() => {
		initializePlayer();
	});

	onDestroy(() => {
		if (player && typeof player.dispose === 'function') {
			player.dispose();
			player = null;
		}
	});
</script>

<section class="block">
	<!-- svelte-ignore a11y-media-has-caption -->
	<video bind:this={videoElement} id="my-video" class="video-js" preload="auto">
	</video>
</section>