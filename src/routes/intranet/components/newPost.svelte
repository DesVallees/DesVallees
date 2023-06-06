<script lang="ts">
	import { fade, slide } from "svelte/transition";
	import Avatar from "./avatar.svelte";
	import { dictionary, profile } from "../stores";
	import Picker from "./picker.svelte";
	import PostForm from "./postForm.svelte";
	import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let parentCommentPoster: string = ''
    export let parentCommentId: number | undefined = undefined
    export let parentCommentVisibility: string = ''

    export let privateReceiverID: number | undefined = undefined
    export let privateReceiverName : string = ''

    let pickerValue: number = 1;


    let active: boolean = privateReceiverID || parentCommentPoster ? true : false

    let pickerValueToVisibilities: {[key: string]: string} = {
        '1': 'all',
        '2': $profile.department
    }


    function open() {
        active = true
        dispatch('open')
    }

    function close() {
        active = false
        dispatch('close')
    }


    let firstFocusableElement:HTMLButtonElement;
    let textarea:HTMLTextAreaElement;
    let lastFocusableElement:HTMLButtonElement;

    function focusFirstElement () {
        if (firstFocusableElement) {
            firstFocusableElement.focus()
        } else if (textarea) {
            textarea.focus()
        }
    }

    function focusLastElement () {
        if (lastFocusableElement) {
            lastFocusableElement.focus()
        }
    }

</script>

<svelte:window on:keydown={ (event) => { if (active && event.key === 'Escape') close() } } />

{#if active}

    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="base" in:fade={{duration:100}} out:fade={{duration:100, delay:100}}>

        <button style="position: absolute; opacity: 0;" on:focus={focusLastElement}></button>


        <div class="post" transition:slide={{duration: 200}}>
            <div class="avatar">
                <Avatar image={$profile.profilePicture} width="70%" style="aspect-ratio: 1 / 1; height: fit-content;"/>
            </div>
            
            <div class="content">

                {#if !parentCommentPoster}
                    <header>
                    
                        {$dictionary.visibleTo}

                        {#if privateReceiverID}
                            <Picker bind:button={firstFocusableElement} options={[{id: 0, name: privateReceiverName}, ...$dictionary.teamNames]} bind:value={pickerValue}/>
                        {:else}
                            <Picker bind:button={firstFocusableElement} options={$dictionary.teamNames} bind:value={pickerValue}/>
                        {/if}

                    </header>

                {:else}

                    <span class="replyingTo">

                        {$dictionary.replyingTo} {parentCommentPoster}...

                    </span>

                {/if}

                
                <PostForm bind:textarea bind:lastFocusableElement on:submit={close} on:close={close} inputFontSize="1.1rem" {parentCommentId} visibility={ parentCommentPoster? parentCommentVisibility : privateReceiverID && pickerValue === 0 ? privateReceiverID.toString() : pickerValueToVisibilities[pickerValue.toString()]} />

            </div>

        </div>


        <button style="position: absolute; opacity: 0;" on:focus={focusFirstElement}></button>


    </div>
    
    {:else if !privateReceiverID}
    
    <button class="newPostButton" on:click={open}><ion-icon name="add-outline"></ion-icon></button>

{/if}


<style>
    
    .newPostButton{
        position: fixed;
        bottom: 3em;
        right: 5em;

        border-radius: 50%;
        background-color: var(--interative);
        padding: .5em;

        box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.295);

        transition: all .2s;

        z-index: 2;
    }

    .newPostButton:hover,
    .newPostButton:focus {
        padding: .7em;
    }

    .newPostButton ion-icon {
        font-size: 3rem;
    }

    .base {
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        width: 100vw;
        height: 100vh;
        padding: 150px 20px 100px;
        background-color: #1d212aee;
        z-index: 11;
        overflow: auto;
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
        transition: all .3s;

        color: var(--content);
        box-shadow: 0 0 5px var(--contentDim);
        background-color: var(--main);
    }

    header {
        display: flex;
        gap: 1rem;
        font-size: 1.2rem;
        align-items: center;
        color: var(--contentDim);
    }
    
    .replyingTo {
        font-size: 1.1rem;
        color: var(--contentDimer);
        text-align: left;
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

        .newPostButton{
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