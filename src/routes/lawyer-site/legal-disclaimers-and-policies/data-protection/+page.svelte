<script lang="ts">
    import { fade } from "svelte/transition";
    import { dictionary } from "../../stores";
    import { onMount } from "svelte";
	import toast from "svelte-french-toast";

    onMount(() => {
        toast(`${$dictionary.earlyDevelopmentStage}...`, {duration: 3000, style: "font-weight: bold; background-color: var(--content); color: var(--main);"})
    })
</script>

<svelte:head>
    <title>{$dictionary.dataProtection}</title>
    <meta name="description" content="Client data protection is a priority at LegalCollab. We implement industry-standard measures to secure your data and ensure confidentiality.">
</svelte:head>

<div class="privacy" in:fade>
    <article>
        <h1>{$dictionary.dataProtection}</h1>
    </article>
</div>

<style>
</style>
