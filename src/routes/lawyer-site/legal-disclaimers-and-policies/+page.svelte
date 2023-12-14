<script lang="ts">
    import { fade } from "svelte/transition";
    import { dictionary } from "../stores";
</script>

<svelte:head>
    <title>{$dictionary.legalDisclaimersAndPolicies}</title>
    <meta name="description" content="Important legal information, terms of service, and privacy policy.">
</svelte:head>

<div class="legal-disclaimers" in:fade>
    <h1>{$dictionary.legalDisclaimersAndPolicies}</h1>

    <!-- Detailed terms of service and privacy policy -->
    <section>
        <h2>Terms of Service</h2>
        <p>By using LegalCollab, you agree to abide by our Terms of Service. This includes the terms and conditions governing the use of our platform, services, and interactions with our network of attorneys.</p>
        <p>Read our full <a href="/terms-of-service">Terms of Service</a>.</p>
    </section>

    <section>
        <h2>Privacy Policy</h2>
        <p>Your privacy is important to us. Our Privacy Policy outlines how we collect, use, and protect your personal information. Learn more about our privacy practices by reading our <a href="/privacy-policy">Privacy Policy</a>.</p>
    </section>

    <!-- Information on client data protection -->
    <section>
        <h2>Data Protection</h2>
        <p>Client data protection is a priority at LegalCollab. We implement industry-standard measures to secure your data and ensure confidentiality. For detailed information, refer to our <a href="/data-protection">Data Protection Policy</a>.</p>
    </section>

    <!-- Legal disclaimers and liability limitations -->
    <section>
        <h2>Liability Disclaimers</h2>
        <p>LegalCollab provides legal information and services, but we are not a law firm. Our network of attorneys offers guidance, but the information on this platform is not legal advice. Read our full <a href="/disclaimer">Liability Disclaimer</a>.</p>
    </section>

    <!-- Clear policies on refunds and cancellations -->
    <section>
        <h2>Refunds and Cancellations</h2>
        <p>Our policies regarding refunds and cancellations are outlined in our <a href="/refund-policy">Refund Policy</a>. Please review this information before engaging our services.</p>
    </section>

    <!-- Contact information for legal inquiries -->
    <section>
        <h2>Contact Information</h2>
        <p>If you have legal inquiries or need further clarification about our legal disclaimers and policies, you can <a href="/contact">contact us</a> for assistance.</p>
    </section>
</div>

<style>
    /* Add your styling for the Legal Disclaimers and Policies page */
</style>
