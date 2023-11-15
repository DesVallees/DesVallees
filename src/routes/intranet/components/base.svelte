<!-- Add "on:click|stopPropagation" property to parent div placed in the 'slot' position -->

<script lang="ts">
	import { fade } from "svelte/transition";

    export let firstFocusableElement:HTMLElement;
    export let lastFocusableElement:HTMLElement;
    export let active: boolean = true

    function focusFirstElement () {
        if (firstFocusableElement) {
            firstFocusableElement.focus()
        }
    }

    function focusLastElement () {
        if (lastFocusableElement) {
            lastFocusableElement.focus()
        }
    }
</script>


<svelte:window on:keydown={ (event) => { if (active && event.key === 'Escape') active = false } } />

{#if active}

    <div class="base" in:fade={{duration:100}} out:fade={{duration:100, delay:100}}>

        <button style="position: absolute; opacity: 0;" on:focus={focusLastElement}></button>

        <slot></slot>

        <button style="position: absolute; opacity: 0;" on:focus={focusFirstElement}></button>

    </div>

{/if}

<style>
    
    .base {
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        width: 100vw;
        height: 100vh;
        padding: 150px 20px 100px;
        background-color: #1d212aee;
        z-index: 11;
        overflow: auto;
    }

</style>