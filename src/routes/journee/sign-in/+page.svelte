<script lang="ts">
	import { fade } from 'svelte/transition';
	import { dictionary } from '../stores';
	import { authHandlers } from '../auth';
	import { anErrorOccurred } from '../functions';
	import Preloader from '../components/preloader.svelte';

	let email: string;
	let password: string;
	let confirmPassword: string;

	let authenticating: boolean = false;

	async function handleFormSubmission() {
		if (password === confirmPassword) {
			authenticating = true;
			await authHandlers.signin(email, password);
			authenticating = false;
		} else {
			anErrorOccurred($dictionary.passwordsDoNotMatch);
			password = '';
			confirmPassword = '';
		}
	}
</script>

{#if authenticating}
	<Preloader animation="dots">
		<h1 style="font-size: 3rem;">Journée</h1>
	</Preloader>
{/if}

<div class="logIn" in:fade>
	<h1>{$dictionary.beginYourJournee}</h1>
	<form on:submit|preventDefault={handleFormSubmission}>
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
		<div class="inputGroup">
			<ion-icon name="shield-checkmark" />
			<input
				bind:value={confirmPassword}
				type="password"
				placeholder={$dictionary.confirmPassword}
				class="ghostButton"
				required
			/>
		</div>

		<button type="submit" class="button">{$dictionary.createAnAccount}</button>
	</form>

	<hr />

	<div class="align" style="justify-content: center; font-size: 1.05rem;">
		<p>{$dictionary.alreadyHaveAnAccount}</p>
		<a href="/journee/log-in" class="link">{$dictionary.logYouIn}</a>
	</div>
</div>

<svelte:head>
	<title>{$dictionary.createAnAccount}</title>
	<noscript>
		<title>Create an account</title>
	</noscript>

	<meta name="description" content={$dictionary.signInMessage} />
</svelte:head>

<style>
	.logIn {
		display: flex;
		flex-direction: column;
		justify-content: center;

		max-width: 450px;
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

	.button {
		width: 100%;
		padding: 0.625em;
		margin-top: 0.5rem;
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
</style>
