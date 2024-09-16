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
