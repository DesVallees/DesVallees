<script lang="ts">
	import { onMount } from 'svelte';
	import { baseImageRoute, baseRoute, dictionary, language } from '../stores';
	import type { Product, Version } from '../mockDb';

	export let product: Product;

	let name: string = product.name[$language];
	let imageSrc: string = product.imageSrc;
	let imgHoverSrc: string | undefined = product.imgHoverSrc;
	let imageAlt: string = product.imageAlt[$language];
	let price: string = product.price;
	let oldPrice: string | undefined = product.oldPrice;
	let versions: Version[] | undefined = product.versions;
	let href: string = product.href;

	let img: HTMLImageElement;

	let originalImageSrc: string;
	function handleImageHover() {
		originalImageSrc = imageSrc;
		let originalImageWidth = img.offsetWidth;
		let originalImageHeight = img.offsetHeight;

		if (imgHoverSrc) {
			img.style.width = `${originalImageWidth}px`;
			img.style.height = `${originalImageHeight}px`;
			imageSrc = imgHoverSrc;
		}
	}
	function handleImageUnhover() {
		if (imgHoverSrc) {
			imageSrc = originalImageSrc;
		}
	}

	onMount(() => {
		img.onmouseover = handleImageHover;
		img.onmouseleave = handleImageUnhover;
	});

	function calculateDiscount(oldPrice: string, currentPrice: string): string {
		// Function to extract numeric part from the price string
		const extractNumber = (price: string) => {
			const numericPart = price.replace(/[^0-9.]/g, '');
			return parseFloat(numericPart);
		};

		// Extracting numbers from the provided string prices
		const oldPriceNum = extractNumber(oldPrice);
		const currentPriceNum = extractNumber(currentPrice);

		// Validating extracted numbers to prevent division by zero or negative values
		if (
			isNaN(oldPriceNum) ||
			isNaN(currentPriceNum) ||
			oldPriceNum <= 0 ||
			currentPriceNum > oldPriceNum
		) {
			throw new Error('Invalid price input');
		}

		// Calculating discount percentage
		const discount = ((oldPriceNum - currentPriceNum) / oldPriceNum) * 100;

		// Returning the discount as a formatted string
		return `${discount.toFixed(0)}%`;
	}

	let currentVersionSrc = imageSrc;
	function changeVersion(newImageSrc: string, newImageHoverSrc: string | undefined) {
		imageSrc = newImageSrc;
		imgHoverSrc = newImageHoverSrc;

		currentVersionSrc = imageSrc;
	}
</script>

<div class="product">
	<a href="{baseRoute}/catalog/products/{href}" aria-label={name}>
		<img bind:this={img} class="mainImage" src="{baseImageRoute}/{imageSrc}" alt={imageAlt} />
		{#if oldPrice}
			<p class="discount">{calculateDiscount(oldPrice, price)} {$dictionary.discount}</p>
		{/if}
	</a>

	<div class="productInfo">
		<div class="left">
			<a href="{baseRoute}/catalog/products/{href}">
				<h2>{name}</h2>
			</a>
			<div class="prices">
				<p class="price">{price}</p>
				{#if oldPrice}
					<p class="oldPrice">{oldPrice}</p>
				{/if}
			</div>
		</div>
	</div>

	{#if versions}
		<div class="versions">
			{#each versions as item}
				<button
					aria-label={item.imageAlt[$language]}
					class:current={currentVersionSrc === item.imageSrc}
					on:click={() => changeVersion(item.imageSrc, item.imgHoverSrc)}
				>
					<img
						width="50px"
						src="{baseImageRoute}/{item.imageSrc}"
						alt={item.imageAlt[$language]}
					/>
				</button>
			{/each}
		</div>
	{/if}
</div>

<style>
	.product {
		position: relative;
		max-width: min(25rem, 80vw);
		overflow: hidden;

		font-size: clamp(1rem, 2vw, 1.25rem);
	}

	.mainImage {
		width: 100%;
		max-width: 24rem;
		object-fit: cover;
		display: block;
		border-radius: 5px;
		aspect-ratio: 1 / 1;

		background-color: white;
	}

	.discount {
		position: absolute;
		top: 0.5em;
		right: 0.5em;

		background-color: green;
		border-radius: 5px;
		padding: 0.3em 0.6em;
		max-width: clamp(55%, 10vw, 70%);

		color: white;
		text-align: center;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	h2 {
		margin-top: 1rem;
		margin-bottom: 0.5rem;

		font-size: 1.4em;
		line-height: 1.2;
	}

	.prices {
		display: flex;
		gap: 2ch;
	}

	p {
		font-size: 1em;
		color: var(--content);
	}

	.oldPrice {
		color: var(--content-8);
		text-decoration: line-through;
	}

	/* Versions Styles */
	.versions {
		display: flex;
		margin-top: 0.9em;
	}
	.versions button {
		background: none;
		border-radius: var(--borderRadius, 10px);
		border: none;
		padding: 5px;
		cursor: pointer;
		transition: transform 0.3s ease;
	}
	.versions button:hover {
		transform: scale(1.1);
	}
	.versions button.current img {
		border: 3px solid var(--interactive);
	}
	.versions img {
		width: 50px;
		height: 50px;
		object-fit: cover;
		border-radius: var(--borderRadius, 10px);
	}
</style>
