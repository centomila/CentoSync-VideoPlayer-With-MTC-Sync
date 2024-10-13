<script lang="ts">
	import { appName } from '$lib/stores';
	import { TableOfContents, tocCrawler } from '@skeletonlabs/skeleton';
</script>

<div class="space-y-8 p-8" use:tocCrawler={{ mode: 'generate' }}>
	<h2 class="h2 mb-4">Privacy Policy</h2>
	<TableOfContents />

	<p>{$appName} respects your privacy and does not collect or share any data.</p>

	<h3 class="h3 mb-4">Data Collection</h3>
	<p>
		{$appName} do not collect any personally identifiable information (PII) or any data that can be linked
		to an individual. Your usage of {$appName} is completely anonymous.
	</p>

	<h3 class="h3 mb-4">Local Storage</h3>
	<p>
		When the user press the SAVE button, settings will be store in the Browser's Local Storage. The
		saved settings are:
	</p>
	<ul class="list-inside list-disc">
		<li>Video Player Offset Time</li>
		<li>MIDI Settings</li>
		<li>Current Theme</li>
	</ul>

	<h3 class="h3 mb-4">No Third-Party Services</h3>
	<p>
		{$appName} does not integrate with any third-party services that could collect or process your data.
		This means no social media trackers, no embedded analytics tools, and no third-party cookies.
	</p>
	<p>
		<strong>Disclaimer:</strong>
		{$appName} is not responsible for the content, privacy practices, or security of any third-party
		websites linked in the help section. Users access these external websites at their own risk.
	</p>
</div>
