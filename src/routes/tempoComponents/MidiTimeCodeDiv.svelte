<script lang="ts">
	import { mtcData } from '$lib/stores';

	$: ({
		hours: mtcHours,
		minutes: mtcMinutes,
		seconds: mtcSeconds,
		frames: mtcFrames,
		frameRate: mtcFps
	} = $mtcData);

	$: mtcHoursFormatted = mtcHours < 10 ? '0' + mtcHours : mtcHours;
	$: mtcMinutesFormatted = mtcMinutes < 10 ? '0' + mtcMinutes : mtcMinutes;
	$: mtcSecondsFormatted = mtcSeconds < 10 ? '0' + mtcSeconds : mtcSeconds;
	$: mtcFramesFormatted = mtcFrames < 10 ? '0' + mtcFrames : mtcFrames;
</script>

<div class="px-4">
	<!-- <h3 class="mb-2 font-extrabold">Midi Timecode</h3> -->
	<div class="grid grid-cols-7 gap-1">
		<div class="text-center font-mono font-light text-primary-500">H</div>
		<div class="text-center font-mono font-light text-primary-500">M</div>
		<div class="text-center font-mono font-light text-primary-500">S</div>
		<div class="col-span-2 text-center font-mono font-light text-primary-500"></div>
		<div class="text-center font-mono font-light text-primary-500">FR</div>
		<div class="text-center font-mono font-light text-primary-500">FPS</div>

		<div class="text-center font-mono lg:text-2xl">
			{mtcHoursFormatted}
		</div>
		<div class="text-center font-mono lg:text-2xl">
			{mtcMinutesFormatted}
		</div>
		<div class="text-center font-mono lg:text-2xl">
			{mtcSecondsFormatted}
		</div>
		<div class="col-span-2 text-center font-mono lg:text-2xl"></div>
		<div class="text-center font-mono lg:text-2xl">
			{mtcFramesFormatted}
		</div>
		<div class="text-center font-mono lg:text-2xl">{mtcFps}</div>
	</div>
</div>
