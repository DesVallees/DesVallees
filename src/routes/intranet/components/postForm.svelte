<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { dictionary, profile } from "../stores";
	import Separator from "./separator.svelte";
	import { autoResizeTextarea, convertDataUrlToUrl, escapeHTML } from "../functions";
    import toast from 'svelte-french-toast';
    import { goto, invalidateAll } from '$app/navigation';

    const dispatch = createEventDispatcher();

    export let parentCommentId: number | undefined = undefined
    export let visibility: string;



    export let inputFontSize: string = '1rem'
    export let textarea:HTMLTextAreaElement | undefined = undefined;
    export let lastFocusableElement:HTMLButtonElement | undefined = undefined;

    let addAnImage:HTMLInputElement;
    let imageSrc: string;

    function previewImage(event: any): void {
        const file = event.target.files[0];

        const reader = new FileReader();
        reader.onload = (event) => {
            if (typeof event.target?.result === 'string') {
                imageSrc = convertDataUrlToUrl(event.target.result);
            }
        };

        reader.readAsDataURL(file);
    }

    function removeImage() {
        imageSrc = '';
    }

    async function handleSubmit(this: HTMLFormElement) {
        const data = new FormData(this);

        if (textarea) {
            data.set('content', escapeHTML(textarea.value).replace(/\n/g, '<br>'));
        }

        data.append('profileID', $profile.id.toString());

        if (imageSrc) {
            data.append('img', imageSrc);
        }

        data.append('visibility', visibility);

        if (parentCommentId) {
            data.append('parentPostID', parentCommentId.toString());
        }
        

        const response = await fetch('/api/intranet/createPost', {
            method: 'POST',
            body: data
        });        

        if (response.status === 200) {
            if (location.pathname === '/intranet/people') {
                toast.success($dictionary.sent)
            }
            else if (parentCommentId && location.pathname !== `/intranet/replies/${parentCommentId}`) {
                goto(`/intranet/replies/${parentCommentId}`)
            } else {
                invalidateAll()
            }

            dispatch('submit')
        }else {
            toast.error($dictionary.error)
        }
    }

</script>

<form on:submit|preventDefault={handleSubmit} action="?/createPost">
    <!-- svelte-ignore a11y-autofocus -->
    <textarea bind:this={textarea} use:autoResizeTextarea style="font-size: {inputFontSize};" required rows="2" autofocus autocomplete="off" name="content" placeholder={$dictionary.whatDoYouWantToSay}></textarea>

    {#if imageSrc}

        <div style="position: relative;">
            <button class="removeImg" on:click={removeImage}><ion-icon name="close-outline"></ion-icon></button>
            <a href={imageSrc} target="_blank" aria-label={$dictionary.preview}>
                <img src={imageSrc} alt={$dictionary.preview}>
            </a>
        </div>
        

    {/if}

    <Separator width="100%" height="1px"/>
    
    <div class="buttons">
        <div class="addImage">
            {#if !imageSrc}
                <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                <label for="image" tabindex="0" on:keypress={(event) => {(event.key == 'Enter' || event.key == ' ') ? addAnImage.click() : ''}} aria-label={$dictionary.addAnImage}><ion-icon name="image-outline"></ion-icon></label>
                <input type="file" id="image" accept="image/*" style="display: none;" bind:this={addAnImage} on:change={previewImage}>
            {/if}
        </div>
        <div class="rightButtons">
            <button type="button" class="link" on:click={() => dispatch('close')}>{$dictionary.cancel}</button>
            <button bind:this={lastFocusableElement} type="submit" class="link">{$dictionary.submit}</button>
        </div>
    </div>


</form>

<style>

    form {
        display: grid;
        gap: 1em;
    }

    textarea {
        padding: .5em;
        width: 100%;
        word-wrap: break-word;
        overflow-wrap: break-word;
        resize: none;
        line-height: 1.5rem;
        background-color: transparent;
        transition: all .2s;
    }

    textarea:focus {
        outline: none;
    }

    img {
        max-width: 100%;
        height: auto;
        border-radius: 15px;
        box-shadow: 2px 2px 10px #00000033;
    }

    .removeImg {
        position: absolute;
        top: 5px;
        left: 5px;

        padding: .4em;
        border-radius: 50%;
        background-color: var(--mainDim);
        backdrop-filter: blur(10px);
        transition: all .2s;

        display: flex;
        justify-content: center;
        align-items: center;

        cursor: pointer;
    }

    .removeImg:hover,
    .removeImg:focus-visible {
        background-color: var(--main);
    }

    .removeImg ion-icon {
        font-size: 1.8rem;
    }

    .buttons{
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        row-gap: 1em;
        column-gap: 2em;
        margin-right: 1em;
        align-items: center;
    }

    .rightButtons {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        flex-wrap: wrap;
        column-gap: 2em;
        align-items: center;
    }

    .buttons button {
        font-size: 1rem;
        font-weight: normal;
    }

    .addImage {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2em;
        height: 2em;
        border-radius: 50%;
        cursor: pointer;
    }

    .addImage:hover,
    .addImage:focus-visible {
        background-color: #ffffff30;
    }
    
    .addImage label {
        cursor: pointer;
        transform: translateY(2px);
    }

    .addImage label ion-icon {
        font-size: 1.3rem;
    }

    @media screen and (max-width: 700px) {

        .removeImg ion-icon {
            font-size: 1.5rem;
        }

    }
    
</style>