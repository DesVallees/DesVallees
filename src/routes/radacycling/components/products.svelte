<script lang="ts">
	import Product from './product.svelte';
	import type { Product as ProductType } from '../mockDb';

	export let title: string = '';
	export let style: string = '';
	export let maxColumns: number = 4;
	export let gap: string = '2.5rem';

	export let products: ProductType[];
</script>

<section {style}>
	<h2>{title}</h2>
	<div style="--maxColumns: {maxColumns}; --gap: {gap};" class="noScrollbar">
		{#each products as item}
			<Product product={item} />
		{/each}
	</div>
</section>

<style>
	section {
		padding: 0 clamp(0.5rem, 4vw, 5rem);

		max-width: fit-content;
	}

	h2 {
		font-size: clamp(1.7rem, 4vw, 2.25rem);
		text-transform: capitalize;
		margin-bottom: 1rem;
	}

	div {
		--gap: var(--gap, 2.5rem);
		--maxColumns: var(--maxColumns, 4);

		padding: 5px 0.5rem 2rem;

		overflow-x: auto;

		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: calc(calc(100% / calc(var(--maxColumns) / 1)) - var(--gap));
		gap: var(--gap, 2.5rem);

		box-shadow: 10px 0 10px -10px #00000015, -10px 0 10px -10px #00000015;
	}

	@media screen and (max-width: 100rem) {
		div {
			grid-auto-columns: calc(calc(100% / calc(var(--maxColumns) / 1.25)) - var(--gap));
		}
	}
	@media screen and (max-width: 70rem) {
		div {
			grid-auto-columns: calc(calc(100% / calc(var(--maxColumns) / 1.75)) - var(--gap));
		}
	}
	@media screen and (max-width: 50rem) {
		div {
			grid-auto-columns: calc(calc(100% / calc(var(--maxColumns) / 2.5)) - var(--gap));
		}
	}
	@media screen and (max-width: 35rem) {
		div {
			grid-auto-columns: calc(calc(100% / calc(var(--maxColumns) / 3.5)) - var(--gap));
		}
	}
</style>
