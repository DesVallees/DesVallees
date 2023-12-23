<script lang="ts">
    import { fade } from "svelte/transition";
    import { dictionary } from "../stores";
	import Testimonial from "../components/testimonial.svelte";
	import FloatingLabel from "../components/floatingLabel.svelte";
</script>

<svelte:head>
    <title>{$dictionary.testimonials}</title>
    <meta name="description" content="What our clients have to say about us.">
</svelte:head>

<div class="testimonials" in:fade>
    <h1>{$dictionary.testimonials}</h1>

    <section>
        <p>See what our clients have to say about their experiences with our legal services.</p>
        
        <div class="video">
            <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/VIDEO_ID"
                title="Client Testimonial"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
            </iframe>
            <p>"Their team provided excellent support throughout my legal process." - Mary K.</p>
        </div>

        <div class="testimonialCards">
            <Testimonial photoSrc="/images/lawyers/Sofia_Lindström.jpg" name="Sofia Lindström" location="Wonderland" text="I'm grateful for the professional and affordable legal help I received."/>
            <Testimonial photoSrc="/images/lawyers/Brian_Mitchell.jpg" name="Brian Mitchell" location="Wonderland" text="The attorneys were knowledgeable, and their guidance was invaluable."/>
        </div>
    </section>

    <hr>

    <section>
        <h2>Leave Your Review</h2>
        <p>We value your feedback! Share your experience with our legal services.</p>
        <form>
            <FloatingLabel labelText={$dictionary.firstName} required />
            <FloatingLabel labelText={$dictionary.lastName} required />
            <FloatingLabel labelText="Write your review" element="textarea" required />

            <button type="submit" class="button">Submit Review</button>
        </form>
    </section>
</div>

<style>
    .testimonials {
        padding: 3rem 2rem 10rem;
        max-width: 1500px;
        margin: auto;
    }

    h1 {
        font-size: clamp(2.25rem, 6vw, 3rem);
        margin: auto;
        margin-bottom: 1rem;
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
    
    p {
        font-size: clamp(1.2rem, 3vw, 1.4rem);
        line-height: 1.8;
        text-wrap: pretty;
        max-width: 50ch;
    }

    section {
        margin: auto;

        display: grid;
        place-items: center;
    }

    hr {
        width: min(100%, 70ch);
        margin: 8rem auto;
    }

    .video {
        display: grid;
        justify-items: center;
    }

    .video p {
        text-align: center;
        width: 90%;
        font-size: clamp(1.2rem, 3vw, 1.3rem);
    }
    
    iframe {
        max-width: 100%;
        margin: 2rem 0 1rem;
        border-radius: 10px;
    }

    .testimonialCards {
        margin-top: 5rem;
        display: grid;
        row-gap: 2rem;
        justify-content: center;
    }

    form {
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

    @media screen and (min-width: 500px){
        p {
            line-height: 1.7;
            text-align: justify;
        }
    }
</style>
