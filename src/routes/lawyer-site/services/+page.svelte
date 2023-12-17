<script lang="ts">
	import { fade } from "svelte/transition";
	import { dictionary } from "../stores";

    import ArticleIndexer from "../components/articleIndexer.svelte";

    let article: HTMLElement;

</script>

<svelte:head>
    <title>{$dictionary.ourServices}</title>
    <meta name="description" content={$dictionary.welcomeToLegalCollab}>
</svelte:head>

{#if article}
    <ArticleIndexer {article} />
{/if}

<article bind:this={article} in:fade>
    <h1>{$dictionary.articles.servicesIntroduction.key1}</h1>

    <section>
        <h2>{$dictionary.articles.servicesIntroduction.key2}</h2>
        <p>{$dictionary.articles.servicesIntroduction.key3}</p>
    </section>

    <section>
        <h2>{$dictionary.articles.servicesIntroduction.key4}</h2>
        <p>{$dictionary.articles.servicesIntroduction.key5}</p>
        <ul>
            <li><strong>{$dictionary.articles.servicesIntroduction.key6}</strong> {$dictionary.articles.servicesIntroduction.key7}</li>
            <li><strong>{$dictionary.articles.servicesIntroduction.key8}</strong> {$dictionary.articles.servicesIntroduction.key9}</li>
            <li><strong>{$dictionary.articles.servicesIntroduction.key10}</strong> {$dictionary.articles.servicesIntroduction.key11}</li>
            <li><strong>{$dictionary.articles.servicesIntroduction.key12}</strong> {$dictionary.articles.servicesIntroduction.key13}</li>
        </ul>
    </section>

    <section>
        <h2>{$dictionary.articles.servicesIntroduction.key14}</h2>
        <p>{$dictionary.articles.servicesIntroduction.key15}</p>
        <ul>
            <li><strong>{$dictionary.articles.servicesIntroduction.key16}</strong> {$dictionary.articles.servicesIntroduction.key17}</li>
            <li><strong>{$dictionary.articles.servicesIntroduction.key18}</strong> {$dictionary.articles.servicesIntroduction.key19}</li>
            <li><strong>{$dictionary.articles.servicesIntroduction.key20}</strong> {$dictionary.articles.servicesIntroduction.key21}</li>
        </ul>
    </section>

    <section>
        <a class="button" href="/lawyer-site/contact">{$dictionary.getInTouch}</a>
        <p>{$dictionary.articles.servicesIntroduction.key22}</p>
    </section>

</article>