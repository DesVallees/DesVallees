<script lang="ts">
	import { baseImageRoute, baseRoute } from "../stores";

    type Version = {
        imageSrc: string,
        imageAlt: string,
        hrefParam: string,
        current: boolean,
    }
    
    export let name: string
    export let imageSrc: string
    export let imageAlt: string
    export let price: string
    export let oldPrice: string | undefined
    export let versions: Version[] | undefined
    export let href: string
</script>

<div>
    <a href="{baseRoute}{href}" aria-label="{name}">
        <img class="mainImage" src="{baseImageRoute}/Resources/{imageSrc}" alt="{imageAlt}">
    </a>
    <h2>{name}</h2>
    <div class="prices">
        <p class="price">{price}</p>
        {#if oldPrice}
             <p class="oldPrice">{oldPrice}</p>
        {/if}
    </div>
    {#if versions}
        <div class="versions">
            {#each versions as item}
                <button class:current={item.current}>
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
        min-width: 20rem;
    }

    h2 {
        margin-top: 1rem;

        font-size: clamp(1.5rem, 4vw, 2rem);
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
    
    .versions img {
        border-radius: 50%;
        width: 50px;
        aspect-ratio: 1 / 1;
    }
</style>