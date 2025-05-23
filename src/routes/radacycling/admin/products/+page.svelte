<script lang="ts">
	import { fade, slide } from 'svelte/transition';
	import { db } from '$lib/firebase/rada';
	import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
	import { denormalizeCategories, type Product, type Category } from '../../mockDb';
	import { onMount } from 'svelte';
	import { baseImageRoute, baseRoute } from '../../stores';
	import { goto } from '$app/navigation';
	import toast from 'svelte-french-toast';

	let products: Product[] = [];
	let filteredProducts: Product[] = [];
	let categories: Category[] = [];
	let searchQuery = '';

	$: searchQuery, (filteredProducts = filterProducts());

	async function fetchProducts() {
		try {
			const querySnapshot = await getDocs(collection(db, 'products'));
			products = querySnapshot.docs.map((doc) => doc.data() as Product);
			filteredProducts = filterProducts();
			categories = denormalizeCategories(products.flatMap((product) => product.categoryIds));
		} catch (error) {
			console.error('Error fetching products:', error);
		}
	}

	onMount(() => {
		fetchProducts();
	});

	function filterProducts() {
		return products.filter(
			(product) =>
				searchQuery === '' ||
				product.name.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
				product.description.en.toLowerCase().includes(searchQuery.toLowerCase()),
		);
	}

	async function toggleStatus(productId: string, newStatus: boolean) {
		// Update the product status in the local state
		products = products.map((product) =>
			product.id === productId ? { ...product, status: !newStatus } : product,
		);

		// Update the filtered products
		searchQuery = searchQuery;

		// Update the product status in the database
		try {
			const productRef = doc(db, 'products', productId);
			await updateDoc(productRef, { status: newStatus });
		} catch (error) {
			toast.error('Error updating product status');
			console.error('Error updating product status:', error);
		}
	}

	function editProduct(product: Product) {
		goto(`${baseRoute}/admin/products/${product.id}`);
	}
</script>

<svelte:head>
	<title>Admin | Products</title>
</svelte:head>

<div class="products-page">
	<header>
		<h1>Product List</h1>
	</header>
	<main>
		<div class="header">
			<div class="action-buttons">
				<button class="add-button">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						width="24"
						height="24"
					>
						<path
							d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-6H5v-2h6V5h2v6h6v2h-6v6z"
						/>
					</svg>
					Add Product
				</button>
			</div>
			<input
				type="text"
				placeholder="Search products..."
				bind:value={searchQuery}
				class="search-bar"
			/>
		</div>
		<div in:fade class="products">
			{#if products.length > 0}
				{#if filteredProducts.length > 0}
					<table>
						<thead>
							<tr>
								<th>
									<div class="th_content">Image</div>
								</th>
								<th>
									<div class="th_content">Name</div>
								</th>
								<th>
									<div class="th_content">Price</div>
								</th>
								<th>
									<div class="th_content">Status</div>
								</th>
								<th>
									<div class="th_content">Categories</div>
								</th>
								<th>
									<div class="th_content">Action</div>
								</th>
							</tr>
						</thead>
						<tbody>
							{#each filteredProducts as product}
								<tr>
									<td>
										<img
											src="{baseImageRoute}/{product.imageSources[0]}"
											alt={product.imageAlt.en}
										/>
									</td>
									<td class="ellipsis">{product.name.en}</td>
									<td>{product.price}</td>
									<td class="center-align">
										<label class="switch">
											<input
												type="checkbox"
												bind:checked={product.status}
												on:change={() =>
													toggleStatus(product.id, product.status)}
											/>
											<span class="slider" />
										</label>
									</td>
									<td class="ellipsis">
										{#each product.categoryIds as id}
											<span class="badge"
												>{categories.find((category) => category.id === id)
													?.name.en}</span
											>
										{/each}
									</td>
									<td class="center-align">
										<button
											class="action-button edit-button"
											on:click={() => editProduct(product)}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												width="24"
												height="24"
											>
												<path
													d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
												/>
											</svg>
										</button>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				{:else}
					<p>No products match your search criteria.</p>
				{/if}
			{:else}
				<p>Loading products...</p>
			{/if}
		</div>
	</main>
</div>

<style>
	.products-page {
		padding: 1rem;
		display: grid;
		align-items: center;
	}

	main {
		width: 100%;
		margin: 0 auto;
		border: #00000010 solid 3px;
		border-radius: 20px;
		overflow: hidden;
		overflow: clip;
		background-color: #fff;
		padding: 1.5rem 2rem;
		display: grid;
		align-items: center;
		gap: 1rem;
	}

	h1 {
		margin-bottom: 1rem;
		font-size: 2rem;
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}

	.add-button {
		display: flex;
		align-items: center;
		gap: 0.75ch;
		border: solid 1px var(--interactive-5);
		background-color: var(--interactive-1);
		box-shadow: 1px 1px 5px #00000010;
		color: var(--interactive);
		padding: 0.5rem 0.75rem;
		border-radius: 10px;
		cursor: pointer;
	}

	.add-button svg {
		fill: var(--interactive);
	}

	.add-button:hover {
		filter: brightness(120%);
	}

	.search-bar {
		padding: 0.75rem 1rem;
		border: 1px solid #ddd;
		border-radius: 10px;
	}

	table {
		width: 100%;
		border-collapse: collapse;
	}

	tbody tr:not(:last-of-type) {
		border-bottom: 3px solid #00000010;
	}

	th,
	td {
		text-align: left;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-user-select: none;
		user-select: none;
		cursor: default;
	}

	th:not(:first-of-type):not(:last-of-type) {
		font-weight: bold;
		padding: 0 0.2rem;
	}

	td {
		padding: 0.5rem 1rem;
	}

	.th_content {
		border-radius: 5px;
		background-color: #00000010;
		padding: 0.5rem 1rem;
	}

	td img {
		width: 60px;
		height: 60px;
		object-fit: contain;
		border-radius: 10px;
	}

	.ellipsis {
		max-width: 200px;
	}

	.center-align {
		text-align: center;
	}

	.switch {
		position: relative;
		display: inline-block;
		width: 34px;
		height: 20px;
	}

	.switch input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	.slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #ccc;
		transition: 0.4s;
		border-radius: 34px;
	}

	.slider:before {
		position: absolute;
		content: '';
		height: 14px;
		width: 14px;
		left: 3px;
		bottom: 3px;
		background-color: white;
		transition: 0.4s;
		border-radius: 50%;
	}

	input:checked + .slider {
		background-color: #4caf50;
	}

	input:checked + .slider:before {
		transform: translateX(14px);
	}

	.badge {
		display: inline-block;
		padding: 0.25rem 0.5rem;
		margin-right: 0.25rem;
		border-radius: 5px;
		background-color: #007bff;
		color: white;
		font-size: 0.75rem;
	}

	.action-button {
		background: none;
		border: none;
		cursor: pointer;
		color: var(--interactive);
		font-size: 1.5rem;
		border-radius: 50%;
		padding: 0.3em;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: all 0.1s;
		margin: auto;
	}

	.action-button svg {
		fill: var(--interactive);
	}

	.edit-button:hover {
		background-color: #00000010;
	}
</style>
