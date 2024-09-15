<script>
    import { LightSwitch } from '@skeletonlabs/skeleton';
						
    // import Header from './Header.svelte';
    import MidiTimecodeMain from './MidiTimecodeMain.svelte';
    import Footer from './Footer.svelte';
</script>

<nav><LightSwitch /></nav>
<div class="container mx-auto p-8 space-y-8">
	<section>
        <MidiTimecodeMain />
	</section>
</div>
<div class="footer">
    <Footer />
</div>


<!-- <Header /> -->