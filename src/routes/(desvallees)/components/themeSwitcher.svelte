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

<div class="themeSwitcher">
	<span>{$dictionary.theme}:</span>
	<button
		on:click={toggleTheme}
		class={$theme === 'dark' ? 'dark' : 'light'}
		aria-label={$dictionary.darkMode}
		aria-pressed={$theme === 'dark'}
	>
		<div class="icon">
			{#if $theme === 'dark'}
				<ion-icon name="moon" />
			{:else}
				<ion-icon name="sunny" />
			{/if}
		</div>
	</button>
</div>

<style>
	.themeSwitcher {
		display: flex;
		gap: 1.5ch;
		align-items: center;
	}

	button {
		position: relative;

		height: 1.4em;
		aspect-ratio: 16 / 7;
		border: 1px solid var(--content);
		border-radius: 20px;

		transition: all 0.2s;
		transform: scale(1.1);
	}

	button:hover,
	button:focus-visible {
		box-shadow: 2px 2px 8px var(--content-4);
	}

	.icon {
		position: absolute;
		top: 0.25em;
		bottom: 0.25em;

		display: flex;

		transition: left 0.2s;
	}

	button.dark .icon {
		left: 100%;
		translate: -105% 0;
	}

	button.light .icon {
		left: 0;
		translate: 5% 0;
	}

	ion-icon {
		height: 100%;
	}
</style>
