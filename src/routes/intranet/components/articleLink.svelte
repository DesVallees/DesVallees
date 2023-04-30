<script lang="ts">
	import { slide } from "svelte/transition";
	import { dictionary } from "../stores";
	import Avatar from "./avatar.svelte";

    type Article = {
        title: string;
        content: string;
        author: string;
        profilePicture: string;
    }
    
    export let article:Article;
    export let link:string;

    function shortenString(text: string): string {
        // Remove HTML tags from the text
        const cleanedText = text.replace(/(<([^>]+)>)/gi, ' ');

        const words = cleanedText.split(' ');
        const shortenedWords = words.slice(0, 30);
        const shortenedText = shortenedWords.join(' ');

        if (words.length > shortenedWords.length) {
            return shortenedText + '...';
        }

        return shortenedText;
    }

    function capitalizeWords(str: string) {
        return str.split(' ').map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }).join(' ');
    }

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
        text-align: justify;
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
    
    
</style>