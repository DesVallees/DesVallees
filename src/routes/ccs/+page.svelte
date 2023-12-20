<script lang="ts">
	import { fade, fly } from "svelte/transition";
	import GuitarFooter from "./components/guitarFooter.svelte";
	import GuitarHeader from "./components/guitarHeader.svelte";
	import GuitarImage from "./components/guitarImage.svelte";
	import { throttle } from "./functions";
	import { guitarStorage } from "./database";
	import { dictionary, language, chosenGuitarIndex } from "./stores";
	import { onMount } from "svelte";
	import CarrouselController from "./components/carrouselController.svelte";

    let chosenGuitar = guitarStorage[$chosenGuitarIndex]
    let guitarsArrayLength = guitarStorage.length

    $: $chosenGuitarIndex, chosenGuitar = guitarStorage[$chosenGuitarIndex]
    $: $chosenGuitarIndex, currentFileIndex = 0

    type LastMove = 'next' | 'previous'
    let lastMove: LastMove

    const nextGuitar = throttle(() => {
        lastMove = 'next'
        
        if ($chosenGuitarIndex >= guitarsArrayLength - 1) {
            $chosenGuitarIndex = 0
            return
        }

        $chosenGuitarIndex++
    }, 500)

    const previousGuitar = throttle(() => {
        lastMove = 'previous'
        
        if ($chosenGuitarIndex <= 0) {
            $chosenGuitarIndex = guitarsArrayLength - 1
            return
        }

        $chosenGuitarIndex--
    }, 500)

    let xDis: number = 500

    let currentFileIndex: number;

    let aboveContentHeight: number;
    let middleContentHeight: number;
    let belowContentHeight: number;

    let isMobileDevice : boolean = false;

    onMount(() => {
        isMobileDevice = window.innerWidth <= window.innerHeight;
    })

    $: {if (isMobileDevice) xDis = 200}

    function handleKeydown(event:any) {
        const keyPressed = event.key;
        
        if (keyPressed === "ArrowLeft") {
            previousGuitar();
        } else if (keyPressed === "ArrowRight") {
            nextGuitar();
        }
    }

</script>

<svelte:head>
    <title>CCS - {$dictionary.inicio}</title>
    <noscript>
        <title>CCS</title>
    </noscript>
    
    <meta name="description" content="{$dictionary.acercaDeNosotros}">
</svelte:head>

<svelte:window on:resize={() => isMobileDevice = window.innerWidth <= window.innerHeight} on:keydown={handleKeydown}/>

<!-- out:fly={{x: (lastMove ? (lastMove === 'next' ? '-2000' : '2000') : '0'), duration: 700}} -->
<div class="guitars" in:fade|global>

    {#key $chosenGuitarIndex}
        <div class="above" in:fly={{x: (isMobileDevice ? 0 : (lastMove ? (lastMove === 'next' ? xDis : -xDis) : '0')), y: (isMobileDevice ? 50 : 0), duration: 600}} style="height: {aboveContentHeight}px;">
            <div class="empty"></div>
            <div class="guitarHeader" bind:offsetHeight={aboveContentHeight}>
                <GuitarHeader 
                    name={chosenGuitar.name[$language]} 
                    category={$dictionary[chosenGuitar.category]}
                />
            </div>
        </div>
    {/key}
                    
    <div class="centralLine" style="{isMobileDevice ? `height: ${middleContentHeight}px;` : ''}">
        <div class="centralLineContent">

            <button class="previous baseButton" on:click={previousGuitar} aria-label="{$dictionary.guitarraAnterior}">
                <ion-icon name="chevron-back-outline" style="transform: translateX(-3px);"></ion-icon>
            </button>

            {#key $chosenGuitarIndex}
                <div class="guitarImage" bind:offsetHeight={middleContentHeight} in:fly={{x: (lastMove ? (lastMove === 'next' ? xDis : -xDis) : '0'), duration: 600, delay: (isMobileDevice ? 0 : 100)}}>
                    <GuitarImage fileNames={chosenGuitar.fileNames} bind:currentFileIndex name={chosenGuitar.name[$language]} extension={chosenGuitar.filesExtension} />
                </div>
            {/key}

            <button class="next baseButton" on:click={nextGuitar} aria-label="{$dictionary.guitarraSiguiente}">
                <ion-icon name="chevron-forward-outline"></ion-icon>
            </button>
                
        </div>
    </div>

    {#key $chosenGuitarIndex}
        <div class="belowWrapper" style="height: {belowContentHeight}px;">
            <div class="below" in:fly={{x: (isMobileDevice ? 0 : (lastMove ? (lastMove === 'next' ? xDis : -xDis) : '0')), y: (isMobileDevice ? 50 : 0), duration: 600}} bind:offsetHeight={belowContentHeight} >
                <div class="controller">
                    <CarrouselController array={chosenGuitar.fileNames} bind:currentFileIndex/>
                </div>
    
                <div class="guitarFooter">
                    <GuitarFooter 
                        name={chosenGuitar.name[$language]}
                        linkName={chosenGuitar.name.es}
                        edition={chosenGuitar.edition[$language]}
                        description={chosenGuitar.description[$language]}
                        price={chosenGuitar.price}
                        oldPrice={chosenGuitar.oldPrice}
                    /> 
                </div>
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
        
        background: linear-gradient(90deg, rgba( 75,  50,  43, 0.7), rgba(58, 38, 33, 0.7), rgba( 28,  20,  19, 0.7), var(--mainDimer));
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

    .above, .belowWrapper {
        transition: height 500ms ease-out;
    }

    .controller {
        margin-bottom: 2em;
    }

    @media screen and (max-width: 1100px){
        .above, .below {
            margin: 0 5em 0 10em;
        }
    }
    
    @media (orientation: portrait) {
        .guitars {
            padding-top: 0;
            padding-bottom: 6em;
        }
        
        .centralLine {
            min-height: 532px;
            height: auto;
            margin: 2em 0;
            
            background: transparent;

            transition: height 1s ease-out;
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
    }

</style>