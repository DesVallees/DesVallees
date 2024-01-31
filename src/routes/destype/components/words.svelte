<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import { blur } from 'svelte/transition';
	import { dictionary, game, language, seconds } from '../stores';

	type Game = 'waiting for input' | 'in progress' | 'game over';
	const dispatch = createEventDispatcher();

	export let words: string[] = [];
	export let correctLetters: number;
	export let totalLetters: number;

	const invisibleCharacter = '‎';
	let inputValue: string = invisibleCharacter;
	let typedLetter = '';

	let wordIndex = 0;
	let letterIndex = 0;
	let caretAnimation: string = 'infinite';
	let wordHasACorrectLetter: boolean = false;

	let timerTick: ReturnType<typeof setInterval>;

	let wordsEl: HTMLDivElement;
	let letterEl: HTMLSpanElement;
	let inputEL: HTMLInputElement;
	let caretEL: HTMLDivElement;

	function setGameState(newState: Game) {
		$game = newState;
	}

	function startGame() {
		setGameState('in progress');
		setGameTimer();
		updateLine();
	}

	function setGameTimer() {
		timerTick = setInterval(gameTimer, 1000);

		function gameTimer() {
			if ($seconds <= 0) {
				setGameState('game over');
			}

			if ($game !== 'in progress') {
				clearInterval(timerTick);
			} else {
				$seconds--;
			}
		}
	}

	function handleInput() {
		getTypedLetter();

		const isSpace: boolean = typedLetter === ' ';
		const isBackspace: boolean = inputValue === '';
		const isSpaceOrBackspaceAtStart: boolean = (isSpace || isBackspace) && totalLetters === 0;

		if (isSpaceOrBackspaceAtStart) {
			prepareForNextInput();
		} else if ($game === 'waiting for input') {
			startGame();
		}

		if ($game === 'in progress') {
			const isWordCompleted: boolean = letterIndex > words[wordIndex].length - 1;

			if (isBackspace) {
				backspace();
				prepareForNextInput();
			} else if (isSpace) {
				space();
				prepareForNextInput();
			} else if (!isWordCompleted) {
				setLetter();
				checkLetter();
			} else {
				prepareForNextInput();
			}
		}
	}

	function getTypedLetter() {
		if (inputValue.length === 1 && inputValue !== invisibleCharacter) {
			inputValue = invisibleCharacter + inputValue;
		}

		if (inputValue.length > 0) {
			typedLetter = inputValue.substring(1);
		}
	}

	function prepareForNextInput() {
		inputValue = invisibleCharacter;
		typedLetter = '';
		moveCaret();
	}

	function setLetter() {
		letterEl = wordsEl.children[wordIndex].children[letterIndex] as HTMLSpanElement;
	}

	function checkLetter() {
		if (isLetterAproved()) {
			acceptLetter();
			return;
		} else if ($language !== 'ru') {
			if (
				isLetterAproved(
					[
						'a',
						'a',
						'a',
						'a',
						'e',
						'e',
						'e',
						'e',
						'i',
						'i',
						'i',
						'i',
						'o',
						'o',
						'o',
						'o',
						'u',
						'u',
						'u',
						'u',
						'n',
						'c',
						'´',
						'‘',
						'`',
					],
					[
						'á',
						'à',
						'â',
						'ä',
						'é',
						'è',
						'ê',
						'ë',
						'í',
						'ì',
						'î',
						'ï',
						'ó',
						'ò',
						'ô',
						'ö',
						'ú',
						'ù',
						'û',
						'ü',
						'ñ',
						'ç',
						`'`,
						`'`,
						`'`,
					],
				)
			) {
				acceptLetter();
				return;
			}
		} else {
			if (
				isLetterAproved(
					[
						'a',
						'b',
						'v',
						'g',
						'd',
						'e',
						'ye',
						'o',
						'yo',
						'j',
						'zh',
						'y',
						'z',
						's',
						'i',
						'i',
						'y',
						'j',
						'k',
						'l',
						'm',
						'n',
						'o',
						'p',
						'r',
						's',
						't',
						'u',
						'f',
						'h',
						'kh',
						'j',
						'z',
						'ts',
						'ch',
						'sh',
						'sh',
						'ch',
						'sch',
						'i',
						'y',
						'e',
						'yu',
						'u',
						'ya',
						'a',
						'-',
						'´',
						'‘',
						'`',
						`'`,
						`'`,
						'´',
						'‘',
						'`',
					],
					[
						'а',
						'б',
						'в',
						'г',
						'д',
						'е',
						'е',
						'ё',
						'ё',
						'ж',
						'ж',
						'ж',
						'з',
						'з',
						'и',
						'й',
						'й',
						'й',
						'к',
						'л',
						'м',
						'н',
						'о',
						'п',
						'р',
						'с',
						'т',
						'у',
						'ф',
						'х',
						'х',
						'х',
						'ц',
						'ц',
						'ч',
						'ш',
						'щ',
						'щ',
						'щ',
						'ы',
						'ы',
						'э',
						'ю',
						'ю',
						'я',
						'я',
						'ъ',
						'ъ',
						'ъ',
						'ъ',
						'ъ',
						'ь',
						'ь',
						'ь',
						'ь',
					],
				)
			) {
				acceptLetter();
				return;
			} else if (
				isLetterAproved(
					['y', 'y', 'y', 'y', 'z', 'k', 't', 'c', 's', 's', 'c', 'sc'],
					['е', 'ё', 'ю', 'я', 'ж', 'х', 'ц', 'ч', 'ш', 'щ', 'щ', 'щ'],
				)
			) {
				return;
			}
		}

		denyLetter();
	}

	function isLetterAproved(
		typedPossibilities: string[] | undefined = undefined,
		correctPossibilities: string[] | undefined = undefined,
	): boolean {
		const currentLetter = words[wordIndex][letterIndex];
		if (typedPossibilities && correctPossibilities) {
			if (typedPossibilities.length !== correctPossibilities.length) {
				throw new Error(
					'This function compares letters one to one. Arrays must have equal length',
				);
			}

			for (let i = 0; i < typedPossibilities.length; i++) {
				const typed = typedPossibilities[i];
				const correct = correctPossibilities[i];

				if (
					typedLetter.toLowerCase() === typed &&
					currentLetter.toLowerCase() === correct
				) {
					return true;
				}
			}
			return false;
		} else {
			return typedLetter.toLowerCase() === currentLetter.toLowerCase();
		}
	}

	function acceptLetter() {
		letterEl.dataset.letter = 'correct';
		correctLetters++;
		wordHasACorrectLetter = true;

		prepareForNextInput();
		nextLetter();
	}

	function denyLetter() {
		letterEl.dataset.letter = 'incorrect';

		prepareForNextInput();
		nextLetter();
	}

	function nextLetter() {
		letterIndex++;
		totalLetters++;
	}

	function backspace() {
		if (letterEl.dataset.letter) {
			// Normal in-between word scenario
			totalLetters--;
			letterIndex--;

			if (letterEl.dataset.letter === 'correct') {
				correctLetters--;
			}

			letterEl.dataset.letter = '';
			setLetter();
		} else if (letterIndex > 0) {
			// Double backspace scenario
			totalLetters--;
			letterIndex--;
			setLetter();

			if (letterEl.dataset.letter === 'correct') {
				correctLetters--;
			}

			letterEl.dataset.letter = '';
		} else if (wordIndex > 0) {
			// Return to previous word scenario
			wordIndex--;
			wordHasACorrectLetter = false;

			letterIndex = 0;

			while (letterIndex <= words[wordIndex].length - 1) {
				setLetter();

				if (letterEl.dataset.letter) {
					letterIndex++;

					if (letterEl.dataset.letter === 'correct') wordHasACorrectLetter = true;
				} else {
					break;
				}
			}

			if (wordHasACorrectLetter) {
				totalLetters--;
				correctLetters--;
			}

			updateLine();
		}

		if (letterIndex === 0 && wordIndex === 0 && $game === 'in progress') {
			wordHasACorrectLetter = false;
			clearInterval(timerTick);
			dispatch('wentBack');
		}
	}

	function space() {
		const isFirstLetter = letterIndex === 0;

		if (!isFirstLetter) {
			if (wordHasACorrectLetter) {
				totalLetters++;
				correctLetters++;
				wordHasACorrectLetter = false;
			}
			wordIndex++;

			letterIndex = 0;
			setLetter();
			updateLine();
			verifyWordsLeft();
		}
	}

	function moveCaret() {
		if ($game !== 'game over' && letterEl) {
			const offset = 4;
			const { offsetLeft, offsetTop, offsetWidth } = letterEl;

			caretEL.style.top = `${offsetTop + offset}px`;
			caretEL.style.left = `${offsetLeft + (letterEl.dataset.letter ? offsetWidth : 0)}px`;
		}
	}

	function updateLine() {
		const wordEl = wordsEl.children[wordIndex] as HTMLElement;
		wordEl.scrollIntoView({ block: 'center', behavior: 'smooth' });
	}

	onMount(() => {
		focusInput(undefined);
	});

	function verifyWordsLeft() {
		if (wordIndex > words.length - 30) {
			dispatch('shortOfWords');
		}
	}

	function focusInput(event: { target: any } | undefined) {
		if (inputEL && (!event || !(event.target instanceof HTMLInputElement))) {
			inputEL.focus();
		}
	}

	function handleInputBlured() {
		if ($game === 'in progress') {
			setGameState('waiting for input');
		}
		caretAnimation = 'linear';
	}
