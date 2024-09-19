<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import videojs from 'video.js';
	import type Player from 'video.js/dist/types/player';
	import { loadedFiles } from '$lib/stores';

	$: $loadedFiles;

	let player: Player | null = null;
	let videoElement: HTMLVideoElement;

	function updatePlayer() {
		// if player don't exist, initialize
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

	$: $loadedFiles, updatePlayer();

	function initializePlayer() {
		if (videoElement && !player) {
			player = videojs(videoElement, {
				autoSetup: false,
				height:
					document.body.clientHeight -
					(document.querySelector('header')?.clientHeight || 0) -
					(document.querySelector('footer')?.clientHeight || 0),
				preload: 'auto',
				liveui: true,
				enableSmoothSeeking: true,
				responsive: true,
				autoplay: false,
				controls: true,
				muted: true,
				fluid: false,
				sources: [
					{
						src: $loadedFiles.files?.[0] ? URL.createObjectURL($loadedFiles.files[0]) : '',
						type: $loadedFiles.files?.[0]?.type
					}
				]
			});
		}
	}

	onDestroy(() => {
		if (player && typeof player.dispose === 'function') {
			player.dispose();
			player = null;
		}
	});

	onMount(() => {
		updatePlayer();
		window.addEventListener('resize', updatePlayer);
	});
</script>

<!-- svelte-ignore a11y-media-has-caption -->
<div id="video-container" class="hidden">
	<video bind:this={videoElement} id="my-video" class="video-js"></video>
</div>
