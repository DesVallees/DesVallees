<script lang="ts">
	import { fade } from 'svelte/transition';
	import { changeTurn, dictionary, startGame, state, task, time, time2, turn } from './stores';

	let blueButton: HTMLButtonElement;
	let redButton: HTMLButtonElement;
	function rejectTurnChange(button: HTMLButtonElement) {}
</script>

<div in:fade class="subito">
	{#if $state === 'start'}
		<button class="start" on:click={startGame}>{$dictionary.start}</button>
	{/if}

	<button
		bind:this={blueButton}
		class="side blue"
		style="height: {$turn % 2 === 0 && $state === 'playing'
			? '200'
			: $state !== 'redWins'
			? '100'
			: '0'}%;"
		on:click={() => ($turn % 2 === 0 ? changeTurn() : rejectTurnChange(blueButton))}
	>
		{#if $state === 'playing'}
			<div class="timer time-blue">{$time}</div>

			<div style="font-size: {$turn % 2 === 0 ? '1.5' : '1.25'}em;" class="task task-blue">
				{$task}
			</div>
		{/if}
	</button>
	<button
		bind:this={redButton}
		class="side red"
		style="height: {$turn % 2 === 1 && $state === 'playing'
			? '200'
			: $state !== 'blueWins'
			? '100'
			: '0'}%;"
		on:click={() => ($turn % 2 === 1 ? changeTurn() : rejectTurnChange(redButton))}
	>
		{#if $state === 'playing'}
			<div class="timer time-red">{$time2}</div>

			<div style="font-size: {$turn % 2 === 1 ? '1.5' : '1.25'}em;" class="task task-red">
				{$task}
			</div>
		{/if}
	</button>

	{#if $state === 'playing'}
		<button
			style="top: {$state === 'playing' ? ($turn % 2 === 0 ? '66' : '33') : '50'}%;"
			class="pause"
			on:click={() => ($state = 'paused')}><ion-icon name="pause-outline" /></button
		>
	{/if}

	{#if $state === 'paused'}
		<button class="start" on:click={() => ($state = 'playing')}>{$dictionary.resume}</button>
	{/if}

	{#if $state === 'redWins' || $state === 'blueWins'}
		<div class="endScreen">
			<h1>
				{#if $state === 'redWins'}
					{$dictionary.redTeamWins}
				{:else}
					{$dictionary.blueTeamWins}
				{/if}
			</h1>
			<button on:click={startGame}><ion-icon name="refresh-outline" /></button>
		</div>
	{/if}
</div>

<svelte:head>
	<title>Súbito</title>
</svelte:head>

<style>
	.subito {
		position: relative;

		display: flex;
		flex-direction: column;

		width: 100%;
		height: 100%;
	}

	.start {
		position: absolute;
		top: 50%;
		left: 50%;
		translate: -50% -50%;

		border-radius: 50%;
		padding: 1em;
		aspect-ratio: 1 / 1;

		background-color: rgb(29, 175, 21);
		box-shadow: 0 0 10px #00000099;

		font-size: 2rem;
		font-weight: bold;

		z-index: 1;
		animation: rotate 5s infinite linear;
	}

	@keyframes rotate {
		15% {
			transform: rotate(180deg);
		}
		50% {
			transform: rotate(180deg);
		}
		65% {
			transform: rotate(360deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	.pause {
		position: absolute;
		top: 50%;
		left: 10%;
		transform: translateY(-50%);

		display: flex;
		justify-content: center;
		align-items: center;

		border-radius: 50%;
		width: 3.5rem;
		height: 3.5rem;

		background-color: rgb(255, 255, 255);
		box-shadow: 2px 2px 10px #00000099;

		color: black;
		font-size: 1.7rem;
		font-weight: bolder;

		z-index: 1;
		transition: all 0.25s;
	}

	.endScreen {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;

		display: grid;
		place-content: center;
		place-items: center;
		gap: 3em;
	}

	.endScreen h1 {
		font-size: 2.5rem;
		max-width: 70%;
		text-align: center;
	}

	.endScreen button {
		display: flex;
		justify-content: center;
		align-items: center;

		border-radius: 50%;
		width: 4rem;
		height: 4rem;

		background-color: rgb(29, 175, 21);
		box-shadow: 2px 2px 10px #00000099;

		font-size: 1.7rem;
		font-weight: bolder;

		z-index: 1;
	}

	.side {
		position: relative;

		width: 100%;
		height: 100%;

		transition: all 0.25s;
	}

	.blue {
		background-color: rgb(48, 48, 255);
	}

	.red {
		background-color: rgb(255, 62, 62);
	}

	.timer {
		position: absolute;
		right: 0.5em;

		font-weight: bold;
		font-size: 3rem;
	}

	.task {
		max-width: 65ch;
		font-size: 1.5em;
		font-weight: 500;
		padding: 10%;

		transition: all 0.2s;
	}

	.task-blue {
		transform: rotate(180deg);
	}

	.time-blue {
		bottom: 0.5em;
		transform: rotate(180deg);
	}

	.time-red {
		top: 0.5em;
	}
</style>
