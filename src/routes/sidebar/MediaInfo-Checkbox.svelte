<script lang="ts">
	import { mediaInfoView } from '$lib/stores';

	function scrollToDiv() {
		const div = document.getElementById('mediaInfoView');
		if (div) {
			div.scrollIntoView({ behavior: 'smooth' });
		}
	}
</script>

<label class="flex cursor-pointer items-center">
	<input
		class="checkbox mr-4"
		type="checkbox"
		bind:checked={$mediaInfoView}
		on:change={() => scrollToDiv()}
	/>
	<span>Video File Detailed Info</span>
</label>

<!-- <RadioGroup class="w-full flex-wrap">
	<RadioItem
		bind:group={$guiView}
		name="justify"
		value="video"
		class="min-w-16 py-2"
		title="Show the Video Player"><i class="fas fa-film"></i></RadioItem
	>
	<RadioItem
		bind:group={$guiView}
		name="justify"
		value="info"
		class="min-w-16 py-2"
		title="Show technical informations about the loaded video. Even for unsupported formats by the browser or player"
		><i class="fas fa-info"></i></RadioItem
	>
</RadioGroup> -->
