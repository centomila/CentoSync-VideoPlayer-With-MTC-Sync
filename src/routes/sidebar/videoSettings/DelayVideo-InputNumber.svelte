<script lang="ts">
	import { videoOffsetMinutes, videoOffsetSeconds } from '$lib/stores';

	const offsetSecondsTitle = 'Offset the video playback by seconds';
	const offsetMinutesTitle = 'Offset the video playback by minutes';

	let interval: ReturnType<typeof setInterval>;
	const stepSeconds = 0.01;
	const stepMinutes = 1;

	function handlePointerDown(increment: boolean, unit: 'seconds' | 'minutes') {
		clearInterval(interval);
		function update() {
			if (unit === 'seconds') {
				$videoOffsetSeconds = Number(
					($videoOffsetSeconds + (increment ? stepSeconds : -stepSeconds)).toFixed(2)
				);
			} else {
				$videoOffsetMinutes = Number(
					($videoOffsetMinutes + (increment ? stepMinutes : -stepMinutes)).toFixed(2)
				);
			}
		}
		update();
		interval = setInterval(update, 100);
	}

	function handlePointerUp() {
		clearInterval(interval);
	}
</script>

<div class="flex flex-col space-y-4">
	<!-- Minutes -->
	<div class="flex flex-col space-y-2">
		<div class="flex w-full justify-between">
			<label class="title text-bold text-left" for="offset-video-minutes" title={offsetMinutesTitle}
				>Offset Minutes</label
			>
			<span
				class="flex items-center gap-1 align-text-bottom font-mono text-xs font-light text-primary-500"
				title={offsetMinutesTitle}
			>
				- 1 +
			</span>
		</div>

		<div class="flex w-full justify-between gap-2">
			<input
				class="input py-1"
				id="offset-video-minutes"
				title={offsetMinutesTitle}
				type="number"
				step={stepSeconds}
				bind:value={$videoOffsetMinutes}
			/>

			<button
				class="variant-filled-primary btn"
				on:pointerdown={() => handlePointerDown(false, 'minutes')}
				on:pointerup={handlePointerUp}
				on:pointerleave={handlePointerUp}
			>
				<i class="fa fa-minus"></i>
			</button>
			<button
				class="variant-filled-primary btn"
				on:pointerdown={() => handlePointerDown(true, 'minutes')}
				on:pointerup={handlePointerUp}
				on:pointerleave={handlePointerUp}
			>
				<i class="fa fa-plus"></i>
			</button>
		</div>
	</div>

	<!-- Seconds -->

	<div class="flex flex-col space-y-2">
		<div class="flex w-full justify-between">
			<label class="title text-bold text-left" for="offset-video-seconds" title={offsetSecondsTitle}
				>Offset Seconds</label
			>
			<span
				class="flex items-center gap-1 align-text-bottom font-mono text-xs font-light text-primary-500"
				title={offsetSecondsTitle}
			>
				- 0.01 +
			</span>
		</div>
		<div class="flex w-full justify-between gap-2">
			<input
				class="input py-1"
				id="offset-video-seconds"
				title={offsetSecondsTitle}
				type="number"
				step={stepSeconds}
				bind:value={$videoOffsetSeconds}
			/>
			<button
				class="variant-filled-primary btn"
				on:pointerdown={() => handlePointerDown(false, 'seconds')}
				on:pointerup={handlePointerUp}
				on:pointerleave={handlePointerUp}
			>
				<i class="fa fa-minus"></i>
			</button>
			<button
				class="variant-filled-primary btn"
				on:pointerdown={() => handlePointerDown(true, 'seconds')}
				on:pointerup={handlePointerUp}
				on:pointerleave={handlePointerUp}
			>
				<i class="fa fa-plus"></i>
			</button>
		</div>
	</div>
</div>

<style>
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	/* Firefox */
	input[type='number'] {
		appearance: textfield;
		-moz-appearance: textfield;
	}
</style>
