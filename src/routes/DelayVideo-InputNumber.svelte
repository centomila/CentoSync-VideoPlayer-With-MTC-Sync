<script lang="ts">
	let inputValueSeconds = 0;
	let inputValueMinutes = 0;
	let interval: ReturnType<typeof setInterval>;
	const stepSeconds = 0.01;
	const stepMinutes = 1;

	function handlePointerDown(increment: boolean, unit: 'seconds' | 'minutes') {
		clearInterval(interval);
		function update() {
			if (unit === 'seconds') {
				inputValueSeconds = Number(
					(inputValueSeconds + (increment ? stepSeconds : -stepSeconds)).toFixed(2)
				);
			} else {
				inputValueMinutes = Number(
					(inputValueMinutes + (increment ? stepMinutes : -stepMinutes)).toFixed(2)
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
			<label
				class="title text-bold text-left"
				for="offset-video-minutes"
				title="Offset the video playback by minutes">Minutes</label
			>
			<span
				class="flex items-center gap-1 align-text-bottom font-mono text-xs font-light text-primary-500"
				title="Offset the video playback by minutes"
			>
				- 1 +
			</span>
		</div>

		<div class="flex w-full justify-between gap-2">
			<input
				class="input"
				id="offset-video-minutes"
				title="Input (number)"
				type="number"
				step={stepSeconds}
				bind:value={inputValueMinutes}
			/>

			<button
				class="variant-filled-secondary btn"
				on:pointerdown={() => handlePointerDown(false, 'minutes')}
				on:pointerup={handlePointerUp}
				on:pointerleave={handlePointerUp}
			>
				<i class="fa fa-minus"></i>
			</button>
			<button
				class="variant-filled-secondary btn"
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
			<label
				class="title text-bold text-left"
				for="offset-video-seconds"
				title="Offset the video playback by seconds">Seconds</label
			>
			<span
				class="flex items-center gap-1 align-text-bottom font-mono text-xs font-light text-primary-500"
				title="Offset the video playback by seconds"
			>
				- 0.01 +
			</span>
		</div>
		<div class="flex w-full justify-between gap-2">
			<input
				class="input"
				id="offset-video-seconds"
				title="Input (number)"
				type="number"
				step={stepSeconds}
				bind:value={inputValueSeconds}
			/>
			<button
				class="variant-filled-secondary btn"
				on:pointerdown={() => handlePointerDown(false, 'seconds')}
				on:pointerup={handlePointerUp}
				on:pointerleave={handlePointerUp}
			>
				<i class="fa fa-minus"></i>
			</button>
			<button
				class="variant-filled-secondary btn"
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
		-moz-appearance: textfield;
	}
</style>
