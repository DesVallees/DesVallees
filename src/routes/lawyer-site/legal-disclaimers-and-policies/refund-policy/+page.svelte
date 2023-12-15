<script lang="ts">
    import { fade } from "svelte/transition";
    import { dictionary } from "../../stores";
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
