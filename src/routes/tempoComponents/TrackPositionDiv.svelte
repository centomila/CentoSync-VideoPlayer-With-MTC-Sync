<script lang="ts">
	import { mtcData } from '$lib/stores';

	$: ({
		hours: mtcHours,
		minutes: mtcMinutes,
		seconds: mtcSeconds,
		milliseconds: mtcMilliseconds
	} = $mtcData);

	$: mtcHoursFormatted = mtcHours < 10 ? '0' + mtcHours : mtcHours;
	$: mtcMinutesFormatted = mtcMinutes < 10 ? '0' + mtcMinutes : mtcMinutes;
	$: mtcSecondsFormatted = mtcSeconds < 10 ? '0' + mtcSeconds : mtcSeconds;
	$: mtcMillisecondsFormatted = mtcMilliseconds.toString().split('.')[0].padStart(3, '0');
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
			{mtcHoursFormatted}
		</div>
		<div class="text-center font-extralight text-gray-500 lg:text-2xl">:</div>
		<div class="text-center font-mono font-light lg:text-2xl">
			{mtcMinutesFormatted}
		</div>
		<div class="text-center font-extralight text-gray-500 lg:text-2xl">:</div>
		<div class="text-center font-mono font-light lg:text-2xl">
			{mtcSecondsFormatted}
		</div>
		<div class="text-center font-extralight text-gray-500 lg:text-2xl">.</div>
		<div class="text-center font-mono font-light lg:text-2xl">
			{mtcMillisecondsFormatted}
		</div>
	</div>
</div>
