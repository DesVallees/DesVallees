<script lang="ts">
    import { fade } from "svelte/transition";
    import { dictionary } from "../stores";
</script>

<svelte:head>
    <title>{$dictionary.siteMap}</title>
    <meta name="description" content="Explore the sitemap of our website.">
</svelte:head>

<div class="sitemap" in:fade>
    <h1>{$dictionary.siteMap}</h1>

    <div class="mainList">
        <section>
            <h2>{$dictionary.homepage}</h2>
            <ul class="firstLevel">
                <li><a class="link" href="./">{$dictionary.home}</a></li>
            </ul>
        </section>

        <section>
            <h2>{$dictionary.aboutUs}</h2>
            <ul class="firstLevel">
                <li><a class="link" href="./team">{$dictionary.ourTeam}</a></li>
                <li><a class="link" href="./services">{$dictionary.ourServices}</a></li>
                    <ul class="secondLevel">
                        <li><a class="link" href="./services/custody-proceedings">{$dictionary.custodyProceedings}</a></li>
                        <li><a class="link" href="./services/divorce-proceedings">{$dictionary.divorceProceedings}</a></li>
                    </ul>
                <li><a class="link" href="./testimonials">{$dictionary.testimonials}</a></li>
                <li><a class="link" href="./pricing">{$dictionary.pricing}</a></li>
            </ul>
        </section>

        <section>
            <h2>{$dictionary.legalResources}</h2>
            <ul class="firstLevel">
                <li><a class="link" href="./faq">{$dictionary.faq}</a></li>
                <li><a class="link" href="./blog">{$dictionary.blog}</a></li>
                <li><a class="link" href="./external-legal-resources">{$dictionary.externalLegalResources}</a></li>
                <li><a class="link" href="./legal-disclaimers-and-policies">{$dictionary.legalDisclaimersAndPolicies}</a></li>
                    <ul class="secondLevel">
                        <li><a class="link" href="./legal-disclaimers-and-policies/terms-of-service">{$dictionary.termsOfService}</a></li>
                        <li><a class="link" href="./legal-disclaimers-and-policies/privacy-policy">{$dictionary.privacyPolicy}</a></li>
                        <li><a class="link" href="./legal-disclaimers-and-policies/data-protection">{$dictionary.dataProtection}</a></li>
                        <li><a class="link" href="./legal-disclaimers-and-policies/refund-policy">{$dictionary.refundPolicy}</a></li>
                    </ul>
            </ul>
        </section>

        <section>
            <h2>{$dictionary.getInTouch}</h2>
            <ul class="firstLevel">
                <li><a class="link" href="./contact">{$dictionary.contactUs}</a></li>
                <li><a class="link" href="./join-our-team">{$dictionary.joinOurTeam}</a></li>
            </ul>
        </section>
    </div>
</div>

<style>
    .sitemap {
        display: grid;
        row-gap: 2rem;
        
        max-width: 1500px;
        padding: 4rem clamp(2rem, 6vw, 5rem) 7rem;
        margin: auto;
    }

    h1 {
        font-size: 4rem;
    }

    .mainList {
        margin: 0 1ch;

        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(30ch, 100%), 1fr));
        column-gap: 5rem;
        row-gap: 3rem;
    }

    ul {
        margin-bottom: 1rem;
        list-style: none;
    }

    ul li::before {
        content: '\2022';
        color: var(--interactive);
        display: inline-block;
        width: 1em;
        margin-right: 1ch;
    }
    
    .secondLevel li::before {
        content: '\25E6';
        margin-left: 3ch;
    }

    li {
        display: flex;
        align-items: center;
    }

    .firstLevel {
        margin-top: .5rem;
    }

    a {
        text-wrap: nowrap;
    }

</style>
