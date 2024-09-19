<script lang="ts">
	import { guiView } from '$lib/stores';
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';

	$: $guiView;

	const views = {
		video: 'Video Sync',
		info: 'Info Video'
	};
</script>

<RadioGroup>
	<RadioItem bind:group={$guiView} name="justify" value="video"><i class="fas fa-film"></i></RadioItem>
	<RadioItem bind:group={$guiView} name="justify" value="info"><i class="fas fa-info"></i></RadioItem>
</RadioGroup>
