<script lang="ts">
	import { onMount } from "svelte";
	import { baseImageRoute, baseRoute } from "../stores";

    type Version = {
        imageSrc: string,
        imgHoverSrc: string | undefined,
        imageAlt: string,
        hrefParam: string,
        current: boolean,
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
        img.onfocus = handleImageHover;
        
        img.onmouseleave = handleImageUnhover
        img.onblur = handleImageUnhover
    })

    function changeVersion(newImageSrc: string, newImageHoverSrc: string | undefined) {
        imageSrc = newImageSrc;
        imgHoverSrc = newImageHoverSrc;
    }
</script>

<div>
    <a href="{baseRoute}{href}" aria-label="{name}">
        <img bind:this={img} class="mainImage" src="{baseImageRoute}/Resources/{imageSrc}" alt="{imageAlt}">
        <h2>{name}</h2>
        <div class="prices">
            <p class="price">{price}</p>
            {#if oldPrice}
            <p class="oldPrice">{oldPrice}</p>
            {/if}
        </div>
    </a>
    {#if versions}
        <div class="versions">
            {#each versions as item}
                <button aria-label="{item.imageAlt}" class:current={item.current} on:click={() => changeVersion(item.imageSrc, item.imgHoverSrc)}>
                    <img width="50px" src="{baseImageRoute}/Resources/{item.imageSrc}" alt="{item.imageAlt}">
                </button>
            {/each}
        </div>
    {/if}
</div>


<style>
    .mainImage {
        border-radius: 5px;
        aspect-ratio: 1 / 1;
        width: 100%;
        max-width: 30rem;
        object-fit: cover;
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

    .versions {
        margin-top: 1rem;
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
    }

    .versions button {
        --size: 3rem;
        --hoverSize: 3.5rem;
        border-radius: 50%;
        width: var(--size);
        height: var(--size);
        overflow: hidden;

        transition: .2s;
    }
    
    .versions button:hover,
    .versions button:focus-visible {
        width: var(--hoverSize);
        height: var(--hoverSize);
    }

    .versions img {
        object-fit: cover;
        width: 100%;
        height: 100%;
    }
</style>