<script lang="ts">
	import { fade, slide } from "svelte/transition";

    export let options: string[];

    let optionsVisible:boolean = false;    
    export let optionSelectedIndex:number = 0

    function toggle() {
        optionsVisible = !optionsVisible;
    }

    function close() {
        optionsVisible = false;
    }

</script>

{#key optionSelectedIndex}
    <button in:fade class="selectedTeam" class:active={optionsVisible} on:click={toggle}>
        {options[optionSelectedIndex]} 
    </button>
{/key}

{#if optionsVisible}
    <section transition:slide|local>
        {#each options as name, i}
            <button disabled={i === optionSelectedIndex} on:click={() => {optionSelectedIndex = i; close()}}>{name}</button>
        {/each}
    </section>
{/if}

<style>    
    .selectedTeam {
        font-size: .9rem;
        font-weight: normal;
        border-radius: 20px;
        background-color: #0000002a;
        border: 1px solid #fff;
        padding: .2rem .8rem;
        transition: all .2s;
    }

    .selectedTeam:hover,
    .selectedTeam:focus-visible,
    .active{
        background-color: var(--content);
        color: var(--main);
    }

    section {
        position: fixed;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        padding: 1.5em 2em 2em;
        
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        background-color: var(--content);
        box-shadow: 0 0 10px rgba(255, 255, 255, 0.322);
        width: fit-content;
        max-width: 90%;
        overflow: hidden;
        z-index: 11;

        display: flex;
        flex-direction: column;
        gap: .5em;
    }

    section button {
        width: 100%;
        padding: .5rem 1.5rem;
        border-radius: 10px;
        font-size: 1.1rem;
        text-align: center;
        color: var(--main);
    }

    section button:hover:not(:disabled) {
        background-color: #0000002a;
    }

    section button:focus-visible {
        outline-color: black;
    }

    section button:disabled {
        opacity: .6;
        cursor: pointer;
    }
    
    @media screen and (max-width: 500px) {
        section {
            padding: 1.5em 1em 2em;
        }
    }

</style>