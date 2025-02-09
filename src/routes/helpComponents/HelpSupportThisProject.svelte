<script lang="ts">
	import { TableOfContents, tocCrawler } from '@skeletonlabs/skeleton';
	import { appName } from '$lib/stores';
</script>

<div class="space-y-8 p-8 text-justify" use:tocCrawler={{ mode: 'generate' }}>
	<TableOfContents />

	<div>
		<h2 class="h2 mb-4">Support This Project</h2>
		<p>
			First of all, thank you so much for visiting this page. Your support truly means the world to
			me.
		</p>
	</div>

	<hr />

	<div class="space-y-4">
		<h3 class="h3">
			<span><span class="fab fa-github pr-4" aria-hidden="true"></span>Contribute to the Code</span>
		</h3>
		<p>
			<b>{$appName}</b> is open source! If you find a bug, please report it. And if you have ideas for
			improving the code, feel free to fork the GitHub repository and submit a pull request.
		</p>
	</div>

	<hr />

	<div class="space-y-4">
		<h3 class="h3">
			<span><span class="fas fa-heart pr-4" aria-hidden="true"></span>Support My Work</span>
		</h3>
		<p>
			If you find CentoSync useful, consider supporting me on Patreon! If it's not within your
			budget, no worries at all. Your support in any form is already more than enough!
		</p>

		<button
			class="variant-filled-primary btn w-full"
			on:click={() => {
				window.open('https://patreon.com/Centomila', '_blank');
			}}>patreon.com/Centomila</button
		>
	</div>
	<hr />
	<div class="space-y-4">
		<h3 class="h3">
			<span><span class="fas fa-music pr-4" aria-hidden="true"></span>Checkout My Music</span>
		</h3>
		<p>
			Whether you love it or not, give my music a listen—someone out there enjoys it! You can check
			it out here:
		</p>
		<p>
			<a href="https://centomila.com/music/" target="_blank" class="anchor"
				>https://centomila.com/music/</a
			><br />
		</p>
		<p>
			<i
				>My personal favorite is the album <a
					href="https://centomila.com/music/music-for-annoyed-robots/"
					target="_blank"
					class="anchor">Music For Annoyed Robots</a
				>.</i
			>
		</p>
		<p>
			My music is also available for purchase on <a
				href="https://centomila.bandcamp.com/music"
				target="_blank"
				class="anchor">Bandcamp</a
			>
			(full discography) and
			<a href="https://www.beatport.com/artist/centomila/1136112" target="_blank" class="anchor"
				>Beatport</a
			> (techno tracks only).
		</p>
	</div>
	<hr />
	<div class="space-y-4">
		<h3 class="h3">
			<span><span class="fas fa-heart pr-4" aria-hidden="true"></span>Send me a message</span>
		</h3>
		<p>
			I love hearing from real people! If you are not a spammy bot, feel free to drop me an email—I
			promise to get back to you as soon as I can 😉.<br />
			You can reach me here:
			<a href="https://centomila.com/contact/" target="_blank" class="anchor"
				>https://centomila.com/contact/</a
			>.
		</p>
	</div>
</div>
