<script lang="ts">
	import { fade, slide } from "svelte/transition";
	import Avatar from "./avatar.svelte";
	import { dictionary, profile } from "../stores";
	import Select from "./select.svelte";
	import Picker from "./picker.svelte";

    export let active: boolean = false

    let addAnImage:HTMLInputElement;

    function open() {
        active = true
    }

    function close() {
        active = false
    }
</script>

{#if active === true}

    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="base" in:fade={{duration:100}} out:fade={{duration:100, delay:150}}>
        <div class="post" transition:slide>
            <div class="avatar">
                <Avatar image={$profile.profilePicture} width="70%" style="aspect-ratio: 1 / 1; height: fit-content;"/>
            </div>
            
            <div class="content">

                <header>
                    {$dictionary.visibleTo}
                    <Picker options={$dictionary.teamNames}/>
                </header>
                
                <form on:submit|preventDefault={() => {close()}}>
                    <textarea required rows="3" autofocus autocomplete="off" name="content" placeholder={$dictionary.whatDoYouWantToSay}></textarea>

                    <div class="addImage" style="display: none;">
                        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                        <label for="image" tabindex="0" on:keypress={(event) => {(event.key == 'Enter' || event.key == ' ') ? addAnImage.click() : ''}} aria-label={$dictionary.addAnImage}><ion-icon name="image-outline"></ion-icon></label>
                        <input type="file" id="image" name="image" accept="image/*" style="display: none;" bind:this={addAnImage}>
                    </div>

                    <div class="buttons">
                        <button type="button" class="link" on:click={close}>{$dictionary.cancel}</button>
                        <button type="submit" class="link" on:click={() => {}}>{$dictionary.submit}</button>
                    </div>
                </form>

            </div>

        </div>
    </div>
    
    {:else}
    
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
        padding: 20px;
        padding-top: 150px;
        background-color: #1d212aee;
        z-index: 11;
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
        margin-bottom: 1em;
    }

    .buttons{
        display: flex;
        align-items: center;
        gap: 2em;
        margin-top: .5em;
        margin-right: 1em;
        align-items: center;
        justify-content: flex-end;
    }

    .buttons button {
        font-size: 1rem;
    }

    .avatar {
        padding: 1em 0;
        position: relative;
        width: 5.3em;
        display: flex;
        justify-content: center;
    }

    .content {
        width: 100%;
        padding: 1.5em 1em;
        display: flex;
        flex-direction: column;
    }

    textarea {
        border-bottom: 5px var(--interative) solid;
        padding: .5em;
        width: 100%;
        word-wrap: break-word;
        overflow-wrap: break-word;
        resize: vertical;
        line-height: 1.5rem;
        background-color: transparent;
        transition: all .2s;
        background-color: #00000011;
    }

    textarea:focus {
        outline: none;
        background-color: #00000033;
    }

    .addImage {
        display: flex;
        justify-content: center;
        align-items: center;
        width: fit-content;
        border-radius: 50%;
        padding: .5em;
        margin: 1em 0;
    }

    @media screen and (max-width: 1024px) {
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