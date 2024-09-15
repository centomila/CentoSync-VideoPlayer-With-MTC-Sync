<script lang="ts">
	import { mtcData } from '../lib/stores';

	$: ({ hours: mtcHours, minutes: mtcMinutes, seconds: mtcSeconds, frames: mtcFrames, frameRate: mtcFps } = $mtcData);

	$: mtcHoursFormatted = mtcHours < 10 ? '0' + mtcHours : mtcHours;
	$: mtcMinutesFormatted = mtcMinutes < 10 ? '0' + mtcMinutes : mtcMinutes;
	$: mtcSecondsFormatted = mtcSeconds < 10 ? '0' + mtcSeconds : mtcSeconds;
	$: mtcFramesFormatted = mtcFrames < 10 ? '0' + mtcFrames : mtcFrames;

</script>

<div class="flex items-center justify-center space-y-8">
	<div class="text-center text-6xl">
		<div class="flex items-center space-x-2">
			<h3 class="font-semibold">Song Position</h3>
			<span class="text-gray-500">-</span>
			<span id="audioTrackTime" class="font-mono">0:00:000</span>
		</div>
		<hr class="border-t border-gray-300 my-8" />
		<div class="flex items-center space-x-2">
			<h3 class="font-semibold">MTC</h3>
			<div class="flex items-center">
				<span class="text-gray-500">-</span>
				<span class="font-mono">{mtcHoursFormatted}:{mtcMinutesFormatted}:{mtcSecondsFormatted};{mtcFramesFormatted}</span>
				<span class="text-gray-500">@</span>
				<span id="fps" class="font-mono">{mtcFps}</span>
				<span class="text-gray-500"> FPS</span>
			</div>
		</div>
		<hr class="border-t border-gray-300 my-8" />
		<div class="flex items-center space-x-2">
			<h3 class="font-semibold">Total Frames</h3>
			<span class="text-gray-500">-</span>
			<span id="totalframes" class="font-mono">0</span>
		</div>
	</div>
</div>

