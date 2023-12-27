<script lang="ts">
    export let title:string;
    export let description:string;
    export let imageSrc:string | undefined = undefined;
    export let alt:string | undefined = undefined;
    export let href:string | undefined = undefined;
    export let linkText:string | undefined = href;
    export let style:string = '';
</script>

<div {style}>
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
        
        max-width: 410px;
        width: 100%;
        min-height: fit-content;
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
        align-self: self-end;
        
        font-size: clamp(1rem,  3.5vw, 1.1rem);
        text-align: center;
        margin-top: 1.5rem;

        padding: .5em .75em;
        width: 100%;
        border: 2px solid var(--content-5);
        background-color: var(--content-1);
    }

    a:hover,
    a:focus-visible {
        background-color: var(--content-3);
    }


</style>