<script lang="ts">
	import { onMount } from 'svelte';
	import videojs from 'video.js';

	const videoFileTestPath = './Question-Mark.mp4';
  
	onMount(() => {
    
		const player = videojs('my-video', {
			autoSetup: true,
      width: window.parent.innerWidth / 1.2,
      height: window.parent.innerHeight / 1.2,
			enableSmoothSeeking: true,
			fluid: false,
			// aspectRatio: '16:9',
			responsive: true,
			controls: true,
			muted: true,
			sources: [
				{
					src: videoFileTestPath,
					type: 'video/mp4'
				}
			]
		});
	});
</script>

<section class="block">
	<!-- svelte-ignore a11y-media-has-caption -->
	<video id="my-video" class="video-js"  preload="auto"></video>
</section>
