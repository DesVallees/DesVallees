<script lang="ts">
    import './app.css'
    import { Toaster } from 'svelte-french-toast';
	import NavigationBar from './components/navigationBar.svelte';
	import { language } from './stores';
	import { sleep } from './functions';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import Preloader from './components/preloader.svelte';

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
    <link rel="icon" href="/images/ccs/CCSlogo.webp" />
</svelte:head>

<Toaster/>


<div class:disappearAndAppear>
    <nav>
        <NavigationBar />
    </nav>
    
    <main bind:this={mainContent}>
        <slot/>
    </main>

    {#if !ready}
        <Preloader animation="dots">
            <h1 style="font-size: 3rem; line-height: normal;">CCS</h1>
        </Preloader>

    {/if}
</div>


<style>

    div {
        min-height: 100%;
        display: grid;
        grid-template-rows: auto 1fr;
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
        height: 100%;
        z-index: 1;
        padding-top: .5rem;
    }

    .disappearAndAppear {
        animation: disappearAndAppear 1s;
    }

    @keyframes disappearAndAppear {
        0% {opacity: 0;}
        100% {opacity: 1;}
    }

</style>