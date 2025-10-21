<script>
	// No need to import app.css as we have our own styles
</script>

<main>
	<slot />
</main>

<style>
	main {
		min-height: 100vh;
		background: linear-gradient(135deg, #87ceeb 0%, #98fb98 100%);
		font-family: 'Arial', sans-serif;
		overflow: hidden;
	}
</style>
