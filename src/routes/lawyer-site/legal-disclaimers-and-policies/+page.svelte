<script lang="ts">
    import { fade } from "svelte/transition";
    import { dictionary } from "../stores";
    import { onMount } from "svelte";
	import toast from "svelte-french-toast";

    onMount(() => {
        toast(`${$dictionary.earlyDevelopmentStage}...`, {duration: 3000, style: "font-weight: bold; background-color: var(--content); color: var(--main);"})
    })
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
        <p>Read our full <a href="/lawyer-site/legal-disclaimers-and-policies/terms-of-service">Terms of Service</a>.</p>
    </section>

    <section>
        <h2>Privacy Policy</h2>
        <p>Your privacy is important to us. Our Privacy Policy outlines how we collect, use, and protect your personal information. Learn more about our privacy practices by reading our <a href="/lawyer-site/legal-disclaimers-and-policies/privacy-policy">Privacy Policy</a>.</p>
    </section>

    <section>
        <h2>Data Protection</h2>
        <p>Client data protection is a priority at LegalCollab. We implement industry-standard measures to secure your data and ensure confidentiality. For detailed information, refer to our <a href="/lawyer-site/legal-disclaimers-and-policies/data-protection">Data Protection Policy</a>.</p>
    </section>

    <section>
        <h2>Refunds and Cancellations</h2>
        <p>Our policies regarding refunds and cancellations are outlined in our <a href="/lawyer-site/legal-disclaimers-and-policies/refund-policy">Refund Policy</a>. Please review this information before engaging our services.</p>
    </section>

    <section>
        <h2>Contact Information</h2>
        <p>If you have legal inquiries or need further clarification about our legal disclaimers and policies, you can <a href="/lawyer-site/contact">contact us</a> for assistance.</p>
    </section>
</div>

<style>
</style>
