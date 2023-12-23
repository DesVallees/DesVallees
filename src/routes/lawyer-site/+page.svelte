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
    <title>LegalCollab - {$dictionary.divorceAndCustodySpecialists}</title>
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

    <hr>
    
    <section class="cards">
        <Card 
            title="{$dictionary.legalAssistance}" 
            description="{$dictionary.navigateDivorce}" 
            imageSrc="/images/lawyers/service.jpg"
            alt={$dictionary.lawyerHelpingClientImageDescription}
            href="/lawyer-site/services"
            linkText="{$dictionary.discoverOurServices}"

            style="flex-basis: 40ch; flex-grow: 1;"
        />
        <Card 
            title="{$dictionary.contactUs}" 
            description="{$dictionary.haveQuestions}" 
            imageSrc="/images/lawyers/contact.jpg"
            alt={$dictionary.lawyerThumbsUpImageDescription}
            href="/lawyer-site/contact"
            linkText="{$dictionary.getInTouch}"

            style="flex-basis: 40ch; flex-grow: 1;"
        />
        <Card 
            title="{$dictionary.meetOurTeam}" 
            description="{$dictionary.discoverOurTeam}" 
            imageSrc="/images/lawyers/team.jpg"
            alt={$dictionary.legalCollabTeam}
            href="/lawyer-site/team"
            linkText="{$dictionary.meetOurLegalExperts}"

            style="flex-basis: 40ch; flex-grow: 1;"
        />
    </section>

    <hr>

    <section class="overview">
        <h2>{$dictionary.decadesOfLegalExpertise}</h2>
        <p>{$dictionary.withDecadesOfExperience}</p>
        <a class="button" style="min-width: 200px;" href="/lawyer-site/contact">{$dictionary.contactUs}</a>
    </section>

    <hr>

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

    <hr>

    <section class="carousel">
        <h2>{$dictionary.bestMoments}</h2>
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

        min-height: 100%;
        padding: 0 1.5rem;
    }

    hr {
        margin: 10rem auto;
        width: min(100%, 1300px);
    }

    .initial{
        display: flex;
        flex-wrap: wrap;
        column-gap: 4rem;
        row-gap: 2rem;
        justify-content: center;
        align-items: center;
        align-content: center;

        width: 100%;
        min-height: calc(100vh - 12rem);
        min-height: calc(100svh - 12rem);
        padding: 2rem 0 4rem;
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
        display: flex;
        flex-wrap: wrap;
        column-gap: 3rem;
        row-gap: 2rem;
        align-items: stretch;
        justify-content: center;

        margin: auto;
        width: min(100%, 1300px);
    }

    h2 {
        font-size: clamp(2rem, 7vw, 4rem);
        margin: 0 auto 2rem;
        width: fit-content;
        text-align: center;
    }

    .overview {
        width: min(100%, 1300px);
        display: grid;
        justify-items: center;
        margin: auto;
    }

    .overview p {
        line-height: 3ex;
    }

    .testimonials {
        width: min(100%, 1300px);
        margin: auto;
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

    .testimonials a, .overview a {
        margin: 3rem auto 0;
        box-shadow: 0 0 1.5rem var(--content-1);
        font-size: 1.2rem;
    }

    .carousel {
        width: min(100%, 1300px);
        margin: auto;
        margin-bottom: 8rem;
    }

    .carousel h2 {
        margin: 0 auto 3rem;
        line-height: 2.5ex;
    }



    @media screen and (min-width: 900px) {
        .home {
            padding: 0 2rem;
        }
    }
</style>