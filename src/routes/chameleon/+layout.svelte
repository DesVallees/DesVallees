<script lang="ts">
	import './app.css';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { baseImageRoute, baseRoute, language, dataReady, dictionary } from './stores';
	import { sleep } from './functions';
	import { Toaster } from 'svelte-french-toast';
	import Preloader from './components/preloader.svelte';

	let disappearAndAppear: boolean = false;

	$: $language, checkDisappearAndAppear();

	async function checkDisappearAndAppear() {
		disappearAndAppear = false;
		await sleep(1);
		disappearAndAppear = true;
		await sleep(2000);
		disappearAndAppear = false;
	}

	let layoutReady: boolean = false;
	$: $page.url.pathname, handleURLChange($page.url.pathname);
	$: $dataReady, handleURLChange($page.url.pathname);
	let mainContent: HTMLElement;
	let handleURLChange: (newUrl: string) => void = () => {};

	onMount(() => {
		layoutReady = true;

		handleURLChange = (newUrl: string) => {
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
	<link rel="icon" href="{baseImageRoute}/logoWhite.webp" />
</svelte:head>

<Toaster />

<div class:disappearAndAppear>
	<main bind:this={mainContent}>
		<slot />
	</main>

	{#if !layoutReady || !$dataReady}
		<Preloader animation="dots">
			<h1 style="font-size: 3rem;">{$dictionary.chameleon}</h1>
		</Preloader>
	{/if}
</div>

<style>
	div {
		min-height: 100%;
		display: grid;
		grid-template-rows: 1fr;
		align-items: center;
	}

	main {
		max-width: 100vw;
		display: grid;
		align-self: stretch;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;
	}

	.disappearAndAppear {
		animation: disappearAndAppear 1.5s;
	}

	@keyframes disappearAndAppear {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
</style>
