<script lang="ts">
    import { fade } from "svelte/transition";
    import { dictionary } from "../../stores";
</script>

<svelte:head>
    <title>{$dictionary.refundPolicy}</title>
    <meta name="description" content="Information about our refund policy.">
</svelte:head>

<div in:fade>
    <article>
        <header>
            <h1>LegalCollab - Refund and Cancellations Policy</h1>
        </header>

        <section>
            <h2>1. Refund Policy</h2>
            <p>LegalCollab understands that circumstances may change. Our refund policy is designed to provide fairness and transparency to our clients. Refund requests will be considered based on the following conditions:</p>
            <ul>
                <li>Refunds are applicable within 7 days of the initial payment.</li>
                <li>Refund requests must be submitted in writing to <a href="mailto:refunds@legalcollab.com">refunds@legalcollab.com</a> and include a detailed explanation of the reasons for the refund.</li>
                <li>Refunds will be processed within 5 business days after approval.</li>
                <li>Any applicable fees or charges will be deducted from the refund amount.</li>
            </ul>
        </section>

        <section>
            <h2>2. Cancellations</h2>
            <p>Clients have the right to cancel services at any time. However, cancellations may be subject to the following conditions:</p>
            <ul>
                <li>Cancellation requests must be submitted in writing to <a href="mailto:cancellations@legalcollab.com">cancellations@legalcollab.com</a>.</li>
                <li>If cancellation occurs before the commencement of services, a full refund may be issued.</li>
                <li>If cancellation occurs after the commencement of services, fees for services rendered up to that point may be retained, and a partial refund may be issued.</li>
                <li>LegalCollab reserves the right to cancel services in cases of non-compliance with our Terms of Service or for other valid reasons.</li>
            </ul>
        </section>

        <section>
            <h2>3. Contact Information</h2>
            <p>If you have questions or concerns about our Refund and Cancellations Policy, please contact us at <a href="mailto:info@legalcollab.com">info@legalcollab.com</a>.</p>
        </section>

        <footer>
            <p>This Refund and Cancellations Policy was last updated on December 1st, 2023.</p>
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
