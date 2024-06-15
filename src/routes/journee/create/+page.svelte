<script lang="ts">
	import { slide } from 'svelte/transition';
	import { baseRoute, dictionary, user } from '../stores';
	import {
		generateUniqueId,
		getPostById,
		myPosts,
		updateOrCreatePost,
		type Post,
	} from '../database';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { autoResizeTextarea } from '../functions';

	const newEntry: Post = {
		id: generateUniqueId($myPosts),
		authorId: $user?.uid || 'error',
		isAnonymous: false,
		publishedDate: new Date().getTime(),
		date: new Date().getTime(),
		location: '',
		title: '',
		content: '',
		media: [],
		visibility: {
			type: 'private',
		},
		isLocked: false,
		categoryID: 0,
		hashtags: [],
		isDraft: true,
		likes: 0,
	};

	const entryID: string | null = $page.url.searchParams.get('entryID');

	const entry = entryID ? getPostById($myPosts, entryID) || newEntry : newEntry;

	// Create a shallow copy of the entry object to avoid changing the $myPosts array when making changes.
	const entryCopy = { ...entry };

	function closeModal() {
		goto(baseRoute);
	}

	function saveChanges(close: boolean = false) {
		updateOrCreatePost($myPosts, entryCopy);

		if (close) {
			closeModal();
		}
	}
</script>

<svelte:head>
	<title>{$dictionary.newPost}</title>
	<meta name="description" content={$dictionary.discoverTranquility} />
</svelte:head>

<div class="create" in:slide={{ axis: 'y', duration: 500 }}>
	<header>
		<h1>{$dictionary.newPost}</h1>

		<button class="close" on:click={closeModal}>
			<ion-icon name="close-outline" />
		</button>
	</header>
	<main>
		<!-- svelte-ignore a11y-autofocus -->
		<input
			type="text"
			class="title"
			bind:value={entryCopy.title}
			placeholder={$dictionary.postTitle}
			autofocus
		/>
		<textarea
			class="content"
			bind:value={entryCopy.content}
			use:autoResizeTextarea
			placeholder={$dictionary.thinking}
			style="resize: none;"
		/>
	</main>
	<footer>
		<button class="button done" on:click={() => saveChanges(true)}>{$dictionary.done}</button>
	</footer>
</div>

<style>
	.create {
		width: 100%;

		padding: 1rem clamp(1.5rem, 7vw, 10%);
	}

	header {
		display: flex;
		align-items: center;

		margin-bottom: 2rem;
	}

	.close {
		display: flex;

		margin-left: auto;
		padding: 0.25em;
		border-radius: 50%;

		font-size: 1.25em;
		background-color: transparent;

		transition: all 0.2s;
	}

	.close:hover,
	.close:focus-visible {
		background-color: var(--content-1);
	}

	main {
		display: grid;

		border-radius: 15px;
		border: solid 3px var(--interactive);
	}

	textarea,
	input {
		width: 100%;
		padding: 1rem;
	}

	.title {
		font-size: 1.1em;
		font-weight: bold;
	}

	.content {
		line-height: 1.5;
		border-top: solid 3px var(--interactive);
	}

	.done {
		margin-top: 1rem;
		margin-left: auto;

		min-width: 4rem;

		font-size: 1.05em;
	}
</style>
