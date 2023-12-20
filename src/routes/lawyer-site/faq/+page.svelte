<script lang="ts">
    import { fade } from "svelte/transition";
    import { dictionary } from "../stores";
    import { onMount } from "svelte";
	import toast from "svelte-french-toast";

    onMount(() => {
        toast(`${$dictionary.earlyDevelopmentStage}...`, {duration: 3000, style: "font-weight: bold; background-color: var(--content); color: var(--main);"})
    })
</script>

<svelte:head>
    <title>{$dictionary.frequentlyAskedQuestions}</title>
    <meta name="description" content="Frequently Asked Questions about our legal services.">
</svelte:head>

<div class="faq" in:fade>
    <h1>{$dictionary.frequentlyAskedQuestions}</h1>

    <section>
        <h2>Search FAQs</h2>
        <p>Looking for something specific? Use the search bar below to find answers to your questions:</p>
        <input type="text" name="search" placeholder="Search...">
    </section>

    <hr>
    
    <section>
        <h2>General Questions</h2>
        <dl>
            <dt>How does LegalCollab work?</dt>
            <dd>
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
            <dd>
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
        font-size: clamp(3.3rem, 12vw, 4.5rem);
        margin: auto;
        margin-bottom: 1rem;
        width: fit-content;
        text-align: center;
        line-height: 2.5ex;
    }

    h2 {
        font-size: clamp(2rem, 4vw, 2.5rem);
        line-height: 2.5ex;
        margin-bottom: 1rem;
    }
    
    p {
        font-size: clamp(1.25rem, 3vw, 1.5rem);
        line-height: 3ex;
        text-wrap: pretty;
    }

    section {
        max-width: 75ch;
        margin: auto;

        display: grid;
        place-items: center;
    }

    a {
        font-size: 1.25rem;
        margin: 3rem 0;
    }

    hr {
        width: min(100%, 70ch);
        margin: 10rem auto;
    }
</style>
