<script lang="ts">
	import { onMount } from 'svelte';
	import { loadedFiles } from '$lib/stores';
	import { FileDropzone } from '@skeletonlabs/skeleton';

	$: $loadedFiles;

	// let dropZone: HTMLElement;
	// onMount(() => {
	// 	dropZone = document.getElementById('drop-zone')!;
	// 	initDropZone();
	// });

	// function preventDefaults(event: Event) {
	// 	event.preventDefault();
	// 	event.stopPropagation();
	// }

	// function initDropZone() {
	// 	// Prevent default behavior when files are dragged over or dropped
	// 	['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
	// 		dropZone?.addEventListener(eventName, preventDefaults, false);
	// 	});

	// 	// Highlight drop zone when dragging over it
	// 	['dragenter', 'dragover'].forEach((eventName) => {
	// 		dropZone?.addEventListener(
	// 			eventName,
	// 			() => {
	// 				dropZone.classList.add('dragover');
	// 			},
	// 			false
	// 		);
	// 	});

	// 	// Remove highlight on drag leave or drop
	// 	['dragleave', 'drop'].forEach((eventName) => {
	// 		dropZone?.addEventListener(
	// 			eventName,
	// 			() => {
	// 				dropZone.classList.remove('dragover');
	// 			},
	// 			false
	// 		);
	// 	});

	// 	dropZone.addEventListener('drop', (event: DragEvent) => {
	// 		if (event.dataTransfer) {
	// 			const draggedFiles = event.dataTransfer.files;
	// 			if (draggedFiles.length === 1 && draggedFiles[0].type.startsWith('video/')) {
	// 				$loadedFiles.files = event.dataTransfer.files;
	// 			} else if (draggedFiles.length > 1) {
	// 				alert('Only one file can be loaded at a time');
	// 			} else {
	// 				alert("This isn't a video file!");
	// 			}
	// 		}
	// 		loadVideoFile();
	// 	});
	// }

	function loadVideoFile() {
		if ($loadedFiles.files?.length) {
			console.log($loadedFiles.files);
		}
		$loadedFiles.currentFileName =
			$loadedFiles.files?.[0].name || 'Load a video file or drag and drop it on the page';
	}
</script>

<div class="flex max-w-full flex-grow items-center justify-center">
	<FileDropzone
		name="video-file"
		id="video-file"
		bind:files={$loadedFiles.files}
		on:change={loadVideoFile}
		accept="video"
	>
		<svelte:fragment slot="lead"><i class="fa fa-film"></i></svelte:fragment>
		<svelte:fragment slot="message">Drop video here</svelte:fragment>
		<svelte:fragment slot="meta">(meta)</svelte:fragment>
	</FileDropzone>
</div>
