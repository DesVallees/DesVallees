<script lang="ts">
    import { fade } from "svelte/transition";
    import { baseImageRoute, baseRoute, dictionary } from "../stores";

    let cartItems = [
        {
            id: 1,
            name: 'Jersey 2024',
            details: 'Red Jersey 2024',
            quantity: 1,
            price: 89.97,
            imageUrl: `${baseImageRoute}/Resources/Jersey2024RedBig.webp`,
        },
        {
            id: 2,
            name: 'Cycling Bib 2024',
            details: 'Cycling Bib 2024',
            quantity: 1,
            price: 99.97,
            imageUrl: `${baseImageRoute}/Resources/bibFocus.webp`,
        },
        {
            id: 3,
            name: 'Bib + Jersey + Free Socks',
            details: 'Offer: 1 Bib Plus 1 Jersey Plus Free Socks',
            quantity: 1,
            price: 219.97,
            imageUrl: `${baseImageRoute}/Resources/radimir.jpg`,
        },
        {
            id: 4,
            name: 'RADA Socks',
            details: 'RADA Socks',
            quantity: 1,
            price: 16.00,
            imageUrl: `${baseImageRoute}/Resources/RadaSocks.webp`,
        }
    ]
    
    let promoCode = '';
    let deliveryFee = 8.18;
  
    const calculateTotal = () => {
    let subtotal = cartItems.reduce((total, item) => total + (item.quantity * item.price), 0);
        return subtotal + deliveryFee;
    }
</script>
  
<div class="cart" in:fade>
    <h1>My Cart</h1>
    {#each cartItems as item (item.id)}
        <div class="cart-item">
            <img src={item.imageUrl} alt={item.name} />
            <div class="item-details">
                <h2>{item.name}</h2>
                <p>{item.details}</p>
            </div>
            <div class="cartRight">
                <div class="quantity-selector">
                    <button on:click={() => item.quantity = Math.max(1, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button on:click={() => item.quantity += 1}>+</button>
                </div>
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
        <div>Sub Total: ${calculateTotal().toFixed(2)}</div>
        <div>Delivery Fee: ${deliveryFee.toFixed(2)}</div>
        <div>Total Amount: ${calculateTotal().toFixed(2)}</div>
    </div>
    <a href="{baseRoute}/checkout" class="checkout-button">CHECKOUT</a>
</div>  

<style>
    .cart {
        max-width: 600px;
        margin: auto;
        border-radius: 8px;
        padding: 20px;
        padding-top: 5rem;
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
        gap: .5rem;
        margin-left: 1rem;
    }

    .quantity-selector {
        display: flex;
        align-items: center;
        margin-right: 15px;
    }

    .quantity-selector button {
        border: none;
        background-color: var(--interactive);
        padding: 5px 10px;
        cursor: pointer;
    }

    .quantity-selector span {
        margin: 0 10px;
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
        padding: 10px;
        margin-right: 10px;
        border: 1px solid var(--content-8);
        border-radius: 4px;
    }

    .promo-code button {
        background-color: var(--interactive);
        border: none;
        padding: 10px 20px;
        cursor: pointer;
        border-radius: 4px;
    }

    .pricing {
        text-align: right;
        margin: 2rem 0;
    }

    .checkout-button {
        display: block;
        text-align: center;
        width: 100%;
        background-color: var(--interactive);
        border: none;
        padding: 15px;
        font-size: 18px;
        cursor: pointer;
        border-radius: 4px;
    }    
</style>