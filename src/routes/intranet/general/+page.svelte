<script lang="ts">
	import { fade } from "svelte/transition";


	import Article from "../components/article.svelte";
	import { dictionary } from "../stores";

</script>


<div class="general" in:fade>

    <Article title={$dictionary.subtitlePhrases[1]} author="Canto Legal" profilePicture="https://clappforms.web.app/favicon-32x32.png" content={$dictionary.articles.policies}/>

</div>


<style>

    .general {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1em;
        width: 100%;
    }
    
</style>