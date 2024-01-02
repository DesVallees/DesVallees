<script lang="ts">
	import { fade } from "svelte/transition";
	import { baseImageRoute, dictionary } from "./stores";

</script>

<svelte:head>
    <title>RadaCycling</title>
    <meta name="description" content="{$dictionary.homeDescription}">
</svelte:head>

<div class="home" in:fade>
    <section class="landing">
        <picture>
            <source media="(min-width: 700px)" srcset="{baseImageRoute}/landing.webp">
            <source srcset="{baseImageRoute}/rady.jpg">
            
            <img src="{baseImageRoute}/rady.jpg" alt="{$dictionary.juanNardolilloWorldChampion}">
        </picture>
    </section>
</div>

<style>
    .home {
        display: flex;
        align-items: center;
    }
    
    .landing {
        height: 100vh;
        height: 100svh;   
        overflow: hidden;
        overflow: clip;
    }

    img {
        max-width: unset;
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: -1;
    }

    picture::after {
        content: "";
        position: absolute;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;
        background-color: rgba(28, 25, 25, 0.2);

        z-index: 0;
    }
</style>