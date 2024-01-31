<script lang="ts">
    import { fade } from "svelte/transition";
    import { baseImageRoute, baseRoute, dictionary } from "../../stores";
	import Products from "../../components/products.svelte";
	import Review from "../../components/review.svelte";
	import { storage, type Product } from "../../mockDb";


    export let product = {
        id: 1,
        name: 'Jersey 2024 Blue',
        price: 185,
        description: 'Unleash your cycling potential with the \'Jersey 2024\'! Crafted for supreme comfort and performance, this jersey combines breathable fabric with a sleek design. Its vibrant blue color ensures visibility, while the ergonomic fit provides unmatched mobility. Perfect for both casual rides and competitive races. Elevate your ride today!',
        images: [
            'Jersey2024Blue.webp',
            'Jersey2024BlueBack.webp',
            'Jersey2024BlueBig.webp',
            'Jersey2024BlueFace.webp',
        ],
        reviews: {
            count: 67,
            rating: 4.8
        }
    };

    let similarProducts:Product[] = [
        storage.cyclingBib,
        storage.bibPlusJerseys,
        storage.radaSocks
    ]

    let quantity: number = 1;

    // Functions for incrementing and decrementing quantity
    function incrementQuantity() {
        quantity += 1;
    }

    function decrementQuantity() {
        if (quantity > 1) quantity -= 1;
    }

    // Function to handle adding item to cart
    function addToCart() {
        console.log(`Added ${quantity} of ${product.name} to cart.`);
        // Here, you would typically dispatch a custom event or store update
    }

    type Tab = "description" | "details" | "reviews";
    let currentTab:Tab = "description";

    function changeTab(newTab:Tab) {
        currentTab = newTab;
    }



    const reviews = [
  {
    date: '01-20-2024',
    reviewText: 'Nice color and good fabric quality. This is the perfect size and the blue version matches my style perfectly.',
    reviewerName: 'kylejameson',
    reviewerImageSrc: '/images/lawyers/Alejandro_Rodriguez.jpg',
    rating: 5
  },
  {
    date: '01-25-2024',
    reviewText: 'Absolutely love the new Jersey 2024, the blue color is vibrant and it feels very comfortable to wear.',
    reviewerName: 'sarahc',
    reviewerImageSrc: '/images/lawyers/Sofia_Lindström.jpg',
    rating: 4.5
  },
  {
    date: '02-01-2024',
    reviewText: 'The blue Jersey 2024 is amazing. It fits true to size and is very stylish for any event.',
    reviewerName: 'markuslee',
    reviewerImageSrc: '/images/lawyers/Brian_Mitchell.jpg',
    rating: 4
  },
  {
    date: '02-05-2024',
    reviewText: 'Great jersey, the material is high-quality and the blue is just the right shade. Highly recommend!',
    reviewerName: 'annak',
    reviewerImageSrc: '/images/lawyers/Emily_Davis.jpg',
    rating: 5
  },
  {
    date: '02-10-2024',
    reviewText: 'Picked up the Jersey 2024 for my workout sessions, and it’s been fantastic. Breathable and flexible!',
    reviewerName: 'lucas98',
    reviewerImageSrc: '/images/lawyers/Marcus_Turner.jpg',
    rating: 4.5
  }
];

</script>

