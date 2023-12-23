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
        <p>Our services are priced competitively to provide affordable legal assistance.</p>
        <ul>
            <li>Divorce Proceedings Assistance: <strong>$200</strong></li>
            <li>Custody Proceedings Assistance: <strong>$150</strong></li>
            <li>Legal Consultation: <strong>$50/hour</strong></li>
        </ul>
    </section>

    <hr>

    <section>
        <h2>Payment Options</h2>
        <p>We offer flexible payment options for your convenience.</p>
        <ul>
            <li>Credit Card</li>
            <li>PayPal</li>
            <li>Bank Transfer</li>
        </ul>
    </section>

    <hr>

    <section>
        <h2>Promotions</h2>
        <p>Explore our latest promotions and enjoy exclusive discounts on our legal services. Take advantage of these limited-time offers:</p>
        <ul style="margin-bottom: 3rem; display: grid; gap: 2rem;">
            <li>
                <strong>First-Time Client Discount:</strong> New clients receive a 10% discount on their initial service. It's our way of welcoming you to the LegalCollab family!
            </li>

            <li>
                <strong>Referral Rewards:</strong> Refer a friend or family member, and when they become a client, both you and the new client enjoy a discount on your next service with us.
            </li>

            <li>
                <strong>Free Consultation:</strong> For a limited time, take advantage of a free initial consultation. Discuss your case with our experts without any upfront cost.
            </li>
        </ul>
        <p>Each promotion is subject to specific terms and conditions. Please review the details and feel free to contact us if you have any questions or need further clarification.</p>
    </section>

    <hr>

    <section>
        <h2>Success Stories</h2>
        <p>Read about how our affordable legal services have made a difference for our clients.</p>
        <div class="testimonialCards">
            <Testimonial photoSrc="/images/lawyers/Ji-Yeon_Kim.jpg" name="Ji-Yeon Kim" location="Wonderland" text="I got through my divorce smoothly with their affordable assistance!"/>
            <Testimonial photoSrc="/images/lawyers/Rahul_Patel.jpg" name="Rahul Patel" location="Wonderland" text="Their team made legal help accessible when I needed it most."/>
        </div>
    </section>
</div>

<style>
    .pricing {
        padding: 3rem 2rem 10rem;
        margin: auto;
    }

    h1 {
        font-size: clamp(2.25rem, 6vw, 3rem);
        margin: auto;
        margin-bottom: 1rem;
        width: fit-content;
        text-align: center;
        line-height: 2.5ex;
    }

    h2 {
        font-size: clamp(1.75rem, 4vw, 2rem);
        line-height: 1.4;
        text-align: center;
        margin-bottom: 1rem;
    }
    
    p, li {
        font-size: clamp(1.2rem, 3vw, 1.4rem);
        line-height: 1.8;
        text-wrap: pretty;
        max-width: 50ch;
    }

    ul {
        margin-top: 2rem;
        width: 100%;
        max-width: 65ch;
        list-style-position: inside;
    }

    section {
        margin: auto;

        display: grid;
        place-items: center;
    }

    hr {
        width: min(100%, 70ch);
        margin: 8rem auto;
    }

    .testimonialCards {
        margin-top: 5rem;
        display: grid;
        row-gap: 2rem;
        justify-content: center;
    }

    @media screen and (min-width: 500px){
        p {
            line-height: 1.7;
            text-align: justify;
        }
    }
</style>

