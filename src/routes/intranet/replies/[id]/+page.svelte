<script lang="ts">
	import { fade } from "svelte/transition";
	import NewPost from "../../components/newPost.svelte";
	import { page } from "$app/stores";
	import type { PageData } from "./$types";
	import { dictionary } from "../../stores";
	import Post from "../../components/post.svelte";
	import Separator from "../../components/separator.svelte";

    export let data: PageData

    $: ({ originalPost } = data)
    $: ({ comments } = data)
    $: ({ profiles } = data)

</script>


<NewPost active={false} parentCommentPoster={profiles.find((profile) => profile.id === originalPost?.profileId)?.fullName} parentCommentId={originalPost?.id} parentCommentVisibility={originalPost?.visibility}/>
                
<div class="replies" in:fade>

    {#key $page.params.id}

        {#if originalPost}


            <h2>{$dictionary.repliesTo}</h2>

            <Post style="padding: 0 1em 2em;" originalPost={true} id={originalPost.id} visibility={originalPost.visibility} likes={originalPost.likes} comments={originalPost.comments} profileId={originalPost.profileId} date={originalPost.date} content={originalPost.content} img={originalPost.img || undefined} name={profiles.find((profile) => profile.id === originalPost?.profileId)?.fullName} profilePicture={profiles.find((profile) => profile.id === originalPost?.profileId)?.profilePicture} />

            <Separator height="0" margin="0 0 2em" />

            {#if comments.length > 0}
                
                {#each comments as post, index(post.id)}
                                
                    <Post id={post.id} visibility={post.visibility} likes={post.likes} comments={post.comments} profileId={post.profileId} date={post.date} content={post.content} img={post.img || undefined} name={profiles.find((profile) => profile.id === post?.profileId)?.fullName} profilePicture={profiles.find((profile) => profile.id === post?.profileId)?.profilePicture} />

                {/each}

            {:else}

                <h3>{$dictionary.thisPostDoesNotHaveAnyReplies}</h3>

            {/if}


        {:else}

            <p>{$dictionary.error}</p>

        {/if}

    {/key}

</div>    


<style>
    
    .replies {
        display: flex;
        flex-direction: column;
        width: 100%;
        align-items: center;
    }

    h2 {
        width: 100%;
        margin: 2em 0 .5em;
        padding: 0 1em;
    }
    
    h3 {
        font-size: 1.2rem;
        font-weight: normal;
        margin: 2em 0 .5em;
        padding: 0 1em;
        text-align: center;
    }
    
</style>