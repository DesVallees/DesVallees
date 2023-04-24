<script lang="ts">
    import { InteractionRequiredAuthError, PublicClientApplication } from "@azure/msal-browser";
	import Threlte from "./components/threlte.svelte";
	import LogIn from "./components/logIn.svelte";
	import { dictionary, profile, username, section } from "./stores";
	import SetUp from "./components/setUp.svelte";
	import Typewriter from "./components/typewriter.svelte";
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";
	import LogOut from "./components/logOut.svelte";
	import Article from "./components/article.svelte";
	import Person from "./components/person.svelte";

    export let data;

    let body: HTMLBodyElement;
    $: $section, body ? body.scrollTop = 0 : '';

    const myMSALObj = new PublicClientApplication(data.msalConfig);

    const loginRequest = {
        scopes: ["User.Read"]
    };
    
    const currentAccounts = myMSALObj.getAllAccounts();
    if (currentAccounts.length > 1) {
        console.warn("Multiple accounts detected.")
    } else if (currentAccounts.length === 1) {
        $username = currentAccounts[0].username;
    }

    $: $username, getProfileInfo();

    function getProfileInfo () {
        if ($username) {
            getTokenPopup(loginRequest)
                .then(response => {
                    if (response) {
                        callMSGraph(graphMeEndpoint, response.accessToken, setProfile);
                    }
                }).catch(error => {
                    console.error(error);
                })
        }
    }

    const graphMeEndpoint:string = "https://graph.microsoft.com/v1.0/me"

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

    function setProfile(data: any) {
        $profile = {
            fullName: data.displayName,
            firstName: data.givenName,
            id: data.id,
            jobTitle: data.jobTitle || $dictionary.cantoLegalEmployee,
            mail: data.mail,
            mobilePhone: data.mobilePhone,
            officeLocation: data.officeLocation,
            preferredLanguage: data.preferredLanguage,
            surname: data.surname,
            userPrincipalName: data.userPrincipalName,
            businessPhones: data.businessPhones,
            profilePicture: letterToAvatarUrl(data.givenName.substring(0,1)),
            state: $dictionary.defaultState
        }
    }

    function letterToAvatarUrl(letter: string): string {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        canvas.width = 100;
        canvas.height = 100;

        if (!context) {
            return ''
        }

        context.fillStyle = '#D44508';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.font = 'bold 50px Outfit';
        context.fillStyle = '#F7F7FF';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(letter.toUpperCase(), canvas.width / 2, canvas.height / 2);

        const imageDataUrl = canvas.toDataURL();

        return imageDataUrl;
    }

    const introDuration:number = 1000;
    let ready:boolean = false;

    onMount(() => ready = true);

</script>

<svelte:body bind:this={body} />

{#if ready}

    {#if $username}

        {#if $section === 'general'}
            
            <div class="general" in:fade>

                <Article title={$dictionary.subtitlePhrases[1]} author="Canto Legal" profilePicture="https://clappforms.web.app/favicon-32x32.png" content={$dictionary.articles.policies}/>

            </div>

            {:else if $section === 'people'}

            <div class="people" in:fade>

                {#if $profile}
                    {#each Array(20) as i}
                        <Person name={$profile.fullName} profilePicture={$profile.profilePicture} jobTitle={$profile.jobTitle} state={$profile.state}/>
                    {/each}
                {/if}

            </div>

            {:else if $section === 'home'}

            <div class="general">
                <LogOut msalConfig={data.msalConfig} style="display:flex" />
            </div>

        {/if}

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

<style>
    div {
        display: flex;
        flex-direction: column;
        gap: 1em;
        padding-bottom: 2em;
    }
    
    section {
        display: flex;
        gap: 2em;
        flex-wrap: wrap;
    }
    
    .general {
        justify-content: center;
        align-items: center;
        width: 100%;
        padding-bottom: 0;
    }

    .people{
        align-items: center;
        height: 100%;
        width: 100%;
        padding-bottom: 0;
    }
</style>