<script lang="ts">
    import { fade } from "svelte/transition";
    import { dictionary } from "../stores";
	import { onMount } from "svelte";
	import toast from "svelte-french-toast";

    onMount(() => {
        toast(`${$dictionary.earlyDevelopmentStage}...`, {duration: 3000, style: "font-weight: bold; background-color: var(--content); color: var(--main);"})
    })
</script>

<svelte:head>
    <title>{$dictionary.externalLegalResources}</title>
    <meta name="description" content="Useful legal forms, templates, and links to important government sites.">
</svelte:head>

<div class="external-resources" in:fade>
    <h1>{$dictionary.externalLegalResources}</h1>

    <section>
        <h2>Legal Forms and Templates</h2>
        <p>Access a variety of legal forms and templates that can be useful in different legal situations. Explore our collection of <a target="_blank" href="/legal-forms">Legal Forms</a>.</p>
    </section>

    <hr>

    <section>
        <h2>Government Sites</h2>
        <p>Find important information and resources on government websites related to legal matters. Visit <a target="_blank" href="https://www.usa.gov/">USA.gov</a> for comprehensive government services.</p>
    </section>

    <hr>

    <section>
        <h2>Additional Resources</h2>
        <p>Explore more external legal resources that can provide valuable insights and information.</p>
        <ul>
            <h6>An additional resource</h6>
            <li><a target="_blank" href="/">Name of the resource</a></li>
        </ul>
    </section>
</div>

<style>
    .external-resources {
        padding: 3rem 2rem 10rem;
        max-width: 1500px;
        margin: auto;
    }

    h1 {
        font-size: clamp(3.3rem, 12vw, 4.5rem);
        margin: auto;
        margin-bottom: 1rem;
        width: fit-content;
        text-align: center;
        line-height: 2.5ex;
    }

    h2 {
        font-size: clamp(2rem, 4vw, 2.5rem);
        line-height: 2.5ex;
        margin-bottom: 1rem;
    }
    
    p {
        font-size: clamp(1.25rem, 3vw, 1.5rem);
        line-height: 3ex;
        text-wrap: pretty;
    }

    section {
        max-width: 75ch;
        margin: auto;

        display: grid;
        place-items: center;
    }

    a {
        font-size: 1.25rem;
        margin: 3rem 0;
    }

    hr {
        width: min(100%, 70ch);
        margin: 10rem auto;
    }
</style>
