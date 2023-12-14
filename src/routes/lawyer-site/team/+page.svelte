<script lang="ts">
	import { fade, fly } from "svelte/transition";
	import { dictionary } from "../stores";
	import CarrouselController from "../components/carrouselController.svelte";

    type Lawyer = {
        imageSrc: string,
        name: string,
        description: string
    };
    
    const lawyerProfiles: Lawyer[] = [
        {
            imageSrc: '/images/lawyers/logoWhite.webp',
            name: 'Arturito',
            description: 'Arturito is nice'
        },
    ];

    let currentFileIndex = 0;

    let currentLawyer: Lawyer;
    $: currentFileIndex, currentLawyer = lawyerProfiles[currentFileIndex];

</script>

<svelte:head>
    <title>{$dictionary.ourTeam}</title>
    <meta name="description" content="Meet the team behind this Lawyer Site.">
</svelte:head>

<div class="team" in:fade>
    <h1>Meet our team</h1>

    <section class="lawyer">
        <div class="carousel">
            <button class="previousImage" aria-label="Previous Image">
            </button>
    
            {#key currentFileIndex}
                <img src={currentLawyer.imageSrc} alt={currentLawyer.name}>
            {/key}
            
            <button class="nextImage" aria-label="Next Image">
            </button>
        </div>
    
        <CarrouselController array={lawyerProfiles} {currentFileIndex} />

        <h2>{currentLawyer.name}</h2>

        <p>{currentLawyer.description}</p>
    </section>

    <section class="joinOurTeam">
        <h2>Are you a lawyer?</h2>
        <p>Come and join us.</p>

        <a href="/lawyer-site/join-our-team">{$dictionary.joinOurTeam}</a>
    </section>
</div>

<style>
    
</style>