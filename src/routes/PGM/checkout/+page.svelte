<script lang="ts">
	import { fade } from 'svelte/transition';
	import { baseImageRoute, baseRoute, cartItems, dictionary } from '../stores';
	import { deliveryFee, denormalizeCartItems, type DenormalizedCartItem } from '../mockDb';
	import { onMount } from 'svelte';

	const demoProductAPI = 'price_1OeSVfH1JOQComXCKyj7cG5z';
	let demoCartItems = [
		{
			id: demoProductAPI,
			quantity: 2,
			name: 'PGM Purchase',
		},
	];

	let shippingAddress: string;
	let phoneNumber: string;
	let fullName: string = '';
	let email: string = '';
	let city: string = '';
	let postalCode: string = '';
	let country: string = '';

	async function submitForm() {
		return;
		if (
			!fullName ||
			!email ||
			!shippingAddress ||
			!city ||
			!postalCode ||
			!country ||
			!phoneNumber
		) {
			console.error('Please fill in all the fields');
			return;
		}

		// Logging for demonstration purposes
		console.log('Form submitted with following details:', {
			fullName,
			email,
			shippingAddress,
			city,
			postalCode,
			country,
			phoneNumber,
		});

		if (!validatePhoneNumber(phoneNumber)) {
			console.error('Invalid phone number');
			return;
		}

		await fetch(`${baseRoute}/api/stripe-checkout`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application.json',
			},
			body: JSON.stringify({
				items: demoCartItems,
			}),
		})
			.then((data) => {
				return data.json();
			})
			.then((data) => {
				window.location.replace(data.url);
			});
	}

	let denormalizedData: DenormalizedCartItem[];

	function getCartItems() {
		try {
			denormalizedData = denormalizeCartItems($cartItems);
		} catch (error) {
			console.error(error);
		}
	}

	function calculateSubtotal() {
		let subtotal = denormalizedData.reduce((total, item) => total + item.totalItemPrice, 0);
		return subtotal;
	}

	const calculateTotal = () => {
		return calculateSubtotal() + deliveryFee;
	};

	function validatePhoneNumber(phone: string): boolean {
		return true;
	}

	onMount(() => {
		getCartItems();
	});
	$: $cartItems, getCartItems();
</script>

<div class="checkout" in:fade>
	<div class="checkout-header">
		<h1>{$dictionary.shippingInformation}</h1>
	</div>

	<form on:submit|preventDefault={submitForm}>
		<div class="user-info">
			<input type="text" required bind:value={fullName} placeholder={$dictionary.fullName} />
			<input type="email" required bind:value={email} placeholder={$dictionary.email} />
			<input
				type="text"
				required
				bind:value={shippingAddress}
				placeholder={$dictionary.shippingAddress}
			/>
			<input type="text" required bind:value={city} placeholder={$dictionary.city} />
			<input
				type="text"
				required
				bind:value={postalCode}
				placeholder={$dictionary.postalCode}
			/>
			<input type="text" required bind:value={country} placeholder={$dictionary.country} />
			<input
				type="tel"
				required
				bind:value={phoneNumber}
				placeholder={$dictionary.phoneNumber}
			/>
		</div>

		{#key $cartItems}
			<div class="cart-items">
				{#each denormalizedData as item}
					<div class="cart-item">
						<img src="{baseImageRoute}/{item.imageSrc}" alt={item.name} />
						<div class="item-details">
							<p><strong>{item.name}</strong></p>
							<p>{$dictionary.quantity}: {item.quantity}</p>
							<p>{$dictionary.totalPrice}: ${item.totalItemPrice.toFixed(2)}</p>
						</div>
					</div>
				{/each}
			</div>

			<div class="totals">
				<div>
					<h2>{$dictionary.subtotal}</h2>
					<span class="value">${calculateSubtotal().toFixed(2)}</span>
				</div>
				<div>
					<h2>{$dictionary.deliveryFee}</h2>
					<span class="value">${deliveryFee.toFixed(2)}</span>
				</div>
				<div>
					<h2>{$dictionary.totalAmount}</h2>
					<span class="value">${calculateTotal().toFixed(2)}</span>
				</div>
			</div>
		{/key}

		<button type="submit" class="continue-btn">{$dictionary.continue}</button>
	</form>
</div>

<svelte:head>
	<title>{$dictionary.shippingInformation}</title>
	<meta name="description" content={$dictionary.siteDescription} />
</svelte:head>

<style>
	/* Base styles for the checkout form */
	.checkout {
		max-width: 800px;
		margin: 6rem auto;
		padding: 0 1.25rem;
		border-radius: 8px;
	}

	/* Header style */
	.checkout-header {
		margin-bottom: 30px;
		text-align: left;
		border-bottom: 1px solid var(--content-8);
		padding-bottom: 10px;
	}

	h1 {
		font-size: clamp(1.5rem, 3.5vw, 1.75rem);
	}

	/* User Information Form Styles */
	.user-info {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 20px;
		margin-bottom: 20px;
	}

	.user-info input[type='text'],
	.user-info input[type='email'],
	.user-info input[type='tel'] {
		width: 100%;
		padding: 10px;
		border: 1px solid var(--content-2);
		border-radius: 5px;
		font-size: 1rem;
	}

	.user-info input[type='text']:focus,
	.user-info input[type='email']:focus,
	.user-info input[type='tel']:focus {
		outline: none;
		border-color: var(--content);
		box-shadow: 0 0 0 2px var(--content-2);
	}

	.user-info input::placeholder {
		color: var(--content-8);
	}

	/* Responsive adjustments for smaller screens */
	@media (max-width: 768px) {
		.user-info {
			grid-template-columns: 1fr;
		}
	}

	/* Style for the totals section */
	.totals {
		line-height: 1.5;
		margin-bottom: 20px;
	}

	.totals div {
		display: grid;
		grid-auto-flow: column;
	}

	/* Bold style for total labels */
	.totals h2 {
		font-size: medium;
		font-weight: bold;
	}

	/* Style for total values */
	.totals .value {
		justify-self: end;
	}

	/* Clear float */
	.totals:after {
		content: '';
		display: table;
		clear: both;
	}

	/* Style for the continue button */
	.continue-btn {
		width: 100%;
		margin-top: 1rem;
		padding: 10px;
		background-color: var(--interactive);
		color: var(--main);
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-size: 1rem;
		font-weight: bold;
		text-transform: uppercase;
		letter-spacing: 1px;
		transition: filter 0.3s ease;
	}

	.continue-btn:hover {
		filter: brightness(200%);
	}

	/* Styles for Cart Items */
	.cart-items {
		display: flex;
		flex-direction: column;
		margin: 3rem 0;
	}

	.cart-item {
		display: flex;
		border-bottom: 1px solid #ddd;
		padding: 2rem 0.5rem;
	}

	.cart-item img {
		width: 100px; /* Adjust as needed */
		height: auto;
		border-radius: 4px;
		margin-right: 15px;
	}

	.item-details p {
		margin: 5px 0;
		font-size: clamp(0.95rem, 3.5vw, 1rem);
	}
</style>
