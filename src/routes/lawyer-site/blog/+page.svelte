<script lang="ts">
	import { fade } from "svelte/transition";
	import { dictionary, language } from "../stores";
	import Typewriter from "../components/typewriter.svelte";

</script>

<svelte:head>
    <title>{$dictionary.blog}</title>
    <meta name="description" content="Find articles about...">
</svelte:head>

<div class="blog" in:fade>
    {#key $language}
        <Typewriter style="font-size: 2rem; font-weight: bold;" phrase="{$dictionary.comingSoon}..." />
    {/key}
</div>

<style>
    .blog {
        display: grid;
        place-items: center;

        min-height: 100%;
    }
</style>