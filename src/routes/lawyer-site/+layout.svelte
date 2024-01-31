<script lang="ts">
	import './app.css';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { language } from './stores';
	import { sleep } from './functions';

	import Nav from './components/nav.svelte';
	import Footer from './components/footer.svelte';
	import Preloader from './components/preloader.svelte';
	import NavigationLinks from './components/navigationLinks.svelte';
	import HelpSpace from './components/helpSpace.svelte';
	import { Toaster } from 'svelte-french-toast';

	let disappearAndAppear: boolean = false;

	$: $language, checkDisappearAndAppear();

	async function checkDisappearAndAppear() {
		disappearAndAppear = false;
		await sleep(1);
		disappearAndAppear = true;
		await sleep(1100);
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
	<link rel="icon" href="/images/lawyers/logoFull.webp" />
</svelte:head>

<Toaster />

<div class:disappearAndAppear>
	<header>
		<div class="nav-main">
			<Nav />
		</div>

		<NavigationLinks />
	</header>

	<main bind:this={mainContent}>
		<slot />
		<HelpSpace />
	</main>

	<footer>
		<Footer />
	</footer>

	{#if !ready}
		<Preloader animation="default" />
	{/if}
</div>

<style>
	div {
		min-height: 100%;
		display: grid;
		grid-template-rows: auto 1fr auto;
		align-items: center;
	}

	header {
		z-index: 3;
		position: sticky;
		top: 0;
		left: 0;

		background-color: var(--main);
		transition: background-color 0.5s;
	}

	.nav-main {
		border-bottom: solid 1px var(--content-5);
		display: flex;
		justify-content: center;
	}

	main {
		max-width: 100%;
		align-self: stretch;
	}

	footer {
		border-top: solid 1px var(--content-5);
	}

	:global(.disappearAndAppear) {
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
</style>