<div class="product-container" in:fade>
    <div class="image-container">
        <img src="{baseImageRoute}/Resources/{product.images[0]}" alt={product.name} class="product-image" />
    </div>
    
    <div class="product-content">
        <div class="product-head">
            <h1 class="product-title">{product.name}</h1>
            <div class="product-price">${product.price}</div>
        </div>
        <div class="product-rating">
            <span class="rating">{product.reviews.rating} ★</span>
            <span class="review-count">({product.reviews.count} reviews)</span>
        </div>


        <nav class="product-navigation">
            <button type="button" class="product-nav-button" class:active={currentTab === "description"} on:click={() => changeTab("description")}>Description</button>
            <button type="button" class="product-nav-button" class:active={currentTab === "details"} on:click={() => changeTab("details")}>Details</button>
            <button type="button" class="product-nav-button" class:active={currentTab === "reviews"} on:click={() => changeTab("reviews")}>Reviews</button>
        </nav>

        {#if currentTab === "description"}
            <div class="product-description" in:fade>
                <p>{product.description}</p>
            </div>
        {:else if  currentTab === "details"}
            <div class="product-details" in:fade>
                <table border="1">
                    <tbody>
                        <tr>
                            <td>Material</td>
                            <td>High-Quality, Breathable Polyester</td>
                        </tr>
                        <tr>
                            <td>Color</td>
                            <td>Vibrant Blue</td>
                        </tr>
                        <tr>
                            <td>Size Availability</td>
                            <td>XS, S, M, L, XL, XXL</td>
                        </tr>
                        <tr>
                            <td>Fit Type</td>
                            <td>Ergonomic, Race Fit</td>
                        </tr>
                        <tr>
                            <td>Features</td>
                            <td>Quick-Dry, UV Protection, Anti-Sweat</td>
                        </tr>
                        <tr>
                            <td>Warranty</td>
                            <td>1 Year Manufacturer's Warranty</td>
                        </tr>
                        <tr>
                            <td>Care Instructions</td>
                            <td>Machine Washable, Do Not Iron</td>
                        </tr>
                        <tr>
                            <td>Price</td>
                            <td>$89.97</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        {:else if currentTab === "reviews"}
            <div class="product-reviews" in:fade>
                <div class="reviews-container">
                    {#each reviews as review}
                      <Review {...review} />
                    {/each}
                  </div>
            </div>
        {/if}
        
        <div class="quantity-selector">
            <button on:click={decrementQuantity} class="decrement">
                <ion-icon name="remove"></ion-icon>
            </button>
            <div class="quantity">{quantity}</div>
            <button on:click={incrementQuantity} class="increment">
                <ion-icon name="add"></ion-icon>
            </button>
        </div>
        
        <div class="actions">
            <button on:click={addToCart} class="add-to-cart-btn">Add to Cart</button>
        </div>

    </div>
    <div class="similar">
        <Products style="padding: 0;" carouselAutoColumns="calc(35% - var(--gap, 2.5rem))" title="Similar Products" products={similarProducts} />
    </div>
</div>

<style>
    .product-container {
        overflow: hidden;
        margin: auto;
        max-width: 800px;
    }

    .image-container {
        position: relative;
        display: flex;
        justify-content: center;
        z-index: 0;
        padding: 5rem 0 1rem;
    }

    .product-image {
        display: block;
    }

    .product-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .product-content {
        border-top-right-radius: 20px;
        border-top-left-radius: 20px;
        transform: translateY(-20px);
        background-color: var(--main);
        z-index: 1;
        padding: 2rem;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .product-title {
        font-size: 24px;
        margin-bottom: 0.25em;
    }

    .product-price {
        font-size: 22px;
        color: #0A84FF;
        font-weight: bold;
    }

    .product-rating {
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 14px;
    }

    .rating {
        color: #e6c10c;
    }

    .review-count {
        color: #6E6E73;
        font-size: 14px;
    }

    .product-navigation {
        display: grid;
        grid-auto-flow: column;
        justify-content: space-around;
        margin-top: 1rem;
        border-bottom: solid 1px var(--content-5);
    }

    .product-nav-button{
        padding: 10px 0;
        color: var(--content-8);
        width: fit-content;
        transition: .2s;
    }

    .product-nav-button:hover:not(.active),
    .product-nav-button:focus-visible {
        color: var(--content);
    }

    .product-nav-button.active {
        color: red;
        border-bottom: 5px solid var(--interactive);
    }
    
    .product-description {
        line-height: 1.5;
        padding: 1rem 0;
    }

    .product-details table {
        border-collapse: collapse;
        width: 100%;
        max-width: 600px; /* Adjust this to suit your layout */
        margin: .5rem auto;
        border-radius: 8px;
        overflow: hidden;
    }

    .product-details td {
        padding: 10px;
    }

    .product-details td:first-child {
        font-weight: bold;
    }

    .product-details td {
        border: none;
    }

    .reviews-container {
        display: flex;
        flex-direction: column;
        gap: 2rem; 
        margin: 2rem 0;
    }

    .quantity-selector {
        display: flex;
        
        margin: 1rem auto;
        border: solid 3px var(--interactive);
        border-radius: 3px;
        width: fit-content;

    }

    .quantity-selector > * {
        display: grid;
        place-items: center;
    }

    .quantity-selector ion-icon {
        font-size: 1.75rem;
    }
    
    .quantity-selector button {
        --border: solid 2px var(--interactive);
        background-color: var(--interactive);
        color: var(--main);
        font-size: 1.5rem;
        padding: .2rem;
    }

    .quantity-selector button:first-of-type {
        border-right: var(--border);
    }

    .quantity-selector button:last-of-type {
        border-left: var(--border);
    }

    .quantity {
        margin: 0 15px;
        font-size: 1.15rem;
        font-weight: bold;
    }

    .actions {
        display: flex;
        justify-content: center;
    }

    .add-to-cart-btn {
        background-color: var(--interactive);
        border: none;
        padding: 15px 30px;
        margin-bottom: 2rem;
        font-size: 1rem;
        font-weight: bold;
        color: var(--main);
        border-radius: 10px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .add-to-cart-btn:hover {
        filter: brightness(200%);
    }

    .similar {
        margin: 2rem 2rem 4rem;

        display: grid;
        justify-content: center;
    }
</style>

  

<svelte:head>
    <title>{product.name}</title>
    <meta name="description" content="Unleash your cycling potential with the \'Jersey 2024\'! Crafted for supreme comfort and performance, this jersey combines breathable fabric with a sleek design. Its vibrant blue color ensures visibility, while the ergonomic fit provides unmatched mobility. Perfect for both casual rides and competitive races. Elevate your ride today!">
</svelte:head>