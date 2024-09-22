<script>
	import '../app.css';
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import Sidebar from './Sidebar.svelte';
</script>

<div class="bg-surface-100-800-token flex min-h-screen">
	<!-- Sidebar -->
	<Sidebar />

	<!-- Main content area -->

	<main class="w-full p-0">
		<slot></slot>
		<!-- Page content will be injected here -->
	</main>
</div>
