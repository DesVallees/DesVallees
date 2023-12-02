<script lang="ts">
	import LogOut from "../components/logOut.svelte";
	import Profile from "../components/profile.svelte";
	import Separator from "../components/separator.svelte";
	import { dictionary, profile } from "../stores";

	export let data;
</script>

<svelte:head>
    <title>{$profile.fullName || $dictionary.profile }</title>
</svelte:head>

<div class="profile">
    <Profile profile={$profile}/>
    <Separator width="100%" maxWidth="750px" height="1px" margin="3em" />
    <LogOut msalConfig={data.msalConfig} style="display:flex" />
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