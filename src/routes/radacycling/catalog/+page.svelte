<script lang="ts">
	import { fade } from 'svelte/transition';
	import { baseImageRoute, baseRoute, dictionary, language } from '../stores';
	import { storage, type Product } from '../mockDb';
	import Products from '../components/products.svelte';
	import Item from '../components/item.svelte';

	let newArrivals: Product[] = [
		storage.bibPlusJerseys,
		storage.redJersey2024,
		storage.redCyclingBib,
		storage.radaSocks,
	];

	let mostViewed: Product[] = [
		storage.redJersey2024,
		storage.redCyclingBib,
		storage.bibPlusJerseys,
		storage.radaSocks,
	];
</script>

<div class="catalog" in:fade>
	<section class="banner">
		<img src="{baseImageRoute}/demo/accessories.webp" alt={$dictionary.cyclistWearingRADA} />

		<div class="bannerContent">
			<h1>{$dictionary.catalogSlogan}</h1>
		</div>
	</section>

	<section>
		<Products title={$dictionary.newArrivals} products={newArrivals} />
	</section>

	<section class="custom catalogPadding">
		<p>{$dictionary.exploreEndlessPossibilities}</p>
		<a href="{baseRoute}/custom" aria-label={$dictionary.customDeals}>
			<img
				class="edgyImg"
				src="{baseImageRoute}/Resources/radaCustom.png"
				alt={$dictionary.customDeals}
			/>
		</a>
	</section>

	<section class="catalogPadding items">
		{#each newArrivals as item}
			<Item
				href={item.href}
				imageAlt={item.imageAlt[$language]}
				imageSrc={item.imageSrc}
				name={item.name[$language]}
				price={item.price}
				oldPrice={item.oldPrice}
			/>
		{/each}
	</section>

	<section class="promotions catalogPadding">
		<a
			href="{baseRoute}/catalog/products/bib-plus-jerseys"
			aria-label={$dictionary.offerOneBibTwoJerseys}
		>
			<img
				class="edgyImg"
				src="{baseImageRoute}/Resources/offer1bib2jerseys.png"
				alt={$dictionary.offerOneBibTwoJerseys}
			/>
		</a>
	</section>

	<section>
		<Products title={$dictionary.mostViewed} products={mostViewed} />
	</section>
</div>

<svelte:head>
	<title>{$dictionary.catalog} | RADA Cycling Wear</title>
	<meta name="description" content={$dictionary.siteDescription} />
</svelte:head>

<style>
	.catalog {
		margin: auto;
		margin-bottom: 8rem;
	}

	.banner {
		width: 100%;
		height: calc(100svh - 20rem);
		height: calc(100svh - 20rem);
		min-height: 22rem;
		max-height: clamp(40rem, 5vw, 80rem);
		overflow: hidden;
		overflow: clip;

		display: grid;
		align-items: center;
		grid-template-rows: repeat(2, 1fr);
	}

	.banner > * {
		grid-row: 1 / -1;
		grid-column: 1 / -1;
	}

	.banner img {
		position: relative;

		max-width: revert;
		width: 100%;
		height: 100%;

		object-fit: cover;
		object-position: center 20%;
		z-index: -1;
	}

	.bannerContent {
		display: grid;
		align-items: center;
		height: 100%;

		padding: 2rem;
		color: var(--main);
	}

	.bannerContent * {
		z-index: 1;
	}

	h1 {
		font-size: clamp(3rem, 8vw, 5rem);
		line-height: 1.25;
		text-align: center;
		filter: drop-shadow(3px 3px 0.5rem var(--content-8));
	}

	/* h2 {
		font-size: clamp(1.7rem, 4vw, 2.25rem);
		text-transform: capitalize;
		margin-bottom: 0.25em;
	} */

	p {
		font-size: clamp(1.5rem, 4vw, 1.75rem);
		text-align: center;
	}

	section {
		margin-bottom: 2rem;
	}

	section:not(.banner) {
		max-width: 1500px;
		margin-inline: auto;
	}

	.catalogPadding {
		padding: 0 clamp(0.5rem, 4vw, 5rem);
	}

	.custom,
	.promotions {
		font-weight: bold;
		margin: 5rem 0;

		display: grid;
		place-items: center;
		gap: 2em;
	}

	.custom p {
		max-width: 700px;
		text-wrap: balance;
		filter: drop-shadow(0 0 0.5rem var(--content-4));
		font-weight: bold;
	}

	.edgyImg {
		border-radius: 10px;
		filter: contrast(300%) drop-shadow(0.5rem 0.5rem 1rem var(--interactive-5));
		max-height: 100vh;
		max-height: 100svh;
	}

	.items {
		display: grid;
		gap: 2rem;
	}
</style>
