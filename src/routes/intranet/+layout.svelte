<script lang="ts">
    import './app.css'
    import { Toaster } from 'svelte-french-toast';
    import toast from 'svelte-french-toast';
    import { PublicClientApplication } from "@azure/msal-browser";
	import { dictionary, language, profile, username, showNotifications } from './stores';
	import BackgroundCircle from './components/backgroundCircle.svelte';
	import { fade } from 'svelte/transition';
	import SetUp from './components/setUp.svelte';
	import Threlte from './components/threlte.svelte';
	import Typewriter from './components/typewriter.svelte';
	import LogIn from './components/logIn.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { isGeneratedAvatarUrl, isGeneratedBlobUrl, letterToAvatarUrl, sleep } from './functions';
	import NotificationBar from './components/notificationBar.svelte';
	import FeaturedEvents from './components/featuredEvents.svelte';
	import NotificationsButton from './components/notificationsButton.svelte';
	import PrimaryNav from './components/primaryNav.svelte';
	import LandingNav from './components/landingNav.svelte';
	import Header from './components/header.svelte';

    const now = new Date();
    const year = now.getFullYear();

    let disappearAndAppear:boolean = false;
    
    $: $language, checkDisappearAndAppear();
    
    async function checkDisappearAndAppear() {
        disappearAndAppear = false
        await sleep(1)
        disappearAndAppear = true
        await sleep(2000)
        disappearAndAppear = false
    }

    // landing

    export let data;

    const myMSALObj = new PublicClientApplication(data.msalConfig);

    const loginRequest = {
        scopes: ["User.Read"]
    };
    
    const currentAccounts = myMSALObj.getAllAccounts();
    if (currentAccounts.length > 1) {
        console.warn("Multiple accounts detected.")
        toast(`Multiple accounts detected (${currentAccounts.length}). Clean browser cookies.`, {
            icon: '❗',
        });
        $username = currentAccounts[0].username;
    } else if (currentAccounts.length === 1) {
        $username = currentAccounts[0].username;
    }

    $: $username, getProfileInfo();

    function getProfileInfo () {
        if ($username) {
            getTokenPopup(loginRequest)
                .then(response => {
                    if (response) {
                        let profileInfo = callMSGraph(profileInfoEndpoint, response.accessToken);
                        let profilePicture = callMSGraph(profilePictureEndpoint, response.accessToken);
                        profileInfo.then((info: any) => {
                            profilePicture.then((picture: any) => {
                                setProfile(info, picture)
                            });
                        });
                    }
                }).catch(error => {
                    console.error(error);
                })
        }
    }

    const profileInfoEndpoint:string = "https://graph.microsoft.com/v1.0/me"
    const profilePictureEndpoint:string = "https://graph.microsoft.com/v1.0/me/photo/$value"

    async function getTokenPopup(request:any) {
        request.account = myMSALObj.getAccountByUsername($username);
    
        return myMSALObj.acquireTokenSilent(request)
            .catch(error => {
                toast.error($dictionary.errorPreviousCredentials)
                $username = ''
                throw new Error(error);
        });
    }

    async function callMSGraph(endpoint: RequestInfo | URL, token: string) : Promise<any> {
        const headers = new Headers();
        const bearer = `Bearer ${token}`;

        headers.append("Authorization", bearer);

        const options = {
            method: "GET",
            headers: headers
        };

        const response = await fetch(endpoint, options)

        if (endpoint === profileInfoEndpoint) {
            if (response.ok) {
                const data = await response.json()
                return data
            }else{
                toast.error(`Error getting profile information`)
                return ''
            }
        } 
        else {
            if (response.ok) {
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                return url;
            }
            
            return ''
        }
    }

    async function setProfile(profileInfo: any, profilePicture:any) {
        $profile = {
            id: 0,
            microsoftId: profileInfo.id,
            fullName: profileInfo.displayName || "",
            jobTitle: profileInfo.jobTitle || "",
            department: '',
            mail: profileInfo.mail || (profileInfo.userPrincipalName || ""),
            mobilePhone: profileInfo.mobilePhone || "",
            officeLocation: profileInfo.officeLocation || "",
            preferredLanguage: profileInfo.preferredLanguage || "",
            profilePicture: profilePicture || letterToAvatarUrl(profileInfo.displayName.substring(0,1)),
            birthday: '',
        }

        const response = await fetch('/api/intranet/createProfile', {
            method: 'POST',
            body: JSON.stringify($profile),
            headers: {
                'content-type': 'application/json'
            }
        });

        if (response.ok) {
            let dbProfile = await response.json()
            if (dbProfile.id) {
                $profile.id = dbProfile.id;
                $profile.department = dbProfile.department;
                $profile.birthday = dbProfile.birthday;

                // Modify when upload pictures available
                if (!isGeneratedAvatarUrl(dbProfile.profilePicture) && !isGeneratedBlobUrl(dbProfile.profilePicture)) {
                    $profile.profilePicture = dbProfile.profilePicture
                }
            }
        } else {
            console.error('Failed to create profile:', response.status);
            toast.error($dictionary.error)
        }
    }


    const introDuration:number = 1000;
    let ready:boolean = false;

    $: $page.url.pathname, goTop()
    let mainContent: HTMLElement;
    let goTop: (() => void) = () => {}

    onMount(() => {
        ready = true
        goTop = () => {
            if (document) {
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
                mainContent.scrollTop = 0
            }
        }
    });

</script>

