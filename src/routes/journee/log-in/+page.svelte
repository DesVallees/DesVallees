<script lang="ts">
	import { fade } from 'svelte/transition';
	import { dataReady, dictionary } from '../stores';
	import { authHandlers } from '../auth';
	import Preloader from '../components/preloader.svelte';
	import LandingNav from '../components/landingNav.svelte';
	import Footer from '../components/footer.svelte';

	let email: string;
	let password: string;

	let authenticating: boolean = false;

	async function logIn() {
		authenticating = true;
		await authHandlers.login(email, password).then(() => {
			email = '';
		});
		password = '';
		authenticating = false;
	}
</script>

{#if authenticating}
	<Preloader animation="dots">
		<h1 style="font-size: 3rem;">Journée</h1>
	</Preloader>
{/if}

<div class="logIn" in:fade>
	<LandingNav />

	<main>
		<h1>{$dictionary.logInToJournee}</h1>
		<form on:submit|preventDefault={logIn}>
			<div class="inputGroup">
				<ion-icon name="mail" />
				<input
					bind:value={email}
					type="email"
					placeholder={$dictionary.email}
					class="ghostButton"
					required
					autocapitalize="none"
					autocorrect="false"
					spellcheck="false"
				/>
			</div>
			<div class="inputGroup">
				<ion-icon name="lock-closed" />
				<input
					bind:value={password}
					type="password"
					placeholder={$dictionary.password}
					class="ghostButton"
					required
				/>
			</div>
			<button type="button" class="link forgotPassword">{$dictionary.forgotPassword}</button>

			<button type="submit" class="button">{$dictionary.logIn}</button>
		</form>

		<hr />

		<button type="button" class="button googleLogIn" aria-label={$dictionary.logInWithGoogle}>
			<ion-icon name="logo-google" />
			{$dictionary.logInWithGoogle}
		</button>
		<button type="button" class="button appleLogIn" aria-label={$dictionary.logInWithApple}>
			<ion-icon name="logo-apple" />
			{$dictionary.logInWithApple}
		</button>

		<hr />

		<div class="align" style="justify-content: center; font-size: 1.05rem;">
			<p>{$dictionary.newToJournee}</p>
			<a href="/journee/sign-in" class="link">{$dictionary.createAnAccount}</a>
		</div>
	</main>

	<Footer />
</div>

<svelte:head>
	<title>{$dictionary.logIn}</title>
	<noscript>
		<title>Log In</title>
	</noscript>

	<meta name="description" content={$dictionary.secureAccessMessage} />
</svelte:head>

<style>
	.logIn {
		display: grid;
		grid-template-rows: auto 1fr auto;
	}

	main {
		display: flex;
		flex-direction: column;
		justify-content: center;

		max-width: 420px;
		min-height: 100%;
		padding: 1.5rem;
		margin: auto;
	}

	h1 {
		text-wrap: balance;
	}

	form {
		display: grid;
		gap: 1rem;

		width: 100%;
		margin-top: 2rem;
	}

	input {
		width: 100%;
		padding: 1em;
		padding-left: 3em;
	}

	.inputGroup {
		position: relative;
	}

	.inputGroup ion-icon {
		position: absolute;
		top: 50%;
		left: 0.7em;
		translate: 0 -50%;

		color: var(--interactive);
	}

	.forgotPassword {
		justify-self: end;
		font-weight: 600;
		font-size: 0.9rem;
		margin-top: calc(-1rem - 0.1em);
		color: var(--content-9);
	}

	.button {
		width: 100%;
		padding: 0.625em;
		margin-top: 0.5rem;
	}

	.googleLogIn,
	.appleLogIn {
		padding: 0.5em;
		margin-top: 0;
		margin-bottom: 1.25rem;
	}

	.googleLogIn {
		border-color: rgb(206, 12, 12);
		background-color: rgba(206, 12, 12, 0.7);
	}

	.googleLogIn:hover,
	.googleLogIn:focus-visible {
		background-color: rgb(206, 12, 12);
	}

	.appleLogIn {
		border-color: var(--content-7);
		background-color: rgba(14, 14, 14, 0.5);
	}

	.appleLogIn:hover,
	.appleLogIn:focus-visible {
		background-color: rgb(14, 14, 14);
	}

	.align {
		display: flex;
		flex-wrap: wrap;
		column-gap: 1ch;
		align-items: end;
	}

	hr {
		border: none;
		border-top: 3px solid var(--content-5);
		overflow: visible;
		text-align: center;
		height: 5px;
		margin: 2.5rem 10% 1rem;
	}

	hr:after {
		background: var(--main);
		content: '';
		padding: 0 10%;
		position: relative;
		top: -13px;
	}

	hr:first-of-type {
		margin: 2rem 10%;
	}
</style>
