<script lang="ts">
    import * as Threlte from '@threlte/core'
    import * as Three from 'three'

    export let color: Three.ColorRepresentation

    const { scene } = Threlte.useThrelte()
    scene.background = new Three.Color(color)
</script>