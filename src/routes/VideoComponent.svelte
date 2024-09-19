<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import videojs from 'video.js';
	import type Player from 'video.js/dist/types/player';
	import { loadedFiles } from '$lib/stores';

	$: $loadedFiles;

	let player: Player | null = null;
	let videoElement: HTMLVideoElement;
	let playerWidth: number;
	let playerHeight: number;

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
				type: $loadedFiles.files[0].type,
				width: playerWidth,
				height: playerHeight
			});
			player?.show();
			console.log($loadedFiles.files[0].type);
		}
	}

	$: $loadedFiles, updatePlayer();

	function initializePlayer() {
		if (videoElement && !player) {
			player = videojs(videoElement, {
				// poster: $loadedFiles.files?.[0] ? URL.createObjectURL($loadedFiles.files[0]) : '',
				autoSetup: false,
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

	function updatePlayerSize() {
		playerWidth =
		document.body.scrollWidth
		
		playerHeight =
		document.body.scrollHeight -
		(document.querySelector('header')?.clientHeight || 0) -
		(document.querySelector('footer')?.clientHeight || 0);
		
		player?.width(playerWidth);
		player?.height(playerHeight);
	}
	
	let videoContainer: HTMLElement;
	onMount(() => {
	 videoContainer = document.getElementById('video-container') as HTMLElement;

	 updatePlayer();
		updatePlayerSize();
		window.addEventListener('resize', updatePlayerSize);
	});
</script>

<!-- svelte-ignore a11y-media-has-caption -->
<div id="video-container" style="width: {playerWidth}; height: {playerHeight};">
	<video
		bind:this={videoElement}
		id="my-video"
		class="video-js"
		width={playerWidth}
		height={playerHeight}
	></video>
</div>
