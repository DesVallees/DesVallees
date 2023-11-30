<script lang="ts">
	import { dictionary } from "../stores";
    import { onMount } from 'svelte'

    export let scale:number = 1;

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
    <img {src} alt="{$dictionary.logoCantoLegal}" style="transform: scale({scale})">
{/if}

<style>
    img {
        -webkit-user-drag: none;
        user-select: none;
    }
</style>