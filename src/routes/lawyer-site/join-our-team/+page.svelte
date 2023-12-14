<script lang="ts">
    import { fade } from "svelte/transition";
    import { dictionary } from "../stores";
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

    <section>
        <h2>What Our Attorneys Say</h2>
        <p>Here's what some of our collaborating attorneys have to say about working with LegalCollab:</p>

        <div class="testimonial">
            <p>"Joining LegalCollab was a game-changer for my practice. The collaborative model allows me to focus on serving my clients while being part of a supportive legal community."</p>
            <p class="attorney">John Doe, Family Law Attorney</p>
        </div>
    </section>

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
</style>
