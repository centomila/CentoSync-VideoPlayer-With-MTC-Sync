<script lang="ts">
	import { mtcData } from '../lib/stores';

	$: ({ hours: mtcHours, minutes: mtcMinutes, seconds: mtcSeconds, frames: mtcFrames } = $mtcData);

</script>

<div class="flex items-center justify-center space-y-8">
	<div class="text-center text-6xl">
		<div class="flex items-center space-x-2">
			<h3 class="font-semibold">Audio Track Time</h3>
			<span class="text-gray-500">-</span>
			<span id="audioTrackTime" class="font-mono">0:00:000</span>
		</div>
		<hr class="border-t border-gray-300 my-8" />
		<div class="flex items-center space-x-2">
			<h3 class="font-semibold">Timecode</h3>
			<span class="text-gray-500">-</span>
			<span class="font-mono">{mtcHours}:{mtcMinutes}:{mtcSeconds};{mtcFrames}</span>
		</div>
		<div class="flex items-center space-x-2">
			<span class="text-gray-500">@</span>
			<span id="fps" class="font-mono">0</span>
			<span class="text-gray-500">FPS</span>
		</div>
		<hr class="border-t border-gray-300 my-8" />
		<div class="flex items-center space-x-2">
			<h3 class="font-semibold">Total Frames</h3>
			<span class="text-gray-500">-</span>
			<span id="totalframes" class="font-mono">0</span>
		</div>
	</div>
</div>

