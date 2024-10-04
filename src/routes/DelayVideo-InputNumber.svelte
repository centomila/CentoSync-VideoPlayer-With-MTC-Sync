<script lang="ts">
	let inputValue = 0;
	let interval: ReturnType<typeof setInterval>;
	const step = 0.01;

	function handlePointerDown(increment: boolean) {
		clearInterval(interval);
		function update() {
			inputValue = Number((inputValue + (increment ? step : -step)).toFixed(2));
		}
		update();
		interval = setInterval(update, 50);
	}

	function handlePointerUp() {
		clearInterval(interval);
	}
</script>

<div class="flex w-full justify-between pb-4">
	<label class="title text-bold text-left" for="offset-video-seconds" title="Offset the video playback by seconds">Seconds</label>
	<span
		class="flex items-center gap-1 align-text-bottom font-mono text-xs font-light text-primary-500"
		title="Offset the video playback by seconds">- 0.01 +</span
	>
</div>

<div class="flex justify-end space-x-2">
	<input class="input" id="offset-video-seconds" title="Input (number)" type="number" {step} bind:value={inputValue} />

	<button
		class="variant-filled-secondary btn"
		on:pointerdown={() => handlePointerDown(false)}
		on:pointerup={handlePointerUp}
		on:pointerleave={handlePointerUp}
	>
		<i class="fa fa-minus"></i>
	</button>
	<button
		class="variant-filled-secondary btn"
		on:pointerdown={() => handlePointerDown(true)}
		on:pointerup={handlePointerUp}
		on:pointerleave={handlePointerUp}
	>
		<i class="fa fa-plus"></i>
	</button>
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
