<script lang="ts">
	import './app.css';
	import { onMount } from 'svelte';
	import { dictionary, language } from './stores';
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

	onMount(() => {
		layoutReady = true;
	});
</script>

<svelte:head>
	<meta name="author" content="Santiago Ovalles" />
	<link rel="icon" href="https://fav.farm/🧠" />
</svelte:head>

<Toaster />

<div class:disappearAndAppear>
	<main>
		<slot />
	</main>

	{#if !layoutReady}
		<Preloader animation="dots">
			<h1 style="font-size: 3rem;">{$dictionary.charades}</h1>
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
