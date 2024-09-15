<script lang="ts">
	import { mtcData } from '../lib/stores';

	$: ({ hours: mtcHours, minutes: mtcMinutes, seconds: mtcSeconds, frames: mtcFrames, frameRate: mtcFps, elapsedFrames: mtcElapsedFrames } = $mtcData);

	$: mtcHoursFormatted = mtcHours < 10 ? '0' + mtcHours : mtcHours;
	$: mtcMinutesFormatted = mtcMinutes < 10 ? '0' + mtcMinutes : mtcMinutes;
	$: mtcSecondsFormatted = mtcSeconds < 10 ? '0' + mtcSeconds : mtcSeconds;
	$: mtcFramesFormatted = mtcFrames < 10 ? '0' + mtcFrames : mtcFrames;

</script>

<div class="flex items-center justify-center space-y-8">
	<div class="text-center text-6xl">
		<div class="items-center">
			<h3 class="mb-3 font-semibold">Song Position</h3>
			<span id="audioTrackTime" class="font-mono font-extrabold">0:00:000</span>
		</div>

		<hr class="border-t border-gray-300 my-8" />
		
		<div class="items-center">
			<h3 class="mb-3 font-semibold">MTC</h3>
			<p class="items-center">
				<span class="font-mono font-extrabold">{mtcHoursFormatted}</span>
				<span class="text-gray-500 font-extralight">:</span>
				<span class="font-mono font-extrabold">{mtcMinutesFormatted}</span>
				<span class="text-gray-500 font-extralight">:</span>
				<span class="font-mono font-extrabold">{mtcSecondsFormatted}</span>
				<span class="text-gray-500 font-extralight">;</span>
				<span class="font-mono font-extrabold">{mtcFramesFormatted}</span>
				<span class="text-gray-500 font-extralight">@</span>
				<span id="fps" class="font-mono font-extrabold">{mtcFps}</span>
				<span class="text-gray-500 font-extralight"> FPS</span>
			</p>
		</div>
		
		<hr class="border-t border-gray-300 my-8" />
		
		<div class="items-center">
			<h3 class="font-semibold mb-3">Elapsed Frames</h3>
			<p class="items-center">
				<span id="elapsedFrames" class="font-mono">{mtcElapsedFrames}</span>
			</p>
		</div>
	</div>
</div>

