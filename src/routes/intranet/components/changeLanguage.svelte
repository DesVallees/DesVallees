<script lang="ts">
	import { dictionary, language, type Language } from "../stores";

    function changeLanguage (language: Language) {
        $language = language
    }
</script>

{#if $language === 'español'}
    
    <button class="link" on:click={() => changeLanguage('english')}>
        English
        <img src="https://clappforms.web.app/usFlag.jpg" alt="{$dictionary.unitedStatesFlag}">
    </button>

    {:else}

    <button class="link" on:click={() => changeLanguage('español')}>
        Español
        <img src="https://clappforms.web.app/spainFlag.jpg" alt="{$dictionary.spanishFlag}">
    </button>

{/if}


<style>
    img {
        height: 1rem;
        border-radius: .2rem;
    }
</style>