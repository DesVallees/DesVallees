<script lang="ts">
    export let width:number = 680;
    export let coordinates:{left:string, top:string} = {left: '100px', top: '-500px'};
    export let color:string = '#DF805720';

</script>

<div style="background: {color}; width: {width}px; height: {width}px; top: {coordinates.top}; left: {coordinates.left}"></div>

<style>
    div {
        position: fixed;
        z-index: -1000;
        border-radius: 100%;
        background-color: rgba(46, 241, 209, 0.644);

        filter: blur(153px);
    }
</style>