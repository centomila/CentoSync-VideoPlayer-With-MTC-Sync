<script lang="ts">
	import BpmCheckbox from './Bpm-Checkbox.svelte';
	import ElapsedFramesCheckbox from './ElapsedFrames-Checkbox.svelte';
	import MTCTimeCodeCheckbox from './MTCTimeCode-Checkbox.svelte';
	import DAWTimeCodeCheckbox from './DAWTimeCode-Checkbox.svelte';
	import { syncModeIsMTC } from '$lib/stores';
</script>

<div class="py-2">
	<DAWTimeCodeCheckbox />
</div>
{#if $syncModeIsMTC}
	<div class="py-2">
		<MTCTimeCodeCheckbox />
	</div>
{/if}
{#if $syncModeIsMTC}
	<div class="py-2">
		<ElapsedFramesCheckbox />
	</div>
{/if}
{#if !$syncModeIsMTC}
	<div class="py-2">
		<BpmCheckbox />
	</div>
{/if}
