<script lang="ts">
	import { appName, appVersion } from '$lib/stores';
	import { TableOfContents, tocCrawler } from '@skeletonlabs/skeleton';
</script>

<div class="space-y-8 p-8" use:tocCrawler={{ mode: 'generate' }}>
	<h2 class="h2 mb-4">Privacy Policy</h2>
	<TableOfContents />

	<p>{$appName} respects your privacy and does not collect, store, or share any personal data.</p>

	<h3 class="h3 mb-4">Data Collection</h3>
	<p>
		{$appName} do not collect any personally identifiable information (PII) or any data that can be linked
		to an individual. Your usage of {$appName} is completely anonymous.
	</p>

	<h3 class="h3 mb-4">Local Storage</h3>
	<p>
		The only information stored locally on your device is your selected theme preference. This is
		stored in your browser's local storage to ensure that your visual preferences are saved between
		sessions. Local storage is specific to your device and browser, and this data is not transmitted
		to any servers or third parties.
	</p>

	<h3 class="h3 mb-4">No Third-Party Services</h3>
	<p>
		{$appName} does not integrate with any third-party services that could collect or process your data.
		This means no social media trackers, no embedded analytics tools, and no third-party cookies.
	</p>

	<h3 class="h3 mb-4">Changes to This Policy</h3>
	<p>
		Should we ever update this privacy policy, we will notify users of the changes within the app.
		However, the core principle of not collecting personal data will always remain unchanged.
	</p>
</div>
