<script lang="ts">
	import { fade, slide } from "svelte/transition";

    export let options: {id: number, name: string}[];
    export let style: string = '';

    let optionsVisible:boolean = false;    
    export let optionSelectedIndex:number = 0

    let trigger: HTMLButtonElement;

    function clickOutside(node: any) {
        const handleClick = (event: any) => {
            if (!node.contains(event.target) && !trigger.contains(event.target)) {
                optionsVisible = false
            }
        };

        document.addEventListener("click", handleClick, true);

        return {
            destroy() {
                document.removeEventListener("click", handleClick, true);
            }
        };
    }

</script>

<nav style="{style}">
    {#key optionSelectedIndex}
        <button bind:this={trigger} in:fade class="selectedTeam" style="{optionsVisible ? 'gap: 4rem;' : '' }" on:click={() => optionsVisible = !optionsVisible}>
            {options[optionSelectedIndex].name} 
            <div style="{optionsVisible ? 'transform: rotate(180deg);' : 'transform: rotate(0deg);' }"><ion-icon name="chevron-down-outline"></ion-icon></div> 
        </button>
    {/key}
    {#if optionsVisible}
        <section transition:slide|local={{duration: 200}} use:clickOutside>
            {#each options as name, i}
                <button class:selected={i === optionSelectedIndex} tabindex={i === optionSelectedIndex ? -1 : 0} on:click={() => {optionSelectedIndex = i; optionsVisible = false}}>{name.name}</button>
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

    .selected {
        opacity: .7;
        cursor: default;
        background-color: #0000002a;
    }

    button:hover:not(:disabled) {
        background-color: #0000002a;
    }

    button:focus-visible:not(.selectedTeam) {
        background-color: var(--interative);
        color: var(--content);
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