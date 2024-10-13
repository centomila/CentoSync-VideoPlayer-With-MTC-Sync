<script lang="ts">
  import MidiPortSelectSPPClock from './MidiPortSelectSPPClock.svelte';

  import MidiPortSelectMTC from './MidiPortSelectMTC.svelte';

	import {
		selectedMidiInputMTC,
		selectedMidiInputSPP,
		midiInputs,
		syncModeIsMTC
	} from '$lib/stores';
	import ToggleSyncModeIsMTC from '../rightPane/tempoWidgets/ToggleSyncModeIsMTC.svelte';
</script>

<!-- Frontend -->
<div class=" space-y-4">
<MidiPortSelectMTC />
<MidiPortSelectSPPClock />
	<div class="space-y-2">
		<div class="flex w-full justify-between">
			<ToggleSyncModeIsMTC />
		</div>
	</div>
</div>
