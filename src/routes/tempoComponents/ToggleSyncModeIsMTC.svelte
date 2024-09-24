<script lang="ts">
	import { syncModeIsMTC } from '$lib/stores';
</script>

<!-- Frontend -->
<select bind:value={$syncModeIsMTC} class="select w-full">
	<option value={true}>MTC Timecode</option>
	<option value={false}>Song Position Pointer (SPP)</option>
</select>
