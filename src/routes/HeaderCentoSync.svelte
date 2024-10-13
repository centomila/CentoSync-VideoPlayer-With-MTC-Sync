<script lang="ts">
	import { appVersion } from '$lib/stores';
</script>

<header
	class="bg-surface-600-300-token
		   border-surface-300-600-token
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
			class="h-8 invert filter dark:mix-blend-multiply dark:invert-0"
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
		invert
		transition-all
		duration-300
		hover:opacity-100
		
		"
	>
		version<br />{$appVersion}</span
	>
</header>