</script>

<svelte:window on:resize={moveCaret} on:click={focusInput} on:focus={focusInput} />

<input
	type="text"
	bind:this={inputEL}
	bind:value={inputValue}
	on:input={handleInput}
	on:blur={handleInputBlured}
	on:focus={() => (caretAnimation = 'infinite')}
	on:select={() => (inputEL.selectionStart = inputEL.selectionEnd)}
	aria-label={words[wordIndex]
		? `${$dictionary.type} ${words[wordIndex]}`
		: `${$dictionary.gettingWords}`}
	autocapitalize="none"
	autocomplete="off"
	autocorrect="off"
/>

<div in:blur class="words" bind:this={wordsEl}>
	{#each words as word}
		<span class="word">
			{#each word as letter}
				<span class="letter">{letter}</span>
			{/each}
		</span>
	{/each}

	<div bind:this={caretEL} style="--caretAnimation: {caretAnimation}" class="caret" />
</div>

<style>
	input {
		position: absolute;
		opacity: 0;
		cursor: default;
	}

	.words {
		--line-height: 1em;
		--lines: 3;

		max-width: 70ch;
		height: calc(var(--line-height) * var(--lines) * 1.45);
		display: flex;
		flex-wrap: wrap;
		gap: 0.6em;
		position: relative;
		font-size: 1.5rem;
		line-height: var(--line-height);
		overflow: hidden;
		user-select: none;
	}

	.letter {
		opacity: 0.4;
		transition: all 0.3s ease;
	}

	:global(.letter[data-letter='correct']) {
		opacity: 1;
	}

	:global(.letter[data-letter='incorrect']) {
		opacity: 1;
		color: var(--primary);
	}

	.caret {
		position: absolute;
		height: 1.1em;
		top: 0;
		border-right: 2px solid var(--primary);
		animation: caret 1s var(--caretAnimation);
		transition: all 0.2s ease;
	}

	@keyframes caret {
		0%,
		100% {
			opacity: 0;
		}
		50% {
			opacity: 1;
		}
	}
</style>
