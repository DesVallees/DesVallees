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
    
    <button id="snavToggle" class="s" on:click={() => active = !active}>
        <ion-icon name="menu-outline"></ion-icon>
    </button>
    
    <div class="s">
        <ChangeLanguage />
    </div>

    <img class="logo x" src="/images/ccs/CCSlogoTransparent.png" alt="CCS Logo">
    
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
        position: sticky;
        top: 0;
        left: 0;
        background-color: var(--mainDimer);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        width: 100%;
        height: 100%;
        padding: 20px 100px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        z-index: 2;
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
        width: 200px;
        height: auto;
    }
    
    @media screen and (max-width: 1200px){
        nav {
            padding: 20px 50px 20px 20px;
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