<script lang="ts">
	import LogOut from "../components/logOut.svelte";
	import Profile from "../components/profile.svelte";
	import Separator from "../components/separator.svelte";
	import { profile } from "../stores";

	export let data;
</script>

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
        width: 100%;
        margin-top: 50px;
    }
</style>