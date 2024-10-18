<script lang="ts">
	import { fade, slide } from 'svelte/transition';
	import { dictionary, isLanguage, language, type Language } from '../stores';

	let languageFlags: Record<Language, string> = {
		de: 'germanyFlag.webp',
		en: 'usFlag.webp',
		es: 'spainFlag.webp',
		fr: 'franceFlag.webp',
		it: 'italyFlag.webp',
		pt: 'brazilFlag.webp',
		ru: 'russiaFlag.webp',
	};

	function getLanguageName(languageCode: Language): string | undefined {
		const languageMappings: Record<Language, string> = {
			de: 'deutsch',
			en: 'english',
			es: 'español',
			fr: 'français',
			it: 'italiano',
			pt: 'português',
			ru: 'Русский',
		};

		return languageMappings[languageCode];
	}

	function changeLanguage(newLanguage: string) {
		$language = newLanguage as Language;
		active = false;
	}

	export let button: HTMLButtonElement | undefined = undefined;

	let active: boolean = false;

	function toggle() {
		active = !active;
	}

	function close() {
		active = false;
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

{#key $language}
	<div class="languagePicker">
		<span>{$dictionary.language}:</span>

		<button
			in:fade|global
			bind:this={button}
			class="selectedLanguage"
			class:active
			on:click={toggle}
			aria-label={getLanguageName($language)}
		>
			<img src="/images/{languageFlags[$language]}" alt={getLanguageName($language)} />
			<span class="capitalize">{getLanguageName($language)}</span>
		</button>
	</div>
{/key}

{#if active}
	<section transition:slide use:clickOutside>
		{#each Object.entries(languageFlags) as [languageCode, flag], i}
			{#if isLanguage(languageCode)}
				<button
					class:hide={languageCode === $language}
					tabindex={languageCode === $language ? -1 : 0}
					lang={languageCode}
					aria-label={getLanguageName(languageCode)}
					on:click={() => {
						changeLanguage(languageCode);
					}}
				>
					<img src="/images/{flag}" alt={getLanguageName(languageCode)} />
					<span class="capitalize">{getLanguageName(languageCode)}</span>
				</button>
			{/if}
		{/each}
	</section>
{/if}

<style>
	.languagePicker,
	button {
		display: flex;
		gap: 1ch;
		align-items: center;
	}

	.selectedLanguage {
		padding: 0.4rem 0.8rem;
		border-radius: 20px;
		border: 1px solid var(--content);

		font-size: 0.85em;
		font-weight: normal;
		color: var(--content);

		transition: all 0.2s;
	}

	.selectedLanguage:hover,
	.selectedLanguage:focus-visible,
	.active {
		box-shadow: 2px 2px 8px var(--content-4);
	}

	.active {
		background-color: var(--content);
		color: var(--main);
	}

	section {
		position: fixed;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);

		display: flex;
		flex-direction: column;
		gap: 0.5em;

		width: fit-content;
		max-width: 90%;
		padding: 1.5em 1.5em 2em;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;

		background-color: var(--content-9);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		color: var(--main);
		box-shadow: 0 0 10px var(--content-4);

		z-index: 11;
		overflow: hidden;
	}

	section button {
		width: 100%;
		padding: 0.5rem 1.5rem;
		border-radius: 10px;

		font-size: 1.1rem;
		text-align: center;
	}

	section button:hover,
	section button:focus-visible {
		background-color: var(--main-2);
	}

	section button:focus-visible {
		outline-color: var(--interactive);
		z-index: 2;
	}

	img {
		height: 1rem;
		width: auto;
		border-radius: 0.2rem;
	}

	section img {
		box-shadow: 2px 2px 4px var(--main-1);
	}

	.capitalize {
		text-transform: capitalize;
	}
</style>
