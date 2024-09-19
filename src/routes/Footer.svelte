<script lang="ts">
	import SelectVideoFile from './SelectVideoFile.svelte';
	import { guiView } from '$lib/stores';
</script>

<div id="copyright" class="flex items-center justify-between text-xs">
	<p class="text-lg font-extrabold">MTC Display</p>
	{#if $guiView === 'info' || $guiView === 'video'}
		<SelectVideoFile />
	{/if}

	<p class="font-semibold">
		Made with ❤️ by <a
			target="_blank"
			href="https://centomila.com"
			class="text-blue-500 hover:underline">Centomila</a
		>
	</p>
</div>
