<script lang="ts">
	import { fade } from "svelte/transition";
	import { dictionary } from "./stores";

	import Card from './components/card.svelte';
	import Testimonial from './components/testimonial.svelte';


</script>

<svelte:head>
    <title>{$dictionary.homepage}</title>
    <meta name="description" content="Affordable online legal assistance for divorce and custody proceedings.">
</svelte:head>

<div class="home" in:fade>
    <section class="background">
        <div class="left">
            <h1>Headline</h1>
            <p>Something something</p>
            <a class="button" href="/lawyer-site/services">Invitation to view services</a>
        </div>
        <div class="right">
            <button>Ion icon - Play. Open youtube video.</button>
        </div>
    </section>
    
    <section class="cards">
        <Card 
            title="Legal Assistance" 
            description="Explore our legal assistance services tailored for divorce and custody proceedings. Our team of experienced attorneys is here to guide you through the process." 
            imageSrc="/images/lawyers/logoWhite.webp"
            href="/lawyer-site/services"
            linkText="Explore Services"
        />
        <Card 
            title="{$dictionary.contactUs}" 
            description="Have questions or need assistance? Contact us directly for personalized support. Our team is ready to assist you." 
            imageSrc="/images/lawyers/logoWhite.webp"
            href="/lawyer-site/contact"
            linkText="{$dictionary.contactUs}"
        />
        <Card 
            title="{$dictionary.ourTeam}" 
            description="Meet our team of dedicated attorneys with expertise in family law. Learn about their experience and commitment to helping clients." 
            imageSrc="/images/lawyers/logoWhite.webp"
            href="/lawyer-site/team"
            linkText="Meet Our Team"
        />
    </section>

    <section class="overview">
        <div class="left">
            <h2>We've been doing this for a long time.</h2>
            <p>This is why...</p>
        </div>
        <div class="right">
            <img src="/images/lawyers/logoWhite.webp" width="80px" alt="Alternate Text">
        </div>
    </section>

    <section class="testimonials">
        <h2>What Our Have Clients To Say</h2>
        <p>Read testimonials from clients who have benefited from our affordable online legal assistance. Your success story could be next!</p>
        
        <Testimonial photoSrc="/images/lawyers/logoWhite.webp" location="Carroll County" name="Pepito" text="Fantastic." />
        <Testimonial photoSrc="/images/lawyers/logoWhite.webp" location="Carroll County" name="Pepito" text="Fantastic." />
        <Testimonial photoSrc="/images/lawyers/logoWhite.webp" location="Carroll County" name="Pepito" text="Fantastic." />
        <Testimonial photoSrc="/images/lawyers/logoWhite.webp" location="Carroll County" name="Pepito" text="Fantastic." />
        <Testimonial photoSrc="/images/lawyers/logoWhite.webp" location="Carroll County" name="Pepito" text="Fantastic." />
        <Testimonial photoSrc="/images/lawyers/logoWhite.webp" location="Carroll County" name="Pepito" text="Fantastic." />
        <Testimonial photoSrc="/images/lawyers/logoWhite.webp" location="Carroll County" name="Pepito" text="Fantastic." />
        <Testimonial photoSrc="/images/lawyers/logoWhite.webp" location="Carroll County" name="Pepito" text="Fantastic." />

        <a href="/lawyer-site/testimonials">View more testimonials</a>
    </section>

    <section class="carousel">
        <img src="/images/lawyers/logoWhite.webp" alt="alfdjk">
    </section>
</div>

<style>
    .home {
        display: grid;
        justify-content: center;

        min-height: 100%;
        padding: 1.5rem;
    }

    @media screen and (min-width: 800px) {
        .home {
            padding: 1.5rem 5rem;
        }
    }
</style>