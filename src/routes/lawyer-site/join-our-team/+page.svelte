<script lang="ts">
    import { fade } from "svelte/transition";
    import { dictionary } from "../stores";
	import Testimonial from "../components/testimonial.svelte";
	import FloatingLabel from "../components/floatingLabel.svelte";
</script>

<svelte:head>
    <title>{$dictionary.joinOurTeam}</title>
    <meta name="description" content="Are you a lawyer? Maybe we can work together! Contact Us!">
</svelte:head>

<div class="join" in:fade>
    <h1>{$dictionary.joinOurTeam}</h1>

    <section>
        <p>LegalCollab is a collaborative network of experienced attorneys dedicated to providing affordable legal services. By joining our team, you'll have the opportunity to:</p>
        <ul style="margin-bottom: 0;">
            <li>Collaborate with like-minded legal professionals</li>
            <li>Expand your practice and reach new clients</li>
            <li>Contribute to making legal assistance accessible to all</li>
        </ul>
    </section>

    <hr>

    <section>
        <h2>Current Opportunities</h2>
        <p>We are currently seeking attorneys with expertise in:</p>
        <ul>
            <li>Family Law</li>
            <li>Divorce Proceedings</li>
            <li>Custody Proceedings</li>
        </ul>
        <p>If you are passionate about making a difference in the legal field, we'd love to hear from you. Contact us to discuss potential collaboration opportunities.</p>
    </section>

    <hr>

    <section>
        <h2>Qualifications</h2>
        <p>To be considered for collaboration, attorneys should meet the following qualifications:</p>
        <ul>
            <li>Active law license in the jurisdiction of practice.</li>
            <li>Minimum of 5 years of legal practice experience.</li>
            <li>Demonstrated expertise in family law matters.</li>
        </ul>
        <p>If you meet these qualifications and are interested in joining our collaborative network, please reach out to us using the form below.</p>
    </section>

    <hr>

    <section>
        <h2>What Our Attorneys Say</h2>
        <p>Here's what some of our collaborating attorneys have to say about working with LegalCollab:</p>

        <div class="testimonialCards">
            <Testimonial photoSrc="/images/lawyers/Emily_Davis.jpg" name="Emily Davis, Family Law Attorney" location="Baltimore, MD" text="Joining LegalCollab was a game-changer for my practice. The collaborative model allows me to focus on serving my clients while being part of a supportive legal community."/>
        </div>
    </section>

    <hr>

    <section>
        <h2>Apply Now</h2>
        <p>If you are interested in joining our team, please complete the application form below. Our team will review your application and reach out to discuss potential collaboration opportunities.</p>
        <form>
            <FloatingLabel labelText={$dictionary.firstName} required/>
            <FloatingLabel labelText={$dictionary.lastName} required/>
            <FloatingLabel labelText={$dictionary.email} required/>
            <FloatingLabel labelText={$dictionary.phoneNumber}/>

            <label for="resume">Upload Resume (PDF or Word):</label>
            <input type="file" id="resume" accept=".pdf, .doc, .docx" />

            <button class="button" type="submit">Submit Application</button>
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

    button {
        margin: 2rem auto 0;
        font-size: 1.1rem;
    }

    .testimonialCards {
        margin: auto;
        margin-top: 2rem;
    }

    @media screen and (min-width: 500px){
        p {
            line-height: 1.7;
            text-align: justify;
        }
    }
</style>
