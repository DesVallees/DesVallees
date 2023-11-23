<script lang="ts">
	import { onMount } from "svelte";
	import { fly } from "svelte/transition";

    type GuitarFace = 'front' | 'derriere'
    
    export let fileNames : string[] = []
    export let extension : string = 'png'
    export let guitarNumber : number | undefined = undefined;
    export let guitarFace: GuitarFace | undefined = undefined;
    export let allowSmallSize: boolean = true;

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
    

    let isMobileDevice : boolean = false;

    onMount(() => {
        isMobileDevice = window.innerWidth <= window.innerHeight;
    })

    let imageSize : string = (isMobileDevice && allowSmallSize) ? '-small' : ''

    $: isMobileDevice, imageSize = (isMobileDevice && allowSmallSize) ? '-small' : ''
</script>


<svelte:window on:resize={() => isMobileDevice = window.innerWidth <= window.innerHeight}/>

{#key isMobileDevice}
    <button on:click={newImage}>
        {#key currentFile}
            <img in:fly={{y: -100, duration: 700}} style={style} src="/images/ccs/{currentFile || 'guitarre' + guitarNumber + guitarFace}{imageSize}.{extension}" alt={name}>
        {/key}
    </button>
{/key}

<style>
    img {
        -webkit-user-drag: none;
        z-index: -1;
        max-height: 100%; 
        max-width: 100%;
    }
</style>
