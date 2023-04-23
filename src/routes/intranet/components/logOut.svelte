<script lang="ts">
	import { PublicClientApplication } from "@azure/msal-browser";
	import { PUBLIC_AUTHORITY, PUBLIC_CLIENTID, PUBLIC_CLIENTSECRET, PUBLIC_REDIRECTURI } from "$env/static/public";
	import { username } from "../stores";


    const msalConfig = {
        auth: {
            clientId: PUBLIC_CLIENTID,
            authority: PUBLIC_AUTHORITY,
            redirectUri: PUBLIC_REDIRECTURI,
            clientSecret: PUBLIC_CLIENTSECRET
        },
        cache: {
            cacheLocation: "localStorage",
            storeAuthStateInCookie: false,
        },
    };

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

<button on:click={logOut}>Log Out</button>