<script lang="ts">
	import { onMount } from "svelte";

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
                    // If id is not present, generate one based on headerName
                    id = name.toLowerCase().replace(/\s+/g, '-');
                    header.id = id;
                }

                links = [...links, { id, name }];
            }
        });

    }

    onMount(() => {
        findHeaders()
    })

</script>

{#if links.length > 0}
    <button>Jump to what you are looking for. Ion-icon</button>
    <ol>
        {#each links as header}
            <li><a href="#{header.id}">{header.name}</a></li>
        {/each}
    </ol>
{/if}


<style>
    
</style>