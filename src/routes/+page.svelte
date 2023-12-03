<script lang="ts">
    import './app.css'
	import Separator from "./intranet/components/separator.svelte";

</script>


<svelte:head>
    <title>DesVallees</title>
    <link rel="icon" href="https://fav.farm/👤" />
    <meta name="author" content="Santiago Ovalles">
    <meta name="description" content="Santiago Ovalles' Portfolio. Includes a comprehensive list of the projects and sketches he has made.">
    <meta name="keywords" content="Ovalles, Santiago, Desvallees, Portfolio">
</svelte:head>

<div>

    <a data-sveltekit-reload href="/journee">Journée (2023)</a>
    <a data-sveltekit-reload href="/intranet">Canto Legal Intranet (2023)</a>
    <a data-sveltekit-reload href="/ccs">CCS (2023)</a>
    <a data-sveltekit-reload href="/destype">DesType (2023)</a>
    <a data-sveltekit-reload href="/threlte">Threlte (2023)</a>
    
    <Separator width="90%" maxWidth="500px" height="1px" color="#F7F7FF" margin="3em 0" />
    
    <a target="_blank" href="https://legaloffice.peopleworksservices.com/">Clapp Back Office - Minor features (2022)</a>
    <a target="_blank" href="https://clappforms.web.app/">Clapp Forms (2022)</a>
    
    <Separator width="90%" maxWidth="500px" height="1px" color="#F7F7FF" margin="3em 0" />
    
    <a aria-disabled="true" href="/">Marshall's Care (2021)</a>
    <!--  target="_blank" href="http://marshallscare.com/" -->
    <a target="_blank" href="https://ovaliza.com/">Ovaliza (2021)</a>
    <a target="_blank" href="https://canto-legal.web.app/">DesCalendar (2021)</a>

    <Separator width="90%" maxWidth="500px" height="1px" color="#F7F7FF" margin="3em 0" />

    <a target="_blank" href="https://deschat-35f5b.web.app/">DesChat (Sketch)</a>
    <a target="_blank" href="https://clapppdfs.web.app/">PDF Editor (Sketch)</a>
    <a target="_blank" href="https://tictactoe-b2edd.web.app/">TicTacToe (Sketch)</a>
    <a target="_blank" href="https://deschat-35f5b.web.app/sketch">Profile Cards (Sketch)</a>

</div>


<style>
    div {
        display: grid;
        justify-items: center;
        gap: 1.25rem;

        min-height: 100%;
        max-width: 70ch;
        margin: auto;
        padding: 5rem 2rem;
    }

    a {
        color: inherit;
        text-decoration: none;
        
        width: fit-content;
        padding: .325em .75em;

        border-radius: 10px;

        font-size: 1.25rem;
        font-weight: 700;
        text-align: center;

        transition: .2s all;
        background-color: transparent;
    }

    a:hover,
    a:focus-visible {
        background-color: var(--cn-1);
    }

    a[aria-disabled="true"] {
        color: var(--cn-6);
        text-decoration: line-through;
        background-color: transparent !important;
        cursor: default;
    }

</style>