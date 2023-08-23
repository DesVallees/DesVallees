<script lang="ts">
	import { fade, fly } from "svelte/transition";
	import GuitarFooter from "./components/guitarFooter.svelte";
	import GuitarHeader from "./components/guitarHeader.svelte";
	import GuitarImage from "./components/guitarImage.svelte";
	import { throttle } from "./functions";
	import ShareButton from "./components/shareButton.svelte";
	import { imageStorage, categories } from "./database";
	import { language } from "./stores";

    let chosenGuitarIndex = 0
    let chosenGuitar = imageStorage[chosenGuitarIndex]
    let guitarsArrayLength = imageStorage.length

    $: chosenGuitarIndex, chosenGuitar = imageStorage[chosenGuitarIndex]
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

    let currentFileIndex: number;

</script>

<div class="guitars" in:fade>
    <div class="centralLine">

        <div class="centralLineContent">

            <button class="previous baseButton" on:click={previousGuitar}>
                <ion-icon name="chevron-back-outline" style="transform: translateX(-3px);"></ion-icon>
            </button>

            {#key chosenGuitarIndex}

                <div class="above" in:fly|local={{x: (lastMove ? (lastMove === 'next' ? '1500' : '-1500') : '0'), duration: 600}} out:fly|local={{x: (lastMove ? (lastMove === 'next' ? '-2000' : '2000') : '0'), duration: 700}}>
                    <GuitarHeader 
                        name={chosenGuitar.name[$language]} 
                        category={categories[chosenGuitar.category][$language]}
                    />
                </div>

                <div class="aligned">
                    <!-- extra div to avoid animation bug -->
                    <div in:fly|local={{x: (lastMove ? (lastMove === 'next' ? '1500' : '-1500') : '0'), duration: 600, delay: 100}} out:fly|local={{x: (lastMove ? (lastMove === 'next' ? '-2000' : '2000') : '0'), duration: 700}}>
                        <GuitarImage fileNames={chosenGuitar.fileNames} bind:currentFileIndex />
                    </div>
                </div>
                
                <div class="carrouselController" in:fly|local={{x: (lastMove ? (lastMove === 'next' ? '1500' : '-1500') : '0'), duration: 600}} out:fly|local={{x: (lastMove ? (lastMove === 'next' ? '-2000' : '2000') : '0'), duration: 700}}>
                    {#each chosenGuitar.fileNames as i, index}
                    <button on:click={() => currentFileIndex = index} class:active={index === currentFileIndex} tabindex={index === currentFileIndex ? -1 : 0}></button>
                    {/each}
                </div>
                
                <div class="below">
                    <!-- extra div to avoid animation bug -->
                    <div in:fly|local={{x: (lastMove ? (lastMove === 'next' ? '1500' : '-1500') : '0'), duration: 600}} out:fly|local={{x: (lastMove ? (lastMove === 'next' ? '-2000' : '2000') : '0'), duration: 700}}>
                        <GuitarFooter 
                        linkName={chosenGuitar.name.español}
                        edition={chosenGuitar.edition[$language]}
                        description={chosenGuitar.description[$language]}
                        price={chosenGuitar.price}
                        /> 
                    </div>
                </div>
                
            {/key}
            
            <button class="next baseButton" on:click={nextGuitar}>
                <ion-icon name="chevron-forward-outline"></ion-icon>
            </button>

        </div>

    </div>

    <ShareButton />
    
</div>

<style>
    .guitars {
        display: grid;
        align-items: center;
        justify-content: center;

        position: relative;
        min-height: 100%;
    }

    .centralLine {
        position: relative;
        width: 100vw;
        height: 170px;

        display: flex;
        justify-content: center;
        align-items: center;
        
        background: linear-gradient(90deg, rgb( 75,  50,  43), rgb(58, 38, 33), rgb( 28,  20,  19), var(--main));
    }
    
    .centralLineContent {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        width: 100%;
        height: 100%;
        max-width: 1700px;
    }

    .centralLineContent button {
        border-radius: 50px;
        z-index: 1;
    }

    .centralLineContent button ion-icon {
        font-size: 2.5rem;
    }

    .above {
        position: absolute;
        left: 55%;
        right: 10%;
        top: 0;
        transform: translateY(calc(-100% - 20px));
        z-index: 1;
    }

    .aligned {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: max-content;
        max-width: 80%;
        height: fit-content;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .below {
        position: absolute;
        left: 55%;
        right: 10%;
        bottom: 0;
        transform: translateY(calc(100% + 30px));
        z-index: 1;
    }

    .carrouselController{
        position: absolute;
        left: 100px;
        bottom: 0;
        transform: translateY(calc(100% + 200px));
        z-index: 1;
        display: flex;
        gap: 1.5em;
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

</style>