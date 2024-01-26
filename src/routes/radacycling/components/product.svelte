<script lang="ts">
	import { onMount } from "svelte";
	import { baseImageRoute, baseRoute, dictionary } from "../stores";

    type Version = {
        imageSrc: string,
        imgHoverSrc: string | undefined,
        imageAlt: string,
        hrefParam: string,
    };
    
    export let name: string;
    export let imageSrc: string;
    export let imgHoverSrc: string | undefined = undefined;
    export let imageAlt: string;
    export let price: string;
    export let oldPrice: string | undefined;
    export let versions: Version[] | undefined;
    export let href: string;

    let img:HTMLImageElement;

    let originalImageSrc: string;
    function handleImageHover() {
        originalImageSrc = imageSrc;
        let originalImageWidth = img.offsetWidth;
        let originalImageHeight = img.offsetHeight;
        
        if (imgHoverSrc) {
            img.style.width = `${originalImageWidth}px`;
            img.style.height = `${originalImageHeight}px`;
            imageSrc = imgHoverSrc;
        }
    }
    function handleImageUnhover() {
        if (imgHoverSrc) {
            img.style.width = `100%`;
            img.style.height = `auto`;
            imageSrc = originalImageSrc;
        }
    }
    
    onMount(() => {
        img.onmouseover = handleImageHover;
        img.onmouseleave = handleImageUnhover
    })

    function calculateDiscount(oldPrice: string, currentPrice: string): string {
        // Function to extract numeric part from the price string
        const extractNumber = (price: string) => {
            const numericPart = price.replace(/[^0-9.]/g, '');
            return parseFloat(numericPart);
        };

        // Extracting numbers from the provided string prices
        const oldPriceNum = extractNumber(oldPrice);
        const currentPriceNum = extractNumber(currentPrice);

        // Validating extracted numbers to prevent division by zero or negative values
        if (isNaN(oldPriceNum) || isNaN(currentPriceNum) || oldPriceNum <= 0 || currentPriceNum > oldPriceNum) {
            throw new Error('Invalid price input');
        }

        // Calculating discount percentage
        const discount = ((oldPriceNum - currentPriceNum) / oldPriceNum) * 100;

        // Returning the discount as a formatted string
        return `${discount.toFixed(0)}%`;
    }

    let currentVersionSrc = imageSrc;
    function changeVersion(newImageSrc: string, newImageHoverSrc: string | undefined) {
        imageSrc = newImageSrc;
        imgHoverSrc = newImageHoverSrc;

        currentVersionSrc = imageSrc;
    }

</script>

<div class="product">
    <a href="{baseRoute}/catalog/{href}" aria-label="{name}">
        <img bind:this={img} class="mainImage" src="{baseImageRoute}/Resources/{imageSrc}" alt="{imageAlt}">
    </a>

    <div class="productInfo">
        <div class="left">
            <h2>{name}</h2>
            <div class="prices">
                <p class="price">{price}</p>
                {#if oldPrice}
                    <p class="oldPrice">{oldPrice}</p>
                {/if}
            </div>
        </div>

        <div class="right">
            <button class="add" aria-label="{$dictionary.addToCart}">
                <ion-icon name="add"></ion-icon>
            </button>
        </div>
    </div>

    {#if versions}
        <div class="versions">
            {#each versions as item}
                <button aria-label="{item.imageAlt}" class:current={currentVersionSrc === item.imageSrc} on:click={() => changeVersion(item.imageSrc, item.imgHoverSrc)}>
                    <img width="50px" src="{baseImageRoute}/Resources/{item.imageSrc}" alt="{item.imageAlt}">
                </button>
            {/each}
        </div>
    {/if}
</div>

<style>
.product {
    --borderRadius: 10px;
    max-width: 25rem;
    background: #1e1e1e;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 .2rem .5rem var(--content-2);
    transition: transform 0.3s ease;
}

.product:hover {
    transform: translateY(-5px);
}

.mainImage {
    width: 100%;
    object-fit: cover;
    display: block;
    transition: opacity 0.3s ease;
}

.productInfo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    gap: 1rem;
}

.left h2 {
    margin: 0;
    font-size: clamp(1.5rem, 4vw, 2rem);
    line-height: 1.25;
}

.prices {
    font-size: clamp(1.25rem, 4vw, 1.5rem);
    display: flex;
    align-items: baseline;
    margin-top: .25rem;
}

.price {
    margin-right: 10px;
}

.oldPrice {
    font-size: .8em;
    color: var(--interactive);
    text-decoration: line-through;
}

.right {
    display: flex;
    align-items: center;
}

.add {
    background-color: var(--interactive-8);
    border: none;
    padding: 10px 12.5px;
    font-size: clamp(1rem, 3vw, 1.25rem);
    border-radius: var(--borderRadius, 10px);
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
    transition: background-color 0.3s ease;
}

.add:hover {
    background-color: var(--interactive);
}

.add ion-icon {
    --ionicon-stroke-width: 69px;
}

/* Versions Styles */
.versions {
    display: flex;
    justify-content: center;
    padding: 10px;
}

.versions button {
    background: none;
    border: none;
    padding: 5px;
    cursor: pointer;
    transition: transform 0.3s ease;
}

.versions button:hover {
    transform: scale(1.1);
}

.versions button.current img {
    border: 3px solid var(--interactive);
    box-shadow: 0 0 1rem var(--interactive-3);
    border-radius: var(--borderRadius, 10px);
}

.versions img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: var(--borderRadius, 10px);
}

</style>