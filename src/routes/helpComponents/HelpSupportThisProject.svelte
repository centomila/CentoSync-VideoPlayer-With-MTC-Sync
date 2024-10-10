<script lang="ts">
	import { appName } from '$lib/stores';
	import { TableOfContents, tocCrawler } from '@skeletonlabs/skeleton';
</script>

<div class="space-y-8 p-8" use:tocCrawler={{ mode: 'generate' }}>
	<h2 class="h2 mb-4">Support This Project</h2>
	<TableOfContents />

	<p>
		First of all, thank you so much for visiting this page. Your support truly means the world to
		me.
	</p>

	<h3 class="h3 mb-4">Contribute to the Code</h3>
	<p>
		<b>{$appName}</b> is open source! If you find a bug, please report it. And if you have ideas for
		improving the code, feel free to fork the GitHub repository and submit a pull request.
	</p>
	<hr />

	<h3 class="h3 mb-4">Donate a Little</h3>
	<p>
		If you're able to donate, I'd greatly appreciate it! If it's not within your budget, no worries
		at all—your support in any form is already more than enough.
	</p>
	<p>
		To make a donation, visit my <i>Buy Me a Coffee</i> page:
		<a href="https://buymeacoffee.com/centomila" target="_blank" class="anchor"
			>https://buymeacoffee.com/centomila</a
		>
	</p>

	<button
		class="bg-primary-50-900-token btn w-full"
		on:click={() => {
			window.open('https://buymeacoffee.com/centomila', '_blank');
		}}>Buy Me A Coffee</button
	>
	<hr />

	<h3 class="h3 mb-4">Check Out My Music</h3>
	<p>
		Whether you love it or not, give my music a listen—someone out there enjoys it! You can check it
		out here: <a href="https://centomila.com/music/" target="_blank" class="anchor"
			>https://centomila.com/music/</a
		><br />
		<i
			>My personal favorite is <a
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
	<hr />

	<h3 class="h3 mb-4">Send Me an Email</h3>
	<p>
		I really dislike spam, but I love hearing from real people! Feel free to drop me an email—I
		promise to get back to you as soon as I can 😉.<br />
		You can reach me here:
		<a href="https://centomila.com/contact/" target="_blank" class="anchor"
			>https://centomila.com/contact/</a
		>.
	</p>
</div>
