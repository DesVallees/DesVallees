<script lang="ts">
	import { slide } from 'svelte/transition';
	import { baseRoute, dictionary, user, dataReady } from '../stores';
	import {
		generateUniqueId,
		getPostById,
		myPosts,
		updateOrCreatePost,
		type Post,
	} from '../database';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

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

	let entry: Post;

	// Create a shallow copy of the entry object to avoid changing the $myPosts array when making changes.
	let entryCopy: Post;

	function closeModal() {
		goto(baseRoute);
	}

	function saveChanges(close: boolean = false) {
		updateOrCreatePost($myPosts, entryCopy);

		if (close) {
			closeModal();
		}
	}

	const setUp = () => {
		if ($dataReady && $user) {
			newEntry.authorId = $user.uid;
			entry = entryID ? getPostById($myPosts, entryID) || newEntry : newEntry;
			entryCopy = { ...entry };
		}
	};

	$: $dataReady, setUp();
</script>

<svelte:head>
	{#if entryID}
		<title>{$dictionary.editPost}</title>
	{:else}
		<title>{$dictionary.newPost}</title>
	{/if}
	<meta name="description" content={$dictionary.discoverTranquility} />
</svelte:head>

<div class="create" in:slide={{ axis: 'y', duration: 500 }}>
	{#if entryCopy}
		<h1>{entryCopy.title || $dictionary.postTitle}</h1>

		<main>
			<!-- svelte-ignore a11y-autofocus -->
			<input
				type="text"
				class="title"
				bind:value={entryCopy.title}
				placeholder={$dictionary.postTitle}
				autofocus={!entryID}
			/>
			<textarea
				class="content"
				bind:value={entryCopy.content}
				placeholder={$dictionary.thinking}
			/>
		</main>
	{:else}
		<p>{$dictionary.errorOccurred}</p>
	{/if}
	<footer>
		<button class="button close" on:click={closeModal}>
			{$dictionary.discard}
		</button>

		<button class="button done" on:click={() => saveChanges(true)}>{$dictionary.done}</button>
	</footer>
</div>

<style>
	.create {
		display: grid;
		grid-template-rows: 1fr auto;

		max-width: 75ch;
		width: 100%;

		margin: 0 auto;
		padding: 2rem clamp(0.5rem, 4vw, 5%);
	}

	footer {
		display: flex;
		align-items: center;
		gap: 2ch;

		margin-bottom: 1.5rem;
	}

	h1 {
		display: none;
	}

	main {
		height: 100%;

		display: grid;
		grid-template-rows: auto 1fr;

		border-radius: 15px;
	}

	textarea,
	input {
		width: 100%;
		padding: 1rem 0.5rem;
	}

	.title {
		font-size: 1.4em;
		font-weight: bold;
	}

	.content {
		line-height: 1.5;
		border-top: solid 3px var(--interactive);
		border-bottom: solid 3px var(--interactive);
		box-shadow: 0 12px 10px -10px var(--interactive);

		resize: none;
	}

	footer {
		justify-content: end;

		margin-top: 1rem;
	}

	.button {
		min-width: 4rem;

		font-size: 1.05em;
	}
</style>
