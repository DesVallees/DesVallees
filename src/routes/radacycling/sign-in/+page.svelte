<script lang="ts">
	import { fade } from 'svelte/transition';
	import { baseRoute, dictionary } from '../stores';
	import toast from 'svelte-french-toast';

	function handleFormSubmission() {
		toast.error('An error has occurred...', { position: 'bottom-center' });
	}
</script>

<svelte:head>
	<title>Sign In | RADA Cycling Wear</title>
	<meta
		name="description"
		content="Sign in to your Rada Cycling Wear account for secure access to your custom cycling wear orders, preferences, and exclusive updates. Experience a seamless connection to your cycling world. Ready for a smoother ride? Sign in now."
	/>
</svelte:head>

<div class="logIn" in:fade>
	<h1>Create an account</h1>
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
		<div class="inputGroup">
			<ion-icon name="shield-checkmark" />
			<input type="password" placeholder="Confirm Password" class="ghostButton" required />
		</div>

		<button type="submit" class="button">Create an account</button>
	</form>

	<hr />

	<div class="align" style="justify-content: center; font-size: 1.05rem;">
		<p>Already have an account?</p>
		<a href="{baseRoute}/my-account" class="link">Log In</a>
	</div>
</div>

<style>
	.logIn {
		display: flex;
		flex-direction: column;
		justify-content: center;

		max-width: 450px;
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

	.button {
		width: 100%;
		padding: 0.625em;
		margin-top: 0.5rem;

		color: var(--main);
		text-transform: capitalize;
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
</style>
