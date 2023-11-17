<script lang="ts">
	import { fade } from "svelte/transition";
	import Logo from "./logo.svelte";
	import { page } from "$app/stores";
	import { dictionary, profile } from "../stores";
	import Separator from "./separator.svelte";
	import ChangeLanguage from "./changeLanguage.svelte";
	import Avatar from "./avatar.svelte";
	import { sleep } from "../functions";
	import { goto } from "$app/navigation";

    export let linkBehaviourCallback: () => void = () => {}
    
    async function linkBehaviour(href: string) {
        linkBehaviourCallback()

        await sleep(1)
        goto(href)
    }

    export let firstFocusableElement: HTMLAnchorElement | undefined = undefined;
    export let lastFocusableElement: HTMLAnchorElement | undefined= undefined;

</script>

<nav class="primaryNav">
    <a class="logo" href="/intranet" bind:this={firstFocusableElement}>
        <Logo />
    </a>
    
    <section in:fade>
        <div>
            <a on:click|preventDefault={() => linkBehaviour('/intranet')} href="/intranet" class="headerLink baseButton {$page.url.pathname === '/intranet' ? 'active' : ''}">
                <span class="headerLinkText">{$dictionary.home}</span>
            </a>
            <a on:click|preventDefault={() => linkBehaviour('/intranet/people')} href="/intranet/people" class="headerLink baseButton {$page.url.pathname === '/intranet/people' ? 'active' : ''}">
                <span class="headerLinkText">{$dictionary.people}</span>
            </a>
            <a on:click|preventDefault={() => linkBehaviour('/intranet/general')} href="/intranet/general" class="headerLink baseButton {$page.url.pathname === '/intranet/general' ? 'active' : ''}">
                <span class="headerLinkText">{$dictionary.generalInformation}</span>
            </a>
        </div>
        <div>
            <Separator height="1px" width="100%" margin="20px 0" />
            <ChangeLanguage buttonStyle="baseButton" style="font-size: 1.1rem; width: 100%; justify-content: flex-start;"/>
            <a bind:this={lastFocusableElement} on:click|preventDefault={() => linkBehaviour("/intranet/profile")} href="/intranet/profile" class="headerLink baseButton {$page.url.pathname === '/intranet/profile' ? 'active' : ''}" aria-label={$dictionary.profile}>
                <Avatar image={$profile.profilePicture} borderRadius="10px" width="2rem"/>
                <span class="headerLinkText" style="margin-left: 2px;">{$profile.fullName}</span>
            </a>
        </div>
    </section>
</nav>

<style>

    .primaryNav{
        display: flex;
        flex-direction: column;
        align-items: end;
        gap: 20px;
        height: 100vh;
        height: 100dvh;
        width: fit-content;
        position: sticky;
        top: 0;
        padding: 20px 30px 50px;
        border-right: 1px solid var(--content);
        overflow: auto;
    }

    section {
        width: max-content;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-top: 50px;
    }

    section div {
        display: grid;
        gap: 1em
    }

    .logo {
        transform: scale(.8) translateX(-20%);
    }

    .headerLink{
        width: 100%;
        justify-content: flex-start;
    }
    
    .headerLinkText {
        font-size: 1.1rem;
    }

    @media screen and (max-width: 1300px) {
        .primaryNav {
            padding-right: 15px;
        }
    }
    
</style>