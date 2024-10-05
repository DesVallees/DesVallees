<script lang="ts">
	import { fade, slide } from 'svelte/transition';
	import {
		addParticipants,
		blueParticipants,
		changeTurn,
		dictionary,
		initialTime,
		language,
		redParticipants,
		startGame,
		state,
		task,
		time,
		time2,
		turn,
	} from './stores';

	let blueButton: HTMLButtonElement;
	let redButton: HTMLButtonElement;
	function rejectTurnChange(button: HTMLButtonElement) {}

	let settingsOpened: boolean = false;
	function openSettings() {
		settingsOpened = true;
	}
	function closeSettings() {
		settingsOpened = false;
	}

	let blueTeam: string = $blueParticipants.join(', ');
	let redTeam: string = $redParticipants.join(', ');

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

		<button class="settings" on:click={openSettings}><ion-icon name="settings" /></button>
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
					<span>{getParticipantName()} {$task}</span>
				</div>
			{/key}
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
					<span>{getParticipantName()} {$task}</span>
				</div>
			{/key}
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

		<button class="settings" on:click={openSettings}><ion-icon name="settings" /></button>
	{/if}

	{#if $state === 'redWins' || $state === 'blueWins'}
		<div in:fade class="endScreen">
			<h1 class="inverse">
				{#if $state === 'redWins'}
					{$dictionary.redTeamWins}
				{:else}
					{$dictionary.blueTeamWins}
				{/if}
			</h1>
			<button class="settings" on:click={openSettings}><ion-icon name="settings" /></button>
			<button class="playAgain" on:click={startGame}
				><ion-icon name="refresh-outline" /></button
			>
			<h1>
				{#if $state === 'redWins'}
					{$dictionary.redTeamWins}
				{:else}
					{$dictionary.blueTeamWins}
				{/if}
			</h1>
		</div>
	{/if}

	{#if settingsOpened}
		<div class="settingsPage" transition:slide>
			<header>
				<h1>{$dictionary.settings}</h1>
				<button class="close-btn" on:click={closeSettings}><ion-icon name="close" /></button
				>
			</header>

			<div class="setting-section">
				{#if $state !== 'paused' && $state !== 'playing'}
					<div class="setting-item">
						<label for="initialTime">{$dictionary.initialTime}</label>
						<input
							type="number"
							name="initialTime"
							id="initialTime"
							bind:value={$initialTime}
						/>
					</div>
				{/if}

				<div class="setting-item">
					<label for="language">{$dictionary.language}</label>
					<select name="language" id="language" bind:value={$language}>
						<option value="es">Español</option>
						<option value="en">English</option>
						<option value="fr">Français</option>
						<option value="it">Italiano</option>
						<option value="de">Deutsch</option>
						<option value="pt">Português</option>
						<option value="ru">Русский</option>
					</select>
				</div>

				<hr style="margin: 1em;" />

				<h2>{$dictionary.setParticipantsNames}</h2>
				<p>{$dictionary.addParticipantsNames}</p>

				<div class="setting-item">
					<label for="blueTeam">{$dictionary.blueTeam}</label>
					<input
						bind:value={blueTeam}
						on:input={() => addParticipants(blueTeam, 'blue')}
						type="text"
						name="blueTeam"
						id="blueTeam"
						placeholder={$dictionary.setParticipantsNames}
					/>
				</div>

				<div class="setting-item">
					<label for="redTeam">{$dictionary.redTeam}</label>
					<input
						bind:value={redTeam}
						on:input={() => addParticipants(redTeam, 'red')}
						type="text"
						name="redTeam"
						id="redTeam"
						placeholder={$dictionary.setParticipantsNames}
					/>
				</div>

				<hr style="margin: 1em;" />

				<button class="done-btn" on:click={closeSettings}>{$dictionary.done}</button>
			</div>
		</div>
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

	.settingsPage {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;

		min-height: 100%;

		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20px;

		padding: 20px;

		background-color: rgba(55, 55, 55, 0.95);
		backdrop-filter: blur(5px);
		-webkit-backdrop-filter: blur(5px);

		z-index: 2;
	}

	header {
		width: 100%;

		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	header h1 {
		font-size: 1.5rem;
	}

	.settingsPage h2 {
		font-size: 1rem;
		margin-bottom: 0;
	}

	.settingsPage p {
		margin: -0.2rem 0 0.5rem;
		font-size: 0.85rem;
	}

	.close-btn {
		font-size: 1.5rem;
	}

	.setting-section {
		width: 100%;

		display: flex;
		flex-direction: column;
		gap: 15px;
	}

	.setting-item {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	label {
		font-weight: 500;
		font-size: 0.95em;
	}

	input,
	select {
		width: 100%;
		padding: 10px;
		border-radius: 5px;
		box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.2);
	}

	input:focus,
	select:focus {
		outline: none;
		box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.4);
	}

	.done-btn {
		width: 100%;
		padding: 10px;
		background-color: rgb(29, 175, 21);
		border-radius: 5px;
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

	.settings {
		position: absolute;
		top: 50%;
		left: 5%;
		translate: 0 -50%;

		display: flex;
		justify-content: center;
		align-items: center;

		border-radius: 50%;
		width: 3.5rem;
		height: 3.5rem;

		background-color: rgb(55, 55, 55);
		box-shadow: 0 0 10px #00000099;

		font-size: 1.5rem;

		z-index: 1;
		animation: rotate-linear 7s infinite linear;
	}

	@keyframes rotate-linear {
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
		gap: 3.75em;
	}

	.endScreen h1 {
		font-size: 2.15rem;
		max-width: 70%;
		text-align: center;
	}

	.endScreen h1.inverse {
		transform: rotate(180deg);
	}

	.endScreen .playAgain {
		display: flex;
		justify-content: center;
		align-items: center;

		border-radius: 50%;
		width: 4rem;
		height: 4rem;

		background-color: rgb(29, 175, 21);
		box-shadow: 0 0 10px #00000099;

		font-size: 1.7rem;
		font-weight: bolder;

		z-index: 1;
		animation: rotate 5s infinite linear;
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
		max-width: 65ch;
		font-size: 1.5em;
		font-weight: 500;
		padding: 10%;

		transition: all 0.2s;
	}

	.task-blue {
		transform: rotate(180deg);
	}

	span {
		text-transform: lowercase;
		display: inline-block;
	}

	span::first-letter {
		text-transform: uppercase;
	}

	.time-blue {
		bottom: 0.5em;
		transform: rotate(180deg);
	}

	.time-red {
		top: 0.5em;
	}
</style>
