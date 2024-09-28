<script>
	import '../app.css';
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import Sidebar from './Sidebar.svelte';
</script>

<div class="flex min-h-screen">
	<!-- <AppShell>...</AppShell> -->
	<!-- Sidebar -->
	<Sidebar />

	<!-- Main content area -->

	<main class="w-full p-0">
		<slot></slot>
		<!-- Page content will be injected here -->
	</main>
</div>
