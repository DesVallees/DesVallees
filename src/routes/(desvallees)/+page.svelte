<script lang="ts">
    import './app.css'
	import Separator from "../intranet/components/separator.svelte";
	import { dictionary } from './stores';

</script>


<svelte:head>
    <title>DesVallees</title>
    <link rel="icon" href="https://fav.farm/👤" />
    <meta name="author" content="Santiago Ovalles">
    <meta name="description" content="Santiago Ovalles' Portfolio. Includes a comprehensive list of the projects and sketches he has made.">
    <meta name="keywords" content="Ovalles, Santiago, Desvallees, Portfolio">
</svelte:head>

<div>

    <h1>{$dictionary.santiagoOvallesProjects}</h1>
    
    <a data-sveltekit-reload href="/journee">Journée ({$dictionary.comingSoon})</a>
    
    <Separator width="90%" maxWidth="500px" height="2px" color="var(--content-8)" margin="1.5rem 0" />
    
    <a data-sveltekit-reload href="/lawyer-site">{$dictionary.attorneyCollaborativeOnlineService} (2023)</a>
    <a data-sveltekit-reload href="/intranet">{$dictionary.intranet} (2023)</a>
    <a data-sveltekit-reload href="/ccs">CCS (2023)</a>
    <a data-sveltekit-reload href="/destype">DesType (2023)</a>
    <a data-sveltekit-reload href="/threlte">Threlte (2023)</a>
    
    <Separator width="90%" maxWidth="500px" height="2px" color="var(--content-8)" margin="3rem 0" />
    
    <a target="_blank" href="https://clappforms.web.app/">{$dictionary.clappForms} (2022)</a>
    <a target="_blank" href="https://legaloffice.peopleworksservices.com/">{$dictionary.backoffice} (2022)</a>
    
    <Separator width="90%" maxWidth="500px" height="2px" color="var(--content-8)" margin="3rem 0" />
    
    <a aria-disabled="true" href="/">Marshall's Care (2021)</a>
    <!--  target="_blank" href="http://marshallscare.com/" -->
    <a target="_blank" href="https://ovaliza.com/">Ovaliza (2021)</a>
    <a target="_blank" href="https://canto-legal.web.app/">DesCalendar (2021)</a>

    <Separator width="90%" maxWidth="500px" height="2px" color="var(--content-8)" margin="3rem 0" />

    <a target="_blank" href="https://deschat-35f5b.web.app/">DesChat ({$dictionary.sketch})</a>
    <a target="_blank" href="https://clapppdfs.web.app/">{$dictionary.pdfEditor} ({$dictionary.sketch})</a>
    <a target="_blank" href="https://tictactoe-b2edd.web.app/">{$dictionary.ticTacToe} ({$dictionary.sketch})</a>
    <a target="_blank" href="https://deschat-35f5b.web.app/sketch">{$dictionary.profileCards} ({$dictionary.sketch})</a>

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

    h1 {
        font-size: 1.75rem;
        margin-bottom: 2.5rem;
        text-decoration: underline;
        text-underline-offset: 4px;
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
        background-color: var(--content-1);
    }

    a[aria-disabled="true"] {
        color: var(--content-6);
        text-decoration: line-through;
        background-color: transparent !important;
        cursor: default;
    }

</style>