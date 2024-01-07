<script lang="ts">
	import { page } from "$app/stores";
	import { slide } from "svelte/transition";
	import { baseRoute, dictionary } from "../stores";
	import Base from "./base.svelte";
	import { sleep } from "../functions";
	import { goto } from "$app/navigation";
	import Logo from "./logo.svelte";

    export let active : boolean = false;

    let firstFocusableElement: HTMLAnchorElement;
    let lastFocusableElement: HTMLButtonElement;

    let activeMenu: string | undefined;

    function toggleMenu (value: string) {
        activeMenu === value ?
            activeMenu = undefined : activeMenu = value;
    }
    
    async function linkBehaviour(href: string) {
        active = false

        await sleep(2)
        goto(href)
    }

</script>

<Base bind:active firstFocusableElement={firstFocusableElement} lastFocusableElement={lastFocusableElement}>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <nav on:click|stopPropagation transition:slide|global={{duration:200, axis: 'x'}}>
        <div>
            <a bind:this={firstFocusableElement} style="margin: 0 auto 2rem;" href="{baseRoute}" on:click|preventDefault={() => linkBehaviour(`${baseRoute}`)} aria-label={$dictionary.homepage}>
                <Logo />
            </a>

            <a href="{baseRoute}" on:click|preventDefault={() => linkBehaviour(`${baseRoute}`)} class="baseButton" class:active={$page.url.pathname === `${baseRoute}`}>
                {$dictionary.home} 
            </a>

            <a href="{baseRoute}/catalog" on:click|preventDefault={() => linkBehaviour(`${baseRoute}/catalog`)} class="baseButton" class:active={$page.url.pathname === `${baseRoute}/catalog`}>
                {$dictionary.catalog} 
            </a>

            <a href="{baseRoute}/contact" on:click|preventDefault={() => linkBehaviour(`${baseRoute}/contact`)} class="baseButton" class:active={$page.url.pathname === `${baseRoute}/contact`}>
                {$dictionary.contactUs} 
            </a>

            <a href="{baseRoute}/our-work" on:click|preventDefault={() => linkBehaviour(`${baseRoute}/our-work`)} class="baseButton" class:active={$page.url.pathname === `${baseRoute}/our-work`}>
                {$dictionary.ourWork} 
            </a>
        </div>
        
        <div>
            <section>
                <a href="https://www.instagram.com/rada_cyclingwear/" target="_blank" on:click={() => active = false} class="baseButton" aria-label="Instagram">
                    <ion-icon name="logo-instagram"></ion-icon>
                </a>
                <a href="https://www.facebook.com/rada.cyclingwear/" target="_blank" on:click|preventDefault={() => active = false} class="baseButton" aria-label="Facebook">
                    <ion-icon name="logo-facebook"></ion-icon>
                </a>
            </section>
        </div>
    </nav>
</Base>

<style>
    nav {
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        height: 100dvh;
        width: 38ch;
        max-width: 70%;
        z-index: 3;
        background-color: var(--main);
        border-right: solid 2px var(--content);
        padding: 3rem 2rem;

        transition: all .3s;
        overflow: auto;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        gap: 5rem;
    }

    div {
        width: 100%;
        display: grid;
        row-gap: 1rem;
    }

    .baseButton {
        font-size: 1.1rem;
        width: 100%;
        justify-content: flex-start;
        text-align: left;
    }

    a {
        user-select: none;
    }

    section {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        column-gap: 2ch;
        row-gap: .5rem;
    }

    section .baseButton {
        width: fit-content;
        padding: .3em;
        font-size: 1.2rem;
    }
    
    @media screen and (max-width: 500px){
        nav {
            width: 35ch;
            padding: 3rem 1.5rem;
        }

        .baseButton {
            font-size: 1.05rem;
            padding: .5em .75em;
        }
    }
</style>