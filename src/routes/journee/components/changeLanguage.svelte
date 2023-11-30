<script lang="ts">
	import { slide } from "svelte/transition";
	import { dictionary, language, type Language } from "../stores";
	import Base from "./base.svelte";

    export let style:string = '';

    let languageFlags = {
        'español': 'spainFlag.webp',
        'english': 'usFlag.webp',
        'français': 'franceFlag.webp',
        'deutsch': 'germanyFlag.webp',
        'italiano': 'italyFlag.webp',
        'Русский': 'russiaFlag.webp',
    }

    function changeLanguage(newLanguage: string) {
        $language = newLanguage as Language
        active = false
    }

    let active : boolean = false;

    let firstFocusableElement: HTMLButtonElement;
    let lastFocusableElement: HTMLButtonElement;
</script>

<button style="{style}" class="languageControl" on:click={() => {active = true}} aria-label={$dictionary.language}>
    <img src="/images/{languageFlags[$language]}" alt={$language} >
    <ion-icon name="caret-down-outline"></ion-icon>
</button>

<Base bind:active firstFocusableElement={firstFocusableElement} lastFocusableElement={lastFocusableElement}>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div on:click|stopPropagation class="languagesContainer" transition:slide|global={{duration:200}}>
        {#each Object.entries(languageFlags) as [languageName, flag], index}
            {#if index === 0}

                <button class="languageOption baseButton" on:click={() => changeLanguage(languageName)} bind:this={firstFocusableElement}>
                    <img src="/images/{flag}" alt={languageName}>
                    <span>{languageName}</span>
                </button>
                
            {:else if index === Object.keys(languageFlags).length - 1}

                <button class="languageOption baseButton" on:click={() => changeLanguage(languageName)} bind:this={lastFocusableElement}>
                    <img src="/images/{flag}" alt={languageName}>
                    <span>{languageName}</span>
                </button>

            {:else}

                <button class="languageOption baseButton" on:click={() => changeLanguage(languageName)}>
                    <img src="/images/{flag}" alt={languageName}>
                    <span>{languageName}</span>
                </button>
                
            {/if}
        {/each}
    </div>
</Base>

<style> 
    .languageControl {
        display: flex;
        align-items: center;
        gap: .5rem;
        border-radius: 50px;
        padding: 5px;

        transition: all .2s;
    }

    .languageControl:hover,
    .languageControl:focus-visible {
        background-color: var(--content-1);
    }

    img {
        height: 2.5rem;
        aspect-ratio:  1 / 1;
        border-radius: 50%;
        -webkit-user-drag: none;
    }

    .languagesContainer{
        border-radius: 20px;
        box-shadow: 0 0 5px var(--content-8);
        background-color: var(--main);
        padding: 2em 2.5em;
        height: fit-content;

        display: grid;
        gap: .8rem;
    }   

    .languageOption{
        width: 100%;
        padding: .6em .75em;

        text-transform: capitalize;

        display: flex;
        justify-content: flex-start;
        gap: 1rem;

        font-size: 1.15rem; 
        font-weight: 500;
    }

</style>