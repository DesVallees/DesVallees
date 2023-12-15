<script lang="ts">
    export let title:string;
    export let description:string;
    export let imageSrc:string | undefined = undefined;
    export let alt:string | undefined = undefined;
    export let href:string | undefined = undefined;
    export let linkText:string | undefined = href;
</script>

<div>
    {#if imageSrc}
        <img loading="lazy" src={imageSrc} width="300px" alt={alt || title}>
    {/if}
    <h2>{title}</h2>
    <p>{description}</p>
    {#if href}
        <a class="baseButton" {href}>{linkText}</a>
    {/if}
</div>

<style>
    div {
        display: grid;
        gap: 1rem;
        aspect-ratio: 1 / 1;
        
        max-width: 410px;
        width: 100%;
        padding: 1.5rem;
        border-radius: calc(20px + 0rem);

        box-shadow: 0 0 .5rem var(--content-1);
        background-color: var(--interactive-1);
    }

    img {
        width: 100%;
        border-radius: 20px;
        box-shadow: 0 0 1.5rem var(--content-1);
    }

    h2 {
        font-size: clamp(1.5rem,  6vw, 2rem);
    }

    p {
        font-size: clamp(1rem,  4vw, 1.25rem);
        font-weight: 600;
        line-height: 3ex;
        text-wrap: pretty;
    }

    a {
        font-size: clamp(1rem,  3.5vw, 1.1rem);
        margin-top: 1rem;
        width: 100%;
        background-color: var(--content-2);
    }

    a:hover,
    a:focus-visible {
        background-color: var(--content-4);
    }


</style>