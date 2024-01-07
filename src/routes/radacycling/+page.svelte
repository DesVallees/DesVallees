<script lang="ts">
	import { fade } from "svelte/transition";
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
            imageSrc: "cyclistBrun.jpg",
            imageAlt: "Products For Men",
            name: "Men"
        },
        {
            imageSrc: "cyclistBrillante.jpg",
            imageAlt: "Products For Women",
            name: "Women"
        },
    ]

</script>

<svelte:head>
    <title>RADA Cycling</title>
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
            <Category {...cat} style="flex-grow: 1; flex-basis: 40rem"/>
        {/each}
    </section>


    <Products title="Most Popular."/>

    <section class="promotions">
        <a href="{baseRoute}/catalog" class="scrollScale">
            <img src="{baseImageRoute}/Resources/offer1bib2jerseys.png" alt="Offer: 1 Bib Plus 2 Jerseys">
        </a>

        <a href="{baseRoute}/contact" class="scrollScale">
            <img src="{baseImageRoute}/Resources/radaCustom.png" alt="RADA Custom">
        </a>
    </section>

    <Products title="Latest Releases."/>
    
    <a href="{baseRoute}/catalog" class="scrollAppear">
        <img src="{baseImageRoute}/Resources/radyImageHome.jpg" alt="New Jersey: Mint Chocolate Chip">
    </a>


    <section class="ourWork">
        <h2>Some Of Our Work</h2>
        
        <button class="button">View More</button>
    </section>

    <section class="features">
        <h2>You'll Love RADA</h2>
        <p>We guarantee it!</p>

        <div>
            <aside>
                <ion-icon name="cube-outline"></ion-icon>
                <h3>Free Domestic Shiping</h3>
                <p>On all orders over $100USD. Excluding Sale Periods.</p>
            </aside>
            <aside>
                <ion-icon name="shirt-outline"></ion-icon>
                <h3>30-Day Returns</h3>
                <p>Risk-free returns to get you back out on the road in Rada Cycling Wear!</p>
            </aside>
            <aside>
                <ion-icon name="layers-outline"></ion-icon>
                <h3>Instant Exchanges</h3>
                <p>Helping you find your best fit with us. All gain, and no pain.</p>
            </aside>
        </div>
    </section>
</div>

<style>
    .home {
        display: grid;
        place-items: center;
        margin-bottom: 5rem;
    }

    .about {
        padding: 8rem 2rem;
        width: 100%;
        
        background-color: black;
    }
    
    .categories {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;

        background-color: black;
    }

    .promotions {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 1rem;
    }

    .promotions img {
        border-radius: 5px;
        filter: contrast(300%) drop-shadow(.5rem .5rem 1rem var(--interactive-5));
    }

    .features, .ourWork {
        display: grid;
        place-items: center;
        gap: 1rem;
    }

    .features div {
        display: flex;
    }

    .promotions, .features, .ourWork {
        padding: 4rem 1rem;
    }
    
</style>