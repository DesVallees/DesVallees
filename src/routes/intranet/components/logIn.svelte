<script lang="ts">
	import { PublicClientApplication, type Configuration } from "@azure/msal-browser";
	import { dictionary, username } from "../stores";
	import { fade } from "svelte/transition";
	import toast from "svelte-french-toast";

    export let delay:number = 0;
    export let duration:number | undefined = undefined;


    export let msalConfig:Configuration;

    const myMSALObj = new PublicClientApplication(msalConfig);
    
    const loginRequest = {
        scopes: ["User.Read"]
    };
    
    async function logIn() {
        myMSALObj.loginPopup(loginRequest)
            .then(handleResponse)
            .catch(error => {
                toast.error($dictionary.error)
                console.error(error);
            });
    }
    
    function handleResponse(response:any) {
        if (response) {
            myMSALObj.setActiveAccount(response.account);
            $username = response.account.username;
        }
    }

</script>

<button class="button" in:fade={{delay: delay, duration: duration}} on:click={logIn}>{$dictionary.logInWithMicrosoft}</button>