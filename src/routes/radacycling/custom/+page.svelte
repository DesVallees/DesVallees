<script>
	import { fade } from 'svelte/transition';
	import { baseImageRoute } from '../stores';
	import CustomOverview from '../components/customOverview.svelte';

	// Svelte component script space
	let email = '';
	let message = '';
	let subject = '';

	// Placeholder function for form submission
	const submitForm = () => {
		console.log({ email, subject, message });
		// Here, you'd typically handle the form submission, like sending the data to a server
		alert('Thank you for your message. We will get back to you shortly!');
	};
</script>

<svelte:head>
	<title>Custom | RADA Cycling Wear</title>
	<meta
		name="description"
		content="Discover custom cycling wear crafted to perfection at Rada Cycling Wear. Connect with us to personalize your cycling uniforms with unparalleled quality and design. Experience the blend of innovation and comfort tailored just for you. Start your custom journey today!"
	/>
</svelte:head>

<main in:fade>
	<header>
		<picture>
			<source srcset="{baseImageRoute}/demo/man-small.webp" media="(max-width: 650px)" />
			<img src="{baseImageRoute}/demo/man.webp" alt="RADA Cycling Wear Hero" />
		</picture>
		<h1>Elevate Your Team's Spirit with Custom Designs</h1>
	</header>

	<section id="contact-info">
		<h2>Contact Us</h2>
		<p>
			If you're looking to get custom-designed cycling uniforms, you're in the right place!
			Please fill out the form below or email us directly at <a
				class="mailLink"
				href="mailto:contact@radacyclingwear.com">contact@radacyclingwear.com</a
			>.
		</p>

		<form on:submit|preventDefault={submitForm}>
			<div>
				<label for="email">Your Email:</label>
				<input id="email" type="email" bind:value={email} required />
			</div>

			<div>
				<label for="subject">Subject:</label>
				<input id="subject" type="text" bind:value={subject} required />
			</div>

			<div>
				<label for="message">Your Message:</label>
				<textarea id="message" bind:value={message} rows="6" required />
			</div>

			<button type="submit">Send Message</button>
		</form>
	</section>

	<section id="why-us" class="scrollScale">
		<h2>Why Choose RADA Cycling Wear?</h2>
		<p>
			We understand the importance of comfort, performance, and style in cycling uniforms.
			Here's why teams love working with us:
		</p>
		<ul>
			<li>Custom designs that reflect your team's spirit and ambition.</li>
			<li>High-quality materials for enhanced performance and durability.</li>
			<li>Expert advice to help you choose the best options for your needs.</li>
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
			transform: translate(-50%);
		}

		header img {
			object-position: center 10%;
		}
	}
</style>
