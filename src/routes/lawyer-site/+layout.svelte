<script lang="ts">
    import './app.css'
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { language } from './stores';
	import { sleep } from './functions';
    
	import Nav from './components/nav.svelte';
	import Footer from './components/footer.svelte';
	import Preloader from './components/preloader.svelte';
	import NavigationLinks from './components/navigationLinks.svelte';

    let disappearAndAppear:boolean = false;
    
    $: $language, checkDisappearAndAppear();
    
    async function checkDisappearAndAppear() {
        disappearAndAppear = false
        await sleep(1)
        disappearAndAppear = true
        await sleep(2000)
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
    <link rel="icon" href="/images/lawyers/logoWhite.webp" />
    <!-- <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous"> -->
    <!-- <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script> -->
</svelte:head>

<div class:disappearAndAppear>
    <nav>
        <Nav />
    </nav>
    <section>
        <NavigationLinks />
    </section>

    <main bind:this={mainContent}>
        <slot/>
    </main>

    <footer>
        <Footer />
    </footer>

    {#if !ready}
        <Preloader animation="default"/>
    {/if}
</div>

<style>

    div {
        min-height: 100%;
        display: grid;
        grid-template-rows: auto auto 1fr auto;
        align-items: center;
    }

    nav{
        z-index: 3;
        position: sticky;
        top: 0;
        left: 0;

        border-bottom: solid 1px var(--content-5);
        background-color: var(--main);
        transition: background-color .5s;
    }

    section {
        z-index: 2;
    }

    main{
        max-width: 100vw;
        align-self: stretch;
    }

    footer {
        border-top: solid 1px var(--content-5);
    }

    .disappearAndAppear {
        animation: disappearAndAppear 1.5s;
    }

    @keyframes disappearAndAppear {
        0% {opacity: 0;}
        100% {opacity: 1;}
    }

</style>