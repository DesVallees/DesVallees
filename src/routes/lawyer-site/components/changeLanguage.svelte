<script lang="ts">
	import { dictionary, language, type Language } from "../stores";

    export let style: string = '';
    export let buttonStyle: string = 'link';

    function changeLanguage (language: Language) {
        $language = language;
    }
</script>

{#if $language === 'es'}
    
    <button class={buttonStyle} style="{style}" on:click={() => changeLanguage('en')} lang="en" aria-label="English">
        English
        <img lang="{$language}" src="/images/usFlag.webp" alt="{$dictionary.unitedStatesFlag}">
    </button>

    {:else}

    <button class={buttonStyle} style="{style}" on:click={() => changeLanguage('es')} lang="es" aria-label="Español">
        Español
        <img lang="{$language}" src="/images/spainFlag.webp" alt="{$dictionary.spanishFlag}">
    </button>

{/if}


<style>
    button {
        width: fit-content;
        font-size: 1.1rem;
    }
    img {
        height: 1rem;
        border-radius: .2rem;
        width: auto;
        translate: 0 1px;
    }
    
    @media screen and (min-width: 31rem) {
        button {
            font-size: 1.25rem;
        }
    }
</style>