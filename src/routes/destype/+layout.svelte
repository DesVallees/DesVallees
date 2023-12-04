<script lang="ts">
    import './app.css'
	import HighScore from './components/highScore.svelte';
    import { Toaster } from 'svelte-french-toast';
	import { dictionary } from './stores';
	import { scale } from 'svelte/transition';
</script>

<svelte:head>
    <title>DesType</title>
    <meta name="author" content="Santiago Ovalles">
    <meta name="description" content="DesType is a free game / typing test to improve your typing skills in five different languages.">
    <meta name="keywords" content="Typing, Speed, Destype, Typing Test">
    <link rel="icon" href="https://fav.farm/🤓" />
</svelte:head>

<Toaster/>

<div>
    <nav>
        <h1>🤓 DesType</h1>
        <HighScore/>
    </nav>

    <main>
        <slot/>
    </main>

    {#key $dictionary}
        <footer in:scale|global>
            {$dictionary.hold} <kbd>{$dictionary.enter}</kbd> {$dictionary.toRestart}
        </footer>
    {/key}
</div>

<style>

    div {
        height: 100%;
        display: grid;
        grid-template-rows: auto 1fr auto;
        align-items: center;
        padding: 2rem;
    }

    nav{
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        column-gap: 3em;
        row-gap: 20px;
    }

    h1 {
        font-family: 'Lexend Deca', sans-serif;
        font-size: 1.8rem;
        color: var(--fg-200);
        letter-spacing: 2px;
    }

    footer {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 15px;
        opacity: .7;
        color: var(--fg-100);
    }

    @media screen and (orientation: portrait){
        footer {
            visibility: hidden;
        }
    }

    @media screen and (max-width: 500px){
        footer {
            display: none;
        }
    }

</style>