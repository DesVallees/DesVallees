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
	import HelpSpace from './components/helpSpace.svelte';
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




    // Assuming you have a variable called timeLeftUntilMidnight
    let timeLeftUntilMidnight: string = '';

    // Function to update time left until midnight
    function updateTimeUntilMidnight() {
        const now = new Date();
        const midnight = new Date(now);
        midnight.setHours(24, 0, 0, 0); // Set to midnight of the next day

        const timeDifference = midnight.getTime() - now.getTime();

        const hours = Math.floor(timeDifference / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        timeLeftUntilMidnight = `${hours}h ${minutes}m ${seconds}s`;
    }

    // Call the function every second (adjust the interval as needed)
    const intervalId = setInterval(() => {
        updateTimeUntilMidnight();
    }, 1000);

</script>

<svelte:head>
    <meta name="author" content="Santiago Ovalles">
    <link rel="icon" href="/images/lawyers/logoFull.webp" />
    <!-- <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous"> -->
    <!-- <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script> -->
</svelte:head>

<Toaster />

<div class:disappearAndAppear>
    <header>
        <div class="nav-main">
            <Nav />
        </div>

        <span style="position: fixed; top: 1rem; font-size: 1.25rem; font-weight: bold; left: 50%; translate: -50% 0; border-radius: 10px; background: red; color:white; padding: .3rem .6rem;">{timeLeftUntilMidnight}</span>

        <NavigationLinks />
    </header>

    <main bind:this={mainContent}>
        <slot/>
        <HelpSpace />
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
        grid-template-rows: auto 1fr auto;
        align-items: center;
    }

    header{
        z-index: 3;
        position: sticky;
        top: 0;
        left: 0;

        background-color: var(--main);
        transition: background-color .5s;
    }
    
    .nav-main {
        border-bottom: solid 1px var(--content-5);
        display: flex;
        justify-content: center;
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

</style>