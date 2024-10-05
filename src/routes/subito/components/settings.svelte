<script lang="ts">
	import { slide } from 'svelte/transition';
	import {
		addParticipants,
		blueParticipants,
		closeSettings,
		dictionary,
		initialTime,
		language,
		redParticipants,
		state,
	} from '../stores';
	import { onMount } from 'svelte';

	let initialTimeInputValue: any = $initialTime;
	function validateInitialTime() {
		let value: string | number = String(initialTimeInputValue);
		value = value.replace(/[^0-9]/g, '');

		value = parseInt(value, 10) || 20;
		if (value < 1) {
			value = 20;
		}

		$initialTime = value;
	}

	let blueTeam: string = $blueParticipants.join(', ');
	let redTeam: string = $redParticipants.join(', ');

	onMount(() => {
		initialTimeInputValue = $initialTime;
	});
</script>

<div class="settings" transition:slide>
	<header>
		<h1>{$dictionary.settings}</h1>
		<button class="close" on:click={closeSettings}><ion-icon name="close" /></button>
	</header>

	<div class="settingSection">
		{#if $state !== 'paused' && $state !== 'playing'}
			<div class="settingItem">
				<label for="initialTime">{$dictionary.initialTime}</label>
				<input
					type="number"
					name="initialTime"
					id="initialTime"
					min="1"
					bind:value={initialTimeInputValue}
					on:input={validateInitialTime}
				/>
			</div>
		{/if}

		<div class="settingItem">
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

		<div class="settingItem">
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

		<div class="settingItem">
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

		<button class="done" on:click={closeSettings}>{$dictionary.done}</button>
	</div>
</div>

<style>
	.settings {
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

	h1 {
		font-size: 1.5rem;
	}

	h2 {
		font-size: 1rem;
		margin-bottom: 0;
	}

	p {
		margin: -0.2rem 0 0.5rem;
		font-size: 0.85rem;
	}

	.close {
		font-size: 1.5rem;
	}

	.settingSection {
		width: 100%;

		display: flex;
		flex-direction: column;
		gap: 15px;
	}

	.settingItem {
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

	.done {
		width: 100%;
		padding: 10px;
		background-color: rgb(29, 175, 21);
		border-radius: 5px;
	}
</style>
