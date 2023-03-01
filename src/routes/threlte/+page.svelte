<script lang="ts">
    import { Pane } from "tweakpane";
	import { browser } from '$app/environment';

    import * as Threlte from '@threlte/core'
    import * as Extra from '@threlte/extras'
    import * as Three from 'three'
	import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
	import Background from "./background.svelte";

    const gridHelper = new Three.GridHelper(20, 20)
    const axesHelper = new Three.AxesHelper(10)

    const dynamicControls = {
        camera: {
            position: { x: 10, y: 10, z: 10 },
            zoom: 60,
        }, 
        ambientLight: {
            color: '#181869',
            intensity: 4
        }, 
        pointLight: {
            position: { x: 0, y: 2, z: 2 },
            color: '#FFF000',
            intensity: 0.2
        }, 
        ghost: {
            position: { x: 0, y: 1.9, z: 0 },
            scale: 0.4,
        },
    }

    function float() {
        const timeInSeconds:number = Date.now() / 1000
        const offset:number = 2.9

        dynamicControls.ghost.position.y = Math.sin(timeInSeconds) + offset
        requestAnimationFrame(float)
    }

    if (browser) {
        float()
        
        const pane = new Pane({ title: 'Scene' })

        for (const key in dynamicControls) {
            const control:object = dynamicControls[key as keyof object];
            const newControl = pane.addFolder({ title: key })
            for (const propName in control) {
                // @ts-ignore
                newControl.addInput(control, propName)                    
            }

            newControl.on('change', ({presetKey, value}) => {
                // @ts-ignore
                dynamicControls[key][presetKey] = value as any
            });
        }
    }

</script>
  
<div class="scene">
    <Threlte.Canvas rendererParameters = {{ antialias: true }}>
        <Threlte.Object3DInstance object={gridHelper} />
        <!-- <Threlte.Object3DInstance object={axesHelper} /> -->

        <!-- Bloom -->
        <Threlte.Pass 
            pass={new UnrealBloomPass(new Three.Vector2(1, 1), 4, 0, 0.75)}
        />

        <!-- Background -->
        <Background color={'orangered'} />

        <!-- Camera -->
        <Threlte.OrthographicCamera {...dynamicControls.camera}>
            <Threlte.OrbitControls autoRotate/>
        </Threlte.OrthographicCamera>

        <!-- Lights -->
        <Threlte.AmbientLight {...dynamicControls.ambientLight} />
        <Threlte.PointLight {...dynamicControls.pointLight} />

        <!-- Models -->
        <Extra.GLTF url="models/ghost.glb" {...dynamicControls.ghost} />
        <Extra.GLTF url="models/garden.glb"/>
    </Threlte.Canvas>
</div>
  
<style>
    .scene {
      width: 100%;
      height: 100%;
      position: absolute;
      inset: 0;
      background: radial-gradient(hsl(220 14% 20%), hsl(220 20% 10%));
      background-attachment: fixed;
    }
</style>
  