<script lang="ts">
	import { dictionary, initialSeconds, seconds } from "../stores";
	import { scale } from "svelte/transition";

    let value:number = $initialSeconds;
    let clickToBlur:HTMLDivElement;

	function setTimer() {
        value > 4 ? value = Math.ceil(value) : value = 5

        $initialSeconds = value
        $seconds = value
	}

</script>

<div>
    <div style="display: none;" bind:this={clickToBlur}></div>
    
    {#key $dictionary}
        <label for="seconds" in:scale|global>{$dictionary.seconds}: </label>
    {/key}

    <input type="number" 
        on:blur={setTimer}
        on:keydown={(event) => event.key === 'Enter' ? clickToBlur.click() : ''}
        bind:value
        in:scale
        min=5
        id="seconds"
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
        box-sizing: content-box;

        width: 3ch;
        outline: none;
        border: none;

        font: inherit;
        font-size: inherit;
        color: inherit;
        text-align: center;
        background: none;
        box-shadow: 0 0 3px hsla(210, 20%, 98%, 0.4);
        transition: all 0.3s ease;
        padding: .4em;
        border-radius: 5px;
    }

    input:hover, 
    input:focus {
        box-shadow: 0 0 3px hsla(210, 20%, 98%, 1);
    }

</style>