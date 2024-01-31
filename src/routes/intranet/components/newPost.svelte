<script lang="ts">
	import { slide } from 'svelte/transition';
	import Avatar from './avatar.svelte';
	import { dictionary, profile } from '../stores';
	import Picker from './picker.svelte';
	import PostForm from './postForm.svelte';
	import Base from './base.svelte';
	import { createEventDispatcher } from 'svelte';

	export let parentCommentPoster: string = '';
	export let parentCommentId: number | undefined = undefined;
	export let parentCommentVisibility: string = '';

	export let privateReceiverID: number | undefined = undefined;
	export let privateReceiverName: string = '';

	let pickerValue: number = 1;

	export let active: boolean = privateReceiverID || parentCommentPoster ? true : false;

	const dispatch = createEventDispatcher();

	function open() {
		active = true;
		dispatch('open');
	}

	function close() {
		active = false;
		dispatch('close');
	}

	let pickerValueToVisibilities: { [key: string]: string } = {
		'1': 'all',
		'2': $profile.department,
	};

	let textarea: HTMLTextAreaElement;
	let firstFocusableElement: HTMLButtonElement;
	let lastFocusableElement: HTMLButtonElement;
</script>

<Base
	firstFocusableElement={firstFocusableElement || textarea}
	{lastFocusableElement}
	bind:active
	autofocus={false}
>
	<div class="post" transition:slide|global={{ duration: 200 }}>
		<div class="avatar">
			<Avatar
				personName={$profile.fullName}
				image={$profile.profilePicture}
				width="70%"
				style="aspect-ratio: 1 / 1; height: fit-content;"
			/>
		</div>

		<div class="content">
			{#if !parentCommentPoster}
				<header>
					{$dictionary.visibleTo}

					{#if privateReceiverID}
						<Picker
							bind:button={firstFocusableElement}
							options={[
								{ id: 0, name: privateReceiverName },
								...$dictionary.teamNames,
							]}
							bind:value={pickerValue}
						/>
					{:else}
						<Picker
							bind:button={firstFocusableElement}
							options={$dictionary.teamNames}
							bind:value={pickerValue}
						/>
					{/if}
				</header>
			{:else}
				<span class="replyingTo">
					{$dictionary.replyingTo}
					{parentCommentPoster}...
				</span>
			{/if}

			<PostForm
				bind:textarea
				bind:lastFocusableElement
				on:submit={close}
				on:close={close}
				inputFontSize="1.1rem"
				{parentCommentId}
				visibility={parentCommentPoster
					? parentCommentVisibility
					: privateReceiverID && pickerValue === 0
					? privateReceiverID.toString()
					: pickerValueToVisibilities[pickerValue.toString()]}
			/>
		</div>
	</div>
</Base>

{#if !active && !privateReceiverID}
	<button class="newPostButton" on:click={open} aria-label={$dictionary.createNewPost}
		><ion-icon name="add-outline" /></button
	>
{/if}

<style>
	.newPostButton {
		position: fixed;
		bottom: 3em;
		right: 5em;

		border-radius: 50%;
		background-color: var(--interative);
		padding: 0.5em;

		box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.295);

		transition: all 0.2s;

		z-index: 2;
	}

	.newPostButton:hover,
	.newPostButton:focus {
		padding: 0.7em;
	}

	.newPostButton ion-icon {
		font-size: 3rem;
	}

	.post {
		position: relative;
		display: grid;
		grid-template-columns: auto 1fr;

		width: 100%;
		max-width: 700px;
		height: fit-content;
		border-radius: 20px;
		padding: 1em 2em;
		transition: all 0.3s;

		color: var(--content);
		box-shadow: 0 0 5px var(--contentDim);
		background-color: var(--main);
	}

	header {
		display: flex;
		gap: 1rem;
		font-size: 1.2rem;
		align-items: center;
		user-select: none;
		color: var(--contentDim);
	}

	.replyingTo {
		font-size: 1.1rem;
		color: var(--contentDimer);
		text-align: left;
		user-select: none;
	}

	.avatar {
		padding: 1em 0;
		position: relative;
		width: 5em;
		display: flex;
		justify-content: center;
	}

	.content {
		width: 100%;
		padding: 1.5em 1em;
		display: grid;
		gap: 1em;
	}

	@media screen and (max-width: 700px) {
		.newPostButton {
			bottom: 1em;
			right: 2em;
		}

		.post {
			padding: 0;
		}

		.avatar {
			width: 4.2em;
		}

		.content {
			padding: 1em 1em 1em 0;
		}
	}
</style>
