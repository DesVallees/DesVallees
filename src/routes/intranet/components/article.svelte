<script lang="ts">
	import { capitalizeWords } from "../functions";
	import { dictionary } from "../stores";
	import Avatar from "./avatar.svelte";

    export let title:string;
    export let author:string;
    export let profilePicture:string;
    export let content:string;

    let minutesRead: number = Math.ceil(content.split(" ").length/150)

</script>

<article>
    <h1>{capitalizeWords(title)}</h1>
    <div class="sub">
        <Avatar personName={author} image={profilePicture} width="25px"/>
        <h6>{author} • {minutesRead} {$dictionary.minutesRead}</h6>
    </div>
    <section>
        {@html content}
    </section>
</article>

<style>
    article {
        max-width: 1000px;
        position: relative;
        margin-top: 50px;
        padding: 0 50px;
    }

    h1{
        line-height: 5rem;
        font-size: 4.5rem;
    }

    div {
        display: flex;
        gap: 12px;
        align-items: center;
        margin: 1rem 0 4rem;
    }

    h6 {
        color: var(--contentDim);
        font-weight: normal;
        font-size: 1rem;
    }
    
    section, article :global(p), article :global(li) {
        font-size: 1.25rem;
        color: var(--contentDim);
        line-height: 2.5rem;
        font-weight: normal;
    }
    
    article :global(h2) {
        font-size: 1.7rem;
        color: var(--content);
    }

    @media screen and (max-width: 1000px) {
        h1 {
            line-height: normal;
            font-size: 3rem;
        }

        :global(h2) {
            font-size: 1.5rem;
        }
    }

    @media screen and (max-width: 850px) {
        article {
            padding: 0 2em;
        }
    }
</style>