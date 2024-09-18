<script lang="ts">
	import { onMount } from 'svelte';
    import { guiView } from '$lib/stores';
    
    $: $guiView;
    
    function setGuiView(event: Event) {
        guiView.update(() => (event.target as HTMLButtonElement).value);
    }

    const views = {
        mtc: 'MTC',
        video: 'Video Sync',
        info: 'Info Video',
    };

</script>
<div class="btn-group variant-filled ">
    {#each Object.entries(views) as [key, value]}
        <button
            class={$guiView === key ? "variant-filled-primary hover:variant-soft-primary w-40" : "variant-filled hover:variant-soft w-40"}
            value={key}
            on:click={setGuiView}
        >
            {value}
        </button>
    {/each}
</div>

