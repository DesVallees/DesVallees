<script lang="ts">
	import { fade } from 'svelte/transition';
	import Post from './components/post.svelte';
	import NewPost from './components/newPost.svelte';
	import { dictionary, type Profile } from './stores';
	import type { PageData } from './$types';
	import { posts, profiles } from './futureDB';

	// export let data: PageData;

	// $: ({ posts } = data);
	// $: ({ profiles } = data);

	function findProfile(id: number): Profile | undefined {
		return profiles.find((profile: Profile) => profile.id === id);
	}
</script>

<NewPost />

<svelte:head>
	<title>{$dictionary.home}</title>
</svelte:head>

<div class="home" in:fade|global>
	{#if posts.length > 0}
		{#each posts as post, index (post.id)}
			<Post
				id={post.id}
				visibility={post.visibility}
				likes={post.likes}
				comments={post.comments}
				profileId={post.profileId}
				date={post.date}
				content={post.content}
				img={post.img || undefined}
				name={findProfile(post.profileId)?.fullName}
				profilePicture={findProfile(post.profileId)?.profilePicture}
			/>
		{/each}
	{:else}
		<div class="welcome">
			<ion-icon name="chatbubbles" />
			<h3>{$dictionary.noPostsToShow}</h3>
		</div>
	{/if}
</div>

<style>
	.home {
		display: flex;
		flex-direction: column;
		width: 100%;
		align-items: center;
	}

	.welcome {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		user-select: none;
		gap: 2em;
	}

	.welcome ion-icon {
		font-size: 4rem;
	}

	.welcome h3 {
		font-size: 1.2rem;
	}

	@media screen and (max-width: 700px) {
		.home {
			gap: 1em;
		}
	}
</style>
