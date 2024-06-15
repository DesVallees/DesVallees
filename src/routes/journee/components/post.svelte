<script lang="ts">
	import { goto } from '$app/navigation';
	import { slide } from 'svelte/transition';
	import { deletePostById, myPosts, type Post } from '../database';
	import { baseRoute } from '../stores';

	export let post: Post;

	const postDate: Date = new Date(post.date);

	function editPost() {
		goto(`${baseRoute}/create?entryID=${post.id}`);
	}
	function deletePost() {
		deletePostById($myPosts, post.id);
	}
</script>

<div class="post" transition:slide={{ duration: 200 }}>
	<header>
		<div class="left">
			<h2 class="title">{post.title}</h2>
			<p class="date">
				{postDate.toLocaleDateString()} - {postDate.getHours()}:{postDate.getMinutes()}
			</p>
		</div>
		<div class="center">
			{#if post.location}
				<p>Location: {post.location}</p>
			{/if}
		</div>
		<div class="right">
			<button class="ionButton edit" on:click={editPost}>
				<ion-icon name="create-outline" />
			</button>
			<button class="ionButton delete" on:click={deletePost}>
				<ion-icon name="trash-outline" />
			</button>
		</div>
	</header>

	<main>
		<p class="content">{post.content}</p>
	</main>
</div>

<style>
	.post {
		display: grid;
		gap: 1em;

		width: min(500px, 100%);
		padding: 2rem 0;
		border-bottom: solid 1px var(--content-5);
	}

	header {
		display: grid;
		grid-template-columns: auto 1fr auto;
		align-items: stretch;
		gap: 2ch;
	}

	.left {
		display: grid;
		gap: 0.3em;
	}

	.right {
		display: flex;
		gap: 0.5ch;
	}

	.title {
		font-size: 1.2em;
	}

	.date {
		font-style: italic;
		font-size: 0.95em;
		color: var(--content-8);
	}

	.ionButton {
		display: grid;
		height: fit-content;

		border-radius: 50%;
		padding: 0.4em;

		transform: translateY(-5%);

		background-color: transparent;
		transition: all 0.2s;
	}

	.ionButton:hover,
	.ionButton:focus-visible {
		background-color: var(--content-1);
	}

	ion-icon {
		font-size: 1.25em;
	}

	.delete {
		color: var(--complementary);
	}

	.content {
		line-height: 1.5;
	}
</style>
