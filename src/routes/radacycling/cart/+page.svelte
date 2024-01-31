<script lang="ts">
	import { fade } from 'svelte/transition';
	import { baseImageRoute, baseRoute, dictionary } from '../stores';
	import { cartItems, deliveryFee } from '../mockDb';

	let promoCode = '';

	function calculateSubtotal() {
		let subtotal = cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
		return subtotal;
	}

	const calculateTotal = () => {
		return calculateSubtotal() + deliveryFee;
	};
</script>

<div class="cart" in:fade>
	<h1>My Cart</h1>
	{#each cartItems as item (item.id)}
		<div class="cart-item">
			<img src={item.imageUrl} alt={item.name} />
			<div class="item-details">
				<h2>{item.name}</h2>
				<p>{item.details}</p>
				<div class="quantity-selector">
					<button on:click={() => (item.quantity = Math.max(1, item.quantity - 1))}>
						<ion-icon name="remove" />
					</button>
					<span class="quantity">{item.quantity}</span>
					<button on:click={() => (item.quantity += 1)}>
						<ion-icon name="add" />
					</button>
				</div>
			</div>
			<div class="cartRight">
				<div class="item-price">
					${item.price.toFixed(2)}
				</div>
			</div>
		</div>
	{/each}

	<div class="promo-code">
		<input type="text" bind:value={promoCode} placeholder="Enter your promo code" />
		<button>Validate</button>
	</div>
	<div class="pricing">
		<div>Sub Total: ${calculateSubtotal().toFixed(2)}</div>
		<div>Delivery Fee: ${deliveryFee.toFixed(2)}</div>
		<div>Total Amount: ${calculateTotal().toFixed(2)}</div>
	</div>
	<a href="{baseRoute}/checkout" class="checkout-button">CHECKOUT</a>
</div>

<svelte:head>
	<title>My Cart | RADA Cycling Wear</title>
	<meta
		name="description"
		content="Premium cycling wear designed for champions in training and racing. Shop our latest releases and enjoy free domestic shipping on orders over $100."
	/>
</svelte:head>

<style>
	.cart {
		max-width: 800px;
		margin: 6rem auto;
		padding: 0 1.25rem;
		border-radius: 8px;
	}

	h1 {
		font-size: clamp(1.5rem, 3.5vw, 1.75rem);
	}

	.cart-item {
		display: flex;
		align-items: center;
		border-bottom: 1px solid var(--content-7);
		padding: 2rem 0;
	}

	.cart-item img {
		width: 100px;
		height: auto;
		margin-right: 15px;
		border-radius: 4px;
	}

	.item-details {
		flex-grow: 1;
	}

	.item-details h2 {
		margin: 0;
		font-size: 16px;
		color: var(--content-9);
	}

	.item-details p {
		margin: 5px 0;
		font-size: 14px;
		color: var(--content);
	}

	.cartRight {
		display: grid;
		gap: 0.5rem;
		margin-left: 1rem;
		align-self: end;
	}

	.quantity-selector {
		display: flex;

		margin: 1rem 0;
		border: solid 2px var(--interactive);
		border-radius: 3px;
		width: fit-content;
	}

	.quantity-selector > * {
		display: grid;
		place-items: center;
	}

	.quantity-selector ion-icon {
		font-size: 1.5rem;
	}

	.quantity-selector button {
		--border: solid 2px var(--interactive);
		background-color: var(--interactive);
		color: var(--main);
		padding: 0.2rem;
	}

	.quantity-selector button:first-of-type {
		border-right: var(--border);
	}

	.quantity-selector button:last-of-type {
		border-left: var(--border);
	}

	.quantity {
		margin: 0 10px;
		font-size: 1rem;
	}

	.item-price {
		font-size: 18px;
	}

	.promo-code {
		display: flex;
		justify-content: space-between;
		margin: 3rem 0 1.5rem;
	}

	.promo-code input {
		flex-grow: 1;
		width: 10px;
		padding: 10px;
		margin-right: 10px;
		border: 1px solid var(--content-8);
		border-radius: 4px;
	}

	.promo-code button {
		background-color: var(--interactive);
		color: var(--main);
		font-weight: bold;
		border: none;
		padding: 10px 20px;
		cursor: pointer;
		border-radius: 4px;
	}

	.pricing {
		text-align: right;
		margin: 3rem 0 2rem;
		display: grid;
		gap: 1em;
	}

	.checkout-button {
		display: block;
		text-align: center;
		width: 100%;
		background-color: var(--interactive);
		color: var(--main);
		border: none;
		padding: 12px;
		margin-bottom: 2rem;
		font-size: 1.1rem;
		font-weight: bold;
		cursor: pointer;
		border-radius: 4px;
	}
</style>
