<script lang="ts">
	import { fade } from "svelte/transition";
	import { dictionary } from "../stores";

</script>

<div class="logIn" in:fade>
    <h1>{$dictionary.beginYourJournee}</h1>
    <form action="">
        <div class="inputGroup">
            <ion-icon name="mail"></ion-icon>
            <input type="email" placeholder="{$dictionary.email}" class="ghostButton" required>
        </div>
        <div class="inputGroup">
            <ion-icon name="lock-closed"></ion-icon>
            <input type="password" placeholder="{$dictionary.password}" class="ghostButton" required>
        </div>
        <div class="inputGroup">
            <ion-icon name="shield-checkmark"></ion-icon>
            <input type="password" placeholder="{$dictionary.confirmPassword}" class="ghostButton" required>
        </div>

        <button type="submit" class="button">{$dictionary.createAnAccount}</button>
    </form>

    <hr>

    <div class="align" style="justify-content: center; font-size: 1.05rem;">
        <p>{$dictionary.alreadyHaveAnAccount}</p>
        <a href="/journee/log-in" class="link">{$dictionary.logYouIn}</a>
    </div>
</div>

<style>
    .logIn {
        display: flex;
        flex-direction: column;
        justify-content: center;
        
        max-width: 450px;
        min-height: 100%;
        padding: 1.5rem;
        margin: auto;
    }

    h1 {
        text-wrap: balance;
    }

    form {
        display: grid;
        gap: 1rem;

        width: 100%;
        margin-top: 2rem;
    }

    input {
        width: 100%;
        padding: 1em;
        padding-left: 3em;
    }

    .inputGroup {
        position: relative;
    }

    .inputGroup ion-icon {
        position: absolute;
        top: 50%;
        left: .7em;
        translate: 0 -50%;

        color: var(--interactive);
    }

    .button {
        width: 100%;
        padding: .625em;
        margin-top: .5rem;
    }

    .align {
        display: flex; 
        flex-wrap: wrap; 
        column-gap: 1ch; 
        align-items: end; 
    }

    hr {
        border: none;
        border-top: 3px solid var(--content-5);
        overflow: visible;
        text-align: center;
        height: 5px;
        margin: 2.5rem 10% 1rem;
    }

    hr:after {
        background: var(--main);
        content: '';
        padding: 0 10%;
        position: relative;
        top: -13px;
    }

</style>

<svelte:head>
    <title>{$dictionary.createAnAccount}</title>
    <noscript>
        <title>Create an account</title>
    </noscript>
    
    <meta name="description" content="Sign in to explore A.I.-guided insights, manage to-do lists, seek advice, and nurture your thoughts within our private and tranquil space.">
</svelte:head>