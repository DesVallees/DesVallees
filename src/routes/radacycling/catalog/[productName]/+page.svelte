<script lang="ts">
	import { fade } from 'svelte/transition';
	import { baseImageRoute, baseRoute, dictionary } from '../../stores';
	import Products from '../../components/products.svelte';
	import Review from '../../components/review.svelte';
	import { storage, type Product, reviews, type Review as ReviewType } from '../../mockDb';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	function findProductByHref(hrefParam: string): Product | undefined {
		return Object.values(storage).find((product) => product.href === hrefParam);
	}

	function findReviewsByProductId(productId: number): ReviewType[] {
		return reviews.filter((review) => review.productId === productId);
	}

	function calculateAverageRating(reviews: ReviewType[]): number | undefined {
		if (reviews.length === 0) {
			return undefined;
		}

		const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
		const averageRating = totalRating / reviews.length;

		return Number(averageRating.toFixed(1));
	}

	function findSimilarProducts(product: Product, count: number): Product[] {
		// Convert storage object to an array and filter out the original product
		const otherProducts = Object.values(storage).filter((p) => p.id !== product.id);

		// Shuffle the array to get random products
		const shuffledProducts = otherProducts.sort(() => 0.5 - Math.random());

		// Slice the array to get the specified count or the maximum amount possible
		return shuffledProducts.slice(0, count);
	}

	let product: Product | undefined;
	let averageRating: number | '-';
	let reviewCount: number;
	let similarProducts: Product[];

	let productReviews: ReviewType[];

	function setup() {
		product = findProductByHref($page.params.productName);

		if (product) {
			productReviews = findReviewsByProductId(product.id);

			averageRating = calculateAverageRating(productReviews) || '-';
			reviewCount = productReviews.length;

			similarProducts = findSimilarProducts(product, 8);
		}
	}

	let quantity: number = 1;

	// Functions for incrementing and decrementing quantity
	function incrementQuantity() {
		quantity += 1;
	}

	function decrementQuantity() {
		if (quantity > 1) quantity -= 1;
	}

	// Function to handle adding item to cart
	function addToCart() {}

	type Tab = 'description' | 'details' | 'reviews';
	let currentTab: Tab = 'description';

	function changeTab(newTab: Tab) {
		currentTab = newTab;
	}

	onMount(() => setup());
	$: $page.params.productName, setup();
</script>

