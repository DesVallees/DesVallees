<script lang="ts">
	import { slide } from "svelte/transition";
	import { language, type Language } from "../stores";
	import Base from "./base.svelte";

    let languageFlags = {
        'español': 'spainFlag.jpg',
        'english': 'usFlag.jpg',
        'français': 'franceFlag.png',
        'deutsch': 'germanyFlag.png',
        'italiano': 'italyFlag.png',
        'Русский': 'russiaFlag.png',
    }

    function changeLanguage(newLanguage: string) {
        $language = newLanguage as Language
        active = false
    }

    let active : boolean = false;

    let firstFocusableElement: HTMLButtonElement;
    let lastFocusableElement: HTMLButtonElement;
</script>

<button class="languageControl" on:click={() => {active = true}}>
    <img src="/images/{languageFlags[$language]}" alt={$language}>
    <ion-icon name="caret-down-outline"></ion-icon>
</button>

<Base bind:active firstFocusableElement={firstFocusableElement} lastFocusableElement={lastFocusableElement}>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div on:click|stopPropagation class="languagesContainer" transition:slide={{duration:200}}>
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
        gap: .5rem;
        margin-left: 50px;
        border-radius: 50px;
        padding: 5px;
    }

    .languageControl:hover,
    .languageControl:focus-visible {
        background-color: var(--contentHover);
    }

    img {
        height: 2.5rem;
        aspect-ratio:  1 / 1;
        border-radius: 50%;
    }

    .languagesContainer{
        border-radius: 20px;
        box-shadow: 0 0 5px var(--contentDim);
        background-color: var(--main);
        padding: 2em 2.5em;
        height: fit-content;

        display: grid;
        gap: .8em;

    }   

    .languageOption{
        text-transform: capitalize;
        display: flex;
        justify-content: flex-start;
        gap: 1rem;
        font-size: 1.15rem; 
        font-weight: 500;
        width: 100%;
    }

    @media screen and (max-width: 1025px){
        .languageControl {
            margin-left: 25px;
        }
    }
</style>