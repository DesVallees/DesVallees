<svelte:head>
	<title>Apan | Flappy Bird</title>
	<meta name="description" content="Apan Flappy Bird" />
	<link rel="icon" href="https://fav.farm/🐤" />
</svelte:head>

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
