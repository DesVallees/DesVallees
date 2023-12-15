<script lang="ts">
    import { fade } from "svelte/transition";
    import { dictionary } from "../../stores";
</script>

<svelte:head>
    <title>{$dictionary.privacyPolicy}</title>
    <meta name="description" content="Our Privacy Policy outlines how we collect, use, and protect your personal information.">
</svelte:head>

<div class="privacy" in:fade>
    <article>
        <h1>{$dictionary.privacyPolicy}</h1>
    </article>
</div>

<style>
</style>
