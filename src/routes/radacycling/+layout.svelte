<script lang="ts">
    import './app.css'
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { baseImageRoute, language } from './stores';
	import { sleep } from './functions';
    
	import Nav from './components/nav.svelte';
	import Footer from './components/footer.svelte';
	import Preloader from './components/preloader.svelte';
	import { Toaster } from 'svelte-french-toast';

    let disappearAndAppear:boolean = false;
    
    $: $language, checkDisappearAndAppear();
    
    async function checkDisappearAndAppear() {
        disappearAndAppear = false
        await sleep(1)
        disappearAndAppear = true
        await sleep(1100)
        disappearAndAppear = false
    }

    let ready: boolean = false;
    $: $page.url.pathname, goTop()
    let mainContent: HTMLElement;
    let goTop: (() => void) = () => {}

    onMount(() => {
        ready = true;
        
        goTop = () => {
            if (document) {
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
                mainContent.scrollTop = 0
            }
        }
    });

</script>

<svelte:head>
    <meta name="author" content="Santiago Ovalles">
    <link rel="icon" href="{baseImageRoute}/favicon.webp" />
</svelte:head>

<Toaster />

<div class:disappearAndAppear>
    <header>
        <Nav />
    </header>

    <main bind:this={mainContent}>
        <slot/>
    </main>

    <footer>
        <Footer />
    </footer>

    {#if !ready}
        <Preloader animation="dots">
            <h1>Rada</h1>
        </Preloader>
    {/if}
</div>

<style>

    div {
        min-height: 100%;
        display: grid;
        grid-template-rows: auto 1fr auto;
        align-items: center;
    }

    header{
        z-index: 3;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;

        background-color: var(--main-5);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        transition: background-color .5s;
    }
    
    main{
        max-width: 100%;
        align-self: stretch;
    }

    footer {
        border-top: solid 1px var(--content-5);
    }

    :global(.disappearAndAppear) {
        animation: disappearAndAppear 1s;
    }

    @keyframes disappearAndAppear {
        0% {opacity: 0;}
        100% {opacity: 1;}
    }


    h1 {
        position: relative;
        
        font-size: 3.5rem;
        text-transform: uppercase;
    }
    
    h1::after {
        content: '';

        position: absolute;
        top: 0;
        right: 0;
        translate: 120% 100%;

        width: 8%;
        aspect-ratio: 1 / 1;
        background-color: var(--interactive);
    }

</style>