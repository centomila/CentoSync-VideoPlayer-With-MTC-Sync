<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import videojs from 'video.js';
	import type Player from 'video.js/dist/types/player';
	import { loadedFiles } from '$lib/stores';
	import { videoPlayerStore } from '$lib/videoPlayerStore';

	let player: Player | null = null;
	let videoElement: HTMLVideoElement;

	function updatePlayer() {
		if (!player && $loadedFiles.files?.[0]) {
			initializePlayer();
			const videoContainer = document.getElementById('video-container');
			videoContainer?.classList.remove('hidden');
		}

		if (player && $loadedFiles.files?.[0]) {
			player.src({
				src: URL.createObjectURL($loadedFiles.files[0]),
				type: $loadedFiles.files[0].type
			});
			player?.show();
			console.log($loadedFiles.files[0].type);
		}
	}

	// eslint-disable-next-line
	$: $loadedFiles, updatePlayer();

	function initializePlayer() {
		if (videoElement && !player) {
			player = videojs(videoElement, {
				autoSetup: true,
				enableSmoothSeeking: true,
				fill: true,
				responsive: true,
				controls: true,
				muted: true,
				inactivityTimeout: 0,
				sources: [
					{
						src: $loadedFiles.files?.[0] ? URL.createObjectURL($loadedFiles.files[0]) : '',
						type: $loadedFiles.files?.[0]?.type
					}
				]
			});
			videoPlayerStore.setPlayer(player);
		}
	}

	onDestroy(() => {
		if (player && typeof player.dispose === 'function') {
			player.dispose();
			player = null;
			videoPlayerStore.setPlayer(null);
		}
	});

	onMount(() => {
		updatePlayer();
	});
</script>

<!-- svelte-ignore a11y-media-has-caption -->
<div id="video-container" class="mx-auto my-auto w-full">
	<video bind:this={videoElement} id="my-video" class="video-js" preload="auto"></video>
</div>
