<script lang="ts">
	import { FileButton } from '@skeletonlabs/skeleton';
	import { FileDropzone } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	let files: FileList;
	let fileName = 'Load a video file or drag and drop it on the page';

	let dropZone: HTMLElement;
	onMount(() => {
		dropZone = document.getElementById('drop-zone')!;
		initDropZone();
	});

	function preventDefaults(event: Event) {
		event.preventDefault();
		event.stopPropagation();
	}

	function initDropZone() {
		// Prevent default behavior when files are dragged over or dropped
		['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
			dropZone?.addEventListener(eventName, preventDefaults, false);
		});

		// Highlight drop zone when dragging over it
		['dragenter', 'dragover'].forEach((eventName) => {
			dropZone?.addEventListener(
				eventName,
				() => {
					dropZone.classList.add('dragover');
				},
				false
			);
		});

		// Remove highlight on drag leave or drop
		['dragleave', 'drop'].forEach((eventName) => {
			dropZone?.addEventListener(
				eventName,
				() => {
					dropZone.classList.remove('dragover');
				},
				false
			);
		});

		dropZone.addEventListener('drop', (event) => {
			if (event.dataTransfer) {
				files = event.dataTransfer.files;
			}
      loadVideoFile();
		});
	}

	function loadVideoFile() {
		if (files.length > 0) {
			console.log(files);
		}
    fileName = files[0].name;
	}
</script>

<button class="btn variant-filled-primary">
	<label for="video-file" class="flex cursor-pointer items-center space-x-2">
		<i class="fa fa-film"></i><span style="translate: 0 -0.095rem">{fileName}</span>
		<input type="file" id="video-file" bind:files accept="video" class="hidden" />
	</label>
</button>
