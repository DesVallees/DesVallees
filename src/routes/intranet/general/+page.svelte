<script lang="ts">
	import { fade } from 'svelte/transition';
	import { dictionary } from '../stores';
	import ArticleLink from '../components/articleLink.svelte';
	import GeneralHeader from '../components/generalHeader.svelte';

	let searchValue: string;
</script>

<svelte:head>
	<title>{$dictionary.generalInformation}</title>
</svelte:head>

<div class="general" in:fade|global>
	<GeneralHeader bind:searchValue />

	{#each Object.entries($dictionary.articles) as [key, value]}
		{#if !searchValue || value.title
				.toLowerCase()
				.includes(searchValue.toLowerCase()) || value.author
				.toLowerCase()
				.includes(searchValue.toLowerCase())}
			<ArticleLink article={value} link={key} />
		{/if}
	{/each}
</div>

<style>
	.general {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		margin-top: 70px;
		padding: 0 1em;
	}
</style>
