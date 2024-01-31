<script lang="ts">
	import { spacedToHyphened } from '../functions';

	type El = 'input' | 'textarea';

	export let element: El = 'input';

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
	export let autocapitalize: string = 'on';

	export let rows: number = 5;

	export let inputEl: HTMLElement | undefined = undefined;
</script>

<!-- svelte-ignore a11y-autofocus -->
<div
	class="inputGroup"
	style="--paddingBlock: {paddingBlock}; --paddingInline: {paddingInline}; {containerStyle}"
>
	{#if element === 'input'}
		<input
			class={className || 'ghostButton'}
			type={inputType}
			id={spacedToHyphened(labelText)}
			aria-label={labelText}
			placeholder=""
			style={inputStyle}
			{required}
			{autocomplete}
			{autofocus}
			autocorrect={autocorrect.toString()}
			{spellcheck}
			{autocapitalize}
			bind:this={inputEl}
		/>
	{:else if element === 'textarea'}
		<textarea
			{rows}
			class={className || 'ghostButton'}
			id={spacedToHyphened(labelText)}
			aria-label={labelText}
			placeholder=""
			style={inputStyle}
			{required}
			{autocomplete}
			{autofocus}
			autocorrect={autocorrect.toString()}
			{spellcheck}
			{autocapitalize}
			bind:this={inputEl}
		/>
	{/if}
	<label for={spacedToHyphened(labelText)}>{labelText}</label>
</div>

<style>
	.inputGroup {
		position: relative;
		margin-top: calc(1em + var(--paddingBlock));
	}

	input,
	textarea {
		width: 100%;
		padding: var(--paddingBlock) var(--paddingInline);
	}

	label {
		position: absolute;
		top: var(--paddingBlock);
		left: var(--paddingInline);
		color: var(--content-7);

		font-weight: bold;
		text-wrap: nowrap;

		max-width: 100%;
		overflow: hidden;
		overflow: clip;

		pointer-events: none;
		transition: all 0.2s ease-out;
	}

	input:focus + label,
	input:not(:placeholder-shown) + label {
		top: calc(-1em - var(--paddingBlock));
		left: 5px;
		color: var(--content);
	}

	textarea:focus + label,
	textarea:not(:placeholder-shown) + label {
		top: calc(-1em - var(--paddingBlock));
		left: 5px;
		color: var(--content);
	}

	input:not(:placeholder-shown),
	textarea:not(:placeholder-shown) {
		box-shadow: inset 0 0 3rem var(--interactive-5);
	}

	:global([data-theme='light']) input:not(:placeholder-shown),
	:global([data-theme='light']) textarea:not(:placeholder-shown) {
		box-shadow: inset 0 0 3rem var(--main);
	}
</style>
