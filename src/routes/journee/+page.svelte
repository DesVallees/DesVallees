<script lang="ts">
	import { fade } from 'svelte/transition';
	import { dictionary, user } from './stores';
	import { authHandlers } from './auth';
	import Landing from './components/landing.svelte';
</script>

{#if $user}
	<div class="home" in:fade>
		<h1>{$dictionary.welcome} {$user.email}</h1>
		<button class="button" on:click={authHandlers.logout}>{$dictionary.logOut}</button>
	</div>
{:else}
	<Landing/>
{/if}

<svelte:head>
	<title>Journée - {$dictionary.slogan}</title>
	<meta name="description" content={$dictionary.discoverTranquility} />
</svelte:head>

<style>
	.home {
		display: grid;
		place-items: center;
		place-content: center;
		gap: 1.5rem;
	}

	h1 {
		font-size: 1.4rem;
	}
</style>
