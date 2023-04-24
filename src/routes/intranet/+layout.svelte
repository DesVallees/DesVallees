<script lang="ts">
    import './app.css'
    import { Toaster } from 'svelte-french-toast';
	import { dictionary, language, profile, sleep, username, section } from './stores';
	import Logo from './components/logo.svelte';
	import ChangeLanguage from './components/changeLanguage.svelte';
	import BackgroundCircle from './components/backgroundCircle.svelte';
	import Avatar from './components/avatar.svelte';
	import Separator from './components/separator.svelte';
	import { fade } from 'svelte/transition';

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

</script>

<svelte:head>
    <title>{$dictionary.cantoLegalIntranet}</title>
    <link rel="icon" href="https://cantolegal.com/wp-content/uploads/2019/10/cropped-android-chrome-256x256-32x32.png"/>
</svelte:head>

<Toaster/>


<div class:disappearAndAppear>
    <nav>
        <a href="/intranet">
            <Logo scale={.8} />
        </a>
        {#if $profile}
            <section in:fade>
                <button class="link {$section === 'home' ? 'active' : ''}" on:click={() => $section = 'home'}>{$dictionary.home}</button>
                <button class="link {$section === 'people' ? 'active' : ''}" on:click={() => $section = 'people'}>{$dictionary.people}</button>
                <button class="link {$section === 'general' ? 'active' : ''}" on:click={() => $section = 'general'}>{$dictionary.generalInformation}</button>
                <Avatar image={$profile.profilePicture} ariaLabel={$dictionary.profile} />
                <Separator orientation="vertical" margin="0 -0rem"/>
                <ChangeLanguage style="font-size: 1.1rem;"/>
            </section>

            {:else}

            <ChangeLanguage />

        {/if}
    </nav>

    <main>
        <slot/>
    </main>

    <footer>
        {$dictionary.copyright} © {year} • {$dictionary.lawOfficeOfKatherineCanto}
    </footer>

    <BackgroundCircle />
    <BackgroundCircle color="#A2B9B930" coordinates={{left: '1500px', top: '500px'}} />
</div>

<style>

    div {
        min-height: 100%;
        display: grid;
        grid-template-rows: auto 1fr auto;
        align-items: center;
    }

    nav{
        display: flex;
        justify-content: space-between;
        padding-top: 20px;
        flex-wrap: wrap; 
        gap: 20px;
        height: fit-content;
        margin-bottom: 100px;
        position: sticky;
        top: 0;
        background-color: transparent;
        backdrop-filter: blur(10px);
    }

    section {
        width: fit-content;
        height: fit-content;
        display: flex;
        gap: 4rem;
        margin-top: 10px;
    }

    button{
        font-size: 1.1rem;
    }

    
    main{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 100%;
    }

    footer {
        height: 200px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 100px;
    }

    @media only screen and (max-width: 1024px) {
        main{
            flex-direction: column;
        }
    }

    .disappearAndAppear {
        animation: disappearAndAppear 1s;
    }

    @keyframes disappearAndAppear {
        0% {opacity: 0;}
        100% {opacity: 1;}
    }

</style>