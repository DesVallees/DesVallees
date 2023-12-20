<script lang="ts">
    import { fade } from "svelte/transition";
    import { dictionary } from "../stores";
    import { onMount } from "svelte";
	
</script>

<svelte:head>
    <title>{$dictionary.legalDisclaimersAndPolicies}</title>
    <meta name="description" content="Important legal information, terms of service, and privacy policy.">
</svelte:head>

<div class="legal-disclaimers" in:fade>
    <h1>{$dictionary.legalDisclaimersAndPolicies}</h1>

    <section>
        <h2>Terms of Service</h2>
        <p>By using LegalCollab, you agree to abide by our Terms of Service. This includes the terms and conditions governing the use of our platform, services, and interactions with our network of attorneys.</p>
        <a class="button" href="/lawyer-site/legal-disclaimers-and-policies/terms-of-service">Read our Terms of Service</a>
    </section>

    <hr>

    <section>
        <h2>Privacy Policy</h2>
        <p>Your privacy is important to us. Our Privacy Policy outlines how we collect, use, and protect your personal information.</p>
        <a class="button" href="/lawyer-site/legal-disclaimers-and-policies/privacy-policy">Read our Privacy Policy</a>
    </section>

    <hr>

    <section>
        <h2>Data Protection</h2>
        <p>Client data protection is a priority at LegalCollab. We implement industry-standard measures to secure your data and ensure confidentiality.</p>
        <a class="button" href="/lawyer-site/legal-disclaimers-and-policies/data-protection">Read our Data Protection Policy</a>
    </section>

    <hr>

    <section>
        <h2>Refunds and Cancellations</h2>
        <p>Please review this information before engaging our services.</p>
        <a class="button" href="/lawyer-site/legal-disclaimers-and-policies/refund-policy">Read our Refund Policy</a>
    </section>

    <hr>

    <section>
        <h2>{$dictionary.contactInformation}</h2>
        <p>If you have legal inquiries or need further clarification about our legal disclaimers and policies, you can contact us for assistance.</p>
        <a class="button" href="/lawyer-site/contact">{$dictionary.contactUs}</a>
    </section>
</div>

<style>
    .legal-disclaimers {
        padding: 3rem 2rem 10rem;
        max-width: 1500px;
        margin: auto;
    }

    h1 {
        font-size: clamp(3rem, 12vw, 3.5rem);
        margin: auto;
        margin-bottom: 4rem;
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
        margin-top: 2.75rem;
        font-size: clamp(1.25rem, 3vw, 1.25rem);
    }

    hr {
        width: min(100%, 70ch);
        margin: 10rem auto;
    }
</style>
