<script lang="ts">
	import { fade, slide } from "svelte/transition";

    export let options: string[];
    export let style: string = '';

    let optionsVisible:boolean = false;    
    export let optionSelectedIndex:number = 0

</script>

<nav style="{style}">
    {#key optionSelectedIndex}
        <button in:fade class="selectedTeam" style="{optionsVisible ? 'gap: 4rem;' : '' }" on:click={() => optionsVisible = !optionsVisible}>
            {options[optionSelectedIndex]} 
            <div style="{optionsVisible ? 'transform: rotate(180deg);' : 'transform: rotate(0deg);' }"><ion-icon name="chevron-down-outline"></ion-icon></div> 
        </button>
    {/key}
    {#if optionsVisible}
        <section transition:slide|local>
            {#each options as name, i}
                <button disabled={i === optionSelectedIndex} on:click={() => {optionSelectedIndex = i; optionsVisible = false}}>{name}</button>
            {/each}
        </section>
    {/if}
</nav>

<style>    
    div {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 1em;
        font-size: .8rem;
        transition: all .2s;
        height: fit-content;
    }

    nav{
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    button {
        color: var(--main);
        padding: .5rem 1rem;
        width: 100%;
        text-align: center;
        border-bottom: 1px solid #ccc;
        transition: all .2s;
        gap: 3rem;
    }

    button:disabled {
        opacity: .6;
    }

    button:hover:not(:disabled),
    button:focus {
        background-color: #0000002a;
    }

    .selectedTeam {
        border-radius: 5px;
        margin-bottom: 1rem;
        background-color: var(--content);
    }

    .selectedTeam:hover,
    .selectedTeam:focus {
        background-color: var(--content) !important;
    }

    .selectedTeam:focus-visible{
        gap: 4rem;
    }

    section {
        border-radius: 5px;
        background-color: var(--content);
        width: fit-content;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: hidden;
    }

</style>