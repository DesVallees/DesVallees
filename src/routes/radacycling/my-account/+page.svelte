<script lang="ts">
	import { fade } from 'svelte/transition';
	import { baseRoute, dictionary } from '../stores';
	import toast from 'svelte-french-toast';

	function handleFormSubmission() {
		toast.error('An error has occurred...', { position: 'bottom-center' });
	}
</script>

<div class="logIn" in:fade>
	<h1>Log in to RADA</h1>
	<form on:submit|preventDefault={handleFormSubmission}>
		<div class="inputGroup">
			<ion-icon name="mail" />
			<input
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
			<input type="password" placeholder="Password" class="ghostButton" required />
		</div>
		<button type="button" class="link forgotPassword" on:click={handleFormSubmission}
			>Forgot Password</button
		>

		<button type="submit" class="button">Log In</button>
	</form>

	<hr />

	<button
		type="button"
		class="button googleLogIn"
		aria-label="Log in with Google"
		on:click={() =>
			toast.error('Error occurred connecting with Google Authentication System.', {
				position: 'bottom-center',
			})}
	>
		<ion-icon name="logo-google" />
		Log in with google
	</button>

	<hr />

	<div class="align" style="justify-content: center; font-size: 1.05rem;">
		<p>Don't have an account?</p>
		<a href="{baseRoute}/sign-in" class="link">Sign In</a>
	</div>
</div>

<svelte:head>
	<title>Account | RADA Cycling Wear</title>
	<meta
		name="description"
		content="Manage your Rada Cycling Wear profile with ease. Access your orders, track custom cycling wear progress, and update your preferences all in one place. Simplify your cycling journey with personalized account settings. Log in to elevate your experience!"
	/>
</svelte:head>

<style>
	.logIn {
		display: flex;
		flex-direction: column;
		justify-content: center;

		max-width: 420px;
		min-height: 100%;
		padding: 6rem 1.5rem;
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
		background-color: transparent;
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

		color: var(--main);
		text-transform: capitalize;
	}

	.googleLogIn {
		padding: 0.5em;
		margin-top: 0;
		margin-bottom: 1.25rem;
	}

	.googleLogIn {
		background-color: rgb(206, 51, 12);
	}

	.googleLogIn:hover,
	.googleLogIn:focus-visible {
		background-color: rgb(206, 12, 12);
	}

	.align {
		display: flex;
		flex-wrap: wrap;
		column-gap: 1ch;
		align-items: center;
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
