<script lang="ts">
	import { appVersion } from '$lib/stores';
</script>

<header
	class="bg-surface-200-700-token
		   
		   
		   m-0
		   flex
		   w-full
		   items-center
		   px-2
		   py-2
		   transition-all
		   duration-300
			hover:shadow-2xl
			hover:brightness-125
			hover:filter"
>
	<!-- <i class="fa fa-film pr-4" /> -->
	<div class="flex w-full">
		<img
			src="./logo-horizontal.svg"
			class="dark:mixed-mode h-8 filter dark:invert"
			alt="CentoSync - Video Player with MTC Sync"
		/>
	</div>
	<span
		class="
		relative
		flex
		h-10
		cursor-none
		items-center
		text-center
		font-mono
		text-xs
		font-bold
		opacity-0
		
		transition-all
		duration-300
		hover:opacity-100
		
		"
	>
		version<br />{$appVersion}</span
	>
</header>
