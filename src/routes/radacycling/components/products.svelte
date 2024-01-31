<script lang="ts">
	import Product from "./product.svelte";

    export let title: string = "";
    export let style: string = "";
    export let carouselAutoColumns: string = "calc(25% - var(--gap, 2.5rem))";

    type Product = {
        name: string,
        imageSrc: string,
        imgHoverSrc: string | undefined,
        imageAlt: string,
        price: string,
        oldPrice: string | undefined,
        versions: Version[] | undefined,
        href: string,
    }
    
    type Version = {
        imageSrc: string,
        imgHoverSrc: string | undefined,
        imageAlt: string,
        hrefParam: string,
    }
    
    export let products: Product[]
</script>

<section {style}>
    <h2>{title}</h2>
    <div style="--columns: {carouselAutoColumns}" class="modernScrollbar">        
        {#each products as item}
            <Product {...item}/>
        {/each}
    </div>
</section>

<style>
    section {
        padding: 0 clamp(.5rem, 4vw, 5rem);

        max-width: fit-content;
    }

    h2 {
        font-size: clamp(1.7rem, 4vw, 2.25rem);
        text-transform: capitalize;
        margin-bottom: 1rem;
    }
    
    div {
        padding: 5px .5rem 2rem;

        overflow-x: auto;
        
        display: grid;
        --gap: var(--gap, 2.5rem);
        grid-auto-flow: column;
        grid-auto-columns: var(--columns, "calc(25% - var(--gap, 2.5rem))");
        gap: var(--gap, 2.5rem);
    }

    @media screen and (max-width: 100rem) {
        div {
            grid-auto-columns: calc(30% - var(--gap, 2.5rem));
        }
    }
    @media screen and (max-width: 70rem) {
        div {
            grid-auto-columns: calc(45% - var(--gap, 2.5rem));
        }
    }
    @media screen and (max-width: 50rem) {
        div {
            grid-auto-columns: calc(65% - var(--gap, 2.5rem));
        }
    }
    @media screen and (max-width: 35rem) {
        div {
            grid-auto-columns: calc(90% - var(--gap, 2.5rem));
        }
    }

    @container (max-width: 100rem) {
        div {
            grid-auto-columns: calc(30% - var(--gap, 2.5rem));
        }
    }
    @container (max-width: 70rem) {
        div {
            grid-auto-columns: calc(45% - var(--gap, 2.5rem));
        }
    }
    @container (max-width: 50rem) {
        div {
            grid-auto-columns: calc(65% - var(--gap, 2.5rem));
        }
    }
    @container (max-width: 35rem) {
        div {
            grid-auto-columns: calc(90% - var(--gap, 2.5rem));
        }
    }
</style>