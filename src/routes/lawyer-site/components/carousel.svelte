<script lang="ts">
	import { onMount } from 'svelte';
	import CarrouselController from './carrouselController.svelte';
	import { dictionary } from '../stores';
	import { sleep } from '../functions';

	export let style: string = '';

	export let images: string[];
	export let imageDescriptions: string[] | undefined = undefined;
	export let automaticImageChangeTime: number = 5000;

	export let currentFileIndex: number = 0;
	let intervalId: ReturnType<typeof setInterval> | undefined;

	function nextImage() {
		currentFileIndex = (currentFileIndex + 1) % images.length;
	}

	function previousImage() {
		const minusOne = currentFileIndex - 1;
		if (minusOne >= 0) {
			currentFileIndex = minusOne % images.length;
		} else {
			currentFileIndex = images.length - 1;
		}
	}

	function startAutomaticImageChanges() {
		intervalId = setInterval(nextImage, automaticImageChangeTime);
	}

	function stopAutomaticImageChanges() {
		if (intervalId) {
			clearInterval(intervalId);
		}
	}

	onMount(() => {
		startAutomaticImageChanges();
	});

	let disappearAndAppear: boolean = false;

	$: currentFileIndex, checkDisappearAndAppear();

	async function checkDisappearAndAppear() {
		disappearAndAppear = false;
		await sleep(1);
		disappearAndAppear = true;
		await sleep(1100);
		disappearAndAppear = false;
	}

	function handleKeydown(event: any) {
		const keyPressed = event.key;

		if (keyPressed === 'ArrowLeft') {
			previousImage();
		} else if (keyPressed === 'ArrowRight') {
			nextImage();
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="carousel" {style}>
	<button
		aria-label={$dictionary.nextImage}
		style="cursor: default;"
		on:click={() => {
			nextImage();
			stopAutomaticImageChanges();
		}}
	>
		<img
			class:disappearAndAppear
			src={images[currentFileIndex]}
			alt={imageDescriptions ? imageDescriptions[currentFileIndex] : ''}
		/>
	</button>

	<div class="controller">
		<CarrouselController
			on:interaction={stopAutomaticImageChanges}
			array={images}
			bind:currentFileIndex
		/>
	</div>

	<button
		on:click={() => {
			previousImage();
			stopAutomaticImageChanges();
		}}
		class="previous arrow"
		aria-label={$dictionary.previousImage}><ion-icon name="chevron-back" /></button
	>
	<button
		on:click={() => {
			nextImage();
			stopAutomaticImageChanges();
		}}
		class="next arrow"
		aria-label={$dictionary.nextImage}><ion-icon name="chevron-forward" /></button
	>
</div>

<style>
	.carousel {
		position: relative;

		display: grid;
		margin: auto;

		aspect-ratio: 4 / 3;
		width: fit-content;
		border-radius: 25px;
		box-shadow: 0 0 1.5rem var(--content-1);

		overflow: hidden;
		overflow: clip;
	}

	button {
		display: flex;
	}

	img {
		-webkit-user-drag: none;
	}

	.controller {
		position: absolute;
		top: 1rem;
		left: 50%;
		translate: -50% 0;

		border-radius: 50px;
		padding: 0.8rem;
		max-width: 100%;

		background-color: var(--main-7);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
	}

	.arrow {
		--horizontalOffset: 0.8rem;

		position: absolute;
		top: 50%;
		translate: 0 -50%;

		padding: 0.5em;
		border-radius: 50%;
		background-color: var(--main-7);
		transition: background-color 0.2s;
	}

	.arrow:hover,
	.arrow:focus-visible {
		background-color: var(--main-9);
	}

	.previous {
		left: var(--horizontalOffset);
	}

	.next {
		right: var(--horizontalOffset);
	}

	.arrow ion-icon {
		font-size: 2rem;
	}

	@media screen and (max-width: 600px) {
		.controller {
			top: unset;
			bottom: 0.5rem;
			padding: 0.6rem;
		}

		.arrow {
			--horizontalOffset: 0.4rem;
		}

		.arrow ion-icon {
			font-size: 1.5rem;
		}
	}
</style>
