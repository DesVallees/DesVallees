<script lang="ts">
	import { fade } from "svelte/transition";
	import { dictionary } from "../stores";

</script>

<svelte:head>
    <title>{$dictionary.blog}</title>
    <meta name="description" content="Find articles about...">
</svelte:head>

<div class="blog" in:fade>

</div>

<style>
    
</style>