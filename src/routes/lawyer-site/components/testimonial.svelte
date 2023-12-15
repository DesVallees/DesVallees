<script lang="ts">

    export let photoSrc:string | undefined = undefined;
    export let name:string;
    export let location:string | undefined = undefined;
    export let text:string;

</script>

<div class="testimonial">
    <header>
        {#if photoSrc}
            <img loading="lazy" width="70px" height="70px" src="{photoSrc}" alt="Profile picture of {name}.">
        {/if}
        <div class="mainInfo">
            <h2>{name}</h2>
            <h3>{location}</h3>
        </div>
    </header>

    <p>{text}</p>
</div>

<style>
    .testimonial {
        border-radius: 20px;
        background-color: var(--interactive-1);
        border: solid 2px var(--interactive-4);
        padding: 1.8rem;
        box-shadow: 0 0 .5rem var(--content-1);
        max-width: 500px;
    }

    header {
        display: grid;
        grid-template-columns: auto 1fr;
        column-gap: 1rem;
        margin-bottom: 1.5rem;
    }

    img {
        border-radius: 50%;
        box-shadow: 0 0 1.5rem var(--content-1);
    }

    .mainInfo {
        display: grid;
        place-content: baseline;
        gap: .5ex;
    }

    h2 {
        font-size: 1.25rem;
    }
    
    h3 {
        color: var(--content-8);
        font-size: 1rem;
    }

    p {
        text-wrap: pretty;
        line-height: 3ex;
        font-size: 1.1rem;
    }
</style>