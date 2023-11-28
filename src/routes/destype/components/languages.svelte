<script lang="ts">
	import { createEventDispatcher } from "svelte";
    import { send, receive } from '../transitions';
    import { flip } from 'svelte/animate';
	import { onMount } from "svelte";
    import toast from 'svelte-french-toast';

	import { dictionary, language, type Language } from '../stores';

    const dispatch = createEventDispatcher();
    
    $:languages = [
        'français',
        'español',
        'italiano',
        'english',
        'Русский',
    ]

    function getEncouragementMessage():string {
        const message = $dictionary.encouragement[
            Math.floor(Math.random() * $dictionary.encouragement.length)
        ]
        return message
    }

    function changeLanguage(newLanguage:string) {
        languages = updateLanguages(newLanguage)
        $language = newLanguage as Language
        dispatch("languageChanged")
        toast(getEncouragementMessage(), {
            style: 'border-radius: 50px; background: var(--fg-200); font-size: 1.1rem; font-family: inherit;  text-align: center;',
            duration: 2000
        })
    }

    function updateLanguages(newLanguage: string): string[] {
        const newIndex = languages.indexOf(newLanguage);

        const result = [...languages];
        result.splice(newIndex, 1);
        result.push(newLanguage)

        return result;
    }

    onMount(() => languages = updateLanguages($language))

</script>

<div>
    {#each languages as newLanguage, index(newLanguage)}
        <button 
            in:receive|global={{ key: newLanguage }} out:send|global={{ key: newLanguage }}
            animate:flip={{duration: 400}}
            class={(newLanguage === $language) ? 'current' : ''} 
            disabled={newLanguage === $language} 
            on:click={() => changeLanguage(newLanguage)}
        >
            {newLanguage.charAt(0).toUpperCase() + newLanguage.slice(1)}
        </button>
    {/each}
</div>

<style>
    div {
        position: absolute;
        bottom: calc(100% + 28px);
        left: 50%;
        transform: translateX(-50%);
        width: max-content;
        max-width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1em 1.2em;
        font-size: 1.1rem;
    }
    
    button {
        width: 6.5rem;
    }

    .current{
        position: absolute;
        right: calc(-1.2em + -102px);
        cursor: default;
        transition: none;
        box-shadow: 0 0 3px hsla(210, 20%, 98%, 0) !important;
        color: hsla(210, 20%, 98%, 0) !important;
    }
</style>