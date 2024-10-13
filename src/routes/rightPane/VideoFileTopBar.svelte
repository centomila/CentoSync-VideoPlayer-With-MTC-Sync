<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import videojs from 'video.js';
	import type Player from 'video.js/dist/types/player';
	import { loadedFiles } from '$lib/stores';

	import SelectVideoFile from '../sidebar/LoadVideoFileInput.svelte';
	import { videoPlayerStore } from '$lib/videoPlayerStore';
	import { mediaInfoView } from '$lib/stores';
	import SidebarToggle from '../sidebar/SidebarToggle.svelte';

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

<div class="border-surface-300-600-token flex w-full items-center shadow-2xl border-b">
	<div id="hideSidebarBtn">
		<SidebarToggle />
	</div>
	<SelectVideoFile />
	<button
		on:click={() => ($mediaInfoView = !$mediaInfoView)}
		class="
	        min-w-16
	        cursor-pointer
	        rounded-none
	        border-0
	        px-6
	        py-4
	        shadow-2xl
	{$mediaInfoView
			? 'variant-filled-primary opacity-100 hover:variant-filled-secondary'
			: 'variant-glass-surface opacity-50 hover:variant-filled-primary'}
			
			transition-all
			duration-300
			hover:opacity-100"
		title={$mediaInfoView ? 'Hide Video File Detailed Info' : 'Show Video File Detailed Info'}
	>
		{#if $mediaInfoView}<i class="fas fa-info-circle" />{:else}<i class="fas fa-info" />{/if}
	</button>
</div>
