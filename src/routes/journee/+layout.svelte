<script lang="ts">
	import './app.css';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { baseImageRoute, baseRoute, language, user, dataReady } from './stores';
	import { sleep } from './functions';
	import { Toaster } from 'svelte-french-toast';
	import { goto } from '$app/navigation';
	import { auth } from '$lib/firebase/journee';

	import BackgroundCircle from './components/backgroundCircle.svelte';
	import Preloader from './components/preloader.svelte';

	const loggedForbiddenRoutes = ['sign-in', 'log-in'];
	const outsiderForbiddenRoutes = ['create'];

	function checkRoute(url: string) {
		if (!$dataReady) return;

		let forbiddenRoutes;
		if ($user) {
			forbiddenRoutes = loggedForbiddenRoutes;
		} else {
			forbiddenRoutes = outsiderForbiddenRoutes;
		}

		for (let i = 0; i < forbiddenRoutes.length; i++) {
			const path = forbiddenRoutes[i];
			if (url === `${baseRoute}/${path}`) {
				goto(baseRoute);
				return;
			}
		}
	}

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

			checkRoute(newUrl);
		};

		auth.onAuthStateChanged(async (user) => {
			layoutReady = false;

			if (user) {
				$user = user;
			} else {
				$user = undefined;
				$dataReady = true;
			}

			checkRoute($page.url.pathname);
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
	<main bind:this={mainContent}>
		<slot />
	</main>

	{#if !layoutReady || !$dataReady}
		<Preloader animation="dots">
			<h1 style="font-size: 3rem;">Journée</h1>
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
