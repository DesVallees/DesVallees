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
				<!-- Moon SVG icon -->
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M12.72 2C8.134 2 4.5 5.64 4.5 10.224c0 4.585 3.634 8.224 8.22 8.224a8.236 8.236 0 0 0 7.062-4.014 8.237 8.237 0 0 1-2.797.497c-4.585 0-8.224-3.634-8.224-8.224A8.23 8.23 0 0 1 12.72 2z"
						fill="currentColor"
					/>
				</svg>
			{:else}
				<!-- Sun SVG icon -->
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M12 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm6.364 2.636a1 1 0 0 1 1.414-1.414 1 1 0 0 1-1.414 1.414zM12 20a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-6.364-2.636a1 1 0 0 1 0-1.414 1 1 0 1 1 0 1.414zm12.728 0a1 1 0 0 1 0-1.414 1 1 0 1 1 0 1.414zM6.364 6.364a1 1 0 1 1 1.414-1.414 1 1 0 0 1-1.414 1.414zM2 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm18 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM12 6.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11z"
						fill="currentColor"
					/>
				</svg>
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
		top: 0.15em;
		bottom: 0.15em;

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

	svg {
		height: 100%;
	}
</style>
