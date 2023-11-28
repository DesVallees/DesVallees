<script lang="ts">
    import './app.css'
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { language } from './stores';
	import { sleep } from './functions';
    import { Toaster } from 'svelte-french-toast';
    
	import Nav from './components/nav.svelte';
	import Footer from './components/footer.svelte';
	import BackgroundCircle from './components/backgroundCircle.svelte';

    let disappearAndAppear:boolean = false;
    
    $: $language, checkDisappearAndAppear();
    
    async function checkDisappearAndAppear() {
        disappearAndAppear = false
        await sleep(1)
        disappearAndAppear = true
        await sleep(2000)
        disappearAndAppear = false
    }

    $: $page.url.pathname, goTop()
    let mainContent: HTMLElement;
    let goTop: (() => void) = () => {}

    onMount(() => {
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
    <title>Journée</title>
    <meta name="author" content="Santiago Ovalles">
    <meta name="description" content="">
    <meta name="keywords" content="">
    <link rel="icon" href="/images/journee/logoWhite.png" />
</svelte:head>

<Toaster/>

<BackgroundCircle style="opacity: .5;" />
<BackgroundCircle coordinates={{left: '30%', top: '70%'}} style="opacity: .8;" />

<div class:disappearAndAppear>
    <nav>
        <Nav />
    </nav>

    <main bind:this={mainContent}>
        <slot/>
    </main>

    <footer>
        <Footer />
    </footer>
</div>

<style>

    div {
        min-height: 100%;
        display: grid;
        grid-template-rows: auto 1fr auto;
        align-items: center;
    }

    nav{
        z-index: 3;
        position: sticky;
        top: 0;
        left: 0;

        background-color: var(--mainDimer);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
    }

    main{
        max-width: 100vw;
        align-self: stretch;
    }

    .disappearAndAppear {
        animation: disappearAndAppear 1.5s;
    }

    @keyframes disappearAndAppear {
        0% {opacity: 0;}
        100% {opacity: 1;}
    }

</style>