{#key $page.params.productName}
	{#if product}
		<div class="product-container" in:fade>
			<div class="image-container">
				<img
					src="{baseImageRoute}/Resources/{product.imageSrc}"
					alt={product.imageAlt}
					class="product-image"
				/>
			</div>

			<div class="product-content">
				<div class="product-head">
					<h1 class="product-title">{product.name}</h1>
					<div class="product-price">{product.price}</div>
				</div>
				<div class="product-rating">
					<span class="rating">{averageRating} ★</span>
					<span class="review-count">({reviewCount} reviews)</span>
				</div>

				<nav class="product-navigation">
					<button
						type="button"
						class="product-nav-button"
						class:active={currentTab === 'description'}
						on:click={() => changeTab('description')}>Description</button
					>
					<button
						type="button"
						class="product-nav-button"
						class:active={currentTab === 'details'}
						on:click={() => changeTab('details')}>Details</button
					>
					<button
						type="button"
						class="product-nav-button"
						class:active={currentTab === 'reviews'}
						on:click={() => changeTab('reviews')}>Reviews</button
					>
				</nav>

				{#if currentTab === 'description'}
					<div class="product-description" in:fade>
						<p>{product.description}</p>
					</div>
				{:else if currentTab === 'details'}
					<div class="product-details" in:fade>
						<table>
							<tbody>
								{#each product.details as row}
									<tr>
										<td>{row.label}</td>
										<td>{row.value}</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				{:else if currentTab === 'reviews'}
					<div class="product-reviews" in:fade>
						{#if productReviews.length > 0}
							<div class="reviews-container">
								{#each productReviews as review}
									<Review {...review} />
								{/each}
							</div>
						{:else}
							<p
								style="margin: 1rem 0 2rem; text-align: center; color: var(--content-8)"
							>
								This product has no reviews
							</p>
						{/if}
					</div>
				{/if}

				<div class="quantity-selector">
					<button on:click={decrementQuantity} class="decrement">
						<ion-icon name="remove" />
					</button>
					<div class="quantity">{quantity}</div>
					<button on:click={incrementQuantity} class="increment">
						<ion-icon name="add" />
					</button>
				</div>

				<div class="actions">
					<button on:click={addToCart} class="add-to-cart-btn">Add to Cart</button>
				</div>
			</div>
			<div class="similar">
				<Products
					style="padding: 0;"
					carouselAutoColumns="calc(35% - var(--gap, 2.5rem))"
					title="Similar Products"
					products={similarProducts}
				/>
			</div>
		</div>
	{:else}
		<h1>Product not found.</h1>
	{/if}
{/key}

<svelte:head>
	{#if product}
		<title>{product.name}</title>
	{:else}
		<title>Product not found.</title>
	{/if}
	<meta
		name="description"
		content="Unleash your cycling potential with the \'Jersey 2024\'! Crafted for supreme comfort and performance, this jersey combines breathable fabric with a sleek design. Its vibrant blue color ensures visibility, while the ergonomic fit provides unmatched mobility. Perfect for both casual rides and competitive races. Elevate your ride today!"
	/>
</svelte:head>

<style>
	.product-container {
		overflow: hidden;
		margin: auto;
		max-width: 800px;
	}

	.image-container {
		position: relative;
		display: flex;
		justify-content: center;
		z-index: 0;
		padding: 5rem 0 1rem;
	}

	.product-image {
		display: block;
	}

	.product-head {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.product-content {
		border-top-right-radius: 20px;
		border-top-left-radius: 20px;
		transform: translateY(-20px);
		background-color: var(--main);
		z-index: 1;
		padding: 2rem;
		display: flex;
		flex-direction: column;
		gap: 10px;
		font-size: clamp(1rem, 4vw, 1.2rem);
	}

	.product-title {
		font-size: 1.5em;
		margin-bottom: 0.25em;
	}

	.product-price {
		font-size: 1.375em;
		color: #0a84ff;
		font-weight: bold;
	}

	.product-rating {
		display: flex;
		align-items: center;
		gap: 5px;
		font-size: 0.9em;
	}

	.rating {
		color: #e6c10c;
	}

	.review-count {
		color: #6e6e73;
	}

	.product-navigation {
		display: grid;
		grid-auto-flow: column;
		justify-content: space-around;
		margin-top: 1rem;
		border-bottom: solid 1px var(--content-5);
	}

	.product-nav-button {
		padding: 10px 0;
		color: var(--content-8);
		width: fit-content;
		transition: 0.2s;
	}

	.product-nav-button:hover:not(.active),
	.product-nav-button:focus-visible {
		color: var(--content);
	}

	.product-nav-button.active {
		color: red;
		border-bottom: 5px solid var(--interactive);
	}

	.product-description {
		line-height: 1.5;
		padding: 1rem 0;
	}

	.product-details table {
		border-collapse: collapse;
		width: 100%;
		max-width: 600px; /* Adjust this to suit your layout */
		margin: 0.5rem auto;
		border-radius: 8px;
		overflow: hidden;
	}

	.product-details td {
		padding: 10px;
	}

	.product-details td:first-child {
		font-weight: bold;
	}

	.product-details td {
		border: none;
	}

	.reviews-container {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		margin: 2rem 0;
	}

	.quantity-selector {
		display: flex;

		margin: 1rem auto;
		border: solid 3px var(--interactive);
		border-radius: 3px;
		width: fit-content;
	}

	.quantity-selector > * {
		display: grid;
		place-items: center;
	}

	.quantity-selector ion-icon {
		font-size: 1.75rem;
	}

	.quantity-selector button {
		--border: solid 2px var(--interactive);
		background-color: var(--interactive);
		color: var(--main);
		font-size: 1.5rem;
		padding: 0.2rem;
	}

	.quantity-selector button:first-of-type {
		border-right: var(--border);
	}

	.quantity-selector button:last-of-type {
		border-left: var(--border);
	}

	.quantity {
		margin: 0 15px;
		font-size: 1.15rem;
		font-weight: bold;
	}

	.actions {
		display: flex;
		justify-content: center;
	}

	.add-to-cart-btn {
		background-color: var(--interactive);
		border: none;
		padding: 0.8em 1.75em;
		margin-bottom: 2rem;
		font-weight: bold;
		color: var(--main);
		border-radius: 10px;
		cursor: pointer;
		transition: background-color 0.3s ease;
	}

	.add-to-cart-btn:hover {
		filter: brightness(200%);
	}

	.similar {
		margin: 2rem 2rem 4rem;

		display: grid;
		justify-content: center;
	}
</style>
