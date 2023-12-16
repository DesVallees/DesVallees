<script lang="ts">
	import { fade } from "svelte/transition";
	import { dictionary } from "../../stores";

    import ArticleIndexer from "../../components/articleIndexer.svelte";

    let article: HTMLElement;
    
</script>

<svelte:head>
    <title>{$dictionary.divorceProceedings}</title>
    <meta name="description" content="Do you need a lawyer to help you with a divorce proceeding? Find out what we can do for you.">
</svelte:head>

{#if article}
    <ArticleIndexer {article} />
{/if}

<article bind:this={article} in:fade>
    <h1>{$dictionary.divorceProceedings}</h1>

    <section>
        <h2>Understanding Divorce Proceedings in the United States</h2>
        <p>Divorce, or dissolution of marriage, is a legal process that brings an end to a marriage under the laws of the United States. At LegalCollab, we recognize the emotional and legal complexities associated with divorce, and our experienced team is here to guide you through each step of the process.</p>
    </section>

    <section>
        <h2>1. Filing for Divorce</h2>
        <p>The divorce process typically begins with one spouse filing a petition for divorce in the appropriate state court. The petitioner, or the filing spouse, must meet the residency requirements of the state in which they are filing.</p>
    </section>

    <section>
        <h2>2. Grounds for Divorce</h2>
        <p>States in the U.S. may have either "fault" or "no-fault" grounds for divorce. In a no-fault divorce, the couple can cite irreconcilable differences as the reason for the divorce. Fault-based divorces require proof of wrongdoing such as adultery or cruelty.</p>
    </section>

    <section>
        <h2>3. Legal Separation</h2>
        <p>In some cases, spouses may choose legal separation before divorce. This involves living apart and addressing issues such as property division and child custody while remaining legally married.</p>
    </section>

    <section>
        <h2>4. Property Division</h2>
        <p>One of the key aspects of divorce is the division of marital property. States follow either community property or equitable distribution principles, determining how assets and debts are allocated between spouses.</p>
    </section>

    <section>
        <h2>5. Child Custody and Support</h2>
        <p>If the divorcing couple has children, the court will address custody and support arrangements. Courts prioritize the best interests of the child when determining custody, and child support is calculated based on various factors.</p>
    </section>

    <section>
        <h2>6. Spousal Support</h2>
        <p>Spousal support, also known as alimony, may be awarded to one spouse based on factors such as the length of the marriage, each spouse's financial situation, and contributions to the marriage.</p>
    </section>

    <section>
        <h2>7. Finalizing the Divorce</h2>
        <p>Once all issues are resolved, the court issues a final divorce decree, officially ending the marriage. The terms outlined in the decree, including property division and support agreements, are legally binding.</p>
    </section>

    <section>
        <h2>Seek Legal Guidance with LegalCollab</h2>
        <p>Divorce proceedings can be complex, and having the right legal representation is crucial. At LegalCollab, our team of experienced attorneys is dedicated to helping you navigate the divorce process with empathy and expertise. Contact us today for a confidential consultation.</p>
    </section>

</article>

<div class="pricing">
    <a class="button" href="/lawyer-site/pricing">Learn more about our pricing information</a>
</div>


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
        font-size: 1.15rem;
    }
</style>