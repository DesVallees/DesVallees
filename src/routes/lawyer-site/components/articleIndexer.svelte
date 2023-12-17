<script lang="ts">
	import { onMount } from "svelte";
	import { clickOutsideOrChild } from "../functions";
	import { slide } from "svelte/transition";
	import { dictionary } from "../stores";
	import { sleep } from "../../ccs/functions";

    export let article: HTMLElement;

    type Header = {
        id: string;
        name: string;
    };

    let links: Header[] = [];

    function findHeaders() {
        if (!article) return;

        const headerTags = article.querySelectorAll('h1, h2, h3, h4, h5, h6');

        headerTags.forEach((header) => {
            let id = header.id;
            const name = header.textContent;

            if (name) {
                if (!id) {
                    id = generateValidId(name);
                    header.id = id;
                }

                links = [...links, { id, name }];
            }
        });
    }

    function generateValidId(text: string) {
        // Replace spaces with hyphens
        let sanitized = text.replace(/\s/g, '-');

        // Remove special characters
        sanitized = sanitized.replace(/[^\w-]/g, '');

        // Ensure it starts with a letter
        sanitized = sanitized.replace(/^\d/, '_');

        // Make it unique
        let id = sanitized;
        let counter = 1;
        while (document.getElementById(id)) {
            id = `${sanitized}-${counter}`;
            counter++;
        }

        return id;
    }

    onMount(() => {
        findHeaders()
    })

    let menuVisible: boolean = false;
    function toggleMenu() {
        menuVisible = !menuVisible
    }

    async function closeMenu() {
        await sleep(10)
        menuVisible = false;
    }

</script>

{#if links.length > 0}
    <button class="button" on:click={toggleMenu}>
        {$dictionary.jumpTo} 
        <ion-icon style="transform: rotate({menuVisible ? "180deg" : "0deg"}); transition: transform .2s" name="caret-down-outline"></ion-icon>
    </button>
    {#if menuVisible}
        <ol transition:slide on:outside={closeMenu} use:clickOutsideOrChild>
            {#each links as header}
                <li><a class="link" href="#{header.id}">{header.name}</a></li>
            {/each}
        </ol>
    {/if}
{/if}


<style>
    button {
        margin-bottom: 1rem;
        column-gap: 2ch;
        font-size: 1.05rem;
        line-height: 1.5;

    }
    
    ol {
        display: grid;
        gap: 1rem;
        font-size: 1.05rem;
        border: 2px solid var(--content);
        border-radius: 10px;
        padding: 1rem;
    }

    ol li::before {
        content: '\2022';
        color: var(--content);
        display: inline-block;
        width: 1em;
        margin-right: 1ch;
    }

    li {
        list-style: none;
        display: flex;
        align-items: center;
    }

    li a {
        text-align: start;
        display: block;
    }

</style>