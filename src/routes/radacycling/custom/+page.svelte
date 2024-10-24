<script lang="ts">
	import { fade } from 'svelte/transition';
	import { baseImageRoute, dictionary } from '../stores';
	import CustomOverview from '../components/customOverview.svelte';
	import toast from 'svelte-french-toast';
	import { phoneFormat } from '../functions';

	let email = '';
	let message = '';
	let teamName = '';
	let teamSize = '';
	let phone = '';
	let firstName = '';
	let lastName = '';

	let phoneField: HTMLInputElement;

	const submitForm = () => {
		toast($dictionary.thankYouForYourMessage);
	};
</script>

<svelte:head>
	<title>{$dictionary.custom} | RADA Cycling Wear</title>
	<meta name="description" content={$dictionary.customPageDescription} />
</svelte:head>

<main in:fade>
	<header>
		<picture>
			<source srcset="{baseImageRoute}/custom/1.webp" media="(max-width: 650px)" />
			<img src="{baseImageRoute}/custom/1.webp" alt={$dictionary.customPageDescription} />
		</picture>
		<h1 class="hide">{$dictionary.elevateYourTeamWithCustomDesigns}</h1>
	</header>

	<section id="contact-info">
		<h2>{$dictionary.contactUs}</h2>
		<p>
			{$dictionary.ifYourLookingForCustom}
			<a class="mailLink" href="mailto:contact@radacyclingwear.com"
				>contact@radacyclingwear.com</a
			>.
		</p>

		<form on:submit|preventDefault={submitForm} class="custom-form">
			<div class="form-row">
				<input
					id="firstName"
					type="text"
					placeholder={$dictionary.firstName}
					bind:value={firstName}
					required
				/>
				<input
					id="lastName"
					type="text"
					placeholder={$dictionary.lastName}
					bind:value={lastName}
					required
				/>
			</div>

			<input
				id="teamName"
				type="text"
				placeholder={$dictionary.teamName}
				bind:value={teamName}
				required
			/>
			<input
				id="email"
				type="email"
				placeholder={$dictionary.yourEmail}
				bind:value={email}
				required
			/>

			<div class="form-row">
				<input
					id="phone"
					type="tel"
					bind:this={phoneField}
					on:input={() => phoneFormat(phoneField)}
					placeholder={$dictionary.phoneNumber}
					bind:value={phone}
					required
				/>
			</div>

			<select id="teamSize" bind:value={teamSize} required>
				<option value="" disabled selected>{$dictionary.teamClubSize}</option>
				<option value="1-5">1-5</option>
				<option value="6-10">6-10</option>
				<option value="11-30">11-30</option>
				<option value="31-50">31-50</option>
				<option value="51-100">51-100</option>
				<option value="101-250">101-250</option>
				<option value="251-500">251-500</option>
				<option value="500+">500+</option>
			</select>

			<textarea
				id="message"
				placeholder={$dictionary.message}
				bind:value={message}
				rows="4"
				required
			/>

			<button type="submit">{$dictionary.submit}</button>
		</form>
	</section>

	<section id="why-us" class="scrollScale">
		<h2>{$dictionary.whyUsTitle}</h2>
		<p>{$dictionary.whyUsDescription}</p>
		<ul>
			<li>{$dictionary.reflectTeam}</li>
			<li>{$dictionary.highQualityProducts}</li>
			<li>{$dictionary.lowMinimumKits}</li>
			<li>{$dictionary.turnAroundTime}</li>
		</ul>
		<p>{$dictionary.bestChoice}</p>
	</section>

	<CustomOverview />
</main>

<style>
	main {
		display: grid;
		place-items: center;
		font-size: clamp(1.1rem, 4vw, 1.25rem);
	}

	h1,
	h2 {
		color: darkred;
		margin-bottom: 20px;
		text-align: center;
	}

	.mailLink {
		color: darkred;
	}

	p {
		line-height: 1.6;
	}

	header {
		position: relative;
		text-align: center;
		width: 100%;
		height: calc(100svh - 20rem);
		height: calc(100svh - 20rem);
		min-height: 22rem;
		max-height: clamp(40rem, 5vw, 80rem);
		overflow: hidden;
	}

	header img {
		max-width: revert;
		width: 100%;
		object-position: center top;
		height: 100%;

		object-fit: cover;
	}

	header h1 {
		font-size: 2.5em;
		color: white;
		position: absolute;
		top: 50%;
		left: 0;
		transform: translate(0, -50%);
		width: 50%;
		margin-left: 2rem;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Improves legibility */
	}

	section {
		padding: 3.5em 2rem;
	}

	input,
	textarea {
		width: 100%;
		padding: 10px;
		border: 1px solid #ccc;
		border-radius: 5px;
	}

	input:focus,
	textarea:focus {
		border-color: darkred;
		outline: none;
	}

	button {
		background-color: darkred;
		color: white;
		border: none;
		padding: 10px 20px;
		font-size: 1em;
		cursor: pointer;
		border-radius: 5px;
		transition: background-color 0.3s ease;
	}

	button:hover {
		background-color: #b30000;
	}

	ul {
		margin: 2rem 0;
	}

	li {
		margin-left: 2ch;
		margin-bottom: 1rem;
	}

	.custom-form {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		width: 100%;
		max-width: 600px;
		margin: auto;
		margin-top: 2rem;
		font-size: 1.1rem;
	}

	.form-row {
		display: flex;
		gap: 1rem;
	}

	input,
	select,
	textarea {
		width: 100%;
		padding: 0.75rem;
		font-size: 1em;
		border: 1px solid #ccc;
		border-radius: 5px;
	}

	input:focus,
	select:focus,
	textarea:focus {
		outline: none;
		border-color: darkred;
	}

	button {
		width: 100%;
		background-color: darkred;
		color: white;
		border: none;
		padding: 0.75rem;
		font-size: 1em;
		cursor: pointer;
		border-radius: 5px;
		transition: background-color 0.3s ease;
	}

	button:hover {
		background-color: #b30000;
	}

	@media (max-width: 650px) {
		.form-row {
			flex-direction: column;
		}

		header h1 {
			font-size: 2em;
			width: 90%;
			left: 50%;
			margin-left: 0;
			transform: translate(-50%);
		}

		header img {
			object-position: center 10%;
		}
	}
</style>
