<script lang="ts">
	import { fade } from "svelte/transition";
	import Typewriter from "../components/typewriter.svelte";
	import { dictionary, language } from "../stores";

</script>

<svelte:head>
    <title>{$dictionary.logIn}</title>
    <noscript>
        <title>Log In</title>
    </noscript>
    
    <meta name="description" content="Securely access your mindful haven. Log in to explore A.I.-guided insights, manage to-do lists, seek advice, and nurture your thoughts within our private and tranquil space.">
</svelte:head>

<div class="logIn" in:fade>
    <form action="">
        <input type="email" class="ghostButton">   
        <input type="password" class="ghostButton">
    </form>

    {#key $language}
        <Typewriter phrase="{$dictionary.comingSoon}..." style="font-size: 2rem; font-weight:700" />
    {/key}
</div>

<style>
    .logIn {
        display: grid;
        place-items: center;

        min-height: 100%;
        padding: 1.5rem;
    }

    form {
        display: none;
    }
</style>