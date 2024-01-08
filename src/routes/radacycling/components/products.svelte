<script lang="ts">
	import Product from "./product.svelte";

    export let title: string = "";

    type Product = {
        name: string,
        imageSrc: string,
        imageAlt: string,
        price: string,
        oldPrice: string | undefined,
        versions: Version[] | undefined,
        href: string,
    }

    type Version = {
        imageSrc: string,
        imageAlt: string,
        hrefParam: string,
        current: boolean,
    }
    
    export let products: Product[]
</script>

<section class="scrollScale">
    <h2>{title}</h2>
    <div>        
        {#each products as item}
            <Product {...item}/>
        {/each}
    </div>
</section>

<style>
    section {
        padding: 6rem 0;
    }

    div::-webkit-scrollbar {
        height: .3rem;
    }

    div::-webkit-scrollbar-track {
        background-color: var(--content-2);
    }

    div::-webkit-scrollbar-thumb {
        background-color: var(--content);
        border-radius: 5px;
    }
    
    h2 {
        font-size: clamp(1.8rem, 4vw, 2.5rem);
        text-transform: capitalize;
        margin-bottom: 1rem;
        margin-left: clamp(.5rem, 4vw, 3rem);
    }
    
    div {
        width: 100%;
        padding: 0 clamp(.5rem, 4vw, 3rem) 2rem;

        max-width: 95vw;
        overflow-x: auto;
        
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: 24%;
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