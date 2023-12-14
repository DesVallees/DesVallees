<script lang="ts">
    import { fade } from "svelte/transition";
    import { dictionary } from "../stores";
</script>

<svelte:head>
    <title>{$dictionary.externalLegalResources}</title>
    <meta name="description" content="Useful legal forms, templates, and links to important government sites.">
</svelte:head>

<div class="external-resources" in:fade>
    <h1>{$dictionary.externalLegalResources}</h1>

    <!-- Links to useful legal forms and templates -->
    <section>
        <h2>Legal Forms and Templates</h2>
        <p>Access a variety of legal forms and templates that can be useful in different legal situations. Explore our collection of <a href="/legal-forms">Legal Forms</a>.</p>
    </section>

    <!-- Links to important government sites -->
    <section>
        <h2>Government Sites</h2>
        <p>Find important information and resources on government websites related to legal matters. Visit <a href="https://www.usa.gov/">USA.gov</a> for comprehensive government services.</p>
    </section>

    <!-- Additional external legal resources -->
    <section>
        <h2>Additional Resources</h2>
        <p>Explore more external legal resources that can provide valuable insights and information. Check out our curated list of <a href="/additional-resources">Additional Legal Resources</a>.</p>
    </section>
</div>

<style>
    /* Add your styling for the External Legal Resources page */
</style>
