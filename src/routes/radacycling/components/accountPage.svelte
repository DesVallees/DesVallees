<script lang="ts">
	import { fade } from 'svelte/transition';
	import { userEmail } from '../stores';
	import { authHandlers } from '../auth';

	export let authenticating: boolean;

	async function logOut() {
		authenticating = true;
		await authHandlers.logout();
		authenticating = false;
	}
</script>

<div class="account" in:fade>
	<h1>My Account</h1>
	<div class="email-section">
		<h2>Email</h2>
		<p>{$userEmail}</p>
	</div>
	<div class="email-section">
		<h2>My Orders</h2>
		<div class="orders">
			<i class="noOrdersParagraph">Your order history is empty.</i>
		</div>
	</div>
	<button class="logOutButton button" on:click={logOut} disabled={authenticating}>
		<span>Log Out</span>
		<ion-icon name="log-out-outline" />
	</button>
</div>

<style>
	.account {
		display: flex;
		flex-direction: column;
		gap: 2rem;

		max-width: 700px;
		padding: 0 2rem;
		margin: 6rem auto 5rem;
		border-radius: 12px;

		font-size: clamp(0.95rem, 2.5vw, 1.1rem);
	}

	h1 {
		margin-bottom: 1rem;
		font-size: 1.8em;
		text-align: center;
	}

	.email-section {
		margin-bottom: 1rem;
	}

	h2 {
		margin-bottom: 0.5rem;
		font-size: 1.2em;
	}

	.logOutButton {
		gap: 0.8em;

		padding: 0.6em 1.2em;
		margin: 0 auto;
		margin-top: 5rem;
		color: var(--main);
	}

	.logOutButton ion-icon {
		font-size: 1.5em;
		vertical-align: middle;
		--ionicon-stroke-width: 48px;
	}

	.orders {
		display: grid;
		place-items: center;

		padding: 2rem 0.5rem;
		border-radius: 5px;

		box-shadow: inset 0 4px 6px rgba(0, 0, 0, 0.1);
	}

	.noOrdersParagraph {
		color: var(--content-8);
		font-weight: 600;
	}
</style>
