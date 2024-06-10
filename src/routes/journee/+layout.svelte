<script lang="ts">
	import './app.css';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { baseImageRoute, baseRoute, language, user } from './stores';
	import { sleep } from './functions';
	import { Toaster } from 'svelte-french-toast';
	import { goto } from '$app/navigation';
	import { auth } from '$lib/firebase/journee';

	import Nav from './components/nav.svelte';
	import Footer from './components/footer.svelte';
	import BackgroundCircle from './components/backgroundCircle.svelte';
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

			if ($user && newUrl === `${baseRoute}/sign-in`) {
				goto(`${baseRoute}`);
			}
		};

		auth.onAuthStateChanged(async (user) => {
			layoutReady = false;

			if (user) {
				if (user.email && $page.url.pathname === `${baseRoute}/sign-in`) {
					goto(`${baseRoute}`);
				}

				$user = user;
			} else {
				$user = undefined;
			}

			layoutReady = true;
		});
	});
</script>

<svelte:head>
	<meta name="author" content="Santiago Ovalles" />
	<link rel="icon" href="{baseImageRoute}/logoWhite.webp" />
</svelte:head>

<Toaster />

<BackgroundCircle style="opacity: .5;" />
<BackgroundCircle coordinates={{ left: '30%', top: '70%' }} style="opacity: .8;" />

<div class:disappearAndAppear>
	<nav>
		<Nav />
	</nav>

	<main bind:this={mainContent}>
		<slot />
	</main>

	<footer>
		<Footer />
	</footer>

	{#if !layoutReady}
		<Preloader animation="dots">
			<h1 style="font-size: 3rem;">Journée</h1>
		</Preloader>
	{/if}
</div>

<style>
	div {
		min-height: 100%;
		display: grid;
		grid-template-rows: auto 1fr auto;
		align-items: center;
	}

	nav {
		z-index: 3;
		position: sticky;
		top: 0;
		left: 0;

		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
	}

	main {
		max-width: 100vw;
		align-self: stretch;
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
