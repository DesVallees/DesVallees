<script lang="ts">
    export let title:string;
    export let description:string;
    export let imageSrc:string | undefined = undefined;
    export let href:string | undefined = undefined;
    export let linkText:string | undefined = href;
</script>

<div>
    {#if imageSrc}
        <img src={imageSrc} width="80px" alt={title}>
    {/if}
    <h2>{title}</h2>
    <h3>{description}</h3>
    {#if href}
        <a {href}>{linkText}</a>
    {/if}
</div>

<style>
    
</style>