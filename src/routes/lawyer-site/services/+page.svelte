<script lang="ts">
	import { fade } from "svelte/transition";
	import { dictionary } from "../stores";

    import ArticleIndexer from "../components/articleIndexer.svelte";

    let article: HTMLElement;

</script>

<svelte:head>
    <title>{$dictionary.ourServices}</title>
    <meta name="description" content="Do you need a lawyer to help you with a divorce or custody proceeding? Find out what we can do for you.">
</svelte:head>

{#if article}
    <ArticleIndexer {article} />
{/if}

<article bind:this={article} in:fade>
    <h1>Welcome to LegalCollab</h1>

    <section>
        <h2>Navigating Divorce and Custody Proceedings</h2>
        <p>At LegalCollab, we understand that divorce and custody proceedings can be emotionally challenging. Our team of dedicated lawyers is here to provide you with expert legal guidance and support tailored to your unique situation.</p>
    </section>

    <section>
        <h2>The Benefits of Online Legal Representation</h2>
        <p>Choosing online legal representation with LegalCollab offers numerous advantages for individuals going through divorce and custody cases:</p>
        <ul>
            <li><strong>Convenience:</strong> Access legal assistance from the comfort of your home, eliminating the need for in-person meetings.</li>
            <li><strong>Accessibility:</strong> Connect with our experienced lawyers regardless of your geographical location, ensuring widespread accessibility.</li>
            <li><strong>Flexibility:</strong> Schedule virtual consultations at a time that suits your busy lifestyle, providing flexibility during this challenging time.</li>
            <li><strong>Efficiency:</strong> Streamline the legal process with online document submission and communication, saving time and reducing paperwork.</li>
        </ul>
    </section>

    <section>
        <h2>Affordable Legal Services Tailored to You</h2>
        <p>At LegalCollab, we believe in providing high-quality legal representation that is also affordable. Our online assistance ensures cost-effective services without compromising on expertise:</p>
        <ul>
            <li><strong>Transparent Pricing:</strong> Clear and upfront pricing structures, so you know what to expect without hidden fees.</li>
            <li><strong>Flexible Payment Plans:</strong> We offer flexible payment options to accommodate different financial situations.</li>
            <li><strong>Value for Money:</strong> Receive exceptional legal support without breaking the bank, ensuring the best possible outcome for your case.</li>
        </ul>
    </section>

    <section>
        <a class="button" href="/lawyer-site/contact">{$dictionary.getInTouch}</a>
        <p>Ready to navigate your divorce or custody case with expert legal guidance? Contact LegalCollab today for a confidential consultation.</p>
    </section>


</article>


<style>
    article {
        margin-top: 3rem;
        line-height: 1.6;
        font-size: 1.2rem;
    }
    
    h1 {
        font-size: 2rem;
    }
    
    h2 {
        font-size: 1.5rem;
        margin: 2rem 0 1rem;
    }
    
    p {
        color: var(--content-9);
    }

    section {
        margin-bottom: 20px;
    }

    a {
        margin: 4rem auto 2rem;
    }
</style>