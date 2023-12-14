<script lang="ts">
	import { fade } from "svelte/transition";
	import { dictionary } from "../stores";

    import ArticleIndexer from "../components/articleIndexer.svelte";

    let article: HTMLElement;

</script>

<svelte:head>
    <title>{$dictionary.ourServices}</title>
    <meta name="description" content="Do you need a lawyer to help you with a divorce or custody proceeding? Find out what we can do for you.">
</svelte:head>

{#if article}
    <ArticleIndexer {article} />
{/if}

<article bind:this={article} in:fade>
    <h1>Here are our services</h1>

    <p>We are affordable and stuff...</p>

    <h2>Benefits of choosing online legal representation.</h2>


</article>

<div class="pricing">
    <h3>Here's a link to our pricing</h3>
    <a href="/lawyer-site/pricing">Learn more about our pricing information</a>
</div>


<style>
    
</style>