<script lang="ts">
	import { scale } from "svelte/transition";
	import { dictionary } from "../stores";
	import toast from "svelte-french-toast";

    let isMenuOpen: boolean = false;

    type Menu = 'chat' | 'meeting'
    let currentMenu:Menu = 'chat'

    function switchMenu(name:Menu) {
        currentMenu = name;
    }

    function closeDialog() {
        isMenuOpen = false
    }
    
    function toggleDialog() {
        isMenuOpen = !isMenuOpen
    }

    function focusDialog() {
        if (firstFocusableElement) {
            firstFocusableElement.focus()
        }
    }

    function comingSoon() {
        toast(`${$dictionary.comingSoon}...`, {duration: 3000, style: "font-weight: bold; background-color: var(--content); color: var(--main);"})
    }

    let menuContentHeight: number;
    let firstFocusableElement:HTMLElement;

    $: firstFocusableElement, focusDialog()
</script>

<div class="helpSpace">
    {#if isMenuOpen}
        <div class="menu" transition:scale style="height: {menuContentHeight}px;">
            <div class="menuContent" bind:clientHeight={menuContentHeight}>
                <header>
                    <img width="45px" src="/images/lawyers/logoFull.webp" alt="{$dictionary.attorneyCollaborativeOnlineService}">
                    <nav>
                        <button bind:this={firstFocusableElement} on:click={() => switchMenu('chat')} class:active={currentMenu === 'chat'}>{$dictionary.onlineChat}</button>
                        <button on:click={() => switchMenu('meeting')} class:active={currentMenu === 'meeting'}>{$dictionary.onlineMeeting}</button>
                    </nav>
                    <button class="close" on:click={closeDialog} aria-label="{$dictionary.close}"><ion-icon name="close"></ion-icon></button>
                </header>
    
                {#if currentMenu === 'chat'}
                    <div class="body chat">
                        <p>{$dictionary.haveADoubt}</p>
                        <button on:click={comingSoon} class="button">{$dictionary.sendUsAMessage}</button>
                        <a class="link" href="/lawyer-site/faq" on:click={closeDialog}>{$dictionary.frequentlyAskedQuestions}</a>
                    </div>
    
                {:else if currentMenu === 'meeting'}
                    <div class="body meeting">
                        <p>{$dictionary.connectWithOurExperts}</p>
                        <button on:click={comingSoon} class="button">{$dictionary.scheduleAMeeting}</button>
                        <a class="link" href="/lawyer-site/faq" on:click={closeDialog}>{$dictionary.frequentlyAskedQuestions}</a>
                    </div>
    
                {/if}
            </div>
        </div>
    {/if}

    <button class="trigger" on:click={toggleDialog} aria-label="{$dictionary.needHelp}">
        <ion-icon name="chatbubble"></ion-icon>
    </button>
</div>


<style>
    .menu *:focus-visible:not(input):not(textarea) {
        outline: solid .25rem var(--main);
    }
    
    .helpSpace {
        position: fixed;
        bottom: 3rem;
        right: 3rem;

        max-height: 100%;
        max-width: calc(100% - 2rem);
        
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-items: end;
        justify-content: end;
        row-gap: 1rem;
        z-index: 15;
    }

    .menu {
        max-width: 500px;
        border-radius: 25px;

        color: var(--main);
        background-color: var(--content);
        box-shadow: 0 0 10px var(--content-5);

        transition: height .5s;
        overflow: hidden;
        overflow: clip;
    }

    :global([data-theme="light"]) .menu {
        color: var(--content);
        background-color: var(--main);
    }

    .menuContent {
        display: grid;
        gap: 2rem;

        padding: 1.5rem;
    }

    .menu img {
        aspect-ratio: 1 / 1;
        border-radius: 50%;
    }

    .menu header {
        display: grid;
        gap: 2rem;
        grid-auto-flow: column;
        align-items: center;
        justify-content: space-between;
    }

    .menu header nav {
        --space: .4rem;
        
        display: flex;
        gap: var(--space);
        
        width: fit-content;
        padding: var(--space);
        border-radius: 10px;
        
        color: var(--interactive);
        background-color: var(--main-1);
        transition: background-color .5s;
    }

    .menu header nav button {
        padding: var(--space) calc(var(--space) * 2);
        border-radius: 5px;
        font-weight: 500;

        background-color: transparent;
        transition: background-color .5s;
    }

    .menu header nav button.active {
        background-color: var(--main-2);
    }

    :global([data-theme="light"]) .menu header nav {
        color: var(--main);
        background-color: var(--interactive-7);
    }

    :global([data-theme="light"]) .menu header nav button.active {
        background-color: var(--interactive);
    }

    .menu .close {
        border-radius: 50%;
        padding: .3em;
        font-size: 1.3rem;
        display: flex;
    }

    .menu .close:hover,
    .menu .close:focus-visible {
        background-color: var(--main-1);
    }

    .menu .body {
        display: grid;
        gap: .5rem;
        place-items: center;
        padding: 0 2rem;
    }

    .menu .body p {
        font-size: 1.1rem;
        margin-bottom: 3rem;
    }

    .menu .body button {
        padding-inline: 1rem;
    }

    .menu .body a {
        color: var(--interactive);
    }

    :global([data-theme="dark"]) .helpSpace .menu .body .button {
        background-color: var(--interactive-9);
        color: var(--content);
    }

    
    .trigger {
        aspect-ratio:  1 / 1;
        width: fit-content;

        border-radius: 50%;
        padding: .7em;
        background-color: var(--interactive);
        box-shadow: 3px 3px 10px var(--content-2);
        
        display: flex;
        transition: all .5s;
    }
    
    :global([data-theme="light"]) .trigger {
        background-color: var(--content);
        color: var(--main);
        box-shadow: 3px 3px 10px var(--content-7);
    }
    
    .trigger ion-icon {
        font-size: 2.5rem;
        transition: font-size .2s;
    }

    .trigger:hover ion-icon {
        font-size: 3rem;
    }

    @media screen and (max-width: 900px) {
        .helpSpace {
            bottom: 1rem;
            right: 1rem;
        }
    }

    @media screen and (max-width: 600px) {

        .menu header {
            gap: 1rem;
        }

        .menu img {
            display: none;
        }
    }

    @media screen and (max-width: 350px) {
        .menu .close {
            display: none;
        }
    }
</style>