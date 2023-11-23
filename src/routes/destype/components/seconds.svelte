<script lang="ts">
	import { dictionary, initialSeconds, seconds } from "../stores";
	import { scale } from "svelte/transition";

    let value:number = $initialSeconds;
    let clickToBlur:HTMLParagraphElement;
    // $: value, setTimer()  <-- Great way to keep constant watch of a variable and executing a function whenever it changes

	function setTimer() {
        value > 0 ? value = Math.ceil(value) : value = $initialSeconds

        $initialSeconds = value
        $seconds = value
	}

</script>

<div>
    {#key $dictionary}
        <p bind:this={clickToBlur} in:scale|global>{$dictionary.seconds}: </p>
    {/key}

    <input type="number" 
        on:blur={setTimer}
        on:keydown={(event) => event.key === 'Enter' ? clickToBlur.click() : ''}
        bind:value
        min=1
    >
</div>

<style>

    div {
        position: absolute;
        bottom: calc(-4rem + -40px);
        width: 100%;

        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        gap: 1rem;

        font: inherit;
        font-size: 1.2rem;
        color: var(--fg-200);
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    input {
        -moz-appearance: textfield;
        appearance: textfield;

        height: 40px;
        width: 50px;
        outline: none;
        border: none;

        font: inherit;
        font-size: inherit;
        color: inherit;
        text-align: center;
        background: none;
        box-shadow: 0 0 3px hsla(210, 20%, 98%, 0.4);
        transition: all 0.3s ease;
        padding: .3rem;
        border-radius: 5px;
    }

    input:hover, 
    input:focus {
        box-shadow: 0 0 3px hsla(210, 20%, 98%, 1);
    }

</style>