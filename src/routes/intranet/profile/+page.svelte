<script lang="ts">
	import LogOut from "../components/logOut.svelte";
	export let data
</script>

<div class="profile">
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
    }
</style>