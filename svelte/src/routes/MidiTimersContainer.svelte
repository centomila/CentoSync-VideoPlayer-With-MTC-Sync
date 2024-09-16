<script lang="ts">
	import { mtcData } from '../lib/stores';

	$: ({
		hours: mtcHours,
		minutes: mtcMinutes,
		seconds: mtcSeconds,
		milliseconds: mtcMilliseconds,
		frames: mtcFrames,
		frameRate: mtcFps,
		elapsedFrames: mtcElapsedFrames
	} = $mtcData);

	$: mtcHoursFormatted = mtcHours < 10 ? '0' + mtcHours : mtcHours;
	$: mtcMinutesFormatted = mtcMinutes < 10 ? '0' + mtcMinutes : mtcMinutes;
	$: mtcSecondsFormatted = mtcSeconds < 10 ? '0' + mtcSeconds : mtcSeconds;
	$: mtcMillisecondsFormatted = mtcMilliseconds
		.toString()
		.split('.')[0]
		.padStart(3, '0');
	$: mtcFramesFormatted = mtcFrames < 10 ? '0' + mtcFrames : mtcFrames;
</script>

<div class="items-center justify-center">
	<div class="text-center text-5xl">
		<h3 class="font-extrabold mb-8">Track Position</h3>
		<div class="grid grid-cols-7 gap-2">
			<div class="font-mono text-center font-light">{mtcHoursFormatted}</div>
			<div class="font-extralight text-gray-500">:</div>
			<div class="font-mono text-center font-light">{mtcMinutesFormatted}</div>
			<div class="font-extralight text-gray-500">:</div>
			<div class="font-mono text-center font-light">{mtcSecondsFormatted}</div>
			<div class="font-extralight text-gray-500">:</div>
			<div class="font-mono text-center font-light">{mtcMillisecondsFormatted}</div>
		</div>

		<hr class="my-16 border-t border-gray-300" />

		<div class="items-center">
			<h3 class="mb-8 font-extrabold ">Midi Timecode</h3>
			<div class="grid grid-cols-7 gap-2">
				<div class="font-mono text-center font-light text-gray-500">H</div>
				<div class="font-mono text-center font-light text-gray-500">M</div>
				<div class="font-mono text-center font-light text-gray-500">S</div>
				<div class="font-mono text-center font-light text-gray-500 col-span-2"></div>
				<div class="font-mono text-center font-light text-gray-500"> FR </div>
				<div class="font-mono text-center font-light text-gray-500">FPS</div>

				<div class="font-mono text-center">{mtcHoursFormatted}</div>
				<div class="font-mono text-center">{mtcMinutesFormatted}</div>
				<div class="font-mono text-center">{mtcSecondsFormatted}</div>
				<div class="font-mono text-center col-span-2">  </div>
				<div class="font-mono text-center">{mtcFramesFormatted}</div>
				<div class="font-mono text-center">{mtcFps}</div>
			</div>
		</div>

		<hr class="my-16 border-t border-gray-300 w-full" />

		<div class="items-center">
			<h3 class="mb-8 font-extrabold">Elapsed Frames</h3>
			<p class="items-center">
				<span id="elapsedFrames" class="font-mono">{mtcElapsedFrames}</span>
			</p>
		</div>
	</div>
</div>
