<script lang="ts">
    import { fade } from "svelte/transition";
    import { dictionary } from "../stores";
    import { onMount } from "svelte";
	import toast from "svelte-french-toast";

    onMount(() => {
        toast(`${$dictionary.earlyDevelopmentStage}...`, {duration: 3000, style: "font-weight: bold; background-color: var(--content); color: var(--main);"})
    })
</script>

<svelte:head>
    <title>{$dictionary.joinOurTeam}</title>
    <meta name="description" content="Are you a lawyer? Maybe we can work together! Contact Us!">
</svelte:head>

<div class="join" in:fade>
    <h1>{$dictionary.joinOurTeam}</h1>

    <section>
        <h2>Why Join Our Team?</h2>
        <p>LegalCollab is a collaborative network of experienced attorneys dedicated to providing affordable legal services. By joining our team, you'll have the opportunity to:</p>
        <ul>
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
            <li>Active law license in the jurisdiction of practice</li>
            <li>Minimum of 5 years of legal practice experience</li>
            <li>Demonstrated expertise in family law matters</li>
        </ul>
        <p>If you meet these qualifications and are interested in joining our collaborative network, please reach out to us using the form below.</p>
    </section>

    <hr>

    <section>
        <h2>What Our Attorneys Say</h2>
        <p>Here's what some of our collaborating attorneys have to say about working with LegalCollab:</p>

        <div class="testimonial">
            <p>"Joining LegalCollab was a game-changer for my practice. The collaborative model allows me to focus on serving my clients while being part of a supportive legal community."</p>
            <p class="attorney">John Doe, Family Law Attorney</p>
        </div>
    </section>

    <hr>

    <section>
        <h2>Apply Now</h2>
        <p>If you are interested in joining our team, please complete the application form below. Our team will review your application and reach out to discuss potential collaboration opportunities.</p>
        <form>
            <label for="fullName">Full Name:</label>
            <input type="text" id="fullName" placeholder="Your full name" />

            <label for="email">Email:</label>
            <input type="email" id="email" placeholder="Your email" />

            <label for="phone">Phone Number:</label>
            <input type="tel" id="phone" placeholder="Your phone number" />

            <label for="resume">Upload Resume (PDF or Word):</label>
            <input type="file" id="resume" accept=".pdf, .doc, .docx" />

            <button type="submit">Submit Application</button>
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
        font-size: clamp(3.3rem, 12vw, 4.5rem);
        margin: auto;
        margin-bottom: 1rem;
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
        max-width: 75ch;
        margin: auto;

        display: grid;
        place-items: center;
    }

    hr {
        width: min(100%, 70ch);
        margin: 10rem auto;
    }
</style>
