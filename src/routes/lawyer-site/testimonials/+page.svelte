<script lang="ts">
    import { fade } from "svelte/transition";
    import { dictionary } from "../stores";
	import Testimonial from "../components/testimonial.svelte";
    import { onMount } from "svelte";
	import toast from "svelte-french-toast";

    onMount(() => {
        toast(`${$dictionary.earlyDevelopmentStage}...`, {duration: 3000, style: "font-weight: bold; background-color: var(--content); color: var(--main);"})
    })
</script>

<svelte:head>
    <title>{$dictionary.testimonials}</title>
    <meta name="description" content="What our clients have to say about us.">
</svelte:head>

<div class="testimonials" in:fade>
    <h1>{$dictionary.testimonials}</h1>

    <section>
        <h2>Client Testimonials</h2>
        <p>See what our clients have to say about their experiences with our legal services.</p>
        
        <div class="testimonial">
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

        <Testimonial photoSrc="/images/lawyers/logoWhite.webp" name="John D." location="Wonderland" text="I'm grateful for the professional and affordable legal help I received."/>
        <Testimonial photoSrc="/images/lawyers/logoWhite.webp" name="Sarah M." location="Wonderland" text="The attorneys were knowledgeable, and their guidance was invaluable."/>
    </section>

    <hr>

    <section>
        <h2>Leave Your Review</h2>
        <p>We value your feedback! Share your experience with our legal services.</p>
        <form>
            <label for="name">Your Name (Optional):</label>
            <input type="text" placeholder="Your name" id="name" />

            <label for="review">Your Review:</label>
            <textarea id="review" placeholder="Write your review" required></textarea>

            <button type="submit">Submit Review</button>
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
