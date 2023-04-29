<script lang="ts">
	import { fade } from "svelte/transition";
	import Post from "./components/post.svelte";
	import NewPost from "./components/newPost.svelte";
	import { postsDB } from "./futureDB";
</script>

<NewPost />
                    
<div class="home" in:fade>

    {#each postsDB.filter((comment) => comment.parentPostID === undefined) as post}
        
        <Post id={post.id} likes={post.likes} comments={post.comments} name={post.name} date={post.date} content={post.content} profilePicture={post.profilePicture} img={post.img} />

    {/each}

</div>

<style>    
    .home {
        display: flex;
        flex-direction: column;
        gap: 1em;
        padding-bottom: 2em;
        padding-bottom: 0;
        gap: 2em;
        width: 100%;
        max-width: 1000px;
        align-items: center;
    }
</style>