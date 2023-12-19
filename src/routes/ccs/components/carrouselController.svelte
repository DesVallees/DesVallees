<script lang="ts">
	import { dictionary } from "../stores";


    export let array:string[];
    export let currentFileIndex: number;

</script>

<div>
    {#each array as i, index}
        <button aria-label="{$dictionary.imagen} {index + 1}" on:click={() => currentFileIndex = index} class:active={index === currentFileIndex} tabindex={index === currentFileIndex ? -1 : 0}></button>
    {/each}
</div>

<style>
    div{
        display: flex;
        gap: 1.5em;
    }
    
    div button{
        border-radius: 50px;
        background-color: var(--contentDimer);
        height: 12px;
        width: 20px;
        transition: all .2s;
    }

    div button:not(.active):hover,
    div button:not(.active):focus-visible{
        width: 30px;
        background-color: var(--contentDim);
    }

    div .active{
        width: 50px;
        cursor: default;
        background-color: var(--content);
    }

    @media (orientation: portrait) {
        div{
            gap: 1em;
        }
    }
</style>