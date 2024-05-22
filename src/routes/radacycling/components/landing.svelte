<script lang="ts">
	import { baseRoute, dictionary } from '../stores';
	import Carousel from './carousel.svelte';

	let imageSources = ['demo/amsterdam.webp', 'demo/man.webp', 'demo/woman.webp'];

	let smallImagesSources = [
		'demo/amsterdam-small.webp',
		'demo/man-small.webp',
		'demo/woman-small.webp',
	];
</script>

<section class="landing">
	<div>
		<h1>{$dictionary.championsWearRADA}</h1>
		<p>{$dictionary.elevateYourTraining}</p>
		<a href="{baseRoute}/catalog" class="button">{$dictionary.exploreNow}</a>
	</div>

	<section class="carousel">
		<Carousel
			style="
                width: inherit; 
                height: inherit; 
                min-height: inherit;
                
                border-radius: 0; 
                aspect-ratio: unset; 
                box-shadow: none;
            "
			imgStyle="
                position: relative;
        
                max-width: unset;
                width: 100%;
                height: 100%;
        
                object-fit: cover;
                object-position: center 20%;
                z-index: -1;
            "
			images={imageSources}
			smallImages={smallImagesSources}
			imagesCommonDescription="RADA Cycling Wear"
			automaticImageChangeTime={10000}
			hideArrows={true}
		/>
	</section>
</section>

<style>
	.landing {
		width: 100%;
		height: 100vh;
		height: 100svh;
		min-height: 35rem;
		overflow: hidden;
		overflow: clip;

		display: grid;
		grid-template-rows: repeat(2, 1fr);

		color: var(--main);
	}

	.landing > * {
		grid-column: 1 / -1;
	}

	.carousel {
		height: inherit;
		max-width: unset;
		min-height: inherit;

		grid-row: 1 / -1;
	}

	div {
		display: grid;
		align-content: end;
		margin: clamp(5rem, 9vw, 10rem) clamp(0rem, 3vw, 3rem);
		max-width: min(800px, 50vw);

		grid-row: 1 / -1;

		padding: 2rem;
	}

	div * {
		filter: drop-shadow(3px 3px 0.5rem var(--content-5));
		z-index: 1;
	}

	h1 {
		font-size: clamp(3rem, 8vw, 5rem);
		line-height: 1.1;
		margin-bottom: 1rem;
	}

	p {
		font-size: clamp(1.25rem, 4vw, 1.75rem);
		font-weight: bold;
	}

	a {
		font-size: clamp(1.1rem, 3vw, 1.5rem);
		text-transform: uppercase;

		margin-top: 2rem;
	}
</style>
