<script lang="ts">
	import { goto } from '$app/navigation';
	import { slide } from 'svelte/transition';
	import { deletePostById, myPosts, type Post } from '../database';
	import { baseRoute, dictionary } from '../stores';
	import { escapeAndFormat } from '../functions';

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
			<h1 class="title">{post.title}</h1>
			<p class="date">
				{postDate.toLocaleDateString()} - {String(postDate.getHours()).padStart(
					2,
					'0',
				)}:{String(postDate.getMinutes()).padStart(2, '0')}
			</p>
		</div>
		<div class="center">
			{#if post.location}
				<p>Location: {post.location}</p>
			{/if}
		</div>
		<div class="right">
			<button class="ionButton edit" on:click={editPost} aria-label={$dictionary.editPost}>
				<ion-icon name="create-outline" />
			</button>
			<button
				class="ionButton delete"
				on:click={deletePost}
				aria-label={$dictionary.deletePost}
			>
				<ion-icon name="trash-outline" />
			</button>
		</div>
	</header>

	<main class="content">
		{@html escapeAndFormat(post.content)}
	</main>
</div>

<style>
	.post {
		display: grid;
		gap: 1em;

		width: min(60ch, 100%);
		padding: 2rem 0;
		border-bottom: solid 1px var(--content-5);

		overflow: auto;
		text-wrap: pretty;
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

	/* Bold text */
	:global(.content strong) {
		font-weight: bold;
	}

	/* Italic text */
	:global(.content em) {
		font-style: italic;
	}

	/* Crossed-out text */
	:global(.content s) {
		text-decoration: line-through;
	}

	/* Monospace text */
	:global(.content pre) {
		background-color: var(--content-1);
		border: 1px solid var(--content-3);
		border-radius: 5px;
		padding: 0.5em;
		margin-top: 0.5em;
		font-family: monospace;
		white-space: pre-wrap;
		word-break: break-all;
		overflow-x: auto;
	}

	/* Lists */
	:global(.content ul, .content ol) {
		margin: 0.5em 0 0.3em 2ch;
		padding-left: 0;
	}

	:global(.content ul) {
		list-style-type: disc;
	}

	:global(.content ol) {
		list-style-type: none;
	}

	:global(.content li) {
		margin-bottom: 0.2em;
	}

	/* Subtitles */
	:global(.content h2) {
		font-size: 1.1em;
		margin: 0.5em 0;
	}
</style>
