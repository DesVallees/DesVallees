<script lang="ts">
	import { baseImageRoute, baseRoute } from "../stores";

    export let style: string = "";
    
    export let imageSrc: string;
    export let imageAlt: string;

    export let name: string;
    export let buttonText: string = "Shop Now";

</script>

<div class="category" {style}>
    <img src="{baseImageRoute}/{imageSrc}" alt={imageAlt} class="scrollAppear">
    <div class="text">
        <h2>{name}</h2>
        <a href="{baseRoute}/catalog?category={name.toLowerCase()}" class="button">{buttonText}</a>
    </div>
</div>

<style>
    .category {
        display: grid;
        grid-template-rows: repeat(2, 1fr);
        
        max-width: fit-content;
        max-height: 50rem;

        aspect-ratio: 1 / 1;
    }

    img, .text {
        grid-column: 1 / -1;
        grid-row: 1 / -1;
    }

    img {
        height: 100%;
        max-height: 100vh;
        max-height: 100svh;
    }

    .text {
        align-self: end;

        text-transform: uppercase;

        width: 100%;
        padding: clamp(1rem, 4vw, 2rem) clamp(1.5rem, 6vw, 3rem) clamp(2rem, 8vw, 4rem);
        
        background-color: var(--main-5);
        backdrop-filter: blur(3px);
    }

    h2 {
        font-size: clamp(3rem, 8vw, 4rem);
    }

    a {
        font-size: clamp(1.4rem, 4vw, 1.8rem);
        background-color: var(--interactive-8);
    }

    a:hover,
    a:focus-visible {
        background-color: var(--interactive);
    }

</style>
