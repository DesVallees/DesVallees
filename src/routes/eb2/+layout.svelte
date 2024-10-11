<script lang="ts">
	import './app.css';
	import { Toaster } from 'svelte-french-toast';
	import { baseImageRoute, language } from './stores';
	import { sleep } from './functions';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import Preloader from './components/preloader.svelte';
	import Footer from './sections/footer.svelte';

	let disappearAndAppear: boolean = false;

	$: $language, checkDisappearAndAppear();

	async function checkDisappearAndAppear() {
		disappearAndAppear = false;
		await sleep(1);
		disappearAndAppear = true;
		await sleep(2000);
		disappearAndAppear = false;
	}

	let ready: boolean = false;
	$: $page.url.pathname, goTop();
	let mainContent: HTMLElement;
	let goTop: () => void = () => {};

	onMount(() => {
		ready = true;

		goTop = () => {
			if (document) {
				document.body.scrollTop = 0;
				document.documentElement.scrollTop = 0;
				mainContent.scrollTop = 0;
			}
		};
	});
</script>

<svelte:head>
	<meta name="author" content="Santiago Ovalles" />
	<link rel="icon" href="{baseImageRoute}/logo-small.jpg" />
</svelte:head>

<Toaster />

<div class:disappearAndAppear>
	<main bind:this={mainContent}>
		<slot />
	</main>

	<Footer />

	{#if !ready}
		<Preloader animation="dots">
			<img src="{baseImageRoute}/logo-small.jpg" alt="Logo" />
		</Preloader>
	{/if}
</div>

<style>
	div {
		min-height: 100%;
		display: grid;
		grid-template-rows: 1fr auto;
		align-items: center;
	}

	main {
		height: 100%;
		z-index: 1;
	}

	.disappearAndAppear {
		animation: disappearAndAppear 1s;
	}

	@keyframes disappearAndAppear {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

	@media screen and (min-width: 500px) {
		:root {
			font-size: 120%;
		}
	}

	@media screen and (min-width: 1200px) {
		:root {
			font-size: 150%;
		}
	}
</style>
