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

    <section>
        <h2>Government Sites</h2>
        <p>Find important information and resources on government websites related to legal matters. Visit <a target="_blank" href="https://www.usa.gov/">USA.gov</a> for comprehensive government services.</p>
    </section>

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
</style>
