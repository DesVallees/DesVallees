<script lang="ts">

	import { fade } from "svelte/transition";
	import TeamHeader from "../components/teamHeader.svelte";
	import Person from "../components/person.svelte";
    import Select from "../components/select.svelte";
	import { dictionary, type Profile as ProfileType } from "../stores";
	import { profileDB } from "../futureDB";
	import NewPost from "../components/newPost.svelte";

    let optionSelectedIndex:number;

    let newMessage: boolean = false;
    let messageReceiverID: string;

    function privateMessage(id: string) {
        messageReceiverID = id
        newMessage = !newMessage
    }

    let filteredPeople: ProfileType[];

    $: optionSelectedIndex, filterPeople()

    function filterPeople() {
        filteredPeople = profileDB.filter((profile: ProfileType) => profile.department === $dictionary.teamNames[optionSelectedIndex])
    }

</script>


<div class="people" in:fade>

    <TeamHeader />
    <Select options={$dictionary.teamNames} bind:optionSelectedIndex />
    <div class="cardsContainer">
        {#if optionSelectedIndex === 0}
            {#each profileDB as user}
                <Person on:sendMessage={() => privateMessage(user.id)} id={user.id} name={user.fullName} profilePicture={user.profilePicture} jobTitle={user.jobTitle}/>
            {/each}
            
        {:else if filteredPeople.length > 0}
            
            {#each filteredPeople as user}
                <Person on:sendMessage={() => privateMessage(user.id)} id={user.id} name={user.fullName} profilePicture={user.profilePicture} jobTitle={user.jobTitle}/>
            {/each}

        {:else}

            <h2>{$dictionary.noPeopleToDisplay}</h2>

        {/if}
    </div>

</div>

{#if messageReceiverID}
    {#key newMessage}
        <NewPost privateReceiverID={messageReceiverID} />
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
        height: 100%;
        width: 100%;
        padding-bottom: 0em;
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
        margin: 2em 0;
        font-size: 1.2rem;
        color: var(--contentDim);
    }

</style>