<script lang="ts">
	import { fade } from 'svelte/transition';
	import { dictionary } from './stores';
</script>

<div class="home" in:fade>
	<section>
		<h1>Journée</h1>
		<h2>{$dictionary.slogan}</h2>

		<a href="/journee/log-in" class="button">{$dictionary.logIn}</a>
	</section>

	<div class="imgWrapper">
		<img
			src="/images/journee/gufoLanding.webp"
			alt={$dictionary.landingOwlAlt}
			width="368"
			height="368"
		/>
	</div>
</div>

<svelte:head>
	<title>Journée - {$dictionary.slogan}</title>
	<meta name="description" content={$dictionary.discoverTranquility} />
</svelte:head>

<style>
	.home {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		column-gap: 20%;
		row-gap: 2rem;

		min-height: 100%;
		padding: 1.5rem;
	}

	h1 {
		font-size: clamp(3.5rem, 9vw, 5rem);
	}

	h2 {
		color: var(--content-7);
		font-size: clamp(1.2rem, 3vw, 1.5rem);
		margin-bottom: 1.5em;
		max-width: 30ch;
	}

	a {
		font-size: clamp(1.2rem, 2.5vw, 1.5rem);
		min-width: 10ch;
	}

	.imgWrapper {
		position: relative;
		width: 23rem;
		max-width: 75%;

		display: flex;
	}

	.imgWrapper::after {
		content: '';
		position: absolute;
		width: 90%;
		height: 20%;
		right: 0;
		bottom: -5%;
		border-radius: 50%;
		filter: blur(30px);
		background-color: var(--content-1);
		z-index: -1;
	}

	img {
		height: auto;
		width: 100%;
		user-select: none;
		-webkit-user-drag: none;
	}

	@media screen and (min-width: 800px) {
		.home {
			padding: 1.5rem 5rem;
		}
	}
</style>
