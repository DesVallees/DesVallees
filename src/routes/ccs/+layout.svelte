<script lang="ts">
    import './app.css'
    import { Toaster } from 'svelte-french-toast';
	import NavigationBar from './components/navigationBar.svelte';
	import { language } from './stores';
	import { sleep } from './functions';

    let disappearAndAppear:boolean = false;
    
    $: $language, checkDisappearAndAppear();
    
    async function checkDisappearAndAppear() {
        disappearAndAppear = false
        await sleep(1)
        disappearAndAppear = true
        await sleep(2000)
        disappearAndAppear = false
    }
</script>

<svelte:head>
    <title>CCS</title>
    <meta name="author" content="Santiago Ovalles">
    <meta name="description" content="">
    <meta name="keywords" content="">
    <link rel="icon" href="/images/ccs/CCSlogo.png" />
</svelte:head>

<Toaster/>

<div class:disappearAndAppear>
    <nav>
        <NavigationBar />
    </nav>

    <main>
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
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 20px;
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