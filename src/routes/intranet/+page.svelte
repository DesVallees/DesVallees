<script lang="ts">
    import { PublicClientApplication, InteractionRequiredAuthError } from "@azure/msal-browser";
	import Threlte from "./components/threlte.svelte";
	import LogIn from "./components/logIn.svelte";
	import { dictionary, sleep, username } from "./stores";
	import SetUp from "./components/setUp.svelte";
	import Typewriter from "./components/typewriter.svelte";
	import { onMount } from "svelte";
	import { fade, scale } from "svelte/transition";
	import BackgroundCircle from "./components/backgroundCircle.svelte";
	import LogOut from "./components/logOut.svelte";

    export let data;
    
    const loginRequest = {
        scopes: ["User.Read"]
    };

    const graphConfig = {
        graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
    };


    
    const myMSALObj = new PublicClientApplication(data.msalConfig);
    
    function selectAccount() {
        const currentAccounts = myMSALObj.getAllAccounts();
        if (currentAccounts.length === 0) {
            return;
        } else if (currentAccounts.length > 1) {
            console.warn("Multiple accounts detected.")
        } else if (currentAccounts.length === 1) {
            $username = currentAccounts[0].username;
        }
    }

    async function getTokenPopup(request:any) {
        request.account = myMSALObj.getAccountByUsername($username);
    
        return myMSALObj.acquireTokenSilent(request)
            .catch(error => {
                console.warn("silent token acquisition fails. acquiring token using popup");
                if (error instanceof InteractionRequiredAuthError) {
                    return myMSALObj.acquireTokenPopup(request)
                        .then(tokenResponse => {
                            console.log(tokenResponse);
                            return tokenResponse;
                        }).catch(error => {
                            console.error(error);
                        });
                } else {
                    console.warn(error);   
                }
        });
    }

    function callMSGraph(endpoint: RequestInfo | URL, token: string, callback: (arg0: any) => any) {
        const headers = new Headers();
        const bearer = `Bearer ${token}`;

        headers.append("Authorization", bearer);

        const options = {
            method: "GET",
            headers: headers
        };

        fetch(endpoint, options)
            .then(response => response.json())
            .then(response => callback(response))
            .catch(error => console.log(error));
    }

    function seeProfile() {
        getTokenPopup(loginRequest)
            .then(response => {
                if (response) {
                    callMSGraph(graphConfig.graphMeEndpoint, response.accessToken, updateUI);
                }
            }).catch(error => {
                console.error(error);
            });
    }

    selectAccount();

    function updateUI(data: any) {
        const important = {
            fullName: data.displayName,
            firstName: data.givenName,
            id: data.id,
            jobTitle: data.jobTitle,
            mail: data.mail,
            mobilePhone: data.mobilePhone,
            officeLocation: data.officeLocation,
            preferredLanguage: data.preferredLanguage,
            surname: data.surname,
            userPrincipalName: data.userPrincipalName,
            businessPhones: data.businessPhones,
        }
    }

    const introDuration:number = 1000;
    let ready:boolean = false;

    onMount(() => ready = true);

</script>


{#if ready}

    {#if $username}

        <button on:click={seeProfile}>See Profile</button>
        <LogOut msalConfig={data.msalConfig} />

        {:else}

        <div>

            <h1 in:fade={{duration: introDuration}}>{$dictionary.cantoLegalIntranet}</h1>
            <Typewriter 
                basePhrase={$dictionary.thePlaceWhereYouCanFind} 
                phrase={$dictionary.subtitlePhrases} 
                delay={500} 
                duration={introDuration}
                style="height: 6rem; overflow: hidden; text-overflow: ellipsis;"
                typingSpeed={70}
            />

            <section>
                <LogIn delay={1000} duration={introDuration} msalConfig={data.msalConfig}/>
                <a in:fade={{delay: 1500, duration:introDuration}} class="button ghost" target="_blank" href="https://cantolegal.com/en/">{$dictionary.goToOurWebsite}</a>
            </section>
            
        </div>
        
        <Threlte modelName="balance" delay={1000} duration={introDuration} width={500}/>

    {/if}

{:else}

    <SetUp />

{/if}

<BackgroundCircle />
<BackgroundCircle color="#A2B9B930" coordinates={{left: '1500px', top: '500px'}} />

<style>
    div {
        display: grid;
        gap: 1em;
        padding-bottom: 2em;
    }

    section {
        display: flex;
        gap: 2em;
        flex-wrap: wrap;
    }
</style>