<script lang="ts">
	import { fade } from 'svelte/transition';
	import { baseRoute, dictionary, user } from './stores';
	import { authHandlers } from './auth';
	import Landing from './components/landing.svelte';
	import { myPosts, type Post as PostType } from './database';
	import Post from './components/post.svelte';
	import { goto } from '$app/navigation';
	import Footer from './components/footer.svelte';

	// Sorting function to sort posts by 'date' property in descending order
	const sortByDateDesc = (a: PostType, b: PostType) => b.date - a.date;

	$: sortedPosts = [...$myPosts].sort(sortByDateDesc); // Sort the posts array

	function openNewEntry() {
		goto(`${baseRoute}/create`);
	}

	let newEntry: HTMLButtonElement;
</script>

<div in:fade class="baseRoute">
	{#if $user}
		<div class="home" in:fade>
			{#if $myPosts.length > 0}
				<div class="postList">
					{#each sortedPosts as post, index (post.id)}
						<Post {post} />
					{/each}
				</div>
			{:else}
				<p class="noPosts">{$dictionary.noPostsYet}</p>
			{/if}

			<button class="button" on:click={authHandlers.logout}>{$dictionary.logOut}</button>

			<button class="newEntry" bind:this={newEntry} on:click={openNewEntry}>
				<ion-icon name="add-outline" style="--ionicon-stroke-width: 60px" />
			</button>

			<Footer />
		</div>
	{:else}
		<Landing />
	{/if}
</div>

<svelte:window
	on:keypress={(event) => {
		if (event.key == 'n' || event.key == 'N') {
			event.preventDefault();
			newEntry.click();
		}
	}}
/>

<svelte:head>
	<title>Journée - {$dictionary.slogan}</title>
	<meta name="description" content={$dictionary.discoverTranquility} />
</svelte:head>

<style>
	.baseRoute {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;
	}

	.home {
		position: relative;

		display: grid;
		justify-items: center;
		align-content: baseline;
		gap: 1rem;

		padding: 2rem clamp(1.5rem, 7vw, 10%);
	}

	.button {
		font-size: 0.95rem;
		margin-top: 3rem;
	}

	.postList {
		display: grid;
		justify-items: center;

		width: 100%;
	}

	.noPosts {
		color: var(--content-9);
		margin-top: 1rem;
	}

	.newEntry {
		position: fixed;
		right: 10%;
		bottom: 10%;

		display: flex;
		font-size: 1.5em;
		padding: 0.5em;

		border-radius: 50%;
		background-color: var(--interactive-8);
		box-shadow: 1px 1px 5px var(--content-1);
		scale: 1;

		transition: all 0.2s;
	}

	.newEntry:hover,
	.newEntry:focus-visible {
		background-color: var(--interactive);
		scale: 1.05;
	}

	@media screen and (max-width: 700px) {
		.newEntry {
			right: 5%;
			bottom: 5%;

			background-color: var(--interactive);
		}
	}
</style>
