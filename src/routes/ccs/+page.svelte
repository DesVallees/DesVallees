<script lang="ts">
	import { fade, fly, blur } from "svelte/transition";
	import GuitarFooter from "./components/guitarFooter.svelte";
	import GuitarHeader from "./components/guitarHeader.svelte";
	import GuitarImage from "./components/guitarImage.svelte";
	import { throttle } from "./functions";
	import { guitarStorage, categories } from "./database";
	import { language } from "./stores";
	import { onMount } from "svelte";

    let chosenGuitarIndex = 0
    let chosenGuitar = guitarStorage[chosenGuitarIndex]
    let guitarsArrayLength = guitarStorage.length

    $: chosenGuitarIndex, chosenGuitar = guitarStorage[chosenGuitarIndex]
    $: chosenGuitarIndex, currentFileIndex = 0

    type LastMove = 'next' | 'previous'
    let lastMove: LastMove

    const nextGuitar = throttle(() => {
        lastMove = 'next'
        
        if (chosenGuitarIndex >= guitarsArrayLength - 1) {
            chosenGuitarIndex = 0
            return
        }

        chosenGuitarIndex++
    }, 500)

    const previousGuitar = throttle(() => {
        lastMove = 'previous'
        
        if (chosenGuitarIndex <= 0) {
            chosenGuitarIndex = guitarsArrayLength - 1
            return
        }

        chosenGuitarIndex--
    }, 500)

    let xDis: number = 500

    let currentFileIndex: number;

    let aboveContentHeight: number;
    let middleContentHeight: number;

    let isMobileDevice : boolean = false;

    onMount(() => {
        isMobileDevice = window.innerWidth <= window.innerHeight;
    })

    $: {if (isMobileDevice) xDis = 200}

</script>

<svelte:window on:resize={() => isMobileDevice = window.innerWidth <= window.innerHeight}/>

<!-- out:fly|local={{x: (lastMove ? (lastMove === 'next' ? '-2000' : '2000') : '0'), duration: 700}} -->
<div class="guitars" in:fade>

    {#key chosenGuitarIndex}
        <div class="above" in:fly|local={{x: (isMobileDevice ? 0 : (lastMove ? (lastMove === 'next' ? xDis : -xDis) : '0')), y: (isMobileDevice ? 50 : 0), duration: 600}} style="height: {aboveContentHeight}px;">
            <div class="empty"></div>
            <div class="guitarHeader" bind:offsetHeight={aboveContentHeight}>
                <GuitarHeader 
                    name={chosenGuitar.name[$language]} 
                    category={categories[chosenGuitar.category][$language]}
                />
            </div>
        </div>
    {/key}
                    
    <div class="centralLine" style="{isMobileDevice ? `height: ${middleContentHeight}px;` : ''}">
        <div class="centralLineContent">

            <button class="previous baseButton" on:click={previousGuitar}>
                <ion-icon name="chevron-back-outline" style="transform: translateX(-3px);"></ion-icon>
            </button>

            {#key chosenGuitarIndex}
                <div class="guitarImage" bind:offsetHeight={middleContentHeight} in:fly|local={{x: (lastMove ? (lastMove === 'next' ? xDis : -xDis) : '0'), duration: 600, delay: (isMobileDevice ? 0 : 100)}}>
                    <GuitarImage fileNames={chosenGuitar.fileNames} bind:currentFileIndex name={chosenGuitar.name[$language]} />
                </div>
            {/key}

            <button class="next baseButton" on:click={nextGuitar}>
                <ion-icon name="chevron-forward-outline"></ion-icon>
            </button>
                
        </div>
    </div>

        {#key chosenGuitarIndex}
            <div class="below" in:fly|local={{x: (isMobileDevice ? 0 : (lastMove ? (lastMove === 'next' ? xDis : -xDis) : '0')), y: (isMobileDevice ? 50 : 0), duration: 600}}>
                <div class="carrouselController">
                    {#each chosenGuitar.fileNames as i, index}
                    <button on:click={() => currentFileIndex = index} class:active={index === currentFileIndex} tabindex={index === currentFileIndex ? -1 : 0}></button>
                    {/each}
                </div>
                <div class="guitarFooter">
                    <GuitarFooter 
                    name={chosenGuitar.name[$language]}
                    linkName={chosenGuitar.name.español}
                    edition={chosenGuitar.edition[$language]}
                    description={chosenGuitar.description[$language]}
                    price={chosenGuitar.price}
                    /> 
                </div>
            </div>
        {/key}

</div>

<style>    
    .guitars {
        height: 100%;
        padding-top: 50px;
        padding-bottom: 100px;
        
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    
    .centralLine {
        width: 100%;
        height: clamp(90px, 12vw, 170px);
        margin: max(2em, calc(5em - 3vw)) 0;
        
        background: linear-gradient(90deg, rgb( 75,  50,  43), rgb(58, 38, 33), rgb( 28,  20,  19), var(--main));
    }
    
    .centralLineContent {
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        padding: 0 20px;
        width: 100%;
        height: 100%;
        max-width: 1700px;

        margin: auto;
    }

    .centralLineContent button {
        border-radius: 50px;
        z-index: 1;
    }
    
    .centralLineContent button ion-icon {
        font-size: 2.5rem;
    }
    
    .guitarImage {
        z-index: 0;
        max-width: 80%;
    }
    
    .above, .below {
        /* position non-static allows the z-index property to work. Z-index property is assigned so that the guitar's image is below the text */
        position: relative;
        z-index: 1;
        
        display: grid;
        grid-template-columns: 1fr .9fr;
        align-items: end;
        margin: 0 10em;
        gap: 2em;
    }

    .above {
        transition: height 200ms ease-out;
        overflow: hidden;
    }

    .carrouselController{
        display: flex;
        gap: 1.5em;
        
        margin-bottom: 2em;
    }
    
    .carrouselController button{
        border-radius: 50px;
        background-color: var(--contentDimer);
        height: 12px;
        width: 20px;
        transition: all .2s;
    }

    .carrouselController button:not(.active):hover,
    .carrouselController button:not(.active):focus-visible{
        width: 30px;
        background-color: var(--contentDim);
    }

    .carrouselController .active{
        width: 50px;
        cursor: default;
        background-color: var(--content);
    }

    @media (orientation: portrait) {
        .guitars {
            padding-top: 0;
            padding-bottom: 6em;
        }
        
        .centralLine {
            height: auto;
            margin: 2em 0;
            
            background: transparent;

            transition: height .8s ease-out;
            overflow: hidden;
        }
        
        .centralLineContent {
            padding: 0 max(10px, 2.5vw);
        }

        .centralLineContent button ion-icon {
            font-size: 2.3rem;
        }

        .guitarImage {
            max-width: 100%; 
        }

        .above, .below {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 0 1.5em;
            gap: 0;
        }

        .carrouselController{
            gap: 1em;
            
            margin-bottom: 2em;
        }
    }

</style>