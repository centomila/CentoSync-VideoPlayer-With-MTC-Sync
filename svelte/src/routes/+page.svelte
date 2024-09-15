<script>
    import { LightSwitch } from '@skeletonlabs/skeleton';
    import { AppBar } from '@skeletonlabs/skeleton';
	import MidiPortSelection from './MidiPortSelection.svelte';
    import MidiTimersCheckbox from './MidiTimersCheckbox.svelte';
    import MidiTimersContainer from './MidiTimersContainer.svelte';
    import Footer from './Footer.svelte';
</script>


<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
    <svelte:fragment slot="lead">
        <span class="text-lg">MTC Display</span>
    </svelte:fragment>
    <svelte:fragment slot="default">
        <div class="flex items-center space-x-2">
            <MidiPortSelection />
            <MidiTimersCheckbox />
        </div>
    </svelte:fragment>
    <svelte:fragment slot="trail">
        <div class="flex items-center justify-end">
            <LightSwitch />
        </div>
    </svelte:fragment>
</AppBar>



<div class="container mx-auto p-8 space-y-8 flex items-center justify-center h-screen">
    <section class="m-auto">
        <MidiTimersContainer />
    </section>
</div>

<div class="footer">
    <Footer />
</div>


<!-- <Header /> -->