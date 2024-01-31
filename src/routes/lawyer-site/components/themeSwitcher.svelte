<script lang="ts">
	import { dictionary, theme } from '../stores';

	function toggleTheme() {
		if ($theme === 'dark') {
			$theme = 'light';
		} else {
			$theme = 'dark';
		}
	}
</script>

<button
	on:click={toggleTheme}
	class={$theme === 'dark' ? 'dark' : 'light'}
	aria-label={$dictionary.darkMode}
	aria-pressed={$theme === 'dark'}
>
	<div>
		{#if $theme === 'dark'}
			<ion-icon name="moon" />
		{:else}
			<ion-icon name="sunny" />
		{/if}
	</div>
</button>

<style>
	button {
		position: relative;

		height: 1.3rem;
		aspect-ratio: 16 / 7;
		border: 0.1em solid var(--content);
		border-radius: 10px;

		translate: 0 0.1em;
		transition: all 0.2s;
	}

	button:hover,
	button:focus-visible {
		box-shadow: 0 0 5px var(--content-5);
	}

	div {
		position: absolute;
		top: 10%;
		bottom: 10%;

		display: flex;

		transition: all 0.2s;
	}

	button.dark div {
		left: 100%;
		translate: -105% 0;
	}

	button.light div {
		left: 0;
		translate: 5% 0;
	}

	ion-icon {
		height: 100%;
	}
</style>
