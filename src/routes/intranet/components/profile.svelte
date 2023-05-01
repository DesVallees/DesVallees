<script lang="ts">
	import { dictionary, type Profile } from "../stores";
	import Avatar from "./avatar.svelte";
	import ProfileDatum from "./profileDatum.svelte";
	import Separator from "./separator.svelte";

    export let profile:Profile;

    let icons:{[key: string]: any} = {
        'jobTitle': 'briefcase',
        'department': 'briefcase',
        'mail': 'mail-open',
        'mobilePhone': 'call',
        'officeLocation': 'location',
        'preferredLanguage': 'people',
        'birthday': 'briefcase',
    }
</script>

<div>
    <Avatar image={profile.profilePicture}  width="10em" />
    <h2>{profile.fullName || $dictionary.unknown}</h2>
    
    <Separator width="100%" maxWidth="750px" height="1px" margin="3em" />

    <div class="data">
        {#each Object.entries(profile) as [key, value]}
            {#if icons[key]}
                
                <ProfileDatum {key} value={key === 'jobTitle' ? value || $dictionary.cantoLegalEmployee : value } icon={icons[key]} />

            {/if}
        {/each}
    </div>

</div>

<style>
    div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        row-gap: 1em;
        width: 100%;
    }

    h2 {
        margin-top: .7em;
        font-size: 1.6rem;
    }

    .data {
        flex-direction: row;
        flex-wrap: wrap;
        align-items: baseline;
        width: 100%;
        max-width: 700px;
        row-gap: 2.5em;
        column-gap: 5em;
    }
</style>