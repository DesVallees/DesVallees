<script lang="ts">
	import { page } from "$app/stores";
	import { slide } from "svelte/transition";
	import { dictionary } from "../stores";
	import Base from "./base.svelte";
	import { sleep } from "../functions";
	import { goto } from "$app/navigation";

    export let active : boolean = false;

    let firstFocusableElement: HTMLAnchorElement;
    let lastFocusableElement: HTMLAnchorElement;

    async function linkBehaviour(href: string) {
        active = false

        await sleep(2)
        goto(href)
    }
</script>

<Base bind:active firstFocusableElement={firstFocusableElement} lastFocusableElement={lastFocusableElement}>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div on:click|stopPropagation transition:slide={{duration:200, axis: 'x'}}>
        <img class="logo" src="/images/ccs/CCSlogoTransparent.png" alt="CCS Logo">
        
        <a href="/ccs" on:click|preventDefault={() => linkBehaviour('/ccs')} class="baseButton {$page.url.pathname === '/ccs' ? 'active' : ''}" bind:this={firstFocusableElement}>{$dictionary.inicio}</a>
        <a href="/ccs/acerca" on:click|preventDefault={() => linkBehaviour('/ccs/acerca')} class="baseButton {$page.url.pathname === '/ccs/acerca' ? 'active' : ''}">{$dictionary.acercaDeNosotros}</a>
        <a href="/ccs/contactanos" on:click|preventDefault={() => linkBehaviour('/ccs/contactanos')} class="baseButton {$page.url.pathname === '/ccs/contactanos' ? 'active' : ''}" bind:this={lastFocusableElement}>{$dictionary.contactanos}</a>
    </div>
</Base>

<style>
    div {
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        height: 100dvh;
        z-index: 2;
        background-color: var(--main);
        border-right: solid 2px var(--content);
        padding: 2em;

        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-end;
        gap: 1em;
    }

    .baseButton {
        font-size: 1.1rem;
        width: 100%;
        justify-content: flex-start;
    }

    .logo {
        width: 200px;
        height: auto;
    }

    @media screen and (max-width: 500px){
        div {
            padding: 1em;
        }
    }
</style>