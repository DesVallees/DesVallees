<script lang="ts">
    import './app.css'
    import { Toaster } from 'svelte-french-toast';
    import { InteractionRequiredAuthError, PublicClientApplication } from "@azure/msal-browser";
	import { dictionary, language, profile, sleep, username } from './stores';
	import Logo from './components/logo.svelte';
	import ChangeLanguage from './components/changeLanguage.svelte';
	import BackgroundCircle from './components/backgroundCircle.svelte';
	import Avatar from './components/avatar.svelte';
	import Separator from './components/separator.svelte';
	import { fade } from 'svelte/transition';
	import SetUp from './components/setUp.svelte';
	import Threlte from './components/threlte.svelte';
	import Typewriter from './components/typewriter.svelte';
	import LogIn from './components/logIn.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

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
            const data = await response.json()
            return data
        } 
        else {
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            return url;
        }
    }

    async function setProfile(profileInfo: any, profilePicture:any) {
        $profile = {
            fullName: profileInfo.displayName,
            id: profileInfo.id,
            jobTitle: profileInfo.jobTitle,
            department: '',
            mail: profileInfo.mail,
            mobilePhone: profileInfo.mobilePhone,
            officeLocation: profileInfo.officeLocation,
            preferredLanguage: profileInfo.preferredLanguage,
            profilePicture: profilePicture || letterToAvatarUrl(profileInfo.displayName.substring(0,1)),
            birthday: '',
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

    $: $page.url.pathname, goTop()
    let goTop: (() => void) = () => {}

    onMount(() => {
        ready = true
        goTop = () => {
            if (document) {
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            }
        }
    });

</script>

<svelte:head>
    <title>{$dictionary.cantoLegalIntranet}</title>
    <link rel="icon" href="https://cantolegal.com/wp-content/uploads/2019/10/cropped-android-chrome-256x256-32x32.png" sizes="32x32">
    <link rel="icon" href="https://cantolegal.com/wp-content/uploads/2019/10/cropped-android-chrome-256x256-192x192.png" sizes="192x192">
    <link rel="apple-touch-icon" href="https://cantolegal.com/wp-content/uploads/2019/10/cropped-android-chrome-256x256-180x180.png">
</svelte:head>

<Toaster/>

<div class="intranet" class:disappearAndAppear>

    <nav>
        <a class="logo" href="/intranet" class:logoNotLanding={$username}>
            <Logo scale={.8} />
        </a>

        {#if $profile}
        
            <section in:fade>
                <a href="/intranet" class="headerLink link {$page.url.pathname === '/intranet' ? 'active' : ''}">{$dictionary.home}</a>
                <a href="/intranet/people" class="headerLink link {$page.url.pathname === '/intranet/people' ? 'active' : ''}">{$dictionary.people}</a>
                <a href="/intranet/general" class="headerLink link {$page.url.pathname === '/intranet/general' ? 'active' : ''}">{$dictionary.generalInformation}</a>
                <Avatar image={$profile.profilePicture} ariaLabel={$dictionary.profile} href="/intranet/profile" />
                <Separator width="1px" height="35px"/>
                <ChangeLanguage style="font-size: 1.1rem;"/>
            </section>

            {:else}

            <ChangeLanguage />

        {/if}

        <BackgroundCircle />
    </nav>
    

    <main>

        {#if ready}

            {#if $username && $profile}

                <slot/>    
                
            {:else if $username}

                <SetUp />

            {:else}


                <div class="landing landingDiv">

                    <div class="landing landingContent">
            
                        <h1 in:fade={{duration: introDuration}}>{$dictionary.cantoLegalIntranet}</h1>
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
                            <a style="text-align: center;" in:fade={{delay: 1000, duration:introDuration}} class="button ghost" target="_blank" href="https://cantolegal.com/en/">{$dictionary.goToOurWebsite}</a>
                        </div>
                        
                    </div>
                    
                    <Threlte modelName="balance" delay={1000} duration={introDuration} width={500}/>

                </div>


            {/if}

        {:else}

            <SetUp />

        {/if}

    </main>


    <footer>
        {$dictionary.copyright} © {year} • {$dictionary.lawOfficeOfKatherineCanto}
    </footer>

    <BackgroundCircle color="#A2B9B930" coordinates={{left: '1500px', top: '500px'}} />


</div>

<style>

    .intranet {
        min-height: 100%;
        display: grid;
        grid-template-rows: auto 1fr auto;
        align-items: center;
    }

    nav{
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
        height: fit-content;
        margin-bottom: 20px;
        position: sticky;
        top: 0;
        z-index: 10;
        padding: 20px 10vw;
        background-color: var(--mainDimer);
        width: 100%;
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
    }

    section {
        width: fit-content;
        height: fit-content;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 1rem 4rem;
        margin-top: 10px;
    }

    .headerLink{
        font-size: 1.1rem;
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

    
    main{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        padding: 0 10vw;
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

    .disappearAndAppear {
        animation: disappearAndAppear 1s;
    }

    @keyframes disappearAndAppear {
        0% {opacity: 0;}
        100% {opacity: 1;}
    }

    @media screen and (max-width: 1100px) {
        main{
            padding: 0 50px;
        }

        nav {
            padding: 20px 50px;
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

    @media screen and (max-width: 500px) {
        main{
            padding: 0 20px;
        }

        nav {
            padding: 20px 20px;
        }

        footer {
            padding: 100px 20px 0;
        }

        .logoNotLanding {
            display: none;
        }
        .landingTypewriter {
            min-height: 9rem;
        }
    }

</style>