<script lang="ts">
	import { page } from "$app/stores";
	import { slide } from "svelte/transition";
	import { dictionary } from "../stores";
	import Base from "./base.svelte";
	import { sleep } from "../functions";
	import { goto } from "$app/navigation";
	import Logo from "./logo.svelte";
	import ThemeSwitcher from "./themeSwitcher.svelte";

    export let active : boolean = false;

    let firstFocusableElement: HTMLAnchorElement;
    let lastFocusableElement: HTMLAnchorElement;

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
            <a bind:this={firstFocusableElement} style="margin: 0 auto 1rem;" href="/lawyer-site" on:click|preventDefault={() => linkBehaviour("/lawyer-site")} aria-label={$dictionary.homepage}>
                <Logo />
            </a>

            <a href="/lawyer-site" on:click|preventDefault={() => linkBehaviour("/lawyer-site")} class="baseButton" class:active={$page.url.pathname === '/lawyer-site'}>
                {$dictionary.home} 
            </a>

            <button class="baseButton" on:click={() => toggleMenu("about")} class:active={activeMenu === "about"} aria-label="{$dictionary.aboutUs}">
                {$dictionary.aboutUs} 
                <ion-icon name="caret-down-outline" style="transform: rotate({activeMenu === "about" ? "180deg" : "0deg"}); transition: transform .2s"></ion-icon>
    
            </button>
            {#if activeMenu === "about"}
                <menu transition:slide>
                    <li><a href="/lawyer-site/team" on:click|preventDefault={() => linkBehaviour("/lawyer-site/team")} class="baseButton">
                        {$dictionary.ourTeam}
                    </a></li>
                    <li><a href="/lawyer-site/services" on:click|preventDefault={() => linkBehaviour("/lawyer-site/services")} class="baseButton">
                        {$dictionary.ourServices}
                    </a></li>
                    <li><a href="/lawyer-site/testimonials" on:click|preventDefault={() => linkBehaviour("/lawyer-site/testimonials")} class="baseButton">
                        {$dictionary.testimonials}
                    </a></li>
                    <li><a href="/lawyer-site/pricing" on:click|preventDefault={() => linkBehaviour("/lawyer-site/pricing")} class="baseButton">
                        {$dictionary.pricing}
                    </a></li>
                </menu>
            {/if}

            <button class="baseButton" on:click={() => toggleMenu("legal")} class:active={activeMenu === "legal"} aria-label="{$dictionary.legalResources}">
                {$dictionary.legalResources} 
                <ion-icon name="caret-down-outline" style="transform: rotate({activeMenu === "legal" ? "180deg" : "0deg"}); transition: transform .2s"></ion-icon>
    
            </button>
            {#if activeMenu === "legal"}
                <menu transition:slide>
                    <li><a href="/lawyer-site/faq" on:click|preventDefault={() => linkBehaviour("/lawyer-site/faq")} class="baseButton">
                        {$dictionary.faq}
                    </a></li>
                    <li><a href="/lawyer-site/blog" on:click|preventDefault={() => linkBehaviour("/lawyer-site/blog")} class="baseButton">
                        {$dictionary.blog}
                    </a></li>
                    <li><a href="/lawyer-site/external-legal-resources" on:click|preventDefault={() => linkBehaviour("/lawyer-site/external-legal-resources")} class="baseButton">
                        {$dictionary.externalLegalResources}
                    </a></li>
                    <li><a href="/lawyer-site/legal-disclaimers-and-policies" on:click|preventDefault={() => linkBehaviour("/lawyer-site/legal-disclaimers-and-policies")} class="baseButton">
                        {$dictionary.legalDisclaimersAndPolicies}
                    </a></li>
                </menu>
            {/if}

            <button class="baseButton" on:click={() => toggleMenu("contact")} class:active={activeMenu === "contact"} aria-label="{$dictionary.getInTouch}">
                {$dictionary.getInTouch} 
                <ion-icon name="caret-down-outline" style="transform: rotate({activeMenu === "contact" ? "180deg" : "0deg"}); transition: transform .2s"></ion-icon>
    
            </button>
            {#if activeMenu === "contact"}
                <menu transition:slide>
                    <li><a href="/lawyer-site/contact" on:click|preventDefault={() => linkBehaviour("/lawyer-site/contact")} class="baseButton">
                        {$dictionary.contactUs}
                    </a></li>
                    <li><a href="/lawyer-site/join-our-team" on:click|preventDefault={() => linkBehaviour("/lawyer-site/join-our-team")} class="baseButton">
                        {$dictionary.joinOurTeam}
                    </a></li>
                </menu>
            {/if}

            <button class="baseButton">{$dictionary.clientPortal}</button>
        </div>
        
        <div>
            <section>
                <a href="/lawyer-site" on:click|preventDefault={() => linkBehaviour("/lawyer-site")} class="baseButton" aria-label="Instagram">
                    <ion-icon name="logo-instagram"></ion-icon>
                </a>
                <a href="/lawyer-site" on:click|preventDefault={() => linkBehaviour("/lawyer-site")} class="baseButton" aria-label="Facebook">
                    <ion-icon name="logo-facebook"></ion-icon>
                </a>
                <a href="/lawyer-site" on:click|preventDefault={() => linkBehaviour("/lawyer-site")} class="baseButton" aria-label="LinkedIn" bind:this={lastFocusableElement}>
                    <ion-icon name="logo-linkedin"></ion-icon>
                </a>
            </section>
            
            <section class="darkMode">
                <span>{$dictionary.darkMode}</span>
                <ThemeSwitcher />
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

    li {
        list-style: none;
    }

    button, a {
        user-select: none;
    }

    menu {
        margin-bottom: 1rem;
        margin-left: 1rem;
        display: grid;
        row-gap: .5rem;
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
    
    .darkMode {
        display: none;
        font-size: 1.05rem;
        font-weight: bold;
        margin-top: .5rem;
    }

    @media screen and (max-width: 500px){
        nav {
            width: 35ch;
            padding: 3rem 1.5rem;
        }

        .darkMode {
            display: flex;
        }

        .baseButton {
            font-size: 1.05rem;
            padding: .5em .75em;
        }
    }
</style>