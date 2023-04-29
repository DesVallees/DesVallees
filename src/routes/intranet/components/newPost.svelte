<script lang="ts">
	import { slide } from "svelte/transition";

    export let active: boolean = false
</script>

{#if active === true}

    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="base" on:click={() => active = false}>
        <div class="post" transition:slide={{duration:100}}>
            <h2>New Post</h2>
        </div>
    </div>
    
    {:else}
    
    <button class="newPostButton" on:click={() => active = true}><ion-icon name="add-outline"></ion-icon></button>

{/if}


<style>
    
    .newPostButton{
        position: fixed;
        bottom: 3em;
        right: 5em;

        border-radius: 50%;
        background-color: var(--interative);
        padding: .5em;

        box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.295);

        transition: all .2s;

        z-index: 2;
    }

    .newPostButton:hover,
    .newPostButton:focus {
        padding: .7em;
    }

    .newPostButton ion-icon {
        font-size: 3rem;
    }

    .base {
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 100vh;
        padding: 20px;
        background-color: var(--mainDimer);
        backdrop-filter: blur(10px);
        z-index: 11;
    }

    .post {
        position: relative;
        display: flex;
        flex-direction: column;
        
        width: 100%;
        max-width: 700px;
        height: fit-content;
        border-radius: 20px;
        padding: 4em;
        transition: all .3s;

        color: var(--content);
        box-shadow: 0 0 5px var(--contentDim);
        background-color: var(--main);
    }

</style>