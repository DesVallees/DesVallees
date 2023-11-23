<script lang="ts">
	import { PublicClientApplication, type Configuration } from "@azure/msal-browser";
	import { dictionary, profile, username } from "../stores";
	import toast from "svelte-french-toast";
	import { fade } from "svelte/transition";

    export let delay:number = 0;
    export let duration:number | undefined = undefined;


    export let msalConfig:Configuration;

    const myMSALObj = new PublicClientApplication(msalConfig);
    
    function selectAccount() {
        const currentAccounts = myMSALObj.getAllAccounts();
        if (currentAccounts.length === 0) {
            return;
        } else if (currentAccounts.length > 1) {
            toast($dictionary.multipleAccountsDetected, {
                style: 'border-radius: 25px; background: var(--fg-200); font-size: 1.1rem; font-family: inherit; text-align: center;',
                duration: 5000
            })
            $username = currentAccounts[0].username;
        } else if (currentAccounts.length === 1) {
            $username = currentAccounts[0].username;
        }
    }
    
    function handleResponse(response:any) {
        if (response !== null) {
            $username = response.account.username;
        } else {
            selectAccount();
        }
    }

    const loginRequest = {
        scopes: ["User.Read"]
    };

    async function logIn() {
        myMSALObj.loginPopup(loginRequest)
            .then(handleResponse)
            .catch(error => {
                console.error(error);
            });
    }
</script>

<button class="button" in:fade|global={{delay: delay, duration: duration}} on:click={logIn}>{$dictionary.logInWithMicrosoft}</button>