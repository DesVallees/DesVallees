<script lang="ts">
    import './app.css'
    import { Toaster } from 'svelte-french-toast';
	import NavigationBar from './components/navigationBar.svelte';
	import { language } from './stores';
	import { sleep } from './functions';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

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
    <title>CCS</title>
    <meta name="author" content="Santiago Ovalles">
    <meta name="description" content="">
    <meta name="keywords" content="">
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
        
        height: 100px;
    }

    main{
        height: 100%;
    }

    .disappearAndAppear {
        animation: disappearAndAppear 1.5s;
    }

    @keyframes disappearAndAppear {
        0% {opacity: 0;}
        100% {opacity: 1;}
    }

</style>