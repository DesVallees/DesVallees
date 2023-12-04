<script lang="ts">
    import { beforeUpdate, onMount } from 'svelte';

	import { language, game, initialSeconds, seconds, dictionary } from './stores';

	import Languages from './components/languages.svelte';
	import Reset from './components/reset.svelte';
	import Results from './components/results.svelte';
	import Timer from './components/timer.svelte';
	import Words from './components/words.svelte';
	import Seconds from './components/seconds.svelte';
	import Preloader from './components/preloader.svelte';


    let div: HTMLDivElement;

    let words: string[] = []
    let correctLetters = 0
    let totalLetters = 0

    let toggleReset = false
    

    function restartCounter() {
        $seconds = $initialSeconds
        $game = 'waiting for input'
        correctLetters = 0
        totalLetters = 0
    }

    function resetGame() {
        restartCounter()
        words = []
        toggleReset = !toggleReset
        getWords(100)
    }

    async function getWords(limit:number) {
        const response = await fetch(`/api/destype?language=${$language}&limit=${limit}`)
        const newWords = await response.json()
        
        words = [...words, ...newWords]
        words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1)
    }

    let initialPromise = getWords(100)

    onMount(() => {
        restartCounter()
    })

    beforeUpdate(() => {
        if ($game === 'game over' && div) {
            div.style.display = 'none'
        }
    });


    let enterDown:number | undefined = 0;
    let timeHeld:number;

	function setEnterTimer(event: KeyboardEvent): void {
        if (event.code === 'Enter') {
            if (enterDown === 0) {
                enterDown = Date.now();
            } 
            else if (enterDown) {
                timeHeld = Date.now() - enterDown;
                
                if (timeHeld > 500) {
                    resetGame()
                    enterDown = undefined
                }
            }
        }
	}
    
	function resetEnterTimer(event: KeyboardEvent): void {
        if (event.code === 'Enter') {
            enterDown = 0
        }
	}

</script>


<svelte:window on:keydown={setEnterTimer} on:keyup={resetEnterTimer} />


{#await initialPromise}

    <Preloader animation="dots">
        <h1>🤓 DesType</h1>
    </Preloader>

{:then}

    
    {#if $game !== 'game over'}

        <div bind:this={div}>

            {#if totalLetters === 0}

                <Languages on:languageChanged={resetGame}/>
                
            {:else}

                <Timer {correctLetters}/>

            {/if}

            {#key toggleReset}

                <Words on:shortOfWords={() => getWords(100)} on:wentBack={restartCounter} bind:words bind:totalLetters bind:correctLetters />

            {/key}

            <Reset {resetGame} />

            {#if totalLetters === 0}

                <Seconds />

            {/if}

        </div>

    {:else}

        <Results {resetGame} {correctLetters} {totalLetters}/>

    {/if}


{:catch}

    <p>{$dictionary.error}</p>

{/await}


<style>

    div{
        position: relative;
        display: grid;
        justify-content: center;
        row-gap: 2em;
    }

</style>