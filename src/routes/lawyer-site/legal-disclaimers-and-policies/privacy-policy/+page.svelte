<script lang="ts">
    import { fade } from "svelte/transition";
    import { dictionary } from "../../stores";
</script>

<svelte:head>
    <title>{$dictionary.privacyPolicy}</title>
    <meta name="description" content="{$dictionary.articles.privacyPolicy.informationWeCollectDescription}">
</svelte:head>

<div in:fade>
    <article>
        <header>
            <h1>{$dictionary.articles.privacyPolicy.legalCollabPrivacyPolicy}</h1>
        </header>
    
        <section>
            <h2>{$dictionary.articles.privacyPolicy.informationWeCollect}</h2>
            <p>{$dictionary.articles.privacyPolicy.informationWeCollectDescription}</p>
        </section>
    
        <section>
            <h2>{$dictionary.articles.privacyPolicy.useOfInformation}</h2>
            <p>{$dictionary.articles.privacyPolicy.useOfInformationDescription}</p>
        </section>
    
        <section>
            <h2>{$dictionary.articles.privacyPolicy.dataSecurity}</h2>
            <p>{$dictionary.articles.privacyPolicy.dataSecurityDescription}</p>
        </section>
    
        <section>
            <h2>{$dictionary.articles.privacyPolicy.cookiesAndTracking}</h2>
            <p>{$dictionary.articles.privacyPolicy.cookiesAndTrackingDescription}</p>
        </section>
    
        <section>
            <h2>{$dictionary.articles.privacyPolicy.thirdPartyLinks}</h2>
            <p>{$dictionary.articles.privacyPolicy.thirdPartyLinksDescription}</p>
        </section>
    
        <section>
            <h2>{$dictionary.articles.privacyPolicy.changesToPrivacyPolicy}</h2>
            <p>{$dictionary.articles.privacyPolicy.changesToPrivacyPolicyDescription}</p>
        </section>
    
        <section>
            <h2>{$dictionary.articles.privacyPolicy.contactInformation}</h2>
            <p>{$dictionary.articles.privacyPolicy.contactInformationDescription} <a href="mailto:support@legalcollab.com">support@legalcollab.com</a>.</p>
        </section>
    
        <footer>
            <p>{$dictionary.articles.privacyPolicy.lastUpdatedOn}</p>
        </footer>
    </article>
</div>

<style>
    div {
        padding: 3rem 2rem 10rem;
        max-width: 1000px;
        margin: auto;

        display: grid;
        place-content: center;
    }

    article {
        margin-top: 0;
    }
</style>
