<script lang="ts">
	import { fade } from "svelte/transition";
	import { baseImageRoute, baseRoute, dictionary } from "./stores";
	import Landing from "./components/landing.svelte";
	import Reveal from "./components/reveal.svelte";
	import Category from "./components/category.svelte";

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
        {
            imageSrc: "cyclistC.jpg",
            imageAlt: "Products For All",
            name: "Unisex"
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
            <Category {...cat}/>
        {/each}
    </section>

    <section class="products scrollAppear">
        <h2>Most Popular</h2>
        <div>
            <img src="{baseImageRoute}/Resources/Jersey2024Red.webp" alt="Red Jersey 2024">
            <h2>Jersey 2024</h2>
            <div class="prices">
                <p class="price">$89.97</p>
                <p class="oldPrice">$125.00</p>
            </div>
            <div class="versions">
                <button class="button"><img src="{baseImageRoute}/Resources/Jersey2024Red.webp" alt="View Red Jersey 2024"></button>
                <button class="button"><img src="{baseImageRoute}/Resources/Jersey2024Blue.webp" alt="View Blue Jersey 2024"></button>
            </div>
        </div>

        <div>
            <img src="{baseImageRoute}/Resources/Jersey2024Red.webp" alt="Red Jersey 2024">
            <h2>Jersey 2024</h2>
            <div class="prices">
                <p class="price">$89.97</p>
                <p class="oldPrice">$125.00</p>
            </div>
            <div class="versions">
                <button class="button"><img src="{baseImageRoute}/Resources/Jersey2024Red.webp" alt="View Red Jersey 2024"></button>
                <button class="button"><img src="{baseImageRoute}/Resources/Jersey2024Blue.webp" alt="View Blue Jersey 2024"></button>
            </div>
        </div>
        
        <div>
            <img src="{baseImageRoute}/Resources/Jersey2024Red.webp" alt="Red Jersey 2024">
            <h2>Jersey 2024</h2>
            <div class="prices">
                <p class="price">$89.97</p>
                <p class="oldPrice">$125.00</p>
            </div>
            <div class="versions">
                <button class="button"><img src="{baseImageRoute}/Resources/Jersey2024Red.webp" alt="View Red Jersey 2024"></button>
                <button class="button"><img src="{baseImageRoute}/Resources/Jersey2024Blue.webp" alt="View Blue Jersey 2024"></button>
            </div>
        </div>
    </section>

    <section class="promotions scrollAppear">
        <a href="{baseRoute}/catalog">
            <img src="{baseImageRoute}/Resources/radyImageHome.jpg" alt="New Jersey: Mint Chocolate Chip">
        </a>
    </section>

    <section class="products scrollAppear">
        <h2>Latest releases</h2>
        <div>
            <img src="{baseImageRoute}/Resources/Jersey2024Red.webp" alt="Red Jersey 2024">
            <h2>Jersey 2024</h2>
            <div class="prices">
                <p class="price">$89.97</p>
                <p class="oldPrice">$125.00</p>
            </div>
            <div class="versions">
                <button class="button"><img src="{baseImageRoute}/Resources/Jersey2024Red.webp" alt="View Red Jersey 2024"></button>
                <button class="button"><img src="{baseImageRoute}/Resources/Jersey2024Blue.webp" alt="View Blue Jersey 2024"></button>
            </div>
        </div>
        
        <div>
            <img src="{baseImageRoute}/Resources/Jersey2024Red.webp" alt="Red Jersey 2024">
            <h2>Jersey 2024</h2>
            <div class="prices">
                <p class="price">$89.97</p>
                <p class="oldPrice">$125.00</p>
            </div>
            <div class="versions">
                <button class="button"><img src="{baseImageRoute}/Resources/Jersey2024Red.webp" alt="View Red Jersey 2024"></button>
                <button class="button"><img src="{baseImageRoute}/Resources/Jersey2024Blue.webp" alt="View Blue Jersey 2024"></button>
            </div>
        </div>
        
        <div>
            <img src="{baseImageRoute}/Resources/Jersey2024Red.webp" alt="Red Jersey 2024">
            <h2>Jersey 2024</h2>
            <div class="prices">
                <p class="price">$89.97</p>
                <p class="oldPrice">$125.00</p>
            </div>
            <div class="versions">
                <button class="button"><img src="{baseImageRoute}/Resources/Jersey2024Red.webp" alt="View Red Jersey 2024"></button>
                <button class="button"><img src="{baseImageRoute}/Resources/Jersey2024Blue.webp" alt="View Blue Jersey 2024"></button>
            </div>
        </div>
    </section>

    <section class="ourWork">
        <h2>Some Of Our Work</h2>
        
        <button class="button">View More</button>
    </section>

    <section class="features">
        <h2>You'll Love RADA</h2>
        <p>We guarantee it!</p>

        <div>
            <ion-icon name="cube-outline"></ion-icon>
            <h3>Free Domestic Shiping</h3>
            <p>On all orders over $100USD. Excluding Sale Periods.</p>
        </div>
        <div>
            <ion-icon name="shirt-outline"></ion-icon>
            <h3>30-Day Returns</h3>
            <p>Risk-free returns to get you back out on the road in Rada Cycling Wear!</p>
        </div>
        <div>
            <ion-icon name="layers-outline"></ion-icon>
            <h3>Instant Exchanges</h3>
            <p>Helping you find your best fit with us. All gain, and no pain.</p>
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
        background-color: black;
        width: 100%;
    }
    
</style>