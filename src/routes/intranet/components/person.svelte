<script lang="ts">
	import { fade } from "svelte/transition";
	import { dictionary } from "../stores";
	import Avatar from "./avatar.svelte";
	import { createEventDispatcher } from "svelte";

    export let id: number;
    export let name: string;
    export let profilePicture: string;
    export let jobTitle: string;

    const dispatch = createEventDispatcher();
</script>

<div in:fade|global>
    <Avatar personName={name} image={profilePicture} width="5em"/>
    <h3>{name}</h3>
    <h4>{jobTitle || $dictionary.cantoLegalEmployee}</h4>
    <a class="invisible" href="/intranet/profile/{id}">{$dictionary.seeProfile}</a>
    <button class="fill" on:click={() => dispatch('sendMessage')}>{$dictionary.sendAMessage}</button>
</div>

<style>
    div{
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        width: 270px;
        height: 350px;
        padding: 1rem;
        border-radius: 20px;
        transition: all .3s;

        border: 1px solid var(--content);
        color: var(--content);
        box-shadow: 0 0 5px var(--contentDim);
        background-color: rgba(0, 0, 0, 0.15);

        cursor: pointer;
    }
    
    div:hover,
    div:focus-within{
        background-color: rgba(0, 0, 0, 0.5);
    }
    
    h3{
        font-size: 1.2rem;
        margin-top: 2em;
        text-align: center;
        max-width: 100%;
        height: fit-content;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    h4 {
        font-size: .9rem;
        color: var(--contentDim);
        margin-top: .8em;
        text-align: center;
        max-width: 100%;
        height: fit-content;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    button {
        border-radius: 10px;
        font-style: normal;

        width: fit-content;
        height: fit-content;
        
        transition: all .2s;
        box-shadow: 0 0 3px var(--interativeDim);
    }
    
    button:hover,
    button:focus {
        box-shadow: 0 0 20px var(--interativeDim);
    }
    
    .fill{
        font-size: 1rem;
        margin-top: 3em;
        color: var(--content);
        background-color: var(--interative);
        padding: 0.4rem 1.5rem;
        z-index: 2;
        white-space: nowrap;
    }
    
    .invisible {
        z-index: 1;
        position: absolute;
        opacity: 0;
        width: 100%;
        height: 100%;
    }
</style>