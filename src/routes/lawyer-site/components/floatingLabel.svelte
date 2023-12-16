<script lang="ts">
	import { spacedToHyphened } from "../functions";

    export let labelText: string;
    export let inputType: string = 'text';

    export let paddingBlock: string = '10px';
    export let paddingInline: string = '15px';
    export let className: string = '';
    export let inputStyle: string = '';
    export let containerStyle: string = '';

    export let required: boolean = false;
    export let autocomplete: string = '';
    export let autocorrect: boolean = false;
    export let autofocus: boolean = false;
    export let spellcheck: boolean = false;
    export let autocapitalize: string = "on";

    export let inputEl: HTMLInputElement | undefined = undefined;
    
</script>

<!-- svelte-ignore a11y-autofocus -->
<div class="inputGroup" style="--paddingBlock: {paddingBlock}; --paddingInline: {paddingInline}; {containerStyle}">
    <slot>
        <input 
            class="{className || 'ghostButton'}" 
            type="{inputType}" 
            id="{spacedToHyphened(labelText)}" 
            aria-label="{labelText}" 
            placeholder=""
            style="{inputStyle}"

            {required}
            {autocomplete}
            {autofocus}
            autocorrect={autocorrect.toString()}
            {spellcheck}
            {autocapitalize}

            bind:this={inputEl}
        >
    </slot>
    <label for="{spacedToHyphened(labelText)}">{labelText}</label>
</div>

<style>
    .inputGroup {
        position: relative;
        margin-top: calc(1em + var(--paddingBlock));
    }

    input {
        width: 100%;
        padding: var(--paddingBlock) var(--paddingInline);
    }

    label {
        position: absolute;
        top: var(--paddingBlock);
        left: var(--paddingInline);
        color: var(--content-7);

        font-weight: bold;
        
        pointer-events: none;
        transition: all 0.2s ease-out;
    }

    input:focus + label, input:not(:placeholder-shown) + label {
        top: calc(-1em - var(--paddingBlock));
        left: 5px;
        color: var(--content);
    }

    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
        background-color: var(--main);
        color: var(--content);
    }
</style>