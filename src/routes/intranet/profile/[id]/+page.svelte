<script lang="ts">
	import { page } from "$app/stores";
	import Profile from "../../components/profile.svelte";
	import { profileDB } from "../../futureDB";
	import { dictionary, type Profile as ProfileType } from "../../stores";

    let profile = profileDB.find((profile: ProfileType) => profile.id === $page.params.id);
</script>

<div class="profile">
    {#if profile}

        <Profile profile={profile}/>

    {:else}

        <p>{$dictionary.error}</p>

    {/if}
</div>

<style>
    .profile {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1em;
        width: 100%;
        margin-top: 50px;
    }
</style>