<script lang="ts">
    import { fade } from "svelte/transition";
    import { dictionary } from "../stores";
	import Testimonial from "../components/testimonial.svelte";
</script>

<svelte:head>
    <title>{$dictionary.pricing}</title>
    <meta name="description" content="The cost for our services.">
</svelte:head>

<div class="pricing" in:fade>
    <h1>{$dictionary.pricing}</h1>
    
    <section>
        <h2>Service Pricing</h2>
        <p>Our services are priced competitively to provide affordable legal assistance.</p>
        <ul>
            <li>Divorce Proceedings Assistance: $200</li>
            <li>Custody Proceedings Assistance: $150</li>
            <li>Legal Consultation: $50/hour</li>
        </ul>
    </section>

    <section>
        <h2>Payment Options</h2>
        <p>We offer flexible payment options for your convenience.</p>
        <ul>
            <li>Credit Card</li>
            <li>PayPal</li>
            <li>Bank Transfer</li>
        </ul>
    </section>

    <section>
        <h2>Promotions</h2>
        <p>Check out our latest promotions and discounts for first-time clients.</p>
        <p>First-time clients receive a 10% discount on their initial service.</p>
    </section>

    <section>
        <h2>Success Stories</h2>
        <p>Read about how our affordable legal services have made a difference for our clients.</p>
        <ul>
            <Testimonial photoSrc="/images/lawyers/logoWhite.webp" name="John D." location="Wonderland" text="I got through my divorce smoothly with their affordable assistance!"/>
            <Testimonial photoSrc="/images/lawyers/logoWhite.webp" name="Sarah M." location="Wonderland" text="Their team made legal help accessible when I needed it most."/>
        </ul>
    </section>
</div>

<style>

</style>

