<script lang="ts">
	import { baseImageRoute } from "../stores";
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
    
    let products: Product[] = [
        {
            name: "Jersey 2024",
            imageSrc: "Jersey2024Red.webp",
            imageAlt: "Red Jersey 2024",
            price: "$89.97",
            oldPrice: "$125.00",
            versions: [
                {
                    imageSrc: "Jersey2024Red.webp",
                    imageAlt: "View Red Jersey 2024",
                    hrefParam: "red",
                    current: true
                },
                {
                    imageSrc: "Jersey2024Blue.webp",
                    imageAlt: "View Blue Jersey 2024",
                    hrefParam: "blue",
                    current: false
                },
            ],
            href: "/catalog",
        },
        {
            name: "Cycling Bib 2024",
            imageSrc: "CyclingBib2024.webp",
            imageAlt: "Cycling Bib 2024",
            price: "$99.97",
            oldPrice: undefined,
            versions: undefined,
            href: "/catalog",
        },
        {
            name: "Bib + Jersey + Free Socks",
            imageSrc: "1BibPlus2Jerseys.webp",
            imageAlt: "Offer: 1 Bib Plus 1 Jersey Plus Free Socks",
            price: "$219.97",
            oldPrice: "$220.00",
            versions: undefined,
            href: "/catalog",
        },
        {
            name: "RADA Socks",
            imageSrc: "RadaSocks.webp",
            imageAlt: "RADA Socks",
            price: "$16.00",
            oldPrice: "$25.00",
            versions: undefined,
            href: "/catalog",
        },
    ]
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
        padding: 5rem 2rem;
    }
    
    h2 {
        font-size: clamp(1.5rem, 4vw, 2rem);
        margin-bottom: 1rem;
    }
    
    div {
        display: flex;
        gap: 2rem;
        max-width: 80vw;
        overflow-x: auto;
    }
</style>