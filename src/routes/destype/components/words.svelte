<script lang="ts">
	import { onMount, onDestroy, createEventDispatcher } from "svelte";
	import { blur } from "svelte/transition";
	import { game, language, seconds } from "../stores";

    type Game = 'waiting for input' | 'in progress' | 'game over'
    const dispatch = createEventDispatcher();

    export let words: string[] = []
    export let correctLetters: number;
    export let totalLetters: number;

    let typedLetter = ''
    let wordIndex = 0
    let letterIndex = 0
    let caretAnimation: string = 'infinite';

    let timerTick: ReturnType<typeof setInterval>;

    let wordsEl: HTMLDivElement
    let letterEL: HTMLSpanElement
    let inputEL: HTMLInputElement
    let caretEL: HTMLDivElement


    function setGameState(newState:Game) {
        $game = newState
    }

    function startGame() {
        setGameState('in progress')
        setGameTimer()
    }

    function setGameTimer() {
        timerTick = setInterval(gameTimer, 1000)

        function gameTimer() {
            if ($seconds <= 0) {
                setGameState('game over')
            }

            if ($game !== 'in progress') {
                clearInterval(timerTick)
            }else{
                $seconds--
            }
        }
    }



    function isValidKey(event : KeyboardEvent) {
        const pattern = /^[a-zA-Z\s]$/;
        return pattern.test(event.key) || (event.key === 'Backspace' && totalLetters !== 0);
    }
    
    function handleKeyDown(event: KeyboardEvent) {
        if ($game === 'waiting for input' && isValidKey(event)) {
            startGame()
        }

        if (event.code === 'Space') {
            if($game === 'in progress'){
                nextWord()
            }
        }
        else if (event.code === 'Backspace') {
            if($game === 'in progress'){
                backspace()
            }
        }
    }

    function updateGameState() {
        const isWordCompleted = letterIndex > words[wordIndex].length - 1

        if (!isWordCompleted && typedLetter !== ' ') {
            setLetter()
            checkLetter()
        }else{
            resetLetter()
        }

    }


 
    function setLetter() {
        letterEL = wordsEl.children[wordIndex].children[letterIndex] as HTMLSpanElement
	}

    function checkLetter() {

        if (aprovedLetters()) {
            acceptLetter()
            return
        }
        else if ($language !== 'Русский'){
            if (aprovedLetters([
                'a','a','a','a',
                'e','e','e','e',
                'i','i','i','i',
                'o','o','o','o',
                'u','u','u','u',
                'n',
                'c'
            ],[
                'á','à','â','ä',
                'é','è','ê','ë',
                'í','ì','î','ï',
                'ó','ò','ô','ö',
                'ú','ù','û','ü',
                'ñ',
                'ç'
            ])) {
                acceptLetter()
                return
            }
        }
        else {
            if (aprovedLetters([
                'a', 'b', 'v', 'g', 'd', 'e', 'ye', 'yo', 'j', 'zh', 'z', 's', 'i', 'i', 'y', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u', 'f', 'h', 'kh', 'z', 'ts', 'ch', 'sh', 'sh', 'ch', 'sch', '-', `'`, 'i', 'y', `'`, 'e', 'yu', 'ya'
            ],[
                'а', 'б', 'в', 'г', 'д', 'е', 'е', 'ё', 'ж', 'ж', 'з', 'з', 'и', 'й', 'й', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'х', 'ц', 'ц', 'ч', 'ш', 'щ', 'щ', 'щ', 'ъ', 'ъ', 'ы', 'ы', 'ь', 'э', 'ю', 'я'
            ])) {
                acceptLetter()
                return
            }

            else if (aprovedLetters([
                'y','y','y','y','z','k','t','c','s','s','sc'
            ],[
                'е','ё','ю','я','ж','х','ц','ч','ш','щ','щ'
            ])){
                return
            }
        }

        
        letterEL.dataset.letter = 'incorrect'
        nextLetter()
        resetLetter()
        moveCaret()
        
	}

	function nextLetter() {
        letterIndex++
        totalLetters++
	}

    function moveCaret() {  
        if ($game !== 'game over' && letterEL) {
            const offset = 4
            const {offsetLeft, offsetTop, offsetWidth} = letterEL
    
            caretEL.style.top = `${offsetTop + offset}px`
            caretEL.style.left = `${offsetLeft + ((letterEL.dataset.letter) ? offsetWidth : 0)}px`
        }
    }

    function resetLetter() {
        typedLetter = ''
	}

    function acceptLetter() {
        letterEL.dataset.letter = 'correct'
        correctLetters++
        nextLetter()
        resetLetter()
        moveCaret()
	}

    function aprovedLetters(typedPossibilities:string[] | undefined = undefined, correctPossibilities:string[] | undefined = undefined):boolean {
        const currentLetter = words[wordIndex][letterIndex]
        if (typedPossibilities && correctPossibilities) {
            if (typedPossibilities.length !== correctPossibilities.length) {
                throw new Error("This function compares letters one to one. Arrays should have equal length");
            }

            for (let i = 0; i < typedPossibilities.length; i++) {
                const typed = typedPossibilities[i];
                const correct = correctPossibilities[i]

                if (typedLetter.toLowerCase() === typed && currentLetter.toLowerCase() === correct){
                    return true
                }
            }
            return false

        }else{
            return typedLetter.toLowerCase() === currentLetter.toLowerCase()
        }
    }



    function backspace() {
        if (letterEL.dataset.letter) {
            // Normal in-between word scenario
            totalLetters--
            if (letterEL.dataset.letter === 'correct') {
                correctLetters--
            }
            letterEL.dataset.letter = ''
            moveCaret()
            letterIndex--
            setLetter()
        }
        else if (letterIndex > 0){
            // Double backspace scenario
            totalLetters--
            letterIndex--
            setLetter()
            if (letterEL.dataset.letter === 'correct') {
                correctLetters--
            }
            letterEL.dataset.letter = ''
            moveCaret()
        }
        else if (wordIndex > 0){
            // Return to previous word scenario
            wordIndex--
            letterIndex = words[wordIndex].length - 1
            setLetter()
            while (!letterEL.dataset.letter) {
                letterIndex--
                setLetter()
            }
            moveCaret()
            letterIndex++
            updateLine()
        }

        if (totalLetters === 0 && $game === 'in progress') {
            clearInterval(timerTick)
            dispatch('wentBack');
        }
    }

	function nextWord() {
        const isFirstLetter = letterIndex === 0
        const isOneLetterWord = words[wordIndex].length === 1

        if (!isFirstLetter || isOneLetterWord) {
            wordIndex++
            letterIndex = 0
            setLetter()
            moveCaret()
            updateLine()
            verifyWordsLeft()
        }
	}

    function updateLine() {
        const wordEl = wordsEl.children[wordIndex] as HTMLElement
        wordEl.scrollIntoView({block: "center", behavior: 'smooth'})
    }



    onMount(() => {
        focusInput(undefined)
    })

    function verifyWordsLeft() {
        if(wordIndex > words.length - 30){
            dispatch('shortOfWords');
        }
    }
    
    onDestroy(() => {
        resetLetter()
        wordIndex = 0
        letterIndex = 0
    })


    function focusInput(event: { target: any; } | undefined) {
        if (inputEL && (!event || !(event.target instanceof HTMLInputElement))) {
            inputEL.focus()
        }
    }

    function inputBlured() {
        if ($game === 'in progress') {
            setGameState('waiting for input')
        }
        caretAnimation = 'linear'
    }
    
</script>


<svelte:window on:resize={moveCaret} on:click={focusInput} on:focus={focusInput}/>

<input 
    type="text" 
    bind:this={inputEL} 
    bind:value={typedLetter} 
    on:input={updateGameState}
    on:keydown={handleKeyDown}
    on:blur={inputBlured}
    on:focus={() => caretAnimation = 'infinite'}
/>

<div in:blur class="words" bind:this={wordsEl}>

    {#each words as word}
        <span class="word">

            {#each word as letter}
                <span class="letter">{letter}</span>
            {/each}

        </span>
    {/each}

    <div bind:this={caretEL} style="--caretAnimation: {caretAnimation}" class="caret"></div>

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
        gap: .6em;
        position: relative;
        font-size: 1.5rem;
        line-height: var(--line-height);
        overflow: hidden;
        user-select: none;
    }

    .letter {
        opacity: .4;
        transition: all .3s ease;
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
        transition: all .2s ease;
    }

    @keyframes caret {
        0%, 100% {opacity: 0;}
        50% {opacity: 1;}
    }

</style>