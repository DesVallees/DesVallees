<script>
	import { fade } from "svelte/transition";
	import Loading from "./loading.svelte";
	import Logo from "./logo.svelte";
</script>

<section out:fade>
    <Logo />
    <Loading scale={.9} animation="dots"/>
</section>

<style>
    section{
        background-color: var(--main);
        width: 100vw;
        height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 2em;
        z-index: 1000;
    }
</style>