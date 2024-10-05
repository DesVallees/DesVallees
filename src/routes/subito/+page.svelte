<script lang="ts">
	import { fade } from 'svelte/transition';
	import {
		blueParticipants,
		changeTurn,
		dictionary,
		initialTime,
		openSettings,
		redParticipants,
		settingsOpened,
		startGame,
		state,
		task,
		time,
		time2,
		turn,
	} from './stores';

	import Settings from './components/settings.svelte';
	import EndScreen from './components/endScreen.svelte';
	import SettingsButton from './components/settingsButton.svelte';

	function getParticipantName() {
		if ($turn % 2 === 0 && $blueParticipants.length > 0) {
			return `${$blueParticipants[Math.floor($turn / 2) % $blueParticipants.length]},`;
		} else if ($turn % 2 === 1 && $redParticipants.length > 0) {
			return `${$redParticipants[Math.floor($turn / 2) % $redParticipants.length]},`;
		}
		return '';
	}
</script>

<div in:fade class="subito">
	{#if $state === 'start'}
		<button class="start" on:click={startGame}>{$dictionary.start}</button>

		<SettingsButton />
	{/if}

	{#if $state === 'playing'}
		<button
			style="top: {$state === 'playing' ? ($turn % 2 === 0 ? '66' : '33') : '50'}%;"
			class="pause"
			on:click={() => ($state = 'paused')}><ion-icon name="pause-outline" /></button
		>
	{/if}

	{#if $state === 'paused'}
		<button class="start" on:click={() => ($state = 'playing')}>{$dictionary.resume}</button>

		<SettingsButton />
	{/if}

	{#if $state === 'redWins' || $state === 'blueWins'}
		<EndScreen />
	{/if}

	<button
		class="side blue"
		style="height: {$turn % 2 === 0 && $state === 'playing'
			? '200'
			: $state !== 'redWins'
			? '100'
			: '0'}%;"
		on:click={() => ($turn % 2 === 0 ? changeTurn() : '')}
	>
		{#if $state === 'playing' || $state === 'paused' || $state === 'start'}
			<div class="timer time-blue">{$time}</div>

			<div
				class="indicator indicator-blue"
				style="--time: {$time}; --initial-time: {$initialTime};"
			/>
		{/if}

		{#if $state === 'playing'}
			{#key $task}
				<div
					style="font-size: {$turn % 2 === 0 ? '1.5' : '1.25'}em;"
					class="task task-blue"
				>
					<span class="participantName">{getParticipantName()}</span>
					<span class:lowerFirst={getParticipantName() !== ''}>{$task}</span>
				</div>
			{/key}
		{/if}
	</button>
	<button
		class="side red"
		style="height: {$turn % 2 === 1 && $state === 'playing'
			? '200'
			: $state !== 'blueWins'
			? '100'
			: '0'}%;"
		on:click={() => ($turn % 2 === 1 ? changeTurn() : '')}
	>
		{#if $state === 'playing' || $state === 'paused' || $state === 'start'}
			<div class="timer time-red">{$time2}</div>

			<div
				class="indicator indicator-red"
				style="--time: {$time2}; --initial-time: {$initialTime};"
			/>
		{/if}

		{#if $state === 'playing'}
			{#key $task}
				<div style="font-size: {$turn % 2 === 1 ? '1.5' : '1.25'}em;" class="task task-red">
					<span class="participantName">{getParticipantName()}</span>
					<span class:lowerFirst={getParticipantName() !== ''}>{$task}</span>
				</div>
			{/key}
		{/if}
	</button>

	{#if $settingsOpened}
		<Settings />
	{/if}
</div>

<svelte:head>
	<title>Súbito</title>
	<meta name="description" content="{$dictionary.completeChallenges}}" />
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

		font-size: 1.75rem;
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

	.indicator {
		--initial-time: var(--initial-time, 20);

		position: absolute;
		right: 0;

		width: 0.6rem;
		box-shadow: 0 0 10px #00000050;
		transition: all 1s;

		--time: min(var(--time, var(--initial-time)), var(--initial-time));
		height: calc(
			(100% + (100% * (0.9 / var(--initial-time)))) * (1 - var(--time) / var(--initial-time))
		);
	}

	.indicator-red {
		top: 0;
		background-color: rgb(48, 48, 255);
		border-radius: 0 0 5px 5px;
	}

	.indicator-blue {
		bottom: 0;
		background-color: rgb(255, 62, 62);
		border-radius: 5px 5px 0 0;
	}

	.task {
		font-size: 1.5em;
		font-weight: 500;
		text-align: center;
		text-wrap: balance;

		max-width: 65ch;
		padding: 10%;

		transition: all 0.2s;
	}

	.task-blue {
		transform: rotate(180deg);
	}

	span {
		display: inline-block;
	}

	.participantName::first-letter {
		text-transform: uppercase;
	}

	.lowerFirst::first-letter {
		text-transform: lowercase;
	}

	.time-blue {
		bottom: 0.5em;
		transform: rotate(180deg);
	}

	.time-red {
		top: 0.5em;
	}
</style>
