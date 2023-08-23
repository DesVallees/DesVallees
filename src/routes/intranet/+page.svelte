<script lang="ts">
	import { fade } from "svelte/transition";
	import Post from "./components/post.svelte";
	import NewPost from "./components/newPost.svelte";
	import { dictionary } from "./stores";
	import type { PageData } from "./$types";
	import PostsHeader from "./components/postsHeader.svelte";

    export let data: PageData

    $: ({ posts } = data)
    $: ({ profiles } = data)

</script>

<NewPost />
                    
<div class="home" in:fade>

    <PostsHeader />

    {#if posts.length > 0}

        {#each posts as post, index(post.id)}
            
            <Post id={post.id} visibility={post.visibility} likes={post.likes} comments={post.comments} profileId={post.profileId} date={post.date} content={post.content} img={post.img || undefined} name={profiles.find((profile) => profile.id === post.profileId)?.fullName} profilePicture={profiles.find((profile) => profile.id === post.profileId)?.profilePicture} />

        {/each}
        
    {:else}
        <div class="welcome">
            <ion-icon name="chatbubbles"></ion-icon>
            <h3>{$dictionary.noPostsToShow}</h3>
        </div>
    {/if}

</div>

<style>    
    .home {
        display: flex;
        flex-direction: column;
        padding-bottom: 0;
        width: 100%;
        align-items: center;
    }

    .welcome {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        user-select: none;
        gap: 2em;
    }
    
    .welcome ion-icon {
        font-size: 4rem;
    }

    .welcome h3 {
        font-size: 1.2rem;
    }

    @media screen and (max-width: 700px) {
        .home {
            gap: 1em;
        }
    }
</style>