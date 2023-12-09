<script lang="ts">
	import { onMount, onDestroy } from "svelte";
	import { tweened } from "svelte/motion";
    import { blur } from "svelte/transition";
	import { bestWPM, dictionary, initialSeconds } from "../stores";
	import ResultStat from "./resultStat.svelte";
    import toast from 'svelte-french-toast';

    export let resetGame: () => void;
    export let correctLetters: number;
    export let totalLetters: number;

    let wordsPerMinute = tweened(0, {delay: 300, duration: 1000})
    let accuracy = tweened(0, {delay: 1000, duration: 1000})

    function getResultMessage():string {
        let message;
        if ($wordsPerMinute === $bestWPM) {
            const randomIndex = Math.floor(Math.random() * $dictionary.bestScore.length)
            message = $dictionary.bestScore[randomIndex]
        } else if ($wordsPerMinute > ($bestWPM - 20)) {
            const randomIndex = Math.floor(Math.random() * $dictionary.goodScore.length)
            message = $dictionary.goodScore[randomIndex]
        }else{
            const randomIndex = Math.floor(Math.random() * $dictionary.badScore.length)
            message = $dictionary.badScore[randomIndex]
        }
         
        return message
    }

    onMount(() => {
        $wordsPerMinute = getWordsPerMinute()
        $accuracy = getAccuracy()

        toast(getResultMessage(), {
            style: 'border-radius: 25px; background: var(--fg-200); font-size: 1.1rem; font-family: inherit; text-align: center;',
            duration: 5000
        })

        screenReaderResults.focus()
    })

    onDestroy(() => {
        $wordsPerMinute = 0
        $accuracy = 0
    })

    function getWordsPerMinute() {
        const word = 5
        const wpm = Math.ceil(correctLetters / word / ($initialSeconds / 60))

        wpm > $bestWPM ? $bestWPM = wpm : ''
        
        return wpm
    }

    function getAccuracy() {
        return Math.floor(correctLetters / totalLetters * 100) || 0
    }

    let screenReaderResults: HTMLHeadElement;

</script>


<h1 class="screenReaderResults" bind:this={screenReaderResults} tabindex="-1">{$dictionary.wordsPerMinute}: {getWordsPerMinute()}. {$dictionary.accuracy}: {getAccuracy()}%.</h1>

<div in:blur|global>
    <ResultStat title={$dictionary.wpm} tooltip={$dictionary.wordsPerMinute} score={Math.trunc($wordsPerMinute)}/>
    <ResultStat title={$dictionary.accuracy} score={`${Math.trunc($accuracy)}%`}/>
</div>

<div in:blur|global>
    <!-- svelte-ignore a11y-autofocus -->
    <button on:click={resetGame} class="play" aria-label="{$dictionary.playAgain}">{$dictionary.playAgain}</button>
</div>



<style>

    div{
        display: grid;
        justify-content: center;
        margin-top: 3rem;
    }
    
    button {
        padding: .3rem 1em;
    }

    .screenReaderResults {
        opacity: 0;
        position: absolute;
    }

</style>