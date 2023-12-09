<script lang="ts">
	import { slide } from "svelte/transition";
	import { dictionary, language, type Language, isLanguage } from "../stores";
	import Base from "./base.svelte";

    export let style:string = '';

    let languageFlags: Record<Language, string> = {
        'es': 'spainFlag.webp',
        'en': 'usFlag.webp',
        'fr': 'franceFlag.webp',
        'de': 'germanyFlag.webp',
        'it': 'italyFlag.webp',
        'ru': 'russiaFlag.webp',
    }

    function getLanguageName(languageCode: Language): string | undefined {
        const languageMappings: Record<Language, string> = {
            'es': 'español',
            'en': 'english',
            'fr': 'français',
            'de': 'deutsch',
            'it': 'italiano',
            'ru': 'Русский',
        };

        return languageMappings[languageCode];
    }

    function changeLanguage(newLanguage: string) {
        $language = newLanguage as Language;
        active = false;
    }

    let active : boolean = false;

    let firstFocusableElement: HTMLButtonElement;
    let lastFocusableElement: HTMLButtonElement;
</script>

<button style="{style}" class="languageControl" on:click={() => {active = true}} aria-label={$dictionary.language}>
    <img src="/images/{languageFlags[$language]}" alt={getLanguageName($language)}>
    <ion-icon name="caret-down-outline"></ion-icon>
</button>

<Base bind:active firstFocusableElement={firstFocusableElement} lastFocusableElement={lastFocusableElement}>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div on:click|stopPropagation class="languagesContainer" transition:slide|global={{duration:200}}>
        {#each Object.entries(languageFlags) as [languageCode, flag], index}
            {#if isLanguage(languageCode)}
                {#if index === 0}

                    <button class="languageOption baseButton" on:click={() => changeLanguage(languageCode)} bind:this={firstFocusableElement} lang={languageCode} aria-label="{getLanguageName(languageCode)}">
                        <img src="/images/{flag}" alt={getLanguageName(languageCode)}>
                        <span>{getLanguageName(languageCode)}</span>
                    </button>
                    
                {:else if index === Object.keys(languageFlags).length - 1}

                    <button class="languageOption baseButton" on:click={() => changeLanguage(languageCode)} bind:this={lastFocusableElement} lang={languageCode} aria-label="{getLanguageName(languageCode)}">
                        <img src="/images/{flag}" alt={getLanguageName(languageCode)}>
                        <span>{getLanguageName(languageCode)}</span>
                    </button>

                {:else}

                    <button class="languageOption baseButton" on:click={() => changeLanguage(languageCode)} lang={languageCode} aria-label="{getLanguageName(languageCode)}">
                        <img src="/images/{flag}" alt={getLanguageName(languageCode)}>
                        <span>{getLanguageName(languageCode)}</span>
                    </button>
                    
                {/if}
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