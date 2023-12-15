<script lang="ts">
	import { fade } from "svelte/transition";
	import { dictionary } from "./stores";

	import Card from './components/card.svelte';
	import Testimonial from './components/testimonial.svelte';
	import Carousel from "./components/carousel.svelte";

    let carouselImages = [
        '/images/lawyers/carousel_un.jpg',
        '/images/lawyers/carousel_deux.jpg',
        '/images/lawyers/carousel_trois.jpg',
        '/images/lawyers/carousel_quatre.jpg',
        '/images/lawyers/team.jpg',
    ];

</script>

<svelte:head>
    <title>{$dictionary.homepage}</title>
    <meta name="description" content="{$dictionary.homeDescription}">
</svelte:head>

<div class="home" in:fade>
    <section class="initial">
        <div class="left">
            <h1>LegalCollab</h1>
            <p>{$dictionary.empoweringYourLegalJourney}</p>
            <a class="button explore" href="/lawyer-site/services">{$dictionary.exploreOurServices}</a>
        </div>
        <div class="right">
            <img src="/images/lawyers/landingImage.webp" width="500px" alt="{$dictionary.lawyersImageDescription}">
        </div>
    </section>
    
    <section class="cards">
        <Card 
            title="{$dictionary.legalAssistance}" 
            description="{$dictionary.navigateDivorce}" 
            imageSrc="/images/lawyers/service.jpg"
            alt={$dictionary.lawyerHelpingClientImageDescription}
            href="/lawyer-site/services"
            linkText="{$dictionary.discoverOurServices}"
        />
        <Card 
            title="{$dictionary.contactUs}" 
            description="{$dictionary.haveQuestions}" 
            imageSrc="/images/lawyers/contact.jpg"
            alt={$dictionary.lawyerThumbsUpImageDescription}
            href="/lawyer-site/contact"
            linkText="{$dictionary.getInTouch}"
        />
        <Card 
            title="{$dictionary.meetOurTeam}" 
            description="{$dictionary.discoverOurTeam}" 
            imageSrc="/images/lawyers/team.jpg"
            alt={$dictionary.legalCollabTeam}
            href="/lawyer-site/team"
            linkText="{$dictionary.meetOurLegalExperts}"
        />
    </section>

    <section class="overview">
        <h2>{$dictionary.decadesOfLegalExpertise}</h2>
        <p>{$dictionary.withDecadesOfExperience}</p>
    </section>

    <section class="testimonials">
        <h2>{$dictionary.whatOurClientsSay}</h2>
        <p>{$dictionary.readTestimonials}</p>
        
        <div class="testimonialCards">
            <Testimonial 
                photoSrc="/images/lawyers/Marcus_Turner.jpg" 
                location="{$dictionary.carrollCounty}" 
                name="Marcus Turner" 
                text="{$dictionary.incrediblySupportiveTeam}" 
            />
            <Testimonial 
                photoSrc="/images/lawyers/Emily_Davis.jpg" 
                location="{$dictionary.baltimoreCounty}" 
                name="Emily Davis" 
                text="{$dictionary.exceptionalService}" 
            />
            <Testimonial 
                photoSrc="/images/lawyers/Alejandro_Rodriguez.jpg" 
                location="{$dictionary.howardCounty}" 
                name="Alejandro Rodríguez" 
                text="{$dictionary.professionalEfficientUnderstanding}" 
            />
        </div>

        <a class="button" href="/lawyer-site/testimonials">{$dictionary.viewMoreTestimonials}</a>
    </section>

    <section class="carousel">
        <Carousel images={carouselImages} imageDescriptions={[
            $dictionary.carouselOneDescription,
            $dictionary.carouselTwoDescription,
            $dictionary.carouselThreeDescription,
            $dictionary.carouselFourDescription,
            $dictionary.legalCollabTeam,
        ]} />
    </section>
</div>

<style>
    .home {
        display: grid;
        justify-items: center;
        gap: 8rem;

        min-height: 100%;
        padding: 0 1.5rem;
    }

    .initial{
        display: flex;
        flex-wrap: wrap;
        gap: 4rem;
        justify-content: center;
        align-items: center;
        align-content: center;

        width: 100%;
        min-height: calc(100vh - 8rem);
        min-height: calc(100svh - 8rem);
        padding: 2rem 0 5rem;
    }

    .initial .left {
        display: grid;
        align-content: center;
        gap: 1rem;
    }

    h1 {
        font-size: clamp(3.3rem, 12vw, 5rem);
    }

    p {
        font-size: clamp(1.2rem, 4vw, 1.5rem);
        max-width: 65ch;
        margin: auto;
        text-wrap: pretty;
    }

    .explore {
        margin: 1rem 0;
        font-size: clamp(1.1rem, 3.5vw, 1.25rem);
    }

    .initial .right img {
        border-radius: 20px;
        aspect-ratio: 1 / 1;
        box-shadow: 0 0 1.5rem var(--content-1);
    }

    .cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(40ch, 100%), 1fr));
        column-gap: 3rem;
        row-gap: 2rem;
        align-items: stretch;
        justify-items: center;

        margin: auto;
        width: min(100%, 1300px);
    }

    h2 {
        font-size: clamp(2rem, 7vw, 4rem);
        margin: 5rem auto 2rem;
        width: fit-content;
        text-align: center;
    }

    .overview {
        width: min(100%, 1300px);
        display: grid;
        justify-items: center;
    }

    .testimonials {
        width: min(100%, 1300px);
        margin: 5rem auto;
    }

    .testimonialCards {
        display: flex;
        flex-wrap: wrap;
        column-gap: 1rem;
        row-gap: 1.5rem;
        justify-content: center;
    }

    .testimonials p {
        margin-bottom: 5rem;
    }

    .testimonials a {
        margin: 3rem auto;
        box-shadow: 0 0 1.5rem var(--content-1);
        font-size: 1.2rem;
    }

    .carousel {
        margin-bottom: 8rem;
    }



    @media screen and (min-width: 900px) {
        .home {
            padding: 0 2rem;
        }
    }
</style>