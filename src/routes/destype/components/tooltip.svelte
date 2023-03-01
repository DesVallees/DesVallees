<script lang="ts">
    export let tooltip: string | boolean = false
</script>

<div data-tooltip={tooltip}>
    <slot></slot>
</div>

<style>
    [data-tooltip] {
        position: relative;
        z-index: 2;
        display: block;
    }

    [data-tooltip]:before,
    [data-tooltip]:after {
        visibility: hidden;
        opacity: 0;
        pointer-events: none;
        transition: .2s ease-out;
        transform: translate(-50%, 5px)
    }

    [data-tooltip]:before {
        position: absolute;
        bottom: 100%;
        left: 50%;
        margin-bottom: 5px;
        padding: 7px;
        width: 100%;
        min-width: 70px;
        max-width: 250px;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 5px;
        background-color: hsla(0, 0%, 20%, 0.9);
        color: #fff;
        content: attr(data-tooltip);
        text-align: center;
        font-size: 1rem;
        font-family: inherit;
        line-height: 1.2;
        transition: .2s ease-out
    }

    [data-tooltip]:after {
        position: absolute;
        bottom: 100%;
        left: 50%;
        width: 0;
        border-top: 5px solid hsla(0, 0%, 20%, 0.9);
        border-right: 5px solid transparent;
        border-left: 5px solid transparent;
        content: "";
    }

    [data-tooltip]:hover:before,
    [data-tooltip]:hover:after {
        visibility: visible;
        opacity: 1;
        transform: translate(-50%, 0)
    }
    [data-tooltip=false]:hover:before,
    [data-tooltip=false]:hover:after {
        visibility: hidden;
        opacity: 0;
    }
</style>