<script lang="ts">
	export let href: string;
	export let name: string;
	export let description: string;
	export let src: string;
	export let disabled: boolean = false;

	const externalLink = href.substring(0, 1) !== '/';
</script>

<a
	class="card"
	data-sveltekit-reload={!externalLink}
	target={externalLink ? '_blank' : '_self'}
	{href}
	class:disabled
>
	{#if src}
		<img {src} alt={name} />
	{/if}
	<h2>{name}</h2>
	{#if description}
		<p>{description}</p>
	{/if}
</a>

<style>
	.card {
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		background-color: var(--interactive-1);

		color: var(--content);
		text-align: center;
		text-decoration: none;

		width: 100%;
		max-width: 350px;
		height: 100%;

		padding: 1.25rem;
		border-radius: 1rem;
		box-shadow: 0 2px 15px var(--content-2);
		transition: transform 0.2s, box-shadow 0.2s;
	}

	.card:hover {
		transform: translateY(-5px);
		box-shadow: 0 6px 20px var(--content-4);
	}

	.card img {
		height: 200px;
		max-width: 100%;
		object-fit: contain;

		border-radius: 8px;
		margin-bottom: 1rem;
	}

	.card h2 {
		font-size: 1.5rem;
		margin-bottom: 10px;
	}

	.card p {
		font-size: 1rem;
		line-height: 1.2;
		color: var(--content-7);
		margin-bottom: 20px;
	}

	.disabled {
		display: none;
	}
</style>
