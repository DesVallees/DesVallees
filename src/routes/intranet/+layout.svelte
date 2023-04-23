<script lang="ts">
    import './app.css'
    import { Toaster } from 'svelte-french-toast';
	import { dictionary, language, sleep } from './stores';
	import Logo from './components/logo.svelte';
	import ChangeLanguage from './components/changeLanguage.svelte';

    const now = new Date();
    const year = now.getFullYear();

    let divClass:string = "disappearAndAppear";
    
    $: $language, disappearAndAppear();

    async function disappearAndAppear() {
        divClass = ''
        await sleep(1)
        divClass = "disappearAndAppear"
        await sleep(2000)
        divClass = ''
    }
</script>

<svelte:head>
    <title>{$dictionary.cantoLegalIntranet}</title>
    <link rel="icon" href="https://cantolegal.com/wp-content/uploads/2019/10/cropped-android-chrome-256x256-32x32.png"/>
</svelte:head>

<Toaster/>

<div class={divClass}>
    <nav>
        <a href="/">
            <Logo scale={.8} />
        </a>
        <ChangeLanguage />
    </nav>

    <main>
        <slot/>
    </main>

    <footer>
        {$dictionary.copyright} © {year} • {$dictionary.lawOfficeOfKatherineCanto}
    </footer>
</div>

<style>

    div {
        height: 100%;
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
        height: 200px;
    }
    
    main{
        display: flex;
        align-items: center;
        justify-content: space-between;
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
        animation: disappearAndAppear 2s;
    }

    @keyframes disappearAndAppear {
        0% {opacity: 0;}
        100% {opacity: 1;}
    }

</style>