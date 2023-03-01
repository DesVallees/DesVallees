<script lang="ts">
	import { scale } from "svelte/transition";
	import { bestWPM, dictionary } from "../stores";
</script>

{#key $dictionary}
    <h1 in:scale|local>
        <span>{$dictionary.highScore}: </span>

        {#key $bestWPM}
            <span in:scale>{$bestWPM}</span>
        {/key}

        <span>{$dictionary.wpm}</span>
    </h1>
{/key}

<style>
    h1 {
        font-family: 'Lexend Deca', sans-serif;
        font-size: 1.2rem;
        color: var(--fg-200);
        letter-spacing: 2px;
    }
</style>