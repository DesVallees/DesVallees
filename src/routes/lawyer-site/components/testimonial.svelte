<script lang="ts">

    export let photoSrc:string | undefined = undefined;
    export let name:string;
    export let location:string | undefined = undefined;
    export let text:string;

</script>

<div class="testimonial">
    <header>
        {#if photoSrc}
            <img src="{photoSrc}" alt="Profile picture of {name}.">
        {/if}
        <div class="mainInfo">
            <h2>{name}</h2>
            <h3>{location}</h3>
        </div>
    </header>

    <p>{text}</p>
</div>

<style>
    
</style>