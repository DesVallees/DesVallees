<script lang="ts">
	import { PublicClientApplication, type Configuration } from "@azure/msal-browser";
	import { dictionary } from "../stores";
	import toast from "svelte-french-toast";

    export let style:string = '';
    
    export let msalConfig:Configuration;
    
    const myMSALObj = new PublicClientApplication(msalConfig);
    
    const logoutRequest = {
        postLogoutRedirectUri: msalConfig.auth.redirectUri,
        mainWindowRedirectUri: msalConfig.auth.redirectUri
    };

    function logOut() {
        myMSALObj.logoutPopup(logoutRequest)
            .catch(error => {
                toast.error($dictionary.error)
                console.error(error);
            });
    }

</script>

<button style={style} class="button" on:click={logOut}>{$dictionary.logOut}</button>

<style>
    button {
        font-size: 1.1rem;
    }
</style>