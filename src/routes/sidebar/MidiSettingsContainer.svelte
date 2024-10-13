<script lang="ts">
	import MidiPortSelectSPPClock from './MidiPortSelectSPPClock.svelte';
	import AlwaysSyncCheckbox from '../sidebar/videoSettings/AlwaysSync-checkbox.svelte';
	import MidiPortSelectMTC from './MidiPortSelectMTC.svelte';
	import AlternativeStartStopCheckbox from './midiSettings/AlternativeStartStop-checkbox.svelte';

	import ToggleSyncModeIsMTC from '../rightPane/tempoWidgets/ToggleSyncModeIsMTC.svelte';
</script>

<!-- Frontend -->
<div class=" space-y-4">
	<MidiPortSelectMTC />
	<MidiPortSelectSPPClock />
	<ToggleSyncModeIsMTC />
	<div>
		<AlwaysSyncCheckbox />
		<AlternativeStartStopCheckbox />
	</div>
</div>
