<script lang="ts">
	import { fade } from 'svelte/transition';
	import { state, dictionary, startGame, openSettings } from '../stores';
	import SettingsButton from './settingsButton.svelte';
</script>

<div in:fade class="endScreen">
	<h1 class="inverse">
		{#if $state === 'redWins'}
			{$dictionary.redTeamWins}
		{:else}
			{$dictionary.blueTeamWins}
		{/if}
	</h1>
	<SettingsButton />
	<button class="playAgain" on:click={startGame}><ion-icon name="refresh-outline" /></button>
	<h1>
		{#if $state === 'redWins'}
			{$dictionary.redTeamWins}
		{:else}
			{$dictionary.blueTeamWins}
		{/if}
	</h1>
</div>

<style>
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

	h1 {
		font-size: 2.15rem;
		max-width: 70%;
		text-align: center;
		z-index: 1;
	}

	h1.inverse {
		transform: rotate(180deg);
	}

	.playAgain {
		display: flex;
		justify-content: center;
		align-items: center;

		border-radius: 50%;
		width: 7rem;
		height: 7rem;

		background-color: rgb(29, 175, 21);
		box-shadow: 0 0 10px #00000099;

		font-size: 3rem;
		font-weight: bolder;

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
</style>
