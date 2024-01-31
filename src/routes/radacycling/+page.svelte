<script lang="ts">
	import { fade } from "svelte/transition";
    import { storage, type Product } from "./mockDb";
	import { baseImageRoute, baseRoute, dictionary } from "./stores";
	import Landing from "./components/landing.svelte";
	import Reveal from "./components/reveal.svelte";
	import Category from "./components/category.svelte";
	import Products from "./components/products.svelte";

    type Cat = {
        imageSrc: string,
        imageAlt: string,
        name: string
    }
    let categories: Cat[] = [
        {
            imageSrc: "demo/category_man.webp",
            imageAlt: "Products For Men",
            name: "Men"
        },
        {
            imageSrc: "demo/category_woman.webp",
            imageAlt: "Products For Women",
            name: "Women"
        },
    ]

    let popular: Product[] = [
        storage.jersey2024,
        storage.cyclingBib,
        storage.bibPlusJerseys,
        storage.radaSocks,
    ]
    let latest: Product[] = [
        storage.cyclingBib,
        storage.radaSocks,
        storage.jersey2024,
        storage.bibPlusJerseys,
    ]

</script>

<svelte:head>
    <title>RADA Cycling Wear</title>
    <meta name="description" content="Premium cycling wear designed for champions in training and racing. Shop our latest releases and enjoy free domestic shipping on orders over $100.">
</svelte:head>

<div class="home" in:fade>
    <Landing />

    <section class="about">
        <Reveal 
            title="Meet Rada Cycling Wear"
            paragraph="Experience the thrill of cycling with RADA, where performance meets style. Our premium cycling wear is crafted for champions, providing the perfect blend of comfort and performance on every ride."
        />
    </section>

    <section class="categories">
        {#each categories as cat}
            <Category {...cat} style="flex-grow: 1; flex-basis: 35rem"/>
        {/each}
    </section>

    <section class="products scrollAppear">
        <Products title="Most Popular." products={popular}/>
    </section>

    <section class="promotions">
        <a href="{baseRoute}/catalog/bib-plus-jerseys" class="scrollScale" aria-label="Offer: 1 Bib Plus 2 Jerseys">
            <img src="{baseImageRoute}/Resources/offer1bib2jerseys.png" alt="Offer: 1 Bib Plus 2 Jerseys">
        </a>

        <a href="{baseRoute}/contact" class="scrollScale" aria-label="Custom RADA Deals">
            <img src="{baseImageRoute}/Resources/radaCustom.png" alt="RADA Custom">
        </a>
    </section>

    <section class="products scrollAppear">
        <Products title="Latest Releases." products={latest}/>
    </section>
    
    <section class="features">
        <h2 class="scrollAppear">Your satisfaction is our promise!</h2>
    
        <div class="featureContainer">
            <div class="scrollScale">
                <ion-icon name="cube-outline"></ion-icon>
                <h3>Swift, Free Domestic Shipping</h3>
                <p>Enjoy seamless and complimentary shipping on all domestic orders.</p>
            </div>
            <div class="scrollScale">
                <ion-icon name="shirt-outline"></ion-icon>
                <h3>Worry-Free 30-Day Returns</h3>
                <p>Your peace of mind matters - our hassle-free returns ensure your complete satisfaction.</p>
            </div>
            <div class="scrollScale">
                <ion-icon name="layers-outline"></ion-icon>
                <h3>Effortless Instant Exchanges</h3>
                <p>Need a different size? Experience quick and easy exchanges for the perfect fit.</p>
            </div>
        </div>
    </section>
    
</div>

<style>
    .home {
        display: grid;
        place-items: center;
    }

    .about {
        padding: 8rem 2rem;
        width: 100%;
        
        background-color: black;
    }
    
    .categories {
        --gap: clamp(.5rem, 4vw, 3rem);
        
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin: 3rem var(--gap);
        gap: calc(var(--gap) / 2);
    }

    .products {
        margin: 2rem 0;
    }

    .promotions {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        
        padding: 0 clamp(1rem, 4vw, 3rem);
        gap: 2rem;
    }

    .promotions a {
        flex-grow: 1;
        flex-basis: 35rem;

        max-width: fit-content;
    }

    .promotions img {
        border-radius: 10px;
        filter: contrast(300%) drop-shadow(.5rem .5rem 1rem var(--interactive-5));
        max-height: 100vh;
        max-height: 100svh;
    }

    .features {
        padding: 1rem clamp(1rem, 4vw, 3rem) 6rem;
        display: grid;
        place-items: center;
        gap: 1rem;
        text-align: center;
        width: 100%;
        margin-top: 3rem;
        padding-bottom: 8rem;
    }

    .featureContainer {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 5rem 3rem;
    }

    .featureContainer div {
        display: grid;
        place-items: center;
        max-width: 20rem;
    }

    .features h2 {
        font-size: clamp(2.5rem, 6vw, 3rem);
        margin-bottom: 3rem;
    }

    .features h3 {
        font-size: clamp(1.25rem, 4vw, 1.75rem);
        margin-bottom: 1rem;
    }

    .features p {
        font-size: clamp(1.1rem, 2vw, 1.25rem);
        color: var(--content-9);
    }
    
    .features ion-icon {
        font-size: 7rem;
        margin-bottom: 1rem;
    }

</style>