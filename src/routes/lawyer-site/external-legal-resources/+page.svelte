<script lang="ts">
    import { fade } from "svelte/transition";
    import { dictionary } from "../stores";
</script>

<svelte:head>
    <title>{$dictionary.externalLegalResources}</title>
    <meta name="description" content="Useful legal forms, templates, and links to important government sites.">
</svelte:head>

<div class="external-resources" in:fade>
    <h1>{$dictionary.externalLegalResources}</h1>

    <section>
        <h2>Government Sites</h2>
        <p>Find important information and resources on government websites related to legal matters. Visit <a target="_blank" href="https://www.usa.gov/">usa.gov</a> for comprehensive government services.</p>
    </section>

    <hr>

    <section>
        <h2>Additional Resources</h2>
        <p>Explore more external legal resources that can provide valuable insights and information.</p>
        <ul>
            <li><a href="https://www.childwelfare.gov/" target="_blank">Child Welfare Information Gateway</a> - Information on child welfare and custody issues.</li>
            <li><a href="https://search.usa.gov/search?affiliate=usagov_all_gov&query=divorce" target="_blank">USA.gov - Divorce and Separation</a> - U.S. government information on divorce and separation.</li>
            <li><a href="https://search.usa.gov/search?affiliate=usagov_all_gov&query=custody" target="_blank">USA.gov - Custody</a> - U.S. government information on Custody.</li>
        </ul>
    </section>
</div>

<style>
    .external-resources {
        padding: 3rem 2rem 10rem;
        max-width: 1500px;
        margin: auto;
    }

    h1 {
        font-size: clamp(2.25rem, 6vw, 3rem);
        margin: auto;
        margin-bottom: 5rem;
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

    a {
        margin-top: 2.75rem;
        font-size: clamp(1.15rem, 3vw, 1.3rem);
        text-align: center;
        color: var(--interactive);
        text-decoration: underline;
    }

    hr {
        width: min(100%, 70ch);
        margin: 8rem auto;
    }

    @media screen and (min-width: 500px){
        p {
            line-height: 1.7;
            text-align: justify;
        }
    }
</style>
