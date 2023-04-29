<script>
	import { fade } from "svelte/transition";
	import Comments from "../../components/comments.svelte";
	import NewPost from "../../components/newPost.svelte";
	import { page } from "$app/stores";
</script>


<NewPost />
                
<div class="replies" in:fade>

    {#key $page.params.id}
        <Comments parentPostID={$page.params.id} />
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
</style>