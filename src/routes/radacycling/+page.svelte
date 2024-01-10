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

    const jersey2024: Product = {
        name: "Jersey 2024",
            imageSrc: "Jersey2024Red.webp",
            imgHoverSrc: "Jersey2024RedBig.webp",
            imageAlt: "Red Jersey 2024",
            price: "$89.97",
            oldPrice: "$125.00",
            versions: [
                {
                    imageSrc: "Jersey2024Red.webp",
                    imgHoverSrc: "Jersey2024RedBig.webp",
                    imageAlt: "View Red Jersey 2024",
                    hrefParam: "red",
                    current: true
                },
                {
                    imageSrc: "Jersey2024Blue.webp",
                    imgHoverSrc: "cremalleraJersey.webp",
                    imageAlt: "View Blue Jersey 2024",
                    hrefParam: "blue",
                    current: false
                },
            ],
            href: "/catalog",
    }

    const cyclingBib: Product = {
        name: "Cycling Bib 2024",
        imageSrc: "CyclingBib2024.webp",
        imgHoverSrc: "bibFocus.webp",
        imageAlt: "Cycling Bib 2024",
        price: "$99.97",
        oldPrice: undefined,
        versions: [
            {
                imageSrc: "CyclingBib2024.webp",
                imgHoverSrc: "bibFocus.webp",
                imageAlt: "View Red Cycling Bib 2024",
                hrefParam: "red",
                current: true
            },
            {
                imageSrc: "CyclingBib2024Blue.webp",
                imgHoverSrc: "bibFocus.webp",
                imageAlt: "View Blue Cycling Bib 2024",
                hrefParam: "blue",
                current: false
            },
        ],
        href: "/catalog",
    }

    const bibPlusJerseys: Product = {
        name: "Bib + Jersey + Free Socks",
        imageSrc: "1BibPlus2Jerseys.webp",
        imgHoverSrc: "radimir.jpg",
        imageAlt: "Offer: 1 Bib Plus 1 Jersey Plus Free Socks",
        price: "$219.97",
        oldPrice: "$220.00",
        versions: undefined,
        href: "/catalog",
    }

    const radaSocks = {
        name: "RADA Socks",
        imageSrc: "RadaSocks.webp",
        imgHoverSrc: undefined,
        imageAlt: "RADA Socks",
        price: "$16.00",
        oldPrice: "$25.00",
        versions: undefined,
        href: "/catalog",
    }

    let popular: Product[] = [
        jersey2024,
        cyclingBib,
        bibPlusJerseys,
        radaSocks,
    ]

    let latest: Product[] = [
        cyclingBib,
        radaSocks,
        jersey2024,
        bibPlusJerseys,
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


    <Products title="Most Popular." products={popular}/>

    <section class="promotions">
        <a href="{baseRoute}/catalog" class="scrollScale" aria-label="Offer: 1 Bib Plus 2 Jerseys">
            <img src="{baseImageRoute}/Resources/offer1bib2jerseys.png" alt="Offer: 1 Bib Plus 2 Jerseys">
        </a>

        <a href="{baseRoute}/contact" class="scrollScale" aria-label="Custom RADA Deals">
            <img src="{baseImageRoute}/Resources/radaCustom.png" alt="RADA Custom">
        </a>
    </section>

    <Products title="Latest Releases." products={latest}/>
    
    <section class="ourWork">
        <h2>Some Of Our Custom Work</h2>

        
        <a href="{baseRoute}/our-work" class="button">View More</a>
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
        margin-bottom: 8rem;
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
        width: 100%;

        background: linear-gradient(black, var(--main));
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
    }

    .features, .ourWork {
        padding: 4rem clamp(1rem, 4vw, 3rem);
        display: grid;
        place-items: center;
        gap: 1rem;
        text-align: center;
    }

    .ourWork {
        display: none;
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

    .features h2, .ourWork h2 {
        font-size: clamp(2.5rem, 6vw, 3rem);
        margin-bottom: 3rem;
    }

    .features h3, .ourWork a {
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