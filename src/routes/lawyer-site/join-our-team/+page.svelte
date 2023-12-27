<script lang="ts">
    import { fade, slide } from "svelte/transition";
    import { dictionary } from "../stores";
	import Testimonial from "../components/testimonial.svelte";
	import FloatingLabel from "../components/floatingLabel.svelte";

    let resumeInput: HTMLInputElement;
    let resumeName = '';

    function getResumeName () {
        if (resumeInput.files && resumeInput.files.length > 0) {
            resumeName = resumeInput.files[0].name;
        }
    }

    function deleteResume () {
        resumeInput.value = '';
        resumeName = '';
    }
    
</script>

<svelte:head>
    <title>{$dictionary.joinOurTeam}</title>
    <meta name="description" content={$dictionary.passionateAboutMakingDifference}>
</svelte:head>

<div class="join" in:fade>
    <h1>{$dictionary.joinOurTeam}</h1>

    <section>
        <p>{$dictionary.legalCollabDescription}</p>
        <ul style="margin-bottom: 0;">
            <li>{$dictionary.collaborateList1}</li>
            <li>{$dictionary.collaborateList2}</li>
            <li>{$dictionary.collaborateList3}</li>
        </ul>
    </section>
    
    <hr>
    
    <section>
        <h2>{$dictionary.currentOpportunities}</h2>
        <p>{$dictionary.seekAttorneysWithExpertise}</p>
        <ul>
            <li>{$dictionary.familyLaw}</li>
            <li>{$dictionary.divorceProceedings}</li>
            <li>{$dictionary.custodyProceedings}</li>
        </ul>
        <p>{$dictionary.passionateAboutMakingDifference}</p>
    </section>
    
    <hr>
    
    <section>
        <h2>{$dictionary.whatAttorneysSay}</h2>
        <p>{$dictionary.collaboratingAttorneys}</p>
        <div class="testimonialCards">
            <Testimonial photoSrc="/images/lawyers/Emily_Davis.jpg" name="Emily Davis, {$dictionary.familyLawAttorney}" location="Baltimore, MD" text="{$dictionary.joiningLegalCollab}"/>
        </div>
    </section>
    
    <hr>
    
    <section>
        <h2>{$dictionary.qualifications}</h2>
        <p>{$dictionary.collaborationQualifications}</p>
        <ul>
            <li>{$dictionary.qualificationsList1}</li>
            <li>{$dictionary.qualificationsList2}</li>
            <li>{$dictionary.qualificationsList3}</li>
        </ul>
        <p>{$dictionary.interestedInJoining}</p>
    </section>
    
    <hr>
    
    <section>
        <h2>{$dictionary.applyNow}</h2>
        <p>{$dictionary.reviewApplication}</p>
        <form>
            <FloatingLabel labelText="{$dictionary.firstName}" required/>
            <FloatingLabel labelText="{$dictionary.lastName}" required/>
            <FloatingLabel labelText="{$dictionary.email}" required/>
            <FloatingLabel labelText="{$dictionary.phoneNumber}"/>
    
            <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
            <label for="resume" tabindex="0" aria-label="{$dictionary.uploadResume}">
                <ion-icon name="document-attach-outline"></ion-icon>
                <span>{$dictionary.uploadResume}</span>
            </label>
            <input on:change={getResumeName} bind:this={resumeInput} style="display: none;" type="file" id="resume" accept=".pdf, .doc, .docx" />
    
            {#if resumeName}
                <div class="resume" transition:slide={{duration: 100}}>
                    <span class="resumeName">{resumeName}</span>
                    <button class="deleteResume baseButton" on:click={deleteResume} aria-label="{$dictionary.deleteResume}" type="button"><ion-icon name="close-circle-outline"></ion-icon></button>
                </div>
            {/if}
    
            <button class="button" type="submit">{$dictionary.submitApplication}</button>
        </form>
    </section>
    
</div>

<style>
    .join {
        padding: 3rem 2rem 10rem;
        max-width: 1500px;
        margin: auto;
    }

    h1 {
        font-size: clamp(2.25rem, 6vw, 3rem);
        margin: auto;
        margin-bottom: 1.5rem;
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
        margin: 2rem 0;
        width: 100%;
        max-width: 65ch;
        list-style-position: inside;
    }

    section {
        margin: auto;

        display: grid;
        width: fit-content;
    }

    hr {
        width: min(100%, 70ch);
        margin: 8rem auto;
    }

    form {
        margin: auto;
        margin-top: 2rem;
        
        width: 100%;
        max-width: 65ch;
        
        display: grid;
        gap: 2ex;
    }

    label {
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 1ch;
    }

    .button {
        margin: 2rem auto 0;
        font-size: 1.1rem;
    }

    .testimonialCards {
        margin: auto;
        margin-top: 2rem;
    }

    .resume {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        width: fit-content;
        gap: 1ch;
    }
    
    .resumeName {
        user-select: none;
    }

    @media screen and (min-width: 500px){
        p {
            line-height: 1.7;
        }
    }
</style>
