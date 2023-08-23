<script lang="ts">
	import { page } from "$app/stores";
	import { dictionary } from "../stores";
	import BackgroundCircle from "./backgroundCircle.svelte";
	import ChangeLanguage from "./changeLanguage.svelte";


</script>


<div>
    <BackgroundCircle color="var(--contentTransparent)"/>

    <img class="logo" src="/images/ccs/CCSlogoTransparent.png" alt="logo">
    
    <section>
        <a href="/ccs" class="link {$page.url.pathname === '/ccs' ? 'active' : ''}">{$dictionary.inicio}</a>
        <a href="/ccs/acerca" class="link {$page.url.pathname === '/ccs/acerca' ? 'active' : ''}">{$dictionary.acercaDeNosotros}</a>
        <a href="/ccs/contactanos" class="link {$page.url.pathname === '/ccs/contactanos' ? 'active' : ''}">{$dictionary.contactanos}</a>
        
        <ChangeLanguage />
    </section>
</div>

<style>
    div {
        position: fixed;
        top: 0;
        left: 0;
        background-color: var(--mainDimer);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        width: 100%;
        height: 100px;
        padding: 20px 100px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        z-index: 2;
    }

    section {
        display: flex;
        align-items: center;
        gap: 2.5em;
    }

    .link {
        font-size: 1.15rem;
    }

    .logo {
        width: 200px;
        height: auto;
    }
    
    @media screen and (max-width: 1025px){
        div {
            padding: 20px 50px 20px 20px;
        }
    }

</style>