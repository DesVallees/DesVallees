<script lang="ts">
	import { baseRoute, dictionary } from "../stores";
	import Carousel from "./carousel.svelte";

    let imageSources = [
        'cyclistRPartoutB.jpg',
        'cyclistA.jpg',
        'cyclistB.jpg',
        'cyclistC.jpg',
        'cyclistD.jpg',
        'cyclistE.jpg',
    ]
</script>

<section class="landing">
    <section class="carousel">
        <Carousel 
            style="
                width: inherit; 
                height: inherit; 
                
                border-radius: 0; 
                aspect-ratio: unset; 
                box-shadow: none;
            " 
            imgStyle="
                position: relative;
        
                max-width: unset;
                width: 100%;
                height: 100%;
        
                object-fit: cover;
                object-position: center 20%;
                z-index: -1;
            "
            images={imageSources} 
            imagesCommonDescription="RADA Cycling Wear" 
            automaticImageChangeTime={10000}
            hideArrows={true}
        />
    </section>

    <div>
        <h1>Champions wear RADA</h1>
        <p>Elevate your training and racing with cutting-edge design and performance.</p>
        <a href="{baseRoute}/catalog" class="button">Explore Now</a>
    </div>
</section>

<style>
    .landing {
        width: 100%;
        height: 100vh;
        height: 100svh;   
        min-height: 40rem;
        overflow: hidden;
        overflow: clip;

        display: grid;
        grid-template-rows: repeat(2, 1fr);
    }

    .landing > * {
        grid-column: 1 / -1;
    }
    
    .carousel {
        height: inherit;
        max-width: unset;

        grid-row: 1 / -1;
    }

    div {
        display: grid;
        place-content: center;
        place-items: center;

        grid-row: 1 / -1;

        background-color: var(--main-3);
        padding: 2rem;
    }

    div * {
        filter: contrast(300%) drop-shadow(0 0 .5rem var(--interactive-8));
    }

    h1 {
        font-size: clamp(3rem, 8vw, 5rem);
        text-align: center;
    }

    p {
        font-size: clamp(1.25rem, 4vw, 1.75rem);
        text-align: center;
    }

    a {
        font-size: clamp(1.1rem, 3vw, 1.5rem);

        margin-top: 2rem;
    }
    
</style>