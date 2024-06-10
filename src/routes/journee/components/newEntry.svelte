<script lang="ts">
	import { slide } from "svelte/transition";
	import BackgroundCircle from "./backgroundCircle.svelte";
	import { dictionary, user } from "../stores";
	import { type PostContent, myPosts, updateOrCreatePost, type Visibility } from "../database";

    export let id: number = 0;
    export let authorId: string = $user?.uid || "";
    export let isAnonymous: boolean = false;
    export let publishedDate: number | undefined = undefined;
    export let date: number | undefined = undefined;
    export let location: string = '';
    export let title: string = '';
    export let content: PostContent[] = [
        {
            type: 'text',
            content: ''
        }
    ];
    export let visibility: Visibility = {
        type: 'private',
    }
    export let isLocked: boolean = false;
    export let categoryID: number = 0;
    export let hashtags: string[] = [];
    export let isDraft: boolean = true;
    export let likes: number = 0;
    
    export let createEntry;

    function closeModal() {
        createEntry = false;
    }

    function saveChanges(close: boolean = false) {
        updateOrCreatePost($myPosts, {
            id: id,
            authorId: authorId,
            isAnonymous: isAnonymous,
            publishedDate: publishedDate || new Date().getTime(),
            date: date || new Date().getTime(),
            location: location,
            title: title,
            content: content,
            visibility: visibility,
            isLocked: isLocked,
            categoryID: categoryID,
            hashtags: hashtags,
            isDraft: isDraft,
            likes: likes,
        })

        if (close) {
            closeModal()
        }
    }
</script>

<div class="newEntry" transition:slide={{axis: "y", duration: 500}}>
    <header>
        <h1>{$dictionary.newPost}</h1>

        <button class="close" on:click={closeModal}>
            <ion-icon name="close-outline"></ion-icon>
        </button>
    </header>
    <main>
        {#each content as item}
            {#if item.type === 'text'}
                 <textarea bind:value={item.content}></textarea>
            {/if}
        {/each}
    </main>
    <footer>
        <button class="button done" on:click={() => saveChanges(true)}>{$dictionary.done}</button>
    </footer>

    <BackgroundCircle style="opacity: .5;" />
</div>

<style>
    .newEntry {
        position: fixed;
        width: 100%;
        height: 100%;

        padding: 1rem 10%;

        background-color: var(--main);
        border-bottom: solid 3px var(--content);

        z-index: 10;
        overflow: hidden;
    }

    header {
        display: flex;
        align-items: center;

        margin-bottom: 2rem;
    }

    .close {
        display: flex;
        
        margin-left: auto;
        padding: .25em;
        border-radius: 50%;

        font-size: 1.25em;
        background-color: transparent;

        transition: all .2s;
    }

    .close:hover,
    .close:focus-visible {
        background-color: var(--content-1);
    }

    textarea {
        border: solid 2px var(--interactive);
        border-radius: 20px;
        width: 100%;
        padding: 1rem;
    }

    .done {
        margin-top: 1rem;
        margin-left: auto;

        min-width: 4rem;
    }
</style>