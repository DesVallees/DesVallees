<script lang="ts">
	import { page } from "$app/stores";
	import { dictionary } from "../stores";
	import BackgroundCircle from "./backgroundCircle.svelte";
	import ChangeLanguage from "./changeLanguage.svelte";
	import SNav from "./sNav.svelte";

    let active : boolean = false;
</script>


<nav>
    <BackgroundCircle color="var(--contentTransparent)"/>
    
    <button id="snavToggle" class="s" on:click={() => active = !active} aria-label="{$dictionary.siteNavigation}">
        <ion-icon name="menu-outline"></ion-icon>
    </button>
    
    <div class="s">
        <ChangeLanguage />
    </div>

    <a class="x" href="/ccs" aria-label={$dictionary.inicio}>
        <img class="logo" src="/images/ccs/CCSlogoTransparent.webp" alt="CCS Logo">
    </a>
    
    <section id="xnav" class="x">
        <a href="/ccs" class="link {$page.url.pathname === '/ccs' ? 'active' : ''}">{$dictionary.inicio}</a>
        <a href="/ccs/acerca" class="link {$page.url.pathname === '/ccs/acerca' ? 'active' : ''}">{$dictionary.acercaDeNosotros}</a>
        <a href="/ccs/contactanos" class="link {$page.url.pathname === '/ccs/contactanos' ? 'active' : ''}">{$dictionary.contactanos}</a>
        
        <ChangeLanguage />
    </section>
</nav>

<SNav bind:active/>

<style>
    nav {
        width: 100%;
        height: 100%;
        padding: 20px 100px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .s{
        display: none;
    }

    #xnav {
        display: flex;
        align-items: center;
        gap: 2.5em;
    }

    #snavToggle {
        border-radius: 50px;
        padding: .4em .5em;

        background-color: transparent;
        transition: background-color .2s;
    }

    #snavToggle:hover {
        background-color: rgba(240, 248, 255, 0.1);
    }

    #snavToggle ion-icon {
        font-size: 2.5rem;
        transform: translateY(1px);
    }

    .link {
        font-size: 1.15rem;
    }

    .logo {
        height: 35px;
        width: auto;

        margin: 0 2em;
        -webkit-user-drag: none;
    }
    
    @media screen and (max-width: 1200px){
        nav {
            padding: 20px 50px 20px 20px;
        }

        .logo {
            height: 32px;
        }
    }

    @media screen and (max-width: 900px){
        .x {
            display: none !important;
        }

        .s {
            display: block;
        }
    }

    @media screen and (max-width: 500px){
        nav{
            padding: 10px 30px;
        }

        #snavToggle ion-icon {
            font-size: 2.2rem;
        }
    }

</style>