<script lang="ts">
	import { fade } from "svelte/transition";
	import { dictionary } from "../../stores";

    import ArticleIndexer from "../../components/articleIndexer.svelte";

    let article: HTMLElement;
    
</script>

<svelte:head>
    <title>{$dictionary.divorceProceedings}</title>
    <meta name="description" content={$dictionary.exploreDivorceGuide}>
</svelte:head>

{#if article}
    <ArticleIndexer {article} />
{/if}

<article bind:this={article} in:fade>
    <h1>{$dictionary.divorceProceedings}</h1>

    <section>
        <h2>{$dictionary.articles.divorceProceedings.key1}</h2>
        <p>{$dictionary.articles.divorceProceedings.key2}</p>
    </section>
    
    <section>
        <h2>{$dictionary.articles.divorceProceedings.key3}</h2>
        <p>{$dictionary.articles.divorceProceedings.key4}</p>
    </section>
    
    <section>
        <h2>{$dictionary.articles.divorceProceedings.key5}</h2>
        <p>{$dictionary.articles.divorceProceedings.key6}</p>
    </section>
    
    <section>
        <h2>{$dictionary.articles.divorceProceedings.key7}</h2>
        <p>{$dictionary.articles.divorceProceedings.key8}</p>
    </section>
    
    <section>
        <h2>{$dictionary.articles.divorceProceedings.key9}</h2>
        <p>{$dictionary.articles.divorceProceedings.key10}</p>
    </section>
    
    <section>
        <h2>{$dictionary.articles.divorceProceedings.key11}</h2>
        <p>{$dictionary.articles.divorceProceedings.key12}</p>
    </section>
    
    <section>
        <h2>{$dictionary.articles.divorceProceedings.key13}</h2>
        <p>{$dictionary.articles.divorceProceedings.key14}</p>
    </section>
    
    <section>
        <h2>{$dictionary.articles.divorceProceedings.key15}</h2>
        <p>{$dictionary.articles.divorceProceedings.key16}</p>
    </section>
    
    <section>
        <h2>{$dictionary.articles.divorceProceedings.key17}</h2>
        <p>{$dictionary.articles.divorceProceedings.key18}</p>
    </section>
    

    <section>
        <a class="button" href="/lawyer-site/pricing">{$dictionary.articles.divorceProceedings.key19}</a>
    </section>

</article>