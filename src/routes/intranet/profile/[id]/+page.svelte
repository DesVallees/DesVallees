<script lang="ts">
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";
	import Profile from "../../components/profile.svelte";
	import { dictionary, profile as storeProfile } from "../../stores";
	import type { PageData } from "./$types";

    export let data: PageData
    $: ({ profile } = data)

    onMount(() => {
        if (profile?.id === $storeProfile.id) {
            goto('/intranet/profile')
        }
    })

</script>

<svelte:head>
    <title>{profile?.fullName || $dictionary.profile}</title>
</svelte:head>

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
        width: 90%;
        margin: auto;
        margin-top: 100px;
    }
</style>