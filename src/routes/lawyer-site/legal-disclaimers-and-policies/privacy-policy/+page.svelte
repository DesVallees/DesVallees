<script lang="ts">
    import { fade } from "svelte/transition";
    import { dictionary } from "../../stores";
</script>

<svelte:head>
    <title>{$dictionary.privacyPolicy}</title>
    <meta name="description" content="Our Privacy Policy outlines how we collect, use, and protect your personal information.">
</svelte:head>

<div in:fade>
    <article>
        <header>
            <h1>LegalCollab - Privacy Policy</h1>
        </header>

        <section>
            <h2>1. Information We Collect</h2>
            <p>LegalCollab collects personal information such as names, contact details, and case-related details. This information is provided by users voluntarily when using our platform.</p>
        </section>

        <section>
            <h2>2. Use of Information</h2>
            <p>We use the collected information to connect users with attorneys, improve our services, and communicate important updates. Personal information is treated with the utmost confidentiality and is not shared without explicit consent.</p>
        </section>

        <section>
            <h2>3. Data Security</h2>
            <p>LegalCollab employs industry-standard measures to secure user data. While we strive to protect personal information, users should be aware that no data transmission over the internet is entirely secure.</p>
        </section>

        <section>
            <h2>4. Cookies and Tracking</h2>
            <p>LegalCollab uses cookies and similar tracking technologies to enhance user experience. Users can manage cookie preferences through their browser settings.</p>
        </section>

        <section>
            <h2>5. Third-Party Links</h2>
            <p>Our platform may contain links to third-party websites. LegalCollab is not responsible for the privacy practices or content of these external sites. Users should review the privacy policies of third parties.</p>
        </section>

        <section>
            <h2>6. Changes to Privacy Policy</h2>
            <p>LegalCollab reserves the right to update this Privacy Policy. Users will be notified of any changes, and continued use of our services after the changes constitute acceptance of the revised policy.</p>
        </section>

        <section>
            <h2>7. Contact Information</h2>
            <p>If you have questions or concerns about our Privacy Policy, please contact us at <a href="mailto:privacy@legalcollab.com">privacy@legalcollab.com</a>.</p>
        </section>

        <footer>
            <p>This Privacy Policy was last updated on December 1st, 2023.</p>
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
