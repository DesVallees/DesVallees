<script lang="ts">
    import { fade } from "svelte/transition";
    import { dictionary } from "../../stores";
</script>

<svelte:head>
    <title>{$dictionary.termsOfService}</title>
    <meta name="description" content="Terms and conditions governing the use of our platform, services, and interactions with our network of attorneys.">
</svelte:head>

<div in:fade>
    <article>
        <header>
            <h1>LegalCollab - Terms of Service</h1>
        </header>

        <section>
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing or using the LegalCollab platform, you agree to abide by these Terms of Service. If you do not agree with any part of these terms, please refrain from using our services.</p>
        </section>

        <section>
            <h2>2. Use of the Platform</h2>
            <p>LegalCollab provides a platform for connecting users with attorneys specializing in divorce and custody proceedings. Users are solely responsible for their interactions and transactions on the platform.</p>
        </section>

        <section>
            <h2>3. User Conduct</h2>
            <p>Users must conduct themselves in a respectful and lawful manner while using LegalCollab. Any misuse, including but not limited to harassment or fraudulent activities, may result in the termination of services.</p>
        </section>

        <section>
            <h2>4. Privacy and Data Protection</h2>
            <p>Protecting user privacy is a priority at LegalCollab. Our Privacy Policy outlines how we collect, use, and safeguard personal information. By using our services, you consent to the practices described in the Privacy Policy.</p>
        </section>

        <section>
            <h2>5. Intellectual Property</h2>
            <p>All content and materials on the LegalCollab platform, unless otherwise indicated, are the property of LegalCollab. Users may not reproduce, distribute, or modify any content without prior written consent.</p>
        </section>

        <section>
            <h2>6. Disclaimer of Warranties</h2>
            <p>LegalCollab makes no warranties or representations about the accuracy or completeness of the content on the platform. The use of our services is at the user's own risk.</p>
        </section>

        <section>
            <h2>7. Termination of Services</h2>
            <p>LegalCollab reserves the right to terminate services or restrict access to the platform for any reason without prior notice. Users may terminate their accounts at any time.</p>
        </section>

        <section>
            <h2>8. Contact Information</h2>
            <p>If you have questions or concerns about these Terms of Service, please contact us at <a href="mailto:info@legalcollab.com">info@legalcollab.com</a>.</p>
        </section>

        <footer>
            <p>These Terms of Service were last updated on December 1st, 2023.</p>
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
