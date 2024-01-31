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
        {#if oldPrice}
            <p class="discount">{calculateDiscount(oldPrice, price)} {$dictionary.discount}</p>
        {/if}
    </a>

    <div class="productInfo">
        <div class="left">
            <a href="{baseRoute}/catalog/{href}">
                <h2>{name}</h2>
            </a>
            <div class="prices">
                <p class="price">{price}</p>
                {#if oldPrice}
                    <p class="oldPrice">{oldPrice}</p>
                {/if}
            </div>
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
        position: relative;
        max-width: 25rem;
        overflow: hidden;
    }
    
    .mainImage {
        width: 100%;
        max-width: 24rem;
        object-fit: cover;
        display: block;
        border-radius: 5px;
        aspect-ratio: 1 / 1;
    }

    .discount {
        position: absolute;
        top: 1rem;
        right: 1rem;

        background-color: green;
        color: white;
        border-radius: 5px;
        padding: .3em .6em;
    }

    h2 {
        margin-top: 1rem;
        margin-bottom: .5rem;

        font-size: clamp(1.5rem, 4vw, 2rem);
        line-height: 1.2;
    }

    .prices {
        display: flex;
        gap: 2ch;
    }
    
    p {
        font-size: clamp(1rem, 2vw, 1.25rem);
        color: var(--content-9);
    }

    .oldPrice {
        color: var(--content-8);
        text-decoration: line-through;
    }

    /* Versions Styles */
    .versions {
        display: flex;
        margin-top: 1rem;
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