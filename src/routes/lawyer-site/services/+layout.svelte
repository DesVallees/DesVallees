<script lang="ts">
	import { fade } from "svelte/transition";
	import { dictionary } from "../stores";

</script>

<svelte:head>
    <title>{$dictionary.ourServices}</title>
    <meta name="description" content="{$dictionary.navigateDivorce}">
</svelte:head>

<div class="services" in:fade>
    <div class="main">
        <slot/>
    </div>
    
    <nav>
        <div class="otherServices">
            <h2>{$dictionary.ourServices}</h2>

            <menu>
                <li><a class="link" href="/lawyer-site/services/divorce-proceedings">{$dictionary.divorceProceedings}</a></li>
                <li><a class="link" href="/lawyer-site/services/custody-proceedings">{$dictionary.custodyProceedings}</a></li>
            </menu>
        </div>
    </nav>
</div>

<style>
    .services {
        display: grid;
        grid-template-columns: 1fr auto;
        padding: 5rem 2rem;
        min-height: 100%;
    }

    .main {
        padding: 0 2rem;
        max-width: 800px;
        margin: auto;
    }

    nav {
        border-left: solid 2px var(--content);
        padding: 0 2rem;
    }

    .otherServices {
        display: grid;
    }

    h2{
        font-size: 1.8rem;
        margin-bottom: 1rem;
    }

    li {
        font-size: 1.1rem;
        margin-left: 1ch;
        list-style: none;
        text-align: end;
    }

    @media screen and (max-width: 1000px){
        .services {
            display: flex;
            flex-direction: column-reverse;
            padding: 2rem 0;
        }
        
        nav {
            border-left: 0;
            border-bottom: solid 2px var(--content);
            margin-bottom: 2rem;
            padding: 2rem;
        }
    }
</style>