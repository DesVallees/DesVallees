<script lang="ts">
	import { fly } from "svelte/transition";

    type GuitarFace = 'front' | 'derriere'
    
    export let fileNames : string[] = []
    export let extension : string = 'webp'
    export let guitarNumber : number | undefined = undefined;
    export let guitarFace: GuitarFace | undefined = undefined;

    export let name: string = '';
    
    export let style: string = '';


    export let currentFileIndex = 0
    let currentFile = fileNames[currentFileIndex]

    $: currentFileIndex, currentFile = fileNames[currentFileIndex]

    
    function newImage() {
        let fileNamesLength = fileNames.length
        currentFileIndex++
        
        if (currentFileIndex >= fileNamesLength) {
            currentFileIndex = 0
        }
    }

</script>

<button on:click={newImage} aria-label="{name}" >
    {#key currentFile}
        <picture in:fly={{y: -100, duration: 700}}>
            <source media="(orientation: portrait)" srcset="/images/ccs/{currentFile || 'guitarre' + guitarNumber + guitarFace}-small.{extension}">
            <source media="(orientation: landscape)" srcset="/images/ccs/{currentFile || 'guitarre' + guitarNumber + guitarFace}.{extension}">
            <img  src="/images/ccs/{currentFile || 'guitarre' + guitarNumber + guitarFace}.{extension}" alt={name} style={style}>
        </picture>
    {/key}
</button>

<style>
    img {
        user-select: none;
        -webkit-user-drag: none;
        max-height: 100%; 
        max-width: 100%;
    }
</style>
