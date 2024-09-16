<script lang="ts">
	import { mtcData, bpm } from '../lib/stores';

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
	$: mtcMillisecondsFormatted = mtcMilliseconds.toString().split('.')[0].padStart(3, '0');
	$: mtcFramesFormatted = mtcFrames < 10 ? '0' + mtcFrames : mtcFrames;

	$: bpmFormatted = $bpm.toFixed(2).padStart(5, '0');
</script>

<div class="items-center justify-center">
	<div class="text-center text-5xl">
		<h3 class="mb-8 font-extrabold">Track Position</h3>
		<div class="grid grid-cols-7 gap-2">
			<div class="text-center font-mono font-light">{mtcHoursFormatted}</div>
			<div class="font-extralight text-gray-500">:</div>
			<div class="text-center font-mono font-light">{mtcMinutesFormatted}</div>
			<div class="font-extralight text-gray-500">:</div>
			<div class="text-center font-mono font-light">{mtcSecondsFormatted}</div>
			<div class="font-extralight text-gray-500">:</div>
			<div class="text-center font-mono font-light">{mtcMillisecondsFormatted}</div>
		</div>

		<hr class="my-16 border-t border-gray-300" />
		
		<h3 class="mb-8 font-extrabold">BPM</h3>
		<div class="grid grid-cols-1 gap-2">
			<div class="text-center font-mono font-light">{bpmFormatted}</div>
		</div>

		<hr class="my-16 border-t border-gray-300" />
		<div class="items-center">
			<h3 class="mb-8 font-extrabold">Midi Timecode</h3>
			<div class="grid grid-cols-7 gap-2">
				<div class="text-center font-mono font-light text-gray-500">H</div>
				<div class="text-center font-mono font-light text-gray-500">M</div>
				<div class="text-center font-mono font-light text-gray-500">S</div>
				<div class="col-span-2 text-center font-mono font-light text-gray-500"></div>
				<div class="text-center font-mono font-light text-gray-500">FR</div>
				<div class="text-center font-mono font-light text-gray-500">FPS</div>

				<div class="text-center font-mono">{mtcHoursFormatted}</div>
				<div class="text-center font-mono">{mtcMinutesFormatted}</div>
				<div class="text-center font-mono">{mtcSecondsFormatted}</div>
				<div class="col-span-2 text-center font-mono"></div>
				<div class="text-center font-mono">{mtcFramesFormatted}</div>
				<div class="text-center font-mono">{mtcFps}</div>
			</div>
		</div>

		<hr class="my-16 w-full border-t border-gray-300" />

		<div class="items-center">
			<h3 class="mb-8 font-extrabold">Elapsed Frames</h3>
			<p class="items-center">
				<span id="elapsedFrames" class="font-mono">{mtcElapsedFrames}</span>
			</p>
		</div>
	</div>
</div>
