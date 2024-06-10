<script lang="ts">
	import { fade } from 'svelte/transition';
	import { dictionary, user } from './stores';
	import { authHandlers } from './auth';
	import Landing from './components/landing.svelte';
	import NewEntry from './components/newEntry.svelte';
	import { myPosts } from './database';

	let createEntry: boolean = false;

	function openNewEntry() {
		createEntry = true
	}
</script>

{#if $user}
	<div class="home" in:fade>
		<h1>{$dictionary.welcome} {$user.email}</h1>
		<button class="button" on:click={authHandlers.logout}>{$dictionary.logOut}</button>

		{#if $myPosts.length > 0}
			<div class="postList">
				{#each $myPosts as post}
					<div class="post">
						<h2>{post.title}</h2>
						<p class="date">{new Date(post.date).toLocaleDateString()}</p>
						{#if post.location}
							<p>Location: {post.location}</p>
						{/if}
		
						<div class="content">
							{#each post.content as contentItem}
								<div class="content-item">
									{#if contentItem.type === 'text'}
										<p>{contentItem.content}</p>
										{#if contentItem.listItemType}
											<p>List Type: {contentItem.listItemType}</p>
										{/if}
									{:else if contentItem.type === 'image'}
										<figure>
											<img src={contentItem.src} alt={contentItem.alt} />
											{#if contentItem.caption}
												<figcaption>{contentItem.caption}</figcaption>
											{/if}
										</figure>
									{:else if contentItem.type === 'video'}
										<figure>
											<video src={contentItem.src} controls>
												<track kind="captions"/>
											</video>
											{#if contentItem.caption}
												<figcaption>{contentItem.caption}</figcaption>
											{/if}
										</figure>
									{/if}
								</div>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		{:else}
			<p>{$dictionary.noPostsYet}</p>
		{/if}

		<button class="newEntry" on:click={openNewEntry}>
			<ion-icon name="add-outline" style="--ionicon-stroke-width: 60px"></ion-icon>
		</button>
	</div>

	{#if createEntry}
		 <NewEntry bind:createEntry {...$myPosts[0]} />
	{/if}
{:else}
	<Landing/>
{/if}

<svelte:head>
	<title>Journée - {$dictionary.slogan}</title>
	<meta name="description" content={$dictionary.discoverTranquility} />
</svelte:head>

<style>
	.home {
		position: relative;
		
		display: grid;
		justify-items: center;
		align-content: baseline;
		gap: 1.5rem;

		padding: 0 10%;
	}

	.postList {
		margin: 2rem auto;
	}

	.post {
		display: grid;
		gap: .3em;
		
		min-width: 25rem;
		font-size: 1.1em;
	}

	.date {
		font-style: italic;
		font-size: .9em;
	}

	.newEntry {
		position: fixed;
		right: 10%;
		bottom: 10%;

		display: flex;
		font-size: 1.5em;
		padding: .5em;

		border-radius: 50%;
		background-color: var(--interactive-8);
		box-shadow: 1px 1px 5px var(--content-1);
		scale: 1;

		transition: all .2s;
	}

	.newEntry:hover,
	.newEntry:focus-visible {
		background-color: var(--interactive);
		scale: 1.05;
	}

	h1 {
		font-size: 1.4rem;
	}
</style>
