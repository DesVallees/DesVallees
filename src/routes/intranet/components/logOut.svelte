<script lang="ts">
	import { PublicClientApplication, type Configuration } from "@azure/msal-browser";
	import { dictionary, username } from "../stores";
	import { fade } from "svelte/transition";

    export let msalConfig:Configuration;

    export let delay:number = 0;
    export let duration:number | undefined = undefined;

    export let style:string = '';
    
    const myMSALObj = new PublicClientApplication(msalConfig);
    
    function logOut() {
        const logoutRequest = {
            account: myMSALObj.getAccountByUsername($username),
            postLogoutRedirectUri: msalConfig.auth.redirectUri,
            mainWindowRedirectUri: msalConfig.auth.redirectUri
        };

        myMSALObj.logoutPopup(logoutRequest);
    }
</script>

<button style={style} class="button" in:fade={{delay: delay, duration: duration}} on:click={logOut}>{$dictionary.logOut}</button>

<style>
    button {
        font-size: 1.1rem;
    }
</style>