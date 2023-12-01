<script lang="ts">
    import * as Threlte from '@threlte/core'
    import * as Extra from '@threlte/extras'
	import { fade } from "svelte/transition";
	import { onMount } from 'svelte';
	import { throttle } from '../functions';

    export let modelName:string;
    export let width:number = 500;
    export let height: number = width
    export let zoom: number = width > height ? width / 5 : height / 5

    export let autoRotate:boolean = true;
    export let enableRotate:boolean = true;
    export let enableDamping:boolean = true;
    export let enablePan:boolean = false;
    export let enableZoom:boolean = false;

    export let style:string = '';
    export let delay:number = 0;
    export let duration:number | undefined = undefined;

    const dynamicControls = {
        camera: {
            position: { x: 10, y: 7, z: 10 },
            zoom: zoom,
        }, 
        ambientLight: {
            color: '#fff',
            intensity: 4
        }, 
        pointLight: {
            position: { x: 1, y: 5, z: 3 },
            color: '#ffd',
            intensity: 10
        },
        object: {
            position: { x: 0, y: -1.2, z: 0 },
            scale: 1
        },
    }

    let handleWindowResize: (() => void) = () => {}
    let windowWidth: number;
    let regenerateTrigger: boolean = false
    let shrinkNeeded: boolean = false;

    $: windowWidth, handleWindowResize()

    onMount(() => {
        handleWindowResize = throttle(() => {
            regenerateTrigger = !regenerateTrigger
            shrinkNeeded = windowWidth - 100 < width
        }, 1000)

        handleWindowResize()
    })


</script>

<svelte:window bind:innerWidth={windowWidth} />

{#key regenerateTrigger}
    
    <div in:fade|global={{delay: delay, duration: duration}} class="scene" style="--width: {shrinkNeeded ? windowWidth - 100 : width}px; --height: {shrinkNeeded ? windowWidth - 100 : width}px; {style}">
        <Threlte.Canvas rendererParameters = {{ antialias: true }}>
            <!-- Camera -->
            <Threlte.OrthographicCamera position={dynamicControls.camera.position} zoom={shrinkNeeded ? (windowWidth - 100) / 5 : dynamicControls.camera.zoom}>
                <Threlte.OrbitControls {autoRotate} {enableRotate} {enablePan} {enableZoom} {enableDamping} />
            </Threlte.OrthographicCamera>

            <!-- Lights -->
            <Threlte.AmbientLight {...dynamicControls.ambientLight} />
            <Threlte.PointLight {...dynamicControls.pointLight} />

            <!-- Models -->
            <Extra.GLTF url="/models/{modelName}.glb" {...dynamicControls.object}/>
        </Threlte.Canvas>

        <div class="floor"></div>
    </div>

{/key}

<style>
    .scene {
        width: var(--width);
        height: var(--height);
        position: relative;
    }

    .floor {
        position: absolute;
        width: 50%;
        height: 20%;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, -70%);

        background: rgba(247, 247, 255, 0.1);
        border-radius: 100%;
        filter: blur(30px);
    }
</style>
  