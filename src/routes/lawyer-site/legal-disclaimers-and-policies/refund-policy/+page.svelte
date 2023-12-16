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
    <title>{$dictionary.refundPolicy}</title>
    <meta name="description" content="Information about our refund policy.">
</svelte:head>

<div class="privacy" in:fade>
    <article>
        <h1>{$dictionary.refundPolicy}</h1>
    </article>
</div>

<style>
</style>
