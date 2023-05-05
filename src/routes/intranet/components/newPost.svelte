<script lang="ts">
	import { fade, slide } from "svelte/transition";
	import Avatar from "./avatar.svelte";
	import { dictionary, profile, type Profile } from "../stores";
	import Picker from "./picker.svelte";
	import Separator from "./separator.svelte";
	import { profileDB } from "../futureDB";

    export let privateReceiverID: string = ''
    export let active: boolean = privateReceiverID ? true : false

    let privateReceiverName:string;

    if (privateReceiverID) {
        privateReceiverName = profileDB.find((profile: Profile) => profile.id === privateReceiverID)?.fullName as string;
    }


    let addAnImage:HTMLInputElement;
    let imageSrc: string;

    function open() {
        active = true
    }

    function close() {
        active = false
    }


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

    function convertDataUrlToUrl(dataUrl: string): string {
        const byteString = window.atob(dataUrl.split(',')[1]);
        const mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);

        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        const blob = new Blob([ab], { type: mimeString });

        return URL.createObjectURL(blob);
    }

    function removeImage() {
        imageSrc = '';
    }

    
    function autoResizeTextarea(element: HTMLTextAreaElement): void {
        const minHeight = element.offsetHeight;

        const paddingTop = parseInt(window.getComputedStyle(element, null).getPropertyValue("padding-top"));
        const paddingRight = parseInt(window.getComputedStyle(element, null).getPropertyValue("padding-right"));
        const paddingBottom = parseInt(window.getComputedStyle(element, null).getPropertyValue("padding-bottom"));
        const paddingLeft = parseInt(window.getComputedStyle(element, null).getPropertyValue("padding-left"));
        const border = parseInt(window.getComputedStyle(element, null).getPropertyValue("border"));

        const resize = () => {
            const oldHeight = element.style.height;
            element.style.height = "auto";
            const newHeight = element.scrollHeight - border;
            element.style.height = Math.max(minHeight, newHeight) + "px";
            if (oldHeight !== element.style.height) {
                resize();
            }
        };

        element.addEventListener("input", resize);
        element.addEventListener("focus", resize);
        element.addEventListener("blur", resize);
        window.addEventListener("resize", resize);

        element.style.overflow = "hidden";
        element.style.boxSizing = "border-box";
        element.style.padding = `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`;

        resize();
    }


    let firstFocusableElement:HTMLButtonElement;
    let lastFocusableElement:HTMLButtonElement;

</script>

{#if active}
    <button on:focus={() => lastFocusableElement.focus()}></button>

    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="base" in:fade={{duration:100}} out:fade={{duration:100, delay:150}}>
        <div class="post" transition:slide>
            <div class="avatar">
                <Avatar image={$profile.profilePicture} width="70%" style="aspect-ratio: 1 / 1; height: fit-content;"/>
            </div>
            
            <div class="content">

                <header>
                    {$dictionary.visibleTo}

                    {#if privateReceiverID}
                        <Picker bind:button={firstFocusableElement} options={[privateReceiverName, ...$dictionary.teamNames]}/>
                    {:else}
                        <Picker options={$dictionary.teamNames}/>
                    {/if}

                </header>
                
                <form on:submit|preventDefault={() => {close()}}>
                    <!-- svelte-ignore a11y-autofocus -->
                    <textarea use:autoResizeTextarea required rows="2" autofocus autocomplete="off" name="content" placeholder={$dictionary.whatDoYouWantToSay}></textarea>

                    {#if imageSrc}

                        <div style="position: relative;">
                            <div class="removeImg" on:click={removeImage}><ion-icon name="close-outline"></ion-icon></div>
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
                                <label for="image" tabindex="0" on:keypress={(event) => {(event.key == 'Enter' || event.key == ' ') ? addAnImage.click() : ''}} aria-label={$dictionary.addAnImage}><ion-icon name="image-outline"></ion-icon></label>
                                <input type="file" id="image" name="image" accept="image/*" style="display: none;" bind:this={addAnImage} on:change={previewImage}>
                            {/if}
                        </div>
                        <div class="rightButtons">
                            <button type="button" class="link" on:click={close}>{$dictionary.cancel}</button>
                            <button bind:this={lastFocusableElement} type="submit" class="link" on:click={() => {}}>{$dictionary.submit}</button>
                        </div>
                    </div>
                </form>

            </div>

        </div>
    </div>
    

    <button on:focus={() => firstFocusableElement.focus()}></button>


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
        font-size: 1.1rem;
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

        .removeImg ion-icon {
            font-size: 1.5rem;
        }
    }

</style>