<script lang="ts">
	import { mtcData } from '../../lib/stores';

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
		<div class="text-center font-mono font-light text-gray-500">H</div>
		<div class="text-center font-mono font-light text-gray-500"></div>
		<div class="text-center font-mono font-light text-gray-500">M</div>
		<div class="text-center font-mono font-light text-gray-500"></div>
		<div class="text-center font-mono font-light text-gray-500">S</div>
		<div class="text-center font-mono font-light text-gray-500"></div>
		<div class="text-center font-mono font-light text-gray-500">MS</div>

		<div class="lg:text-2xl text-center font-mono font-light">{mtcHoursFormatted}</div>
		<div class="lg:text-2xl text-center font-extralight text-gray-500">:</div>
		<div class="lg:text-2xl text-center font-mono font-light">{mtcMinutesFormatted}</div>
		<div class="lg:text-2xl text-center font-extralight text-gray-500">:</div>
		<div class="lg:text-2xl text-center font-mono font-light">{mtcSecondsFormatted}</div>
		<div class="lg:text-2xl text-center font-extralight text-gray-500">.</div>
		<div class="lg:text-2xl text-center font-mono font-light">{mtcMillisecondsFormatted}</div>
	</div>
</div>
