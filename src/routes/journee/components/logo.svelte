<script lang="ts">

    import { onMount } from 'svelte'
    
    export let style: string = ''

    let src = "/images/journee/logoWhite.webp";
    
    let loaded = false;

    onMount(() => {
        const img = new Image();
        img.src = src;

        img.onload = () => {
            loaded = true;
        };
    })

</script>

{#if loaded}
    <img style={style} src={src} alt="Journée" loading="lazy">
{/if}

<style>
    img {
        width: 3.5rem;
        user-select: none;
        -webkit-user-drag: none;
    }

    @media screen and (min-width: 500px) {
        img {
            width: 4rem;
        }
    }
</style>