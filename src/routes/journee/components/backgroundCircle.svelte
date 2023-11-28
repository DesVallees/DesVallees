<script lang="ts">
    export let width:number = 680;
    export let coordinates:{left:string, top:string} = {left: '10%', top: '-40%'};
    export let color:string = 'var(--interactive-1)';
    export let style:string = '';

</script>

<div style="background: {color}; width: {width}px; height: {width}px; top: {coordinates.top}; left: {coordinates.left}; {style}"></div>

<style>
    div {
        position: fixed;
        z-index: -1000;
        border-radius: 100%;

        filter: blur(153px);
    }
</style>