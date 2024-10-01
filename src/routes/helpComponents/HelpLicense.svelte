<script lang="ts">
	import { appName, appVersion } from '$lib/stores';
	import { TableOfContents, tocCrawler } from '@skeletonlabs/skeleton';
</script>

<div class="space-y-8 p-8" use:tocCrawler={{ mode: 'generate' }}>
	<h2 class="h2 mb-4">License</h2>
	<TableOfContents />
	<p>
		<b>{$appName}</b> is released under the MIT License, an open-source license that allows you to freely
		use, modify, and distribute the software, provided that proper attribution is given.
	</p>
	<h3 class="h3 mb-4">MIT License</h3>
	<p>
		<strong>Copyright © {new Date().getFullYear()}, Centomila</strong>
	</p>
	<p>
		Permission is hereby granted, free of charge, to any person obtaining a copy of this software
		and associated documentation files (the "Software"), to deal in the Software without
		restriction, including without limitation the rights to use, copy, modify, merge, publish,
		distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the
		Software is furnished to do so, subject to the following conditions:
	</p>
	<p>
		The above copyright notice and this permission notice shall be included in all copies or
		substantial portions of the Software.
	</p>
	<p>
		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
		BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
		NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
		DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
	</p>
	<h3 class="h3 mb-4">Third-Party Libraries</h3>
	<p>
		<b>{$appName}</b> uses the following third-party libraries. Each library is licensed under its own
		terms as described below:
	</p>
	<ul class="list-inside">
		<li class="mb-8 list-item border-b border-surface-300 pb-8">
			<h4 class="h4">WebMidi.js</h4>
			<br />
			Website:
			<a href="https://webmidijs.org/" target="_blank" class="anchor">https://webmidijs.org/</a>
			<br />
			<p>
				License: <a
					href="https://www.apache.org/licenses/LICENSE-2.0"
					target="_blank"
					class="anchor">Apache License 2.0</a
				>
			</p>
		</li>
		<li class="mb-8 list-item border-b border-surface-300 pb-8">
			<h4 class="h4">MediaInfo.js</h4>
			<br />
			Website:
			<a href="https://mediainfo.js.org/" target="_blank" class="anchor"
				>https://mediainfo.js.org/</a
			>
			<br />
			<p>
				License: <a
					href="https://opensource.org/licenses/BSD-2-Clause"
					target="_blank"
					class="anchor">BSD 2-Clause License</a
				>
			</p>
		</li>
		<li class="mb-8 list-item border-b border-surface-300 pb-8">
			<h4 class="h4">Video.js</h4>
			<br />
			Website:
			<a href="https://videojs.com/" target="_blank" class="anchor">https://videojs.com/</a>
			<br />
			<p>
				License: <a
					href="https://www.apache.org/licenses/LICENSE-2.0"
					target="_blank"
					class="anchor">Apache License 2.0</a
				>
			</p>
		</li>
		<li class="mb-8 list-item border-b border-surface-300 pb-8">
			<h4 class="h4">Skeleton</h4>
			<br />
			Website:
			<a href="https://www.skeleton.dev/" target="_blank" class="anchor"
				>https://www.skeleton.dev/</a
			>
			<br />
			<p>
				License: <a href="https://opensource.org/licenses/MIT" target="_blank" class="anchor"
					>MIT License</a
				>
			</p>
		</li>
		<li class="mb-8 list-item border-b border-surface-300 pb-8">
			<h4 class="h4">Svelte</h4>
			<br />
			Website: <a href="https://svelte.dev/" target="_blank" class="anchor">https://svelte.dev/</a>
			<br />
			<p>
				License: <a href="https://opensource.org/licenses/MIT" target="_blank" class="anchor"
					>MIT License</a
				>
			</p>
		</li>
		<li class="mb-8 list-item border-b border-surface-300 pb-8">
			<h4 class="h4">SvelteKit</h4>
			<br />
			Website:
			<a href="https://kit.svelte.dev/" target="_blank" class="anchor">https://kit.svelte.dev/</a>
			<br />
			<p>
				License: <a href="https://opensource.org/licenses/MIT" target="_blank" class="anchor"
					>MIT License</a
				>
			</p>
		</li>
		<li class="mb-8 list-item border-b border-surface-300 pb-8">
			<h4 class="h4">Font Awesome Free</h4>
			<br />
			Website:
			<a href="https://fontawesome.com/" target="_blank" class="anchor">https://fontawesome.com/</a>
			<br />
			<p>
				License: <a href="https://fontawesome.com/license/free" target="_blank" class="anchor"
					>CC BY 4.0 License</a
				>
			</p>
		</li>
	</ul>
	<h3 class="h3 mb-4">Attribution</h3>
	<p>
		A big thank you to all the developers and maintainers of the above libraries for their
		contributions to the open-source community. For more detailed information about each license,
		please visit the respective links provided.
	</p>
	<h3 class="h3 mb-4">Trademarks</h3>
	<p>
		These product names and their respective logos are trademarks or registered trademarks of their
		respective owners:
	</p>
	<ul class="list-inside list-disc space-y-2">
		<li>Ableton and Ableton Live are registered trademarks of Ableton AG.</li>
		<li>Bitwig and Bitwig Studio are trademarks of Bitwig GmbH.</li>
		<li>Reason is a registered trademark of Reason Studios AB.</li>
		<li>Maschine and Maschine 2 are registered trademarks of Native Instruments GmbH.</li>
	</ul>
	<p>
		<b>{$appName}</b> is an independent project and is not affiliated with, endorsed by, sponsored by,
		or in any way officially connected with Ableton AG, Bitwig GmbH, Reason Studios AB, or Native Instruments
		GmbH.
	</p>
	<p>
		All product names, logos, and brands mentioned are property of their respective owners and are
		used solely for identification purposes. Use of these names, logos, and brands does not imply
		endorsement.
	</p>
</div>
