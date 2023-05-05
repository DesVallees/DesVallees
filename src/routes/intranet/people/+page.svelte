<script lang="ts">

	import { fade } from "svelte/transition";
	import TeamHeader from "../components/teamHeader.svelte";
	import Person from "../components/person.svelte";
    import Select from "../components/select.svelte";
	import { dictionary, profile } from "../stores";
	import { profileDB } from "../futureDB";
	import NewPost from "../components/newPost.svelte";

    let optionSelectedIndex:number;

    let newMessage: boolean = false;
    let messageReceiverID: string;

    function privateMessage(id: string) {
        messageReceiverID = id
        newMessage = !newMessage
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

            {:else}

            <Person on:sendMessage={() => privateMessage("3")} id="3" name="Taylor Nguyen" jobTitle="Web Designer" profilePicture="https://media.istockphoto.com/id/1338767515/photo/proud-african-woman-smiling-profile-of-successful-businesswoman-in-red-suit-excited-touching.jpg?s=612x612&w=0&k=20&c=51pi7rGUJps8sfEWtNDfKVw3rHxE_qCNkEFcUXyZ9cI=" />

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

</style>