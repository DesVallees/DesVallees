<script lang="ts">
    import { fade } from "svelte/transition";
    import { dictionary } from "../../stores";
</script>

<svelte:head>
    <title>{$dictionary.dataProtection}</title>
    <meta name="description" content="Client data protection is a priority at LegalCollab. We implement industry-standard measures to secure your data and ensure confidentiality.">
</svelte:head>

<div in:fade>
    <article>
        <header>
            <h1>LegalCollab - Data Protection Policy</h1>
        </header>

        <section>
            <h2>1. Overview</h2>
            <p>LegalCollab is committed to protecting the privacy and data of its users. This Data Protection Policy outlines how we collect, process, and secure your personal information.</p>
        </section>

        <section>
            <h2>2. Information We Collect</h2>
            <p>We collect personal information, including but not limited to names, contact details, and case-related data, to facilitate the provision of legal services. Users provide this information voluntarily or as required by law.</p>
        </section>

        <section>
            <h2>3. How We Use Your Information</h2>
            <p>We use the collected information to connect users with appropriate legal professionals, facilitate communication, and improve our services. Personal information is treated with the utmost confidentiality.</p>
        </section>

        <section>
            <h2>4. Data Security Measures</h2>
            <p>LegalCollab employs industry-standard security measures to protect user data from unauthorized access, disclosure, alteration, and destruction. We regularly review and enhance our security practices.</p>
        </section>

        <section>
            <h2>5. Sharing of Information</h2>
            <p>We do not sell or share personal information with third parties for marketing purposes. Information may be shared with legal professionals to facilitate case-related communication and services.</p>
        </section>

        <section>
            <h2>6. User Control and Access</h2>
            <p>Users have the right to access, correct, or delete their personal information. Requests for such actions can be submitted through our platform or by contacting us directly.</p>
        </section>

        <section>
            <h2>7. Compliance with Laws</h2>
            <p>LegalCollab complies with applicable data protection laws. In the event of a legal request or obligation, we may disclose information as required by law.</p>
        </section>

        <section>
            <h2>8. Contact Information</h2>
            <p>If you have questions or concerns about our Data Protection Policy, please contact us at <a href="mailto:dataprotection@legalcollab.com">dataprotection@legalcollab.com</a>.</p>
        </section>

        <footer>
            <p>This Data Protection Policy was last updated on December 1st, 2023.</p>
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
