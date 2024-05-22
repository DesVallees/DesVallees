<script>
	import { fade } from 'svelte/transition';
	import { baseImageRoute, dictionary } from '../stores';
	import CustomOverview from '../components/customOverview.svelte';
	import toast from 'svelte-french-toast';

	let email = '';
	let message = '';
	let subject = '';

	const submitForm = () => {
		toast($dictionary.thankYouForYourMessage);
	};
</script>

<svelte:head>
	<title>{$dictionary.custom} | PGM Cycling Wear</title>
	<meta name="description" content={$dictionary.customPageDescription} />
</svelte:head>

<main in:fade>
	<header>
		<picture>
			<source srcset="{baseImageRoute}/demo/man-small.webp" media="(max-width: 650px)" />
			<img src="{baseImageRoute}/demo/man.webp" alt={$dictionary.customPageDescription} />
		</picture>
		<h1>{$dictionary.elevateYourTeamWithCustomDesigns}</h1>
	</header>

	<section id="contact-info">
		<h2>{$dictionary.contactUs}</h2>
		<p>
			{$dictionary.ifYourLookingForCustom}
			<a class="mailLink" href="mailto:contact@pgmcyclingwear.com"
				>contact@pgmcyclingwear.com</a
			>.
		</p>

		<form on:submit|preventDefault={submitForm}>
			<div>
				<label for="email">{$dictionary.yourEmail}:</label>
				<input id="email" type="email" bind:value={email} required />
			</div>

			<div>
				<label for="subject">{$dictionary.subject}:</label>
				<input id="subject" type="text" bind:value={subject} required />
			</div>

			<div>
				<label for="message">{$dictionary.yourMessage}:</label>
				<textarea id="message" bind:value={message} rows="6" required />
			</div>

			<button type="submit">{$dictionary.submit}</button>
		</form>
	</section>

	<section id="why-us" class="scrollScale">
		<h2>
			{$dictionary.whyChoose}
		</h2>
		<p>
			{$dictionary.weUnderstand}
		</p>
		<ul>
			<li>{$dictionary.reflectTeam}</li>
			<li>{$dictionary.highQualityMaterials}</li>
			<li>{$dictionary.expertAdvice}</li>
		</ul>
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
		margin-bottom: 2rem;
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

	form {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	label {
		display: block;
		margin-bottom: 5px;
		font-weight: bold;
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

	li {
		margin-left: 2ch;
		margin-bottom: 1rem;
	}

	@media (max-width: 650px) {
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
