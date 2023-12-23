<script lang="ts">
	import { slide } from "svelte/transition";
	import { dictionary } from "../stores";
	import { page } from "$app/stores";
	import toast from "svelte-french-toast";

    let activeMenu: string | undefined;

    function openMenu (value: string) {
        activeMenu = value;
    }

    function toggleMenu (value: string) {
        activeMenu === value ?
            activeMenu = undefined : activeMenu = value;
    }

    function closeMenu () {
        activeMenu = undefined;
    }

    let scrollY: number;

    let showNavLinks: boolean = true;
    const transitionDuration: number = 250;

    let handleScroll = () => {
        if (scrollY < 50) {
            showNavLinks = true;
        }
        else if (scrollY > 100) {
            showNavLinks = false;
        }
    }

    function comingSoon() {
        toast(`${$dictionary.comingSoon}...`, {duration: 3000, style: "font-weight: bold; background-color: var(--content); color: var(--main);"})
    }

</script>

<svelte:window bind:scrollY on:scroll={handleScroll} />

{#if showNavLinks || scrollY === 0}

<nav transition:slide={{duration: transitionDuration}}>
    <div>
        <a href="/lawyer-site" class="baseButton" class:active={$page.url.pathname === '/lawyer-site'}>
            {$dictionary.home} 
        </a>
        <button class="baseButton" on:mouseleave={closeMenu} on:click={() => toggleMenu("about")} on:mouseenter={() => openMenu("about")} class:active={activeMenu === "about"} aria-label="{$dictionary.aboutUs}">
            {$dictionary.aboutUs} 
            <ion-icon name="caret-down-outline" style="transform: rotate({activeMenu === "about" ? "180deg" : "0deg"}); transition: transform .2s"></ion-icon>

            {#if activeMenu === "about"}
                <menu transition:slide>
                    <li><a href="/lawyer-site/team" class="baseButton">
                        {$dictionary.ourTeam}
                    </a></li>
                    <li><a href="/lawyer-site/services" class="baseButton">
                        {$dictionary.ourServices}
                    </a></li>
                    <li><a href="/lawyer-site/testimonials" class="baseButton">
                        {$dictionary.testimonials}
                    </a></li>
                    <li><a href="/lawyer-site/pricing" class="baseButton">
                        {$dictionary.pricing}
                    </a></li>
                </menu>
            {/if}
        </button>
        <button class="baseButton" on:mouseleave={closeMenu} on:click={() => toggleMenu("legal")} on:mouseenter={() => openMenu("legal")} class:active={activeMenu === "legal"} aria-label="{$dictionary.legalResources}">
            {$dictionary.legalResources} 
            <ion-icon name="caret-down-outline" style="transform: rotate({activeMenu === "legal" ? "180deg" : "0deg"}); transition: transform .2s"></ion-icon>

            {#if activeMenu === "legal"}
                <menu transition:slide>
                    <li><a href="/lawyer-site/faq" class="baseButton">
                        {$dictionary.faq}
                    </a></li>
                    <li><a href="/lawyer-site/legal-disclaimers-and-policies" class="baseButton">
                        {$dictionary.legalDisclaimersAndPolicies}
                    </a></li>
                    <li><a href="/lawyer-site/external-legal-resources" class="baseButton">
                        {$dictionary.externalLegalResources}
                    </a></li>
                </menu>
            {/if}
        </button>
        <button class="baseButton" on:mouseleave={closeMenu} on:click={() => toggleMenu("contact")} on:mouseenter={() => openMenu("contact")} class:active={activeMenu === "contact"} aria-label="{$dictionary.getInTouch}">
            {$dictionary.getInTouch} 
            <ion-icon name="caret-down-outline" style="transform: rotate({activeMenu === "contact" ? "180deg" : "0deg"}); transition: transform .2s"></ion-icon>

            {#if activeMenu === "contact"}
                <menu transition:slide>
                    <li><a href="/lawyer-site/contact" class="baseButton">
                        {$dictionary.contactUs}
                    </a></li>
                    <li><a href="/lawyer-site/join-our-team" class="baseButton">
                        {$dictionary.joinOurTeam}
                    </a></li>
                </menu>
            {/if}
        </button>
    </div>
    <div>
        <button class="baseButton" on:mouseleave={closeMenu} on:click={() => toggleMenu("social")} on:mouseenter={() => openMenu("social")} class:active={activeMenu === "social"} aria-label="{$dictionary.socialMedia}">
            {$dictionary.socialMedia} 
            <ion-icon name="caret-down-outline" style="transform: rotate({activeMenu === "social" ? "180deg" : "0deg"}); transition: transform .2s"></ion-icon>

            {#if activeMenu === "social"}
                <menu transition:slide>
                    <li><a href="/lawyer-site" class="baseButton" aria-label="Instagram">
                        <ion-icon name="logo-instagram"></ion-icon>
                        Instagram
                    </a></li>
                    <li><a href="/lawyer-site" class="baseButton" aria-label="Facebook">
                        <ion-icon name="logo-facebook"></ion-icon>
                        Facebook
                    </a></li>
                    <li><a href="/lawyer-site" class="baseButton" aria-label="LinkedIn">
                        <ion-icon name="logo-linkedin"></ion-icon>
                        LinkedIn
                    </a></li>
                </menu>
            {/if}
        </button>
        
        <button class="button" on:click={comingSoon}>{$dictionary.clientPortal}</button>
    </div>
</nav>

{/if}


<style>
    nav {
        display: none;
        justify-content: space-between;
        align-items: center;
        margin: auto;
        gap: 1rem;

        padding: .5rem 2rem 0;
        max-width: calc(1500px - 2rem);
    }

    div {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    menu {
        position: absolute;
        left: 0;
        top: 100%;

        width: max-content;
        max-width: 25ch;

        display: grid;
        padding: 1rem;
        padding-top: 1.5rem;
        gap: 1rem;

        border: solid 1px var(--content-7);
        border-top: none;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;

        background-color: var(--main);
    }

    menu a {
        width: 100%;
    }

    li {
        list-style: none;
    }

    button, a {
        position: relative;
        user-select: none;
    }

    @media screen and (min-width: 70rem) {
        nav {
            display: flex;
        }
    }

</style>