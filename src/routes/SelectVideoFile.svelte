<script>
	import { FileButton } from '@skeletonlabs/skeleton';
    import { FileDropzone } from '@skeletonlabs/skeleton';

    let files = [];
</script>

<!-- <FileButton name="files" fileInputType="video" width="w-64" class="leading-none">
  <i class="fas fa-lg fa-video leading-none" ></i>
  <span class="relative" style="bottom: 1px">Select Video</span>
</FileButton>
 -->

<FileDropzone name="files" fileInputType="video" padding="p-3" ><i class="fas fa-lg fa-video leading-none" ></i><span class="relative" style="bottom: 1px">Select Video</span></FileDropzone>
