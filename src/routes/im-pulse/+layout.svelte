<svelte:head>
	<title>I’m-pulse | Vuelo fitness guiado</title>
	<meta
		name="description"
		content="I’m-pulse combina ejercicios guiados con un reto de vuelo. Elige tu rutina, registra tus repeticiones y despega."
	/>
	<link rel="icon" href="/images/im-pulse/favicon.svg" />
</svelte:head>

<main>
	<slot />
</main>

<style>
	main {
		min-height: 100vh;
		background: linear-gradient(135deg, #1d1536 0%, #1c2a54 100%);
		font-family: 'Inter', system-ui, -apple-system, sans-serif;
		overflow: hidden;
	}
</style>
