<script lang="ts">
	import Avatar from "./avatar.svelte";
	import Separator from "./separator.svelte";

    export let name: string;
    export let profilePicture: string;
    export let jobTitle: string;
    export let state: string;
</script>

<button>
    <Avatar image={profilePicture} width="3em"/>
    <div>
        <h3>{name}</h3>
        <span>{jobTitle}</span>
        <span>{state}</span>
    </div>
</button>

<style>
    button{
        display: flex;
        align-items: start;
        gap: 1rem;
        margin-bottom: 2px;
        min-width: 1000px;
        border-radius: 20px;
        padding: 2rem 1.5rem;
        transition: all .3s;
    }

    button:hover,
    button:focus{
        background-color: rgba(0, 0, 0, 0.192);
    }

    div{
        display: flex;
        flex-direction: column;
        justify-content: baseline;
        width: fit-content;
        height: fit-content;
    }
    
    h3{
        font-size: 1.2rem;
        text-align: left;
    }

    span {
        font-size: 1rem;
        width: fit-content;
        height: fit-content;
    }
</style>