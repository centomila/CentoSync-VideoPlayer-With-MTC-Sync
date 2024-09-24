<script lang="ts">
	import { mtcData, sppData, syncModeIsMTC } from '$lib/stores';

	let hoursFormatted: unknown;
	let minutesFormatted: unknown;
	let secondsFormatted: unknown;
	let millisecondsFormatted: unknown;

	$: if ($syncModeIsMTC) {
		hoursFormatted = $mtcData.hours < 10 ? '0' + $mtcData.hours : $mtcData.hours;
		minutesFormatted = $mtcData.minutes < 10 ? '0' + $mtcData.minutes : $mtcData.minutes;
		secondsFormatted = $mtcData.seconds < 10 ? '0' + $mtcData.seconds : $mtcData.seconds;
		millisecondsFormatted = $mtcData.milliseconds.toString().split('.')[0].padStart(3, '0');
	} else {
		hoursFormatted = Math.floor($sppData.hours);
		minutesFormatted = Math.floor($sppData.minutes);
		secondsFormatted = Math.floor($sppData.seconds);
		millisecondsFormatted = Math.floor($sppData.milliseconds);
	}
</script>

<div class="px-4">
	<!-- <h3 class="mb-2 font-extrabold">Track Position</h3> -->
	<div class="text grid grid-cols-7 gap-1 px-4">
		<div class="text-center font-mono font-light text-primary-500">H</div>
		<div class="text-center font-mono font-light text-primary-500"></div>
		<div class="text-center font-mono font-light text-primary-500">M</div>
		<div class="text-center font-mono font-light text-primary-500"></div>
		<div class="text-center font-mono font-light text-primary-500">S</div>
		<div class="text-center font-mono font-light text-primary-500"></div>
		<div class="text-center font-mono font-light text-primary-500">MS</div>

		<div class="text-center font-mono font-light lg:text-2xl">
			{hoursFormatted}
		</div>
		<div class="text-center font-extralight text-gray-500 lg:text-2xl">:</div>
		<div class="text-center font-mono font-light lg:text-2xl">
			{minutesFormatted}
		</div>
		<div class="text-center font-extralight text-gray-500 lg:text-2xl">:</div>
		<div class="text-center font-mono font-light lg:text-2xl">
			{secondsFormatted}
		</div>
		<div class="text-center font-extralight text-gray-500 lg:text-2xl">.</div>
		<div class="text-center font-mono font-light lg:text-2xl">
			{millisecondsFormatted}
		</div>
	</div>
</div>
