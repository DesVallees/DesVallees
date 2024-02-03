<script>
	import { baseImageRoute } from '../stores';

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

<main>
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

	<section id="why-us">
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

	<section id="gallery">
		<h2>Some Of Our Work</h2>
		<div>
			<!-- Placeholder images representing previous work -->
			<img src="{baseImageRoute}/demo/woman-small.webp" alt="Custom Design 1" />
			<img src="{baseImageRoute}/demo/man-small.webp" alt="Custom Design 2" />
			<img src="{baseImageRoute}/demo/amsterdam-small.webp" alt="Custom Design 3" />
		</div>
	</section>
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

	p {
		margin-bottom: 2rem;
		line-height: 1.6;
	}

	/* Header */
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

	/* Sections */
	section {
		padding: 3.5em 2rem;
	}

	/* Form Styles */
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

	/* Button */
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

	/* Why us */

	li {
		list-style-position: inside;
		margin-bottom: 1rem;
	}

	/* Gallery */
	#gallery div {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 20px;
	}

	#gallery img {
		border: 3px solid darkred;
		border-radius: 5px;
		transition: transform 0.3s ease;
		width: 100%;
		max-width: 300px;
	}

	#gallery img:hover {
		transform: scale(1.05);
	}

	/* Responsive Design */
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
