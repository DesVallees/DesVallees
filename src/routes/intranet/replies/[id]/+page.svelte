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

            <Post originalPost={true} id={originalPost.id} visibility={originalPost.visibility} likes={originalPost.likes} comments={originalPost.comments} profileId={originalPost.profileId} date={originalPost.date} content={originalPost.content} img={originalPost.img || undefined} name={profiles.find((profile) => profile.id === originalPost?.profileId)?.fullName} profilePicture={profiles.find((profile) => profile.id === originalPost?.profileId)?.profilePicture} />

            <Separator height="2px" width="100%" maxWidth="700px" margin="2em 0" />

            {#if comments.length > 0}
                
                {#key comments}
                    
                    {#each comments as post}
                                    
                        <Post id={post.id} visibility={post.visibility} likes={post.likes} comments={post.comments} profileId={post.profileId} date={post.date} content={post.content} img={post.img || undefined} name={profiles.find((profile) => profile.id === post?.profileId)?.fullName} profilePicture={profiles.find((profile) => profile.id === post?.profileId)?.profilePicture} />

                    {/each}

                {/key}

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
        gap: 2em;
        width: 100%;
        max-width: 1000px;
        align-items: center;
    }

    h2 {
        width: 100%;
        max-width: 700px;
    }

    h3 {
        font-size: 1.2rem;
        font-weight: normal;
    }
    
</style>