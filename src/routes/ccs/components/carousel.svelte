<script lang="ts">
	import { onMount } from "svelte";
	import CarrouselController from "./carrouselController.svelte";
	import { dictionary } from "../stores";


    export let style: string = '';
    export let width: string = '';
    export let height: string = '';

    export let baseRoute: string = "";
    export let images: string[];
    export let imageDescriptions: string[] | undefined = undefined;
    export let automaticImageChangeTime: number = 5000;

    export let currentFileIndex: number = 0;
    let intervalId: number | undefined;

    function nextImage() {
        currentFileIndex = (currentFileIndex + 1) % images.length;
    }

    function previousImage() {
        const minusOne = currentFileIndex - 1;
        if (minusOne >= 0) {
            currentFileIndex = minusOne % images.length
        } else {
            currentFileIndex = images.length - 1
        }
    }

    function startAutomaticImageChanges() {
        intervalId = setInterval(nextImage, automaticImageChangeTime);
    }

    function stopAutomaticImageChanges() {
        if (intervalId) {
            clearInterval(intervalId);
        }
    }

    onMount(() => {
        startAutomaticImageChanges();
    });


    function handleKeydown(event:any) {
        const keyPressed = event.key;
        
        if (keyPressed === "ArrowLeft") {
            previousImage();
        } else if (keyPressed === "ArrowRight") {
            nextImage();
        }
    }

</script>

<svelte:window on:keydown={handleKeydown}/>

<div class="carousel" {style}>
    <button aria-label={$dictionary.nextImage} style="cursor: default;" on:click={() => {nextImage(); stopAutomaticImageChanges();}} >
        <img src={baseRoute + images[currentFileIndex]} alt={imageDescriptions ? imageDescriptions[currentFileIndex] : ''} {width} {height}>
    </button>
    
    <div class="controller">
        <CarrouselController on:interaction={stopAutomaticImageChanges} array={images} bind:currentFileIndex />
    </div>

    <button on:click={() => {previousImage(); stopAutomaticImageChanges();}} class="previous arrow" aria-label="{$dictionary.previousImage}"><ion-icon name="chevron-back"></ion-icon></button>
    <button on:click={() => {nextImage(); stopAutomaticImageChanges();}} class="next arrow" aria-label="{$dictionary.nextImage}"><ion-icon name="chevron-forward"></ion-icon></button>
</div>

<style>
    .carousel {
        position: relative;

        display: grid;
        margin: auto;

        aspect-ratio: 1 / 1;
        width: fit-content;
        border-radius: 25px;
        box-shadow: 0 0 1.5rem var(--contentHover);

        overflow: hidden;
        overflow: clip;
    }

    button {
        display: flex;
    }

    img {
        -webkit-user-drag: none;
        max-width: 100%;
        height: auto;
    }
    
    .controller {
        position: absolute;
        top: 1rem;
        left: 50%;
        translate: -50% 0;

        border-radius: 50px;
        padding: .8rem;
        max-width: calc(100% - 1.6rem);
        
        background-color: var(--mainDimer);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
    }

    .arrow {
        --horizontalOffset: .8rem;
        
        position: absolute;
        top: 50%;
        translate: 0 -50%;
        
        padding: .5em;
        border-radius: 50%;
        background-color: var(--mainDimer);
        transition: background-color .2s;
    }

    .arrow:hover,
    .arrow:focus-visible {
        background-color: var(--mainDim);
    }

    .previous {
        left: var(--horizontalOffset);
    }

    .next {
        right: var(--horizontalOffset);
    }

    .arrow ion-icon {
        font-size: 2rem;
    }

    @media screen and (max-width: 600px) {
        .controller {
            top: unset;
            bottom: .5rem;
            padding: .6rem;
        }

        .arrow {
            --horizontalOffset: .4rem;
        }

        .arrow ion-icon {
            font-size: 1.5rem;
        }
    }
</style>