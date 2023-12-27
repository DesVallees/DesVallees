<script lang="ts">
    import { fade } from "svelte/transition";
    import { dictionary } from "../../stores";
</script>

<svelte:head>
    <title>{$dictionary.refundPolicy}</title>
    <meta name="description" content="{$dictionary.articles.refundPolicy.refundPolicyDescription}">
</svelte:head>

<div in:fade>
    <article>
        <header>
            <h1>{$dictionary.articles.refundPolicy.legalCollabRefundAndCancellationsPolicy}</h1>
        </header>
    
        <section>
            <h2>{$dictionary.articles.refundPolicy.refundPolicy}</h2>
            <p>{$dictionary.articles.refundPolicy.refundPolicyDescription}</p>
            <ul>
                <li>{$dictionary.articles.refundPolicy.refundsApplicableWithin}</li>
                <li>{$dictionary.articles.refundPolicy.refundRequestsMustBeSubmitted} <a href="mailto:refunds@legalcollab.com">refunds@legalcollab.com</a> {$dictionary.articles.refundPolicy.andIncludeDetailed}</li>
                <li>{$dictionary.articles.refundPolicy.refundsProcessedWithin}</li>
                <li>{$dictionary.articles.refundPolicy.applicableFeesDeducted}</li>
            </ul>
        </section>
    
        <section>
            <h2>{$dictionary.articles.refundPolicy.cancellations}</h2>
            <p>{$dictionary.articles.refundPolicy.cancellationsDescription}</p>
            <ul>
                <li>{$dictionary.articles.refundPolicy.cancellationRequestsMustBeSubmitted} <a href="mailto:cancellations@legalcollab.com">cancellations@legalcollab.com</a>.</li>
                <li>{$dictionary.articles.refundPolicy.fullRefundBeforeCommencement}</li>
                <li>{$dictionary.articles.refundPolicy.partialRefundAfterCommencement}</li>
                <li>{$dictionary.articles.refundPolicy.legalCollabReservesTheRight}</li>
            </ul>
        </section>
    
        <section>
            <h2>{$dictionary.articles.refundPolicy.contactInformation}</h2>
            <p>{$dictionary.articles.refundPolicy.contactInformationDescription} <a href="mailto:support@legalcollab.com">support@legalcollab.com</a>.</p>
        </section>
    
        <footer>
            <p>{$dictionary.articles.refundPolicy.lastUpdatedOn}</p>
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
