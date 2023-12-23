<script lang="ts">
    import { fade } from "svelte/transition";
    import { dictionary } from "../stores";
	import toast from "svelte-french-toast";

    function comingSoon() {
        toast(`${$dictionary.comingSoon}...`, {duration: 3000, style: "font-weight: bold; background-color: var(--content); color: var(--main);"})
    }
</script>

<svelte:head>
    <title>{$dictionary.frequentlyAskedQuestions}</title>
    <meta name="description" content="Frequently Asked Questions about our legal services.">
</svelte:head>

<div class="faq" in:fade>
    <h1>{$dictionary.frequentlyAskedQuestions}</h1>

    <section>
        <p>Looking for something specific? Use the search bar below to find answers to your questions:</p>
        <input on:focus={comingSoon} type="text" name="search" placeholder="Search...">
    </section>

    <hr>
    
    <section>
        <h2>General Questions</h2>
        <dl>
            <dt>How does LegalCollab work?</dt>
            <dd style="margin-bottom: 3rem;">
                <p>LegalCollab is a collaborative network of attorneys providing affordable legal services online. Clients can access services, resources, and legal guidance through our platform.</p>
            </dd>

            <dt>What types of legal services do you offer?</dt>
            <dd>
                <p>We specialize in family law matters, including divorce proceedings and custody proceedings assistance. Our goal is to make legal representation more accessible and affordable.</p>
            </dd>

        </dl>
    </section>

    <hr>

    <section>
        <h2>Using LegalCollab</h2>
        <dl>
            <dt>How do I sign up for LegalCollab?</dt>
            <dd style="margin-bottom: 3rem;">
                <p>Signing up is easy! Visit our <a href="/signup">signup page</a> and follow the instructions to create your account. Once registered, you can explore available services and connect with attorneys.</p>
            </dd>

            <dt>Is my information secure?</dt>
            <dd>
                <p>Yes, we take data security seriously. LegalCollab employs industry-standard encryption and security measures to protect your personal and legal information.</p>
            </dd>

        </dl>
    </section>

    <hr>

    <section>
        <p>If you can't find the information you're looking for, feel free to <a href="/contact">contact us</a>. Our team is here to help!</p>
    </section>
</div>

<style>
    .faq {
        padding: 3rem 2rem 10rem;
        max-width: 1500px;
        margin: auto;
    }

    h1 {
        font-size: clamp(2.25rem, 6vw, 3rem);
        margin: auto;
        margin-bottom: 1.5rem;
        width: fit-content;
        text-align: center;
        line-height: 2.5ex;
    }

    h2 {
        font-size: clamp(1.75rem, 4vw, 2rem);
        line-height: 1.4;
        text-align: center;
        margin-bottom: 1rem;
    }
    
    p {
        font-size: clamp(1.2rem, 3vw, 1.4rem);
        line-height: 1.8;
        text-wrap: pretty;
        max-width: 50ch;
    }

    input {
        background-color: var(--main-2);
        margin-top: 2rem;
        border-radius: 15px;
        padding: .7em 1em;
        border: 2px var(--content-8) solid;
        width: 100%;
        max-width: 70ch;
    }
    
    input:focus {
        outline: none;
        border: 2px var(--content) solid;
    }

    dt {
        font-size: clamp(1.3rem, 3.5vw, 1.5rem);
        font-weight: bold;
        margin: 1rem 0;
        display: list-item;
        list-style-position: inside;
    }

    section {
        margin: auto;

        display: grid;
        place-items: center;
    }

    a {
        margin-top: 2.75rem;
        font-size: clamp(1.15rem, 3vw, 1.3rem);
        text-align: center;
    }

    hr {
        width: min(100%, 70ch);
        margin: 8rem auto;
    }

    @media screen and (min-width: 500px){
        p {
            line-height: 1.7;
            text-align: justify;
        }
    }
</style>
