<script lang="ts">
	import Product from "./product.svelte";

    export let title: string = "";

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
        current: boolean,
    }
    
    export let products: Product[]
</script>

<section class="scrollAppear">
    <h2>{title}</h2>
    <div>        
        {#each products as item}
            <Product {...item}/>
        {/each}
    </div>
</section>

<style>
    section {
        padding: 6rem clamp(.5rem, 4vw, 5rem);
    }

    div::-webkit-scrollbar {
        height: .5rem;
    }

    div::-webkit-scrollbar-track {
        background-color: var(--content-2);
        border-radius: 5px;
    }

    div::-webkit-scrollbar-thumb {
        background-color: var(--content-8);
        border-radius: 5px;
    }

    div::-webkit-scrollbar-thumb:hover {
        background-color: var(--content);
        border-radius: 5px;
    }
    
    h2 {
        font-size: clamp(1.8rem, 4vw, 2.5rem);
        text-transform: capitalize;
        margin-bottom: 1rem;
    }
    
    div {
        width: 100%;
        padding-bottom: 2rem;

        max-width: 95vw;
        overflow-x: auto;
        
        display: grid;

        grid-auto-flow: column;
        grid-auto-columns: calc(25% - 2rem);
        gap: 2rem;
    }

    @media screen and (max-width: 90rem) {
        div {
            grid-auto-columns: 30%;
        }
    }
    @media screen and (max-width: 60rem) {
        div {
            grid-auto-columns: 40%;
        }
    }
    @media screen and (max-width: 40rem) {
        div {
            grid-auto-columns: 80%;
        }
    }
</style>