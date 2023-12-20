<script lang="ts">
	import { fade } from "svelte/transition";
	import { dictionary } from "../stores";
	import Carousel from "../components/carousel.svelte";

    type Lawyer = {
        imageSrc: string,
        name: string,
        bioKey: string
    };
    
    const lawyerProfiles: Lawyer[] = [
        {
            imageSrc: '/images/lawyers/Brian_Mitchell.jpg',
            name: 'Brian Mitchell',
            bioKey: 'Brian_Mitchell',
        },
        {
            imageSrc: '/images/lawyers/Alejandro_Rodriguez.jpg',
            name: 'Alejandro Rodríguez',
            bioKey: 'Alejandro_Rodriguez',
        },
        {
            imageSrc: '/images/lawyers/Emily_Davis.jpg',
            name: 'Emily Davis',
            bioKey: 'Emily_Davis',
        },
        {
            imageSrc: '/images/lawyers/Ji-Yeon_Kim.jpg',
            name: 'Ji-Yeon Kim',
            bioKey: 'JiYeon_Kim',
        },
        {
            imageSrc: '/images/lawyers/Rahul_Patel.jpg',
            name: 'Rahul Patel',
            bioKey: 'Rahul_Patel',
        },
        {
            imageSrc: '/images/lawyers/Sofia_Lindström.jpg',
            name: 'Sofia Lindström',
            bioKey: 'Sofia_Lindström',
        },
    ];


    const imageSrcArray: string[] = lawyerProfiles.map((lawyer) => lawyer.imageSrc);
    const imageNameArray: string[] = lawyerProfiles.map((lawyer) => lawyer.name);

    let currentFileIndex = 0;

    $: currentLawyerBio = $dictionary[lawyerProfiles[currentFileIndex].bioKey as keyof typeof $dictionary]

</script>

<svelte:head>
    <title>{$dictionary.ourTeam}</title>
    <meta name="description" content={$dictionary.ourTeamDescription}>
</svelte:head>

<div class="team" in:fade>
    <h1>{$dictionary.meetOurTeam}</h1>

    <section class="lawyer">
        <div class="carousel">
            <Carousel images={imageSrcArray} imageDescriptions={imageNameArray} automaticImageChangeTime={10000} bind:currentFileIndex />
        </div>
        
        {#key currentLawyerBio}
            <div in:fade>
                <h2>{lawyerProfiles[currentFileIndex].name}</h2>
                <p>{currentLawyerBio}</p>
            </div>
        {/key}
    </section>

    <hr>

    <section class="joinOurTeam">
        <h2>{$dictionary.callingLegalProfessionals}</h2>
        <p>{$dictionary.embarkOnJourney}</p>
        <a class="button" href="/lawyer-site/join-our-team">{$dictionary.exploreOpportunities}</a>
    </section>
</div>

<style>
    .team {
        padding: 3rem 2rem 10rem;
        max-width: 1500px;
        margin: auto;
    }

    h1 {
        font-size: clamp(3.3rem, 12vw, 4.5rem);
        margin: auto;
        width: fit-content;
        text-align: center;
        line-height: 2.5ex;
    }

    h2 {
        font-size: clamp(2rem, 4vw, 2.5rem);
        line-height: 2.5ex;
        margin-bottom: 1rem;
    }
    
    p {
        font-size: clamp(1.25rem, 3vw, 1.5rem);
        line-height: 3ex;
        text-wrap: pretty;
    }

    section {
        max-width: 68ch;
        margin: auto;

        display: grid;
        place-items: center;
    }

    a {
        font-size: 1.25rem;
        margin: 3rem 0;
    }

    hr {
        width: min(100%, 70ch);
        margin: 10rem auto;
    }

    .carousel {
        width: min(100%, 70ch);
        margin: 3rem auto;
    }

</style>