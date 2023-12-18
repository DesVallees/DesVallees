<script lang="ts">
	import { fade } from "svelte/transition";
	import { dictionary } from "../stores";
	import { page } from "$app/stores";
	import { sleep } from "../functions";

    async function scrollToElementID(id: string) {
        if (!id) return;
        
        await sleep(500)
        const targetElement:HTMLElement | null = document.querySelector(id);
        
        if (targetElement) {
            const offset = 110;

            window.scrollTo({
                top: targetElement.offsetTop - offset,
                behavior: 'smooth',
            });
        }
    }

    $: $page.url.hash, scrollToElementID($page.url.hash)

</script>

<svelte:head>
    <title>{$dictionary.ourServices}</title>
    <meta name="description" content="{$dictionary.navigateDivorce}">
</svelte:head>

<div class="services" in:fade>
    <div class="main">
        <slot/>
    </div>
    
    <nav>
        <div class="otherServices">
            <h2>{$dictionary.exploreOurServices}</h2>

            <menu>
                <li><a class="link" aria-current={$page.url.pathname === "/lawyer-site/services" ? "page" : "false"} class:active={$page.url.pathname === "/lawyer-site/services"} href="/lawyer-site/services">{$dictionary.introduction}</a></li>
                <li><a class="link" aria-current={$page.url.pathname === "/lawyer-site/services/divorce-proceedings" ? "page" : "false"} class:active={$page.url.pathname === "/lawyer-site/services/divorce-proceedings"} href="/lawyer-site/services/divorce-proceedings">{$dictionary.divorceProceedings}</a></li>
                <li><a class="link" aria-current={$page.url.pathname === "/lawyer-site/services/custody-proceedings" ? "page" : "false"} class:active={$page.url.pathname === "/lawyer-site/services/custody-proceedings"} href="/lawyer-site/services/custody-proceedings">{$dictionary.custodyProceedings}</a></li>
            </menu>
        </div>
    </nav>
</div>

<style>
    .services {
        display: grid;
        grid-template-columns: 1fr auto;
        padding: 5rem 2rem;
        min-height: 100%;
    }

    .main {
        padding: 0 2rem;
        max-width: 800px;
        margin: auto;
    }

    nav {
        border-left: solid 2px var(--content-7);
        position: relative;
    }

    .otherServices {
        display: grid;
        padding: 0 5rem 0 2rem;
        position: sticky;
        top: 10rem;
        left: 0;
    }

    h2{
        font-size: 1.7rem;
        margin-bottom: 1.5rem;
    }

    li {
        font-size: 1.15rem;
        margin-left: 1ch;
        margin-bottom: .5ex;
        list-style-position: inside;
    }

    .link {
        display: inline-block;
    }

    .active {
        pointer-events: none;
    }

    @media screen and (max-width: 1000px){
        .services {
            display: flex;
            flex-direction: column-reverse;
            padding: 2rem 0;
        }

        .otherServices {
            position: static;
            padding: 0;
        }
        
        nav {
            border-left: 0;
            border-bottom: solid 2px var(--content);
            margin-bottom: 2rem;
            padding: 2rem;
        }
    }
</style>