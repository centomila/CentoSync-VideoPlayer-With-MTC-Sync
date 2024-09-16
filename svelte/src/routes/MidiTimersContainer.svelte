<script lang="ts">
	import { mtcData } from '../lib/stores';

	$: ({
		hours: mtcHours,
		minutes: mtcMinutes,
		seconds: mtcSeconds,
		milliseconds: mtcThreeDecimalSeconds,
		frames: mtcFrames,
		frameRate: mtcFps,
		elapsedFrames: mtcElapsedFrames
	} = $mtcData);

	$: mtcHoursFormatted = mtcHours < 10 ? '0' + mtcHours : mtcHours;
	$: mtcMinutesFormatted = mtcMinutes < 10 ? '0' + mtcMinutes : mtcMinutes;
	$: mtcSecondsFormatted = mtcSeconds < 10 ? '0' + mtcSeconds : mtcSeconds;
	$: mtcThreeDecimalSecondsFormatted = mtcThreeDecimalSeconds
		.toString()
		.split('.')[0]
		.padStart(3, '0');
	$: mtcFramesFormatted = mtcFrames < 10 ? '0' + mtcFrames : mtcFrames;
</script>

<div class="flex items-center justify-center space-y-8">
	<div class="text-center text-6xl">
		<div class="items-center">
			<h3 class="mb-3 font-semibold">Song Position</h3>
			<span class="font-mono font-extrabold">{mtcHoursFormatted}</span>
			<span class="font-extralight text-gray-500">:</span>
			<span class="font-mono font-extrabold">{mtcMinutesFormatted}</span>
			<span class="font-extralight text-gray-500">:</span>
			<span class="font-mono font-extrabold">{mtcSecondsFormatted}</span>
			<span class="font-extralight text-gray-500">:</span>
			<span class="font-mono font-extrabold">{mtcThreeDecimalSecondsFormatted}</span>
		</div>

		<hr class="my-8 border-t border-gray-300" />

		<div class="items-center">
			<h3 class="mb-3 font-semibold">MTC</h3>
			<p class="items-center">
				<span class="font-mono font-extrabold">{mtcHoursFormatted}</span>
				<span class="font-extralight text-gray-500">:</span>
				<span class="font-mono font-extrabold">{mtcMinutesFormatted}</span>
				<span class="font-extralight text-gray-500">:</span>
				<span class="font-mono font-extrabold">{mtcSecondsFormatted}</span>
				<span class="font-extralight text-gray-500">;</span>
				<span class="font-mono font-extrabold">{mtcFramesFormatted}</span>
				<span class="font-extralight text-gray-500">@</span>
				<span id="fps" class="font-mono font-extrabold">{mtcFps}</span>
				<span class="font-extralight text-gray-500"> FPS</span>
			</p>
		</div>

		<hr class="my-8 border-t border-gray-300" />

		<div class="items-center">
			<h3 class="mb-3 font-semibold">Elapsed Frames</h3>
			<p class="items-center">
				<span id="elapsedFrames" class="font-mono">{mtcElapsedFrames}</span>
			</p>
		</div>
	</div>
</div>
