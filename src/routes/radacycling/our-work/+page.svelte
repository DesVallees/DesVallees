<script lang="ts">
	import { fade } from 'svelte/transition';
	import WorkPost from '../components/workPost.svelte';
	import { baseImageRoute } from '../stores';

	interface ImageItem {
		src: string;
		alt: string;
		title: string;
		description: string;
	}

	let images: ImageItem[] = [
		{
			src: `${baseImageRoute}/demo/woman-small.webp`,
			alt: 'Cyclist wearing our high-performance jersey',
			title: 'High-Performance Women’s Jersey',
			description:
				'Showcasing our latest in women’s cycling jerseys, this piece combines aerodynamics with unparalleled comfort. Developed in collaboration with professional cyclists, it features breathable, moisture-wicking fabric and a form-fitting design for those who refuse to compromise on performance or style.',
		},
		{
			src: `${baseImageRoute}/demo/man-small.webp`,
			alt: 'Cyclist in action wearing our mountain biking gear',
			title: 'All-Terrain Mountain Biking Gear',
			description:
				'Designed for the trails, our all-terrain gear set is built to withstand the most challenging conditions. With reinforced stitching, ample storage for long rides, and integrated protective padding, this gear represents our commitment to combining durability with the freedom of movement.',
		},
		{
			src: `${baseImageRoute}/demo/amsterdam-small.webp`,
			alt: 'Urban cyclist apparel by the canals of Amsterdam',
			title: 'Urban Commuter Series',
			description:
				'Inspired by the cycling culture of Amsterdam, our Urban Commuter Series marries functionality with sleek, minimalist design. Waterproof, yet breathable materials and subtle reflective details ensure safety and comfort in urban environments, making every commute a statement.',
		},
		{
			src: `${baseImageRoute}/demo/women.webp`,
			alt: 'Eco-friendly cycling wear collection',
			title: 'Eco-Friendly Collection',
			description:
				'Our Eco-Friendly Collection is a testament to our commitment to sustainability. Made from recycled materials without compromising on performance, these pieces offer cyclists a way to support the environment while enjoying their ride. Join us on the journey towards a greener future.',
		},
	];

	// Replicate images in the image array.
	for (let i = 0; i < 2; i++) {
		images = images.concat(images);
	}

	let selectedImage: ImageItem | null = null;

	function selectImage(image: ImageItem | null): void {
		selectedImage = image;
	}
</script>

<div class="ourWork" in:fade>
	<div class="header-section">
		<h1>Our Craftsmanship</h1>
		<p>
			Discover the passion and precision behind each piece of our cycling wear. Explore our
			gallery of previous works to see the quality and innovation we bring to cyclists
			worldwide.
		</p>
	</div>

	<div class="image-grid">
		{#each images as image}
			<button class="scrollAppear" on:click={() => selectImage(image)}>
				<img src={image.src} alt={image.alt} />
			</button>
		{/each}
	</div>
</div>

{#if selectedImage}
	<WorkPost close={() => selectImage(null)} {selectedImage} />
{/if}

<svelte:head>
	<title>Our Work | RADA Cycling Wear</title>
	<meta
		name="description"
		content="Discover the passion and precision behind each piece of our cycling wear. Explore our
		gallery of previous works to see the quality and innovation we bring to cyclists
		worldwide."
	/>
</svelte:head>

<style>
	.ourWork {
		margin: clamp(5rem, 15vw, 7rem) clamp(1rem, 6vw, 5rem);
	}

	.header-section {
		text-align: center;
		padding: 20px;
		margin-bottom: 30px;
		font-size: 1.1rem;
	}
	.header-section h1 {
		font-size: 2em;
		margin-bottom: 0.5em;
	}
	.header-section p {
		font-size: 1em;
		max-width: 60%;
		margin: auto;
		line-height: 1.5;
		max-width: 70ch;
		color: var(--content-9);
	}

	.image-grid {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1rem;
	}

	.image-grid img {
		border: 3px solid darkred;
		border-radius: 5px;
		transition: transform 0.3s ease;
		width: 100%;
		aspect-ratio: 6 / 11;
		max-width: 300px;
		object-fit: cover;
		object-position: center;
		height: auto;
		cursor: pointer;
	}

	.image-grid img:hover {
		transform: scale(1.025);
	}
</style>
