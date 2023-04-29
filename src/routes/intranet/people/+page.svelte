<script lang="ts">

	import { fade } from "svelte/transition";
	import TeamHeader from "../components/teamHeader.svelte";
	import Person from "../components/person.svelte";
    import Select from "../components/select.svelte";
	import { dictionary, profile } from "../stores";

    let optionSelectedIndex:number;

</script>


<div class="people" in:fade>

    <TeamHeader />
    <Select options={$dictionary.teamNames} bind:optionSelectedIndex />
    <div class="cardsContainer">
        {#if optionSelectedIndex === 0}
            {#each Array(2) as i}
                <Person name="Jamie Chen" jobTitle="President of Sales" profilePicture="https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80" />
                <Person name="Alex Patel" jobTitle="Receptionist" profilePicture="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg" />
                <Person name="Hanna Rodriguez" jobTitle="Marketing Coordinator" profilePicture="https://newprofilepic2.photo-cdn.net//assets/images/article/profile.jpg" />
                <Person name="Taylor Nguyen" jobTitle="Web Designer" profilePicture="https://media.istockphoto.com/id/1338767515/photo/proud-african-woman-smiling-profile-of-successful-businesswoman-in-red-suit-excited-touching.jpg?s=612x612&w=0&k=20&c=51pi7rGUJps8sfEWtNDfKVw3rHxE_qCNkEFcUXyZ9cI=" />
                <Person name="Casey Lee" jobTitle="Project Manager" profilePicture="https://writestylesonline.com/wp-content/uploads/2018/11/Three-Statistics-That-Will-Make-You-Rethink-Your-Professional-Profile-Picture.jpg" />
                <Person name="Sarah Singh" jobTitle="Account Executive" profilePicture="https://shotkit.com/wp-content/uploads/bb-plugin/cache/cool-profile-pic-matheus-ferrero-landscape.jpeg" />
                <Person name={$profile.fullName} profilePicture={$profile.profilePicture} jobTitle={$profile.jobTitle}/>
            {/each}

            {:else}

            <Person name="Taylor Nguyen" jobTitle="Web Designer" profilePicture="https://media.istockphoto.com/id/1338767515/photo/proud-african-woman-smiling-profile-of-successful-businesswoman-in-red-suit-excited-touching.jpg?s=612x612&w=0&k=20&c=51pi7rGUJps8sfEWtNDfKVw3rHxE_qCNkEFcUXyZ9cI=" />
            <Person name={$profile.fullName} profilePicture={$profile.profilePicture} jobTitle={$profile.jobTitle}/>

        {/if}
    </div>

</div>


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