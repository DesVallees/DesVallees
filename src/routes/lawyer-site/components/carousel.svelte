<script lang="ts">
	import { onMount } from "svelte";
	import CarrouselController from "./carrouselController.svelte";
	import { dictionary } from "../stores";
	import { sleep } from "../functions";


    export let style: string = '';

    export let images: string[];
    export let imageDescriptions: string[] | undefined = undefined;

    let currentFileIndex: number = 0;
    let intervalId: number | undefined;

    function changeImages() {
        currentFileIndex = (currentFileIndex + 1) % images.length;
    }

    function startAutomaticImageChanges() {
        intervalId = setInterval(changeImages, 5000);
    }

    function stopAutomaticImageChanges() {
        if (intervalId) {
            clearInterval(intervalId);
        }
    }

    onMount(() => {
        startAutomaticImageChanges();
    });


    let disappearAndAppear:boolean = false;
    
    $: currentFileIndex, checkDisappearAndAppear();
    
    async function checkDisappearAndAppear() {
        disappearAndAppear = false
        await sleep(1)
        disappearAndAppear = true
        await sleep(1100)
        disappearAndAppear = false
    }

</script>

<div class="carousel" {style}>
    <button aria-label={$dictionary.nextImage} on:click={() => {changeImages(); stopAutomaticImageChanges();}} >
        <img class:disappearAndAppear src={images[currentFileIndex]} alt={imageDescriptions ? imageDescriptions[currentFileIndex] : ''}>
    </button>
    
    <div class="controller">
        <CarrouselController on:interaction={stopAutomaticImageChanges} array={images} bind:currentFileIndex />
    </div>
</div>

<style>
    .carousel {
        position: relative;

        display: grid;

        aspect-ratio: 4 / 3;
        width: fit-content;
        border-radius: 25px;
        box-shadow: 0 0 1.5rem var(--content-1);

        overflow: hidden;
        overflow: clip;
    }

    button {
        display: flex;
    }
    
    .controller {
        position: absolute;
        top: 1rem;
        left: 50%;
        translate: -50% 0;

        border-radius: 50px;
        padding: .8rem;
        max-width: 100%;
        
        background-color: var(--main-7);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
    }

    @media screen and (max-width: 600px) {
        .controller {
            top: unset;
            bottom: .5rem;
            padding: .6rem;
        }
    }
</style>