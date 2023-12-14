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

    <ul>
        <li><a href="/">Home</a></li>
        <li>
            <a href="/about">About Us</a>
            <ul>
                <li><a href="/about/team">Our Team</a></li>
                <li><a href="/about/services">Our Services</a></li>
                    <ul>
                        <li><a href="/about/services">Our Services</a></li>
                        <li><a href="/about/services">Our Services</a></li>
                    </ul>
                <li><a href="/about/testimonials">Testimonials</a></li>
                <li><a href="/about/pricing">Pricing</a></li>
            </ul>
        </li>
        <li>
            <a href="/resources">Legal Resources</a>
            <ul>
                <li><a href="/resources/faq">FAQ</a></li>
                <li><a href="/resources/blog">Blog</a></li>
                <li><a href="/resources/external">External Legal Resources</a></li>
                <li><a href="/resources/disclaimers">Legal Disclaimers and Policies</a></li>
            </ul>
        </li>
        <li>
            <a href="/contact">Get in Touch</a>
            <ul>
                <li><a href="/contact">Contact Us</a></li>
                <li><a href="/contact/join">Join Our Team</a></li>
                <li><a href="/client-portal">Client Portal</a></li>
            </ul>
        </li>
    </ul>
</div>

<style>
</style>
