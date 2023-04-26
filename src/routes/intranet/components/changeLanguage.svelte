<script lang="ts">
	import { dictionary, language, type Language } from "../stores";

    export let style: string = ''

    function changeLanguage (language: Language) {
        $language = language
    }
</script>

{#if $language === 'español'}
    
    <button class="link" style="{style}" on:click={() => changeLanguage('english')}>
        English
        <img src="images/usFlag.jpg" alt="{$dictionary.unitedStatesFlag}">
    </button>

    {:else}

    <button class="link" style="{style}" on:click={() => changeLanguage('español')}>
        Español
        <img src="images/spainFlag.jpg" alt="{$dictionary.spanishFlag}">
    </button>

{/if}


<style>
    button {
        width: fit-content;
    }
    img {
        height: 1rem;
        border-radius: .2rem;
        width: fit-content;
    }
</style>