<script lang="ts">

	import { fade } from "svelte/transition";
	import TeamHeader from "../components/teamHeader.svelte";
	import Person from "../components/person.svelte";
    import Select from "../components/select.svelte";
	import { dictionary, type Profile } from "../stores";
	import NewPost from "../components/newPost.svelte";
	import type { PageData } from "./$types";

    let optionSelectedIndex:number = 0;

    let newMessage: boolean = false;
    let messageReceiverID: number;
    let messageReceiverName: string;

    function privateMessage(id: number, name: string) {
        messageReceiverID = id
        messageReceiverName = name
        newMessage = !newMessage
    }

    export let data: PageData
    $: ({ profiles } = data)

    let filteredPeople: any[];

    $: optionSelectedIndex, filterPeople()

    function filterPeople() {
        filteredPeople = profiles.filter((profile:Profile) => profile.department === $dictionary.teamNames[optionSelectedIndex].name)
    }

</script>

<svelte:head>
    <title>{$dictionary.people}</title>
</svelte:head>


<div class="people" in:fade|global>

    <TeamHeader />
    <Select options={$dictionary.teamNames} bind:optionSelectedIndex />
    <div class="cardsContainer">
        {#if optionSelectedIndex === 0 && profiles.length > 0}
            {#each profiles as user}
                <Person on:sendMessage={() => privateMessage(user.id, user.fullName)} id={user.id} name={user.fullName} profilePicture={user.profilePicture} jobTitle={user.jobTitle}/>
            {/each}
            
        {:else if filteredPeople.length > 0}
            
            {#each filteredPeople as user}
                <Person on:sendMessage={() => privateMessage(user.id, user.fullName)} id={user.id} name={user.fullName} profilePicture={user.profilePicture} jobTitle={user.jobTitle}/>
            {/each}

        {:else}

            <h2>{$dictionary.noPeopleToDisplay}</h2>

        {/if}
    </div>

</div>

{#if messageReceiverID}
    {#key newMessage}
        <NewPost privateReceiverID={messageReceiverID} privateReceiverName={messageReceiverName} />
    {/key}
{/if}


<style>

    div {
        display: flex;
        flex-direction: column;
        gap: 1em;
        padding-bottom: 2em;
    }
    
    .people{
        align-items: center;
        width: 100%;
        min-height: 100%;
        padding: 0 2em;
        padding-top: 100px;
    }
    
    .cardsContainer{
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        row-gap: 2em;
        column-gap: 5em;
        margin-top: 2em;
    }

    h2 {
        font-size: 1.2rem;
        color: var(--contentDim);
    }

</style>