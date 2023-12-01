<script lang="ts">
	import { dictionary } from "../stores";
    import { onMount } from 'svelte'

    export let style:string = "";

    let src = "/images/intranet/logoCantoLegal.webp"
    
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
    <img {src} alt="{$dictionary.logoCantoLegal}" height="70" {style}>
{/if}

<style>
    img {
        -webkit-user-drag: none;
        user-select: none;
    }

    @media (min-width: 600px) {
        img {
            height: 5rem;
        }
    }
</style>