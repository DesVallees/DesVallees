<script lang="ts">
	import Profile from "../../components/profile.svelte";
	import { dictionary } from "../../stores";
	import type { PageData } from "./$types";

    export let data: PageData
    $: ({ profile } = data)

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