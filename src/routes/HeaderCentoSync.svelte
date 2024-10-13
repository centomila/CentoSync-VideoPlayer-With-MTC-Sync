<script lang="ts">
	import { appVersion } from '$lib/stores';
</script>

<header
	class="items-top
		   bg-surface-600-300-token
		   border-surface-300-600-token
		   m-0
		   flex
		   w-full
		   border-b
		   px-2
		   py-2
		   transition-all
		   duration-300
		   hover:invert"
>
	<!-- <i class="fa fa-film pr-4" /> -->
	<div class="flex w-full">
		<img
			src="./logo-horizontal.svg"
			class="mix-blend-hue-rotate h-10 invert filter dark:invert-0"
			alt="test"
		/>
	</div>
	<span
		class="text-secondary-50-900-token font-mono text-xs font-bold opacity-50 transition-all hover:opacity-100"
	>
		{$appVersion}</span
	>
</header>
