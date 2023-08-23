<script lang="ts">
    export let href: undefined | string = undefined;
    export let width: string = "40px";
    export let borderRadius: string = "50%";
    export let image: string = "";
    export let style: string = "";
    export let ariaLabel: string = "";
</script>

<a href={href} aria-label={ariaLabel} tabindex={!href ? -1 : 0} style="background-image: url({image}); width: {width}; height: {width}; border-radius: {borderRadius}; {style} {!href ? 'cursor: default' : ''}"></a>

<style>
    a {
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        box-shadow: 3px 3px 10px #00000034;

        transition: all .2s;
        outline-offset: 5px;
    }
</style>