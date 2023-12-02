<script lang="ts">
	import { fade } from "svelte/transition";
	import Article from "../../components/article.svelte";
	import { dictionary, language } from "../../stores";
	import { page } from "$app/stores";
	import { capitalizeWords } from "../../functions";

    let article = ($dictionary.articles as any)[$page.params.article]

    $: $language, article = ($dictionary.articles as any)[$page.params.article]

</script>

<svelte:head>
    <title>{capitalizeWords(article.title)}</title>
</svelte:head>


{#key $page.params.article}

    <div class="general" in:fade|global>

        {#if article}

            <Article {...article}/>

        {:else}

            <p>{$dictionary.error}</p>
            
        {/if}


    </div>

{/key}



<style>

    .general {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1em;
        width: 100%;
    }
    
</style>