<svelte:head>
    <title>{$dictionary.cantoLegalIntranet}</title>
    <meta name="author" content="The law office of Katherine Canto LLC">
    <meta name="description" content="The official Canto Legal's Intranet. The place where it's employees can communicate and find information about their company, department and coworkers.">
    <meta name="keywords" content="Canto Legal, Intranet">
    <link rel="icon" href="https://cantolegal.com/wp-content/uploads/2019/10/cropped-android-chrome-256x256-32x32.png" sizes="32x32">
    <link rel="icon" href="https://cantolegal.com/wp-content/uploads/2019/10/cropped-android-chrome-256x256-192x192.png" sizes="192x192">
    <link rel="apple-touch-icon" href="https://cantolegal.com/wp-content/uploads/2019/10/cropped-android-chrome-256x256-180x180.png">
</svelte:head>

<Toaster/>

{#if $showNotifications}
    <NotificationBar />
{/if}

<div class="intranet" class:disappearAndAppear class:notLandingPage={$username} class:landingPage={!$username}>

    {#if $profile}

        <div class="primaryNav">
            <PrimaryNav />
        </div>
    
    {:else}

        <LandingNav />
    
    {/if}
    
    <main bind:this={mainContent}>

        {#if ready}

            {#if $username && $profile}

                <Header />
            
                <slot/>    

                <footer>
                    {$dictionary.copyright} © {year} • {$dictionary.lawOfficeOfKatherineCanto}
                </footer>
                
            {:else if $username}

                <SetUp />

            {:else}


                <div class="landing landingDiv">

                    <div class="landing landingContent">
            
                        <h1 in:fade|global={{duration: introDuration}}>{$dictionary.cantoLegalIntranet}</h1>
                        <div class="landing landingTypewriter">
                            <Typewriter 
                                basePhrase={$dictionary.thePlaceWhereYouCanFind} 
                                phrase={$dictionary.subtitlePhrases} 
                                delay={500} 
                                duration={introDuration}
                                typingSpeed={70}
                            />
                        </div>
            
                        <div class="landing landingButtons">
                            <LogIn delay={1000} duration={introDuration} msalConfig={data.msalConfig}/>
                            <a style="text-align: center;" in:fade|global={{delay: 1000, duration:introDuration}} class="button ghost" target="_blank" href="https://cantolegal.com/en/">{$dictionary.goToOurWebsite}</a>
                        </div>
                        
                    </div>
                    
                    <Threlte modelName="balance" delay={1000} duration={introDuration} width={500}/>

                </div>


            {/if}

        {:else}

            <SetUp />

        {/if}

    </main>

    {#if $username}

        <nav class="secondaryNav">
            <NotificationsButton />
            <FeaturedEvents />
        </nav>

    {:else}
    
        <footer>
            {$dictionary.copyright} © {year} • {$dictionary.lawOfficeOfKatherineCanto}
        </footer>

    {/if}

</div>

<BackgroundCircle color="#A2B9B930" coordinates={{left: '1500px', top: '500px'}} />

<BackgroundCircle />

<style>

    .landingPage.intranet {
        min-height: 100%;
        display: grid;
        grid-template-rows: auto 1fr auto;
        align-items: center;
    }

    .landingPage main{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        padding: 0 10vw;
    }


    .notLandingPage.intranet {
        min-height: 100%;
        display: grid;
        grid-template-columns: auto 1fr auto;
        max-width: 1250px;
        margin: auto;
    }

    .notLandingPage main{
        display: grid;
        grid-template-rows: auto 1fr auto;
        width: 100%;
        min-height: 100vh;
        min-height: 100dvh;
        padding: 0 0 20px;
    }

    .secondaryNav {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        height: 100vh;
        height: 100dvh;
        width: fit-content;
        position: sticky;
        top: 0;
        padding: 20px 30px 50px;
        border-left: 1px solid var(--content);
    }

    footer {
        height: 200px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 100px 10vw 0;
        text-align: center;
    }

    .landing {
        display: flex;
        flex-direction: column;
        gap: 1em;
        padding-bottom: 2em;
    }

    .landingDiv {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding-bottom: 0;
        margin-top: 20px;
    }

    .landingTypewriter {
        min-height: 6rem; 
    }   

    .landingButtons {
        flex-direction: row;
        gap: 2em;
        flex-wrap: wrap;
    }

    .disappearAndAppear {
        animation: disappearAndAppear 1s;
    }

    @keyframes disappearAndAppear {
        0% {opacity: 0;}
        100% {opacity: 1;}
    }

    @media screen and (max-width: 1300px) {
        .secondaryNav {
            padding-left: 15px;
        }
    }
    
    @media screen and (max-width: 1150px) {
        .secondaryNav {
            display: none;
        }

        .notLandingPage.intranet {
            grid-template-columns: auto 1fr;
        }
    }

    @media screen and (max-width: 1100px) {

        main{
            padding: 0 50px;
        }

        footer {
            padding: 100px 50px 0;
        }

        .landing {
            flex-direction: column;
        }
    
        .landingContent {
            width: 100%;
        }
        
        h1 {
            line-height: 60px;
            font-size: 3.5rem;
            margin-bottom: .2em;
        }
    }

    @media screen and (max-width:850px) {
        .primaryNav {
            display: none;
        }

        .notLandingPage.intranet {
            grid-template-columns: 1fr;
        }
    }

    @media screen and (max-width: 500px) {
        main{
            padding: 0 20px;
        }

        footer {
            padding: 100px 3em 0;
        }

        .landingTypewriter {
            min-height: 9rem;
        }
    }

</style>