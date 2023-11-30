<script lang="ts">
	import { fade } from "svelte/transition";
	import { dictionary } from "./stores";

</script>

<svelte:head>
    <title>Journée</title>
    <meta name="description" content="Discover tranquility with our private space for thoughts. Enhance your daily life with A.I. insights, advice, to-do lists, a secure digital diary, and many more features! Your mindful journey begins here.">
</svelte:head>

<div class="home" in:fade>
    <section>
        <h1>Journée</h1>
        <h2>{$dictionary.slogan}</h2>

        <a href="/journee/logIn" class="button">{$dictionary.logIn}</a>
    </section>

    <div class="imgWrapper">
        <img src="/images/journee/landingOwl.webp" alt={$dictionary.landingOwlAlt} width="200">
    </div>
</div>

<style>
    .home {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        column-gap: 30%;
        row-gap: 1rem;

        grid-template-columns: repeat(2, 1fr);

        min-height: 100%;
        padding: 1rem 1.5rem;
    }

    h1 {
        font-size: clamp(3.5rem, 9vw, 5rem);
    }

    h2 {
        color: var(--content-7);
        font-size: clamp(1.2rem, 3vw, 1.5rem);
        margin-bottom: 1.5em;
        max-width: 30ch;
    }

    a {
		font-size: clamp(1.2rem, 2.5vw, 1.5rem);
        min-width: 10ch;
	}

    .imgWrapper {
        position: relative;
        width: 18rem;
        max-width: 70%;
    }

    .imgWrapper::after {
        content: '';
        position: absolute;
        width: 90%;
        height: 20%;
        right: 0;
        bottom: -5%;
        border-radius: 50%;
        filter: blur(30px);
        background-color: var(--content-1);
        z-index: -1;
    }

    img {
        width: 100%;
        user-select: none;
        -webkit-user-drag: none;
    }

    @media screen and (min-width: 800px) {
        .home {
            padding: 1.5rem 5rem;
        }
    }
</style>