<script lang="ts">
	import { scale } from "svelte/transition";
	import { bestWPM, dictionary, game, initialSeconds, seconds } from "../stores";
    
    export let correctLetters: number;
    
    const word = 5;
    
    let score:number;
    let wpm:number;

    function getCurrentScore() {
        score = Math.ceil(correctLetters / word / ($initialSeconds / 60));
        
        if (score > $bestWPM) {
            $bestWPM = score
        }
    }

    function getWordsPerMinute() {
        wpm = Math.ceil(correctLetters / word / (($initialSeconds - $seconds || 0.5) / 60));
    }

    $: correctLetters, getCurrentScore();
    $: correctLetters, getWordsPerMinute();
    $: $seconds, getWordsPerMinute();
    
</script>


<section>
    {#if $game === 'in progress'}
        <div in:scale|global>{wpm}</div>
        <div in:scale|global style="font-size: 1.55rem; color: var(--fg-100);">{$seconds}</div>
        <div in:scale|global>{score}</div>
    
    {:else}
        <div in:scale>{$dictionary.pause}</div>

    {/if}
</section>

<style>

    section{
        position: absolute;
        top: -58px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 1.5rem;
        color: var(--primary);

        display: flex;
        column-gap: 4rem;
    }

</style>