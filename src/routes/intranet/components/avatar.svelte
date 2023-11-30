<script lang="ts">
    
    export let href: undefined | string = undefined;
    export let width: string = "40px";
    export let borderRadius: string = "50%";
    export let image: string = "";
    export let style: string = "";
    export let ariaLabel: string = "";
    export let personName: string = "";

</script>

<a href={href} aria-label={ariaLabel} tabindex={!href ? -1 : 0} style="width: {width}; height: {width}; border-radius: {borderRadius}; {!href ? 'cursor: default;' : ''} {style}">
    <img 
        src={image} 
        alt={personName} 
        loading="lazy" 
        decoding="async" 
    >
</a>

<style>
    a {
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        box-shadow: 3px 3px 10px #00000034;

        transition: all .2s;
        outline-offset: 5px;
        overflow: hidden;
    }

    img {
        object-fit: cover; 
        width: 100%;
        user-select: none;
        -webkit-user-drag: none;
    }

</style>