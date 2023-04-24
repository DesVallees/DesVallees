<script lang="ts">
    export let callback: undefined | (() => any) = undefined;
    export let width: string = "40px";
    export let image: string = "";
    export let style: string = "";
    export let ariaLabel: string = "";
</script>

<button aria-label={ariaLabel} on:click={callback} tabindex={!callback ? -1 : 0} style="background-image: url({image}); width: {width}; height: {width}; {style} {!callback ? 'cursor: default' : ''}"></button>

<style>
    button{
        border-radius: 50%;
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
    }
</style>