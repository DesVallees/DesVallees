<script lang="ts">
    import { fade } from "svelte/transition";
    import { dictionary } from "../stores";
</script>

<svelte:head>
    <title>{$dictionary.contactUs}</title>
    <meta name="description" content="Do you need a lawyer to help you with a divorce or custody proceedings? We are here for you. Contact us!">
</svelte:head>

<div class="contact" in:fade>
    <h1>{$dictionary.contactUs}</h1>

    <form>
        <label for="firstName">First Name:</label>
        <input type="text" id="firstName" placeholder="Your first name" required />

        <label for="lastName">Last Name:</label>
        <input type="text" id="lastName" placeholder="Your last name" required />
    
        <label for="email">Email:</label>
        <input type="email" id="email" placeholder="Your email" required />
    
        <label for="phone">Phone Number:</label>
        <input type="tel" id="phone" placeholder="Your phone number" required />
    
        <label for="subject">Subject:</label>
        <input type="text" id="subject" placeholder="Subject of your inquiry" />
    
        <label for="category">Category:</label>
        <select id="category">
            <option value="general">General Inquiry</option>
            <option value="legal">Legal Assistance</option>
            <option value="collaboration">Collaboration Opportunity</option>
        </select>
    
        <label for="message">Your Message:</label>
        <textarea id="message" placeholder="How can we assist you?" required></textarea>
    
        <label for="attachment">Attachment:</label>
        <input type="file" id="attachment" accept=".pdf, .doc, .jpg, .png" />
    
        <label for="subscribe">
            <input type="checkbox" id="subscribe" />
            Subscribe to our newsletter
        </label>
    
        <label for="preferredContact">
            Preferred Contact Method:
            <input type="radio" id="contactEmail" name="preferredContact" value="email" />
            <label for="contactEmail">Email</label>
            <input type="radio" id="contactPhone" name="preferredContact" value="phone" />
            <label for="contactPhone">Phone</label>
        </label>
    
        <button type="submit">Submit Inquiry</button>
    </form>
    

    <section>
        <h2>Contact Information</h2>
        <p>If you prefer to reach out directly, here is our contact information:</p>
        <p>Email: info@legalcollab.com</p>
        <p>Phone: +1 (555) 123-4567</p>
    </section>

    <section>
        <h2>Visit Our Office</h2>
        <p>Come and visit our office located at:</p>
        <p>123 Legal Street, Suite 456</p>
        <p>Cityville, State 78901</p>

        <iframe 
            loading="lazy" 
            src="https://www.google.com/maps/embed/v1/place?q=Space+Needle,Seattle+WA" 
            style="border:0; height:450px; width: 100%;" 
            spellcheck="false"
            title="Office Location"
        >
        </iframe>
    </section>

    <section>
        <h2>Working Hours</h2>
        <p>Our team is available to assist you during the following hours:</p>
        <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
        <p>Weekends: By appointment</p>
    </section>
</div>

<style>
</style>
