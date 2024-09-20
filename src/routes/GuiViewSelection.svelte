<script lang="ts">
	import { guiView } from '$lib/stores';
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';

	$: $guiView;

	const views = {
		video: 'Video Sync',
		info: 'Info Video'
	};
</script>

<RadioGroup class="w-full flex-wrap">
	<RadioItem bind:group={$guiView} name="justify" value="video" class="min-w-20 py-4"
		><i class="fas fa-2x fa-film"></i></RadioItem
	>
	<RadioItem bind:group={$guiView} name="justify" value="info" class="min-w-20 py-4"
		><i class="fas fa-2x fa-info"></i></RadioItem
	>
</RadioGroup>
