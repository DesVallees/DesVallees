<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, scale } from 'svelte/transition';
	import { baseImageRoute } from '../stores';

	interface ImageItem {
		src: string;
		alt: string;
		title: string;
		description: string;
	}

	export let close: () => void;
	export let selectedImage: ImageItem;

	// Close modal on Escape key press
	const handleKeydown = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			close();
		}
	};

	onMount(() => {
		window.addEventListener('keydown', handleKeydown);
		return () => {
			window.removeEventListener('keydown', handleKeydown);
		};
	});
</script>

<button class="backdrop" on:click={close}>
	<button class="main" on:click|stopPropagation in:scale out:scale={{ duration: 200 }}>
		<button class="close" on:click={close}><ion-icon name="close-outline" /></button>
		<div class="content">
			<div class="imageContainer">
				<img src="{baseImageRoute}/{selectedImage.src}" alt={selectedImage.alt} />
			</div>
			<div class="description">
				<h2>{selectedImage.title}</h2>
				<p>
					{selectedImage.description}
				</p>
			</div>
		</div>
	</button>
</button>

<style>
	.backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
		padding: clamp(0rem, 3vw, 5rem);
	}

	.main {
		position: relative;
		background-color: white;
		border-radius: 0.5rem;
		height: 100%;
		width: 100%;
		max-width: 1200px;
		padding: 2rem;
		overflow: auto;
	}

	.close {
		position: absolute;
		top: 1em;
		right: 1em;

		display: flex;
		font-size: 1.2rem;
		padding: 0.25em;
		background-color: var(--main-5);
		border-radius: 50%;

		z-index: 2;
		transition: background-color 0.2s;
	}

	.close:hover {
		background-color: var(--content-2);
	}

	.content {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.imageContainer {
		flex-grow: 1;
		flex-shrink: 0;
	}

	img {
		border-radius: 0.5rem;
		max-height: 70vh;
		max-width: 90%;
		aspect-ratio: 6 / 11;
		object-position: center;
		object-fit: cover;
	}

	.description {
		flex-grow: 0;
		flex-shrink: 1;

		display: grid;
		gap: 1rem;
		align-content: center;
	}

	h2 {
		text-align: center;
		margin: auto;
		max-width: 80%;
	}

	p {
		max-width: 65ch;
		font-size: 1.1rem;
		text-align: left;
		text-wrap: pretty;
	}

	@media screen and (max-width: 750px) {
		.main {
			border-radius: 0.5rem;
			padding: 0.5rem 0 3rem;
		}

		p {
			margin: 0 1.5rem;
		}
	}
</style>
