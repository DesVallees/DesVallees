<script lang="ts">
	import { baseRoute, dictionary } from "../stores";
	import ChangeLanguage from "./changeLanguage.svelte";
	import Logo from "./logo.svelte";
	import SNav from "./sNav.svelte";

    let active: boolean = false;

</script>

<nav>
    <section>
        <button id="snavToggle" class="baseButton s" on:click={() => active = !active} aria-label="{$dictionary.siteNavigation}">
            <ion-icon name="menu-outline"></ion-icon>
        </button>
        
        <a class="x" href="{baseRoute}" aria-label={$dictionary.homepage}>
            <Logo />
        </a>
    </section>

    <div>
        <section class="links x">
            <a class="link" href="{baseRoute}">{$dictionary.home}</a>
            <a class="link" href="{baseRoute}/catalog">{$dictionary.catalog}</a>
            <a class="link" href="{baseRoute}/contact">{$dictionary.contactUs}</a>
            <a class="link" href="{baseRoute}/our-work">{$dictionary.ourWork}</a>
        </section>

        <a class="s" href="{baseRoute}" aria-label={$dictionary.homepage}>
            <Logo />
        </a>
    </div>
    
    <section class="buttons">
        <button class="baseButton x">
            <ion-icon name="search-outline"></ion-icon>
        </button>
        <button class="baseButton x">
            <ion-icon name="person-outline"></ion-icon>
        </button>
        <button class="baseButton">
            <ion-icon name="cart-outline"></ion-icon>
        </button>
        <button class="baseButton x">
            <ion-icon name="settings-outline"></ion-icon>
        </button>
    </section>
</nav>

<SNav bind:active/>

<style>

    nav {
        position: relative;
        
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 3rem;

        padding: .5rem 1rem;
        width: 100%;
    }

    a {
        display: flex;
    }

    section {
        display: flex;
        align-items: center;
    }

    .baseButton {
        padding: .4em .5em;
    }

    #snavToggle ion-icon {
        font-size: 2.325rem;
        transform: translateY(1px);
    }

    .x {
        display: none;
    }

    .links {
        font-size: 1.15rem;
        gap: 3rem;
    }

    .buttons {
        gap: .5rem;
        font-size: 1.3rem;
    }

    @media screen and (min-width: 750px) {
        nav {
            padding: 1.5rem 4rem 1rem;
        }
    }

    @media screen and (min-width: 70rem) {
        .x {
            display: flex;
        }

        .s {
            display: none;
        }

        .buttons {
            font-size: 1.15rem;
        }
    }

    @media screen and (max-width: 500px){
        #snavToggle ion-icon {
            font-size: 2.2rem;
        }
    }

</style>