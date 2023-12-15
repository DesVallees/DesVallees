<script lang="ts">
    import { fade } from "svelte/transition";
    import { dictionary } from "../../stores";
</script>

<svelte:head>
    <title>{$dictionary.termsOfService}</title>
    <meta name="description" content="Terms and conditions governing the use of our platform, services, and interactions with our network of attorneys.">
</svelte:head>

<div class="terms-of-service" in:fade>
    <article>
        <h1>{$dictionary.termsOfService}</h1>
    </article>
</div>

<style>
</style>
