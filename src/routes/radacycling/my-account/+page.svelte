<script lang="ts">
	import { fade } from 'svelte/transition';
	import Logo from '../components/logo.svelte';
	import { baseRoute } from '../stores';

	let email = '';
	let password = '';
	let errorMessage = '';

	function validateForm() {
		if (email.trim() === '' || password.trim() === '') {
			errorMessage = 'Please enter both email and password.';
			return false;
		}
		// Add more specific validation as needed (e.g., format of the email)
		errorMessage = '';
		return true;
	}

	function login() {
		if (!validateForm()) {
			return;
		}
		// Perform login logic here, e.g., API call to server
		console.log('Logging in with', email, password);
		// Reset form fields
		email = '';
		password = '';
	}
</script>

<div class="account" in:fade>
	<div class="login-container">
		<h1>Welcome to Rada Cycling Wear</h1>
		{#if errorMessage}
			<p class="error-message">{errorMessage}</p>
		{/if}
		<form on:submit|preventDefault={login}>
			<div class="form-group">
				<label for="email">Email:</label>
				<input type="email" id="email" bind:value={email} />
			</div>
			<div class="form-group">
				<label for="password">Password:</label>
				<input type="password" id="password" bind:value={password} />
			</div>
			<button type="submit" class="login-button">Login</button>
		</form>
		<a href="{baseRoute}/sign-in" class="link sign-in">Don't have an account? Sign in!</a>
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
	.account {
		margin: auto;
		display: grid;
		place-items: center;
		place-content: center;
		min-height: 100%;
	}

	.login-container {
		margin: clamp(5rem, 15vw, 8rem) auto;
		width: 100vw;
		max-width: 400px;
		padding: 20px;
		border: 1px solid #ccc;
		border-radius: 8px;
		background-color: #f9f9f9;
		text-align: center;
	}

	@media screen and (max-width: 750px) {
		.login-container {
			border: none;
			background-color: transparent;
		}
	}

	h1 {
		font-size: 1.5rem;
		margin-bottom: 1.5rem;
	}

	.form-group {
		margin-bottom: 20px;
		text-align: left;
	}

	label {
		display: block;
		margin-bottom: 5px;
	}

	input[type='email'],
	input[type='password'] {
		width: 100%;
		padding: 10px;
		border: 1px solid #ccc;
		border-radius: 4px;
	}

	.login-button {
		width: 100%;
		padding: 10px;
		background-color: var(--interactive);
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}

	.login-button:hover {
		filter: brightness(120%);
	}

	.sign-in {
		font-weight: normal;
		margin: auto;
		margin-top: 0.5rem;
	}

	.error-message {
		color: red;
		margin-bottom: 20px;
	}
</style>
