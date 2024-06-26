<script lang="ts">
	import { fade, slide } from 'svelte/transition';
	import { dictionary } from '../stores';

	export let options: { id: number; name: string }[];
	export let button: HTMLButtonElement | undefined = undefined;

	let optionsVisible: boolean = false;
	export let optionSelectedIndex: number = 0;
	export let value: number = options[optionSelectedIndex].id;

	$: optionSelectedIndex, (value = options[optionSelectedIndex].id);

	function toggle() {
		optionsVisible = !optionsVisible;
	}

	function close() {
		optionsVisible = false;
	}

	function clickOutside(node: any) {
		const handleClick = (event: any) => {
			if (!node.contains(event.target) && !button?.contains(event.target)) {
				close();
			}
		};

		document.addEventListener('click', handleClick, true);

		return {
			destroy() {
				document.removeEventListener('click', handleClick, true);
			},
		};
	}
</script>

{#key optionSelectedIndex}
	<button
		in:fade|global
		bind:this={button}
		class="selectedTeam"
		class:active={optionsVisible}
		on:click={toggle}
		aria-label="{$dictionary.visibleTo} {options[optionSelectedIndex].name}"
	>
		{options[optionSelectedIndex].name}
	</button>
{/key}

{#if optionsVisible}
	<section transition:slide use:clickOutside>
		{#each options as name, i}
			<button
				class:selected={i === optionSelectedIndex}
				tabindex={i === optionSelectedIndex ? -1 : 0}
				on:click={() => {
					optionSelectedIndex = i;
					close();
				}}>{name.name}</button
			>
		{/each}
	</section>
{/if}

<style>
	.selectedTeam {
		font-size: 0.9rem;
		font-weight: normal;
		border-radius: 20px;
		background-color: #0000002a;
		border: 1px solid #fff;
		padding: 0.2rem 0.8rem;
		transition: all 0.2s;
	}

	.selectedTeam:hover,
	.selectedTeam:focus-visible,
	.active {
		background-color: var(--content);
		color: var(--main);
	}

	section {
		position: fixed;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		padding: 1.5em 2em 2em;

		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		background-color: var(--content);
		box-shadow: 0 0 10px rgba(255, 255, 255, 0.322);
		width: fit-content;
		max-width: 90%;
		overflow: hidden;
		z-index: 11;

		display: flex;
		flex-direction: column;
		gap: 0.5em;
	}

	section button {
		width: 100%;
		padding: 0.5rem 1.5rem;
		border-radius: 10px;
		font-size: 1.1rem;
		text-align: center;
		color: var(--main);
	}

	section button:hover:not(:disabled) {
		background-color: #0000002a;
	}

	section button:focus-visible {
		outline-color: black;
	}

	.selected {
		opacity: 0.7;
		cursor: default;
		background-color: #0000002a;
	}

	@media screen and (max-width: 500px) {
		section {
			padding: 1.5em 1em 2em;
		}
	}
</style>
