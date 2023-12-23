<script lang="ts">
    import { fade } from "svelte/transition";
    import { dictionary } from "../stores";
	
</script>

<svelte:head>
    <title>{$dictionary.legalDisclaimersAndPolicies}</title>
    <meta name="description" content={$dictionary.disclaimersDescription}>
</svelte:head>

<div class="legal-disclaimers" in:fade>
    <h1>{$dictionary.legalDisclaimersAndPolicies}</h1>

    <section>
        <h2>{$dictionary.termsOfService}</h2>
        <p>{$dictionary.descriptionTermsOfService}</p>
        <a class="button" href="/lawyer-site/legal-disclaimers-and-policies/terms-of-service">{$dictionary.readOurMasc} {$dictionary.termsOfService}</a>
    </section>

    <hr>

    <section>
        <h2>{$dictionary.privacyPolicy}</h2>
        <p>{$dictionary.descriptionPrivacyPolicy}</p>
        <a class="button" href="/lawyer-site/legal-disclaimers-and-policies/privacy-policy">{$dictionary.readOur} {$dictionary.privacyPolicy}</a>
    </section>

    <hr>

    <section>
        <h2>{$dictionary.dataProtection}</h2>
        <p>{$dictionary.descriptionDataProtection}</p>
        <a class="button" href="/lawyer-site/legal-disclaimers-and-policies/data-protection">{$dictionary.readOur} {$dictionary.dataProtectionPolicy}</a>
    </section>

    <hr>

    <section>
        <h2>{$dictionary.refundsAndCancellations}</h2>
        <p>{$dictionary.descriptionRefundPolicy}</p>
        <a class="button" href="/lawyer-site/legal-disclaimers-and-policies/refund-policy">{$dictionary.readOur} {$dictionary.refundPolicy}</a>
    </section>

    <hr>

    <section>
        <h2>{$dictionary.contactInformation}</h2>
        <p>{$dictionary.descriptionContact}</p>
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
        font-size: clamp(2.25rem, 6vw, 3rem);
        margin: auto;
        margin-bottom: 5rem;
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
