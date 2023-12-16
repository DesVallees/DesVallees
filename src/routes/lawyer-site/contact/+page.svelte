<script lang="ts">
    import { fade } from "svelte/transition";
    import { dictionary } from "../stores";
	import FloatingLabel from "../components/floatingLabel.svelte";
	import toast from "svelte-french-toast";

    function comingSoon() {
        toast(`${$dictionary.comingSoon}...`, {duration: 3000, style: "font-weight: bold; background-color: var(--content); color: var(--main);"})
    }

    let form: HTMLFormElement;

    function handleSubmit() {
        form.reset()
        comingSoon()
    }
    
</script>

<svelte:head>
    <title>{$dictionary.contactUs}</title>
    <meta name="description" content="{$dictionary.inquiryPrompt}">
</svelte:head>

<div class="contact" in:fade>
    <h1>{$dictionary.contactUs}</h1>

    <form bind:this={form} on:submit|preventDefault={handleSubmit}>
        <div class="row">
            <FloatingLabel 
                labelText={$dictionary.firstName} 
                required={true} 
            />
    
            <FloatingLabel 
                labelText={$dictionary.lastName} 
                required={true} 
            />
        </div>

        <div class="row">
            <FloatingLabel 
                labelText={$dictionary.email} 
                required={true} 
                inputType="email"
            />
    
            <FloatingLabel 
                labelText={$dictionary.phoneNumber} 
                required={true} 
                inputType="tel"
            />
        </div>

        <div class="row">
            <FloatingLabel 
                labelText={$dictionary.inquirySubject} 
                required={true} 
                autocomplete="off"
                autocorrect={true}
            />
    
            <div class="select">
                <label for="category">{$dictionary.category}</label>
                <select class="ghostButton" id="category">
                    <option value="general">{$dictionary.generalInquiry}</option>
                    <option value="legal">{$dictionary.legalAssistance}</option>
                    <option value="collaboration">{$dictionary.collaborationOpportunity}</option>
                </select>
            </div>
        </div>
    
        <div class="textarea">
            <label for="message">{$dictionary.yourMessage}</label>
            <textarea rows="5" class="ghostButton" id="message" placeholder="{$dictionary.howCanWeAssistYou}" required></textarea>
        </div>

        <div class="row">
            <div class="attachment">
                <label for="attachment" aria-label="{$dictionary.attachment}"><ion-icon name="attach"></ion-icon></label>
                <input type="file" id="attachment" accept=".pdf, .doc, .jpg, .png" />
            </div>
        
            <label for="subscribe" class="checkbox">
                <input type="checkbox" id="subscribe" />
                {$dictionary.subscribeToNewsletter}
            </label>
        
            <label for="preferredContact" class="radio">
                <span class="radioLabel">
                    {$dictionary.preferredContactMethod}:
                </span>
                <input type="radio" id="contactEmail" name="preferredContact" value="email" />
                <label for="contactEmail">{$dictionary.email}</label>
                <input type="radio" id="contactPhone" name="preferredContact" value="phone" />
                <label for="contactPhone">{$dictionary.phoneNumber}</label>
            </label>
        </div>
    
        <button class="button submit" type="submit">{$dictionary.submitInquiry}</button>
    </form>
    
    <hr>

    <section>
        <h2>{$dictionary.contactInformation}</h2>
        <h3>{$dictionary.preferToReachOut}</h3>
        <p>{$dictionary.email}: info@legalcollab.com</p>
        <p>{$dictionary.phoneNumber}: +1 (555) 123-4567</p>
    </section>

    <hr>

    <section>
        <h2>{$dictionary.visitOurOffice}</h2>
        <h3>{$dictionary.comeAndVisit}</h3>
        <p>123 Legal Street, Suite 456</p>
        <p>Cityville, State 78901</p>

        <img 
            loading="lazy" 
            src="/images/lawyers/map.jpg" 
            alt="{$dictionary.officeLocation}"
            class="map"
            width="600"
        />
    </section>

    <hr>

    <section>
        <h2>{$dictionary.workingHours}</h2>
        <h3>{$dictionary.teamAvailable}</h3>
        <p>{$dictionary.mondayToFriday}</p>
        <p>{$dictionary.weekends}</p>
    </section>
</div>

<style>
    .contact {
        padding: 3rem 2rem 15rem;
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
        font-size: clamp(2rem, 7vw, 4rem);
        margin: 0 auto 2rem;
        width: fit-content;
        text-align: center;
    }

    p, h3 {
        font-size: clamp(1.2rem, 4vw, 1.5rem);
        max-width: 65ch;
        margin: auto;
        text-wrap: pretty;
        text-align: center;
    }

    h3 {
        margin-bottom: 1rem;
    }
    
    hr {
        width: min(100%, 70ch);
        margin: 10rem auto;
    }

    form {
        display: grid;
        row-gap: 1rem;
        justify-content: center;
        
        margin: 2rem auto;
        max-width: 700px;
    }

    select, textarea, .radio, .checkbox {
        color: var(--content);
        width: 100%;
        padding: 10px 15px;
    }

    .textarea, .select {
        font-weight: 500;
        display: grid;
        gap: 1ex;
        font-size: 1rem;
    }

    .textarea {
        margin-top: 1rem;
    }

    .attachment, .radio, .checkbox {
        width: fit-content;
        display: flex;
        gap: 1ch;
    }

    .radioLabel {
        margin-right: 1ch;
    }

    .row {
        display: flex;
        flex-wrap: wrap;
        column-gap: 2rem;
        row-gap: 1rem;
        align-items: end;

        width: 100%;
    }

    .submit {
        max-width: 500px;
        margin: 2rem auto 0;
        width: 100%;
        padding: 10px 15px;
    }

    :global(.row > *) {
        flex-grow: 1;
        flex-basis: 30ch;
    } 

    section {
        display: grid;
        place-items: center;
    }
    
    .map{
        margin-top: 3rem;
        border-radius: 25px;
        box-shadow: 0 0 .5rem var(--content-1);
    }

</style>
