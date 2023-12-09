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
        <img src="/images/usFlag.webp" alt="{$dictionary.unitedStatesFlag}">
    </button>

    {:else}

    <button class={buttonStyle} style="{style}" on:click={() => changeLanguage('es')} lang="es" aria-label="Español">
        Español
        <img src="/images/spainFlag.webp" alt="{$dictionary.spanishFlag}">
    </button>

{/if}


<style>
    button {
        width: fit-content;
    }
    img {
        height: 1rem;
        border-radius: .2rem;
        width: auto;
    }
</style>