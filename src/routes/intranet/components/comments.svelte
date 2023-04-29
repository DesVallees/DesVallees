<script lang="ts">
	import { postsDB, type Post as post } from "../futureDB";
	import { dictionary } from "../stores";
	import Post from "./post.svelte";
	import Separator from "./separator.svelte";

    export let parentPostID: string;

    let originalPost = postsDB.find((comment: post) => comment.id === parseInt(parentPostID));
    let comments = postsDB.filter((comment: post) => comment.parentPostID === parseInt(parentPostID));
</script>

    {#if originalPost}


        <h2>{$dictionary.repliesTo}</h2>
    
        <Post originalPost={true} likes={originalPost.likes} id={originalPost.id} name={originalPost.name} date={originalPost.date} content={originalPost.content} profilePicture={originalPost.profilePicture} img={originalPost.img} />

        <Separator height="2px" width="100%" maxWidth="700px" margin="2em 0" />

        {#if comments.length > 0}

            {#each comments as post}
                            
                <Post id={post.id} likes={post.likes} comments={post.comments} name={post.name} date={post.date} content={post.content} profilePicture={post.profilePicture} img={post.img} />

            {/each}

        {:else}

            <h3>{$dictionary.thisPostDoesNotHaveAnyReplies}</h3>

        {/if}


    {:else}


        <p>{$dictionary.error}</p>


    {/if}

<style>

    h2 {
        width: 100%;
        max-width: 700px;
    }

    h3 {
        font-size: 1.2rem;
        font-weight: normal;
    }

</style>