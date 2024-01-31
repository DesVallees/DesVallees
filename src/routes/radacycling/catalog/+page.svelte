<script lang="ts">
	import { fade } from "svelte/transition";
	import { baseImageRoute, baseRoute, dictionary } from "../stores";
	import { categories, storage, type Product } from "../mockDb";
	import Products from "../components/products.svelte";
	import CatItem from "../components/catItem.svelte";
	import Item from "../components/item.svelte";

    let newArrivals:Product[] = [
        storage.bibPlusJerseys,
        storage.jersey2024,
        storage.cyclingBib,
        storage.radaSocks
    ]

    let mostViewed:Product[] = [
        storage.jersey2024,
        storage.cyclingBib,
        storage.bibPlusJerseys,
        storage.radaSocks
    ]

</script>

<div class="catalog" in:fade>
    <section class="banner">
        <img src="{baseImageRoute}/demo/catalog.webp" alt="Cyclist Wearing Rada Cycling Wear Products">

        <div class="bannerContent">
            <h1>{$dictionary.catalogSlogan}</h1>
        </div>
    </section>

    <section class="categories catalogPadding">
        <h2>Popular Categories</h2>

        <div class="hScroller modernScrollbar">
            {#each categories as item}
                <CatItem {...item} />
            {/each}
        </div>
    </section>

    <section>
        <Products title="New Arrivals" products={newArrivals}/>
    </section>

    <section class="custom catalogPadding">
         <p>Explore endless possibilities and make a statement that's uniquely yours.</p>
         <a href="{baseRoute}/contact" aria-label="Custom RADA Deals">
            <img class="edgyImg" src="{baseImageRoute}/Resources/radaCustom.png" alt="RADA Custom">
        </a>
    </section>

    <section class="catalogPadding items">
        {#each newArrivals as item}
            <Item 
                href={item.href}
                imageAlt={item.imageAlt}
                imageSrc={item.imageSrc}
                name={item.name}
                price={item.price}
                oldPrice={item.oldPrice}
            />
        {/each}
    </section>

    <section class="promotions catalogPadding">
        <a href="{baseRoute}/catalog/bib-plus-jerseys" aria-label="Offer: 1 Bib Plus 2 Jerseys">
            <img class="edgyImg" src="{baseImageRoute}/Resources/offer1bib2jerseys.png" alt="Offer: 1 Bib Plus 2 Jerseys">
        </a>
    </section>

    <section>
        <Products title="Most Viewed" products={mostViewed}/>
    </section>
</div>

<style>
    .catalog {
        margin: auto;
        margin-bottom: 8rem;
    }
    
    .banner {
        width: 100%;
        height: calc(100svh - 20rem);
        height: calc(100svh - 20rem);
        min-height: 22rem;
        max-height: clamp(40rem, 5vw, 80rem);
        overflow: hidden;
        overflow: clip;

        display: grid;
        align-items: center;
        grid-template-rows: repeat(2, 1fr);
    }

    .banner > * {
        grid-row: 1 / -1;
        grid-column: 1 / -1;
    }

    .banner img {
        position: relative;
        
        max-width: revert;
        width: 100%;
        height: 100%;

        object-fit: cover;
        object-position: center 20%;
        z-index: -1;
    }

    .bannerContent {
        display: grid;
        align-items: center;
        height: 100%;

        padding: 2rem;
        color: var(--main);
    }

    .bannerContent * {
        z-index: 1;
    }

    .categories {
        display: none;
    }

    h1 {
        font-size: clamp(3rem, 8vw, 5rem);
        line-height: 1.25;
        text-align: center;
        -webkit-text-stroke-width: 2px;
        -webkit-text-stroke-color: rgba(0, 0, 0, 0.5);
    }

    h2 {
        font-size: clamp(1.7rem, 4vw, 2.25rem);
        text-transform: capitalize;
        margin-bottom: .25em;
    }

    p {
        font-size: clamp(1.5rem, 4vw, 1.75rem);
        text-align: center;
    }

    section {
        margin-bottom: 2rem;
    }

    section:not(.banner) {
        max-width: 1500px;
        margin-inline: auto;
    }

    .catalogPadding {
        padding: 0 clamp(.5rem, 4vw, 5rem);
    }

    .hScroller {
        width: calc(90vw - clamp(.5rem, 4vw, 5rem));
        max-width: 100%;
        margin: 0 auto;
        
        padding: .5rem 0;
        padding-right: 1.5rem;
        
        overflow-x: auto;

        display: flex;
        gap: 1.5rem;
    }

    .custom, .promotions {
        font-weight: bold;
        margin: 5rem 0;

        display: grid;
        place-items: center;
        gap: 2em;
    }
    
    .custom p {
        max-width: 700px;
        text-wrap: balance;
        filter: contrast(300%) drop-shadow(0 0 .5rem var(--content-5));
    }
    
    .edgyImg {
        border-radius: 10px;
        filter: contrast(300%) drop-shadow(.5rem .5rem 1rem var(--interactive-5));
        max-height: 100vh;
        max-height: 100svh;
    }

    .items {
        display: grid;
        gap: 2rem;
    }
    
</style>

<svelte:head>
    <title>Catalog | RADA Cycling Wear</title>
    <meta name="description" content="Premium cycling wear designed for champions in training and racing. Shop our latest releases and enjoy free domestic shipping on orders over $100.">
</svelte:head>