<script lang="ts">
	import { Lightbox } from 'svelte-lightbox';

	export let imgSrc = '';
	export let imgAlt = '';
</script>

<Lightbox transitionDuration={100}>
	<div
		class="transition:ease-in-out
        transition:duration-300
        bg-surface-50-900-token
        w-full rounded
        p-1
        transition-all
        hover:brightness-110
        hover:filter
        hover:transition-all"
	>
		<img src={imgSrc} alt={imgAlt} title={imgAlt} class="block w-full" />
		<span class="block p-2 text-center">{imgAlt}</span>
	</div>
</Lightbox>
