<script lang="ts">
	import { slide } from "svelte/transition";
	import { dictionary } from "../stores";
	import Avatar from "./avatar.svelte";
	import { capitalizeWords, shortenString } from "../functions";

    type Article = {
        title: string;
        content: string;
        author: string;
        profilePicture: string;
    }
    
    export let article:Article;
    export let link:string;

</script>


<a href="/intranet/general/{link}" transition:slide|local={{duration: 500}}>
    <h1>{capitalizeWords(article.title)}</h1>
    <h2><Avatar image={article.profilePicture} width="1.5rem"/>{$dictionary.by} {article.author}</h2>
    <p>{shortenString(article.content)}</p>
</a>


<style>

    a {
        border-top: 1px var(--content) solid;
        padding: 2em 1em 3em;
        display: flex;
        flex-direction: column;
        gap: 1em;
        width: 100%;
        max-width: 700px;
        text-align: left;
        align-items: baseline;
        border-radius: 2px;
    }

    a:hover,
    a:focus-visible {
        background-color: rgba(0, 0, 0, 0.07);
    }

    h1 {
        font-size: 1.875rem;
        margin-top: 0;
        line-height: normal;
    }
    
    h2 {
        font-size: 1rem;
        margin-top: 0;
        line-height: normal;
        display: flex;
        gap: .9rem;
        align-items: center;
    }

    p {
        font-size: 1rem;
        color: var(--contentDim);
        margin-top: 1em;
        line-height: 2rem;
    }

    @media screen and (max-width: 700px) {
        a {
            gap: .9em;
        }
        
        h1 {
            font-size: 1.5rem;
        }

        h2 {
            font-size: .9rem;
        }
    }
    
    
</style>