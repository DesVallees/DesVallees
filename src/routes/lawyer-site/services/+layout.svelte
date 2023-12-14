<script lang="ts">
	import { fade } from "svelte/transition";
	import { dictionary } from "../stores";

</script>

<svelte:head>
    <title>{$dictionary.ourServices}</title>
    <meta name="description" content="Do you need a lawyer to help you with a divorce or custody proceeding? Find out what we can do for you.">
</svelte:head>

<div class="services" in:fade>
    <div class="soixanteQuinze">
        <slot/>
    </div>
    
    <div class="vingtCinq">
        <div class="otherServices">
            <h2>Services</h2>

            <menu>
                <li><a href="/lawyer-site/services/divorce-proceedings">Divorce Proceedings</a></li>
                <li><a href="/lawyer-site/services/custody-proceedings">Custody Proceedings</a></li>
            </menu>
        </div>

        <div class="contactUs">
            <h2>Are you interested?</h2>
            <a href="/lawyer-site/contact">{$dictionary.contactUs}</a>
        </div>
    </div>
</div>

<style>
    
</style>