<script lang="ts">
	import { fade } from 'svelte/transition';
	import { dictionary } from '../../stores';

	import ArticleIndexer from '../../components/articleIndexer.svelte';

	let article: HTMLElement;
</script>

<svelte:head>
	<title>{$dictionary.custodyProceedings}</title>
	<meta name="description" content={$dictionary.navigateCustodyProceedings} />
</svelte:head>

{#if article}
	<ArticleIndexer {article} />
{/if}

<article bind:this={article} in:fade>
	<h1>{$dictionary.custodyProceedings}</h1>

	<section>
		<h2>{$dictionary.articles.custodyProceedings.key1}</h2>
		<p>{$dictionary.articles.custodyProceedings.key2}</p>
	</section>

	<section>
		<h2>{$dictionary.articles.custodyProceedings.key3}</h2>
		<p>{$dictionary.articles.custodyProceedings.key4}</p>
	</section>

	<section>
		<h2>{$dictionary.articles.custodyProceedings.key5}</h2>
		<p>{$dictionary.articles.custodyProceedings.key6}</p>
	</section>

	<section>
		<h2>{$dictionary.articles.custodyProceedings.key7}</h2>
		<p>{$dictionary.articles.custodyProceedings.key8}</p>
	</section>

	<section>
		<h2>{$dictionary.articles.custodyProceedings.key9}</h2>
		<p>{$dictionary.articles.custodyProceedings.key10}</p>
	</section>

	<section>
		<h2>{$dictionary.articles.custodyProceedings.key11}</h2>
		<p>{$dictionary.articles.custodyProceedings.key12}</p>
	</section>

	<section>
		<h2>{$dictionary.articles.custodyProceedings.key13}</h2>
		<p>{$dictionary.articles.custodyProceedings.key14}</p>
	</section>

	<section>
		<h2>{$dictionary.articles.custodyProceedings.key15}</h2>
		<p>{$dictionary.articles.custodyProceedings.key16}</p>
	</section>

	<section>
		<a class="button" href="/lawyer-site/pricing"
			>{$dictionary.articles.custodyProceedings.key17}</a
		>
	</section>
</article>
