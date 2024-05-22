<script lang="ts">
	import { fade } from 'svelte/transition';
	import { storage, type Product, featuredCategories, denormalizeCategories } from './mockDb';
	import { baseImageRoute, baseRoute, dictionary } from './stores';
	import Landing from './components/landing.svelte';
	import Reveal from './components/reveal.svelte';
	import Category from './components/category.svelte';
	import Products from './components/products.svelte';

	const categories = denormalizeCategories(featuredCategories);

	let popular: Product[] = [
		storage.jersey2024,
		storage.cyclingBib,
		storage.bibPlusJerseys,
		storage.radaSocks,
	];
	let latest: Product[] = [
		storage.cyclingBib,
		storage.radaSocks,
		storage.jersey2024,
		storage.bibPlusJerseys,
	];
</script>

<svelte:head>
	<title>PGM Cycling Wear</title>
	<meta name="description" content={$dictionary.siteDescription} />
</svelte:head>

<div class="home" in:fade>
	<Landing />

	<section class="about">
		<Reveal title={$dictionary.meetRADA} paragraph={$dictionary.experienceTheThrill} />
	</section>

	<section class="categories">
		{#each categories as category}
			<Category {category} style="flex-grow: 1; flex-basis: 35rem" />
		{/each}
	</section>

	<section class="products scrollAppear">
		<Products title={$dictionary.mostPopular} products={popular} />
	</section>

	<section class="promotions">
		<a
			href="{baseRoute}/catalog/products/bib-plus-jerseys"
			class="scrollScale"
			aria-label={$dictionary.offerOneBibTwoJerseys}
		>
			<img
				src="{baseImageRoute}/Resources/offer1bib2jerseys.png"
				alt={$dictionary.offerOneBibTwoJerseys}
			/>
		</a>

		<a href="{baseRoute}/custom" class="scrollScale" aria-label={$dictionary.customDeals}>
			<img src="{baseImageRoute}/Resources/radaCustom.png" alt={$dictionary.customDeals} />
		</a>
	</section>

	<section class="products scrollAppear">
		<Products title={$dictionary.latestReleases} products={latest} />
	</section>

	<section class="features">
		<h2 class="scrollAppear">{$dictionary.yourSatisfaction}</h2>

		<div class="featureContainer">
			<div class="scrollScale">
				<ion-icon name="cube-outline" />
				<h3>{$dictionary.swiftFreeShipping}</h3>
				<p>{$dictionary.enjoySeemless}</p>
			</div>
			<div class="scrollScale">
				<ion-icon name="shirt-outline" />
				<h3>{$dictionary.worryFreeReturns}</h3>
				<p>
					{$dictionary.mindPeaceMatters}
				</p>
			</div>
			<div class="scrollScale">
				<ion-icon name="layers-outline" />
				<h3>{$dictionary.effortlessExchanges}</h3>
				<p>
					{$dictionary.needADifferentSize}
				</p>
			</div>
		</div>
	</section>
</div>

<style>
	.home {
		display: grid;
		place-items: center;
	}

	.about {
		padding: 8rem 2rem;
		width: 100%;

		background-color: black;
	}

	.categories {
		--gap: clamp(0.5rem, 4vw, 3rem);

		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		margin: 3rem var(--gap);
		gap: calc(var(--gap) / 2);
	}

	.products {
		margin: 2rem 0;
	}

	.promotions {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;

		padding: 0 clamp(1rem, 4vw, 3rem);
		gap: 2rem;
	}

	.promotions a {
		flex-grow: 1;
		flex-basis: 35rem;

		max-width: fit-content;
	}

	.promotions img {
		border-radius: 10px;
		filter: contrast(300%) drop-shadow(0.5rem 0.5rem 1rem var(--interactive-5));
		max-height: 100vh;
		max-height: 100svh;
	}

	.features {
		padding: 1rem clamp(1rem, 4vw, 3rem) 6rem;
		font-size: clamp(0.9rem, 4vw, 1.2rem);

		display: grid;
		place-items: center;
		gap: 1rem;
		text-align: center;
		width: 100%;
		margin-top: 1rem;
		padding-bottom: 8rem;
	}

	.featureContainer {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 4rem 3rem;
	}

	.featureContainer div {
		display: grid;
		place-items: center;
		max-width: 20rem;
	}

	.features h2 {
		font-size: 2.2em;
		margin-bottom: 3rem;
	}

	.features h3 {
		font-size: 1.3em;
		margin-bottom: 1rem;
	}

	.features p {
		font-size: 1.05em;
		color: var(--content-9);
	}

	.features ion-icon {
		font-size: 7rem;
		margin-bottom: 1rem;
	}
</style>
