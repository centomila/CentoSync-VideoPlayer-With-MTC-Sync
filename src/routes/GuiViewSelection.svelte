<script lang="ts">
	import { guiView } from '$lib/stores';
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
</script>

<RadioGroup class="w-full flex-wrap">
	<RadioItem bind:group={$guiView} name="justify" value="video" class="min-w-16 py-2" title="Show the Video Player"
		><i class="fas fa-film" ></i></RadioItem
	>
	<RadioItem bind:group={$guiView} name="justify" value="info" class="min-w-16 py-2" title="Show technical informations about the loaded video. Even for unsupported formats by the browser or player"
		><i class="fas fa-info"></i></RadioItem
	>
</RadioGroup>
