<script>
	const baseRoute = '/images/room';

	let galleryImages = [
		`${baseRoute}/house.jpeg`,
		`${baseRoute}/flyer.jpeg`,
		`${baseRoute}/main_1.jpeg`,
		`${baseRoute}/main_2.jpeg`,
		`${baseRoute}/main_3.jpeg`,
		`${baseRoute}/living.jpeg`,
		`${baseRoute}/kitchen_1.jpeg`,
		`${baseRoute}/kitchen_2.jpeg`,
		`${baseRoute}/hallway.jpeg`,
		`${baseRoute}/secondary_1.jpeg`,
		`${baseRoute}/secondary_2.jpeg`,
		`${baseRoute}/sink.jpeg`,
		`${baseRoute}/bathroom.jpeg`,
		`${baseRoute}/bath.jpeg`,
		`${baseRoute}/parking.jpeg`,
	];

	let showAll = false;

	let roomImage = `${baseRoute}/main_2.jpeg`;
	let backgroundImage = `${baseRoute}/flyer.jpeg`;
</script>

<svelte:head>
	<title>Looking for a roommate?</title>
	<link rel="icon" href="https://fav.farm/🛏️" />
</svelte:head>

<div class="background">
	<img src="{baseRoute}/house.jpeg" alt="background" loading="lazy" />
	<main>
		<div class="landing">
			<img
				src={roomImage}
				alt="Private Room Available"
				class="landing-image"
				loading="eager"
			/>
			<img
				src={backgroundImage}
				alt="Affordable, Convenient, Clean"
				class="background-image"
				loading="lazy"
			/>
		</div>
		<div class="content">
			<section class="hero">
				<div class="hero-text">
					<h1>Private Room, Shared Costs</h1>
					<p>Are you looking for an affordable, comfortable, and convenient place?</p>
				</div>
			</section>

			<section class="gallery">
				<h2>Take a Look Around</h2>
				{#key showAll}
					<div class="gallery-grid">
						{#if showAll}
							{#each galleryImages as image}
								<img src={image} alt="House" class="gallery-img" />
							{/each}
						{:else}
							{#each galleryImages.slice(0, 3) as image}
								<img src={image} alt="House" class="gallery-img" />
							{/each}
						{/if}
						<button on:click={() => (showAll = !showAll)}>
							{showAll ? 'hide' : 'show more'}
						</button>
					</div>
				{/key}
			</section>

			<section class="about-me">
				<h2>About Me</h2>
				<div class="card">
					<img src="/images/desvallees/santiago.png" alt="Santiago" />
					<p>
						Hey! My name is Santiago and I'm a Computer Science student. I'm early to
						rise, tidy, and enjoy peaceful routines. When I'm not studying or coding,
						I'm probably reading or taking a walk. I’m looking for a like-minded
						roommate who’s respectful, preferably smoke-free, and party-light.
					</p>
				</div>
			</section>

			<section class="details">
				<h2>House Details</h2>
				<ul>
					<li>🛏️ 2 Unfurnished bedrooms</li>
					<li>🚿 Shared bathroom with bonus sink</li>
					<li>🌳 Peaceful neighborhood</li>
					<li>🧺 Washer/dryer</li>
					<li>🍽️ Dishwasher</li>
					<li>📶 Fast Wi-Fi</li>
					<li>❄️ A/C</li>
					<li>🧊 Fridge/freezer</li>
					<li>🅿️ Free parking</li>
					<li>🚫 No Pets</li>
					<li>📅 Available Now</li>
				</ul>
			</section>

			<section class="location">
				<h2>Location</h2>
				<p>3 minutes from McDaniel College and 7 minutes from Carroll Community College.</p>
				<iframe
					title="Chase St. Location"
					src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCpR7k6u3Ce3oYxLdTRBqvYtKPC57l3jEM&q=Chase+St,+Westminster,+MD"
					width="100%"
					height="300"
					style="border:0;"
					allowfullscreen={true}
					loading="lazy"
				/>
			</section>

			<section class="contact">
				<h2>Interested?</h2>
				<p>Feel free to reach out with questions or to schedule a visit.</p>
				<div style="display: flex; gap: 1rem; justify-content: center;">
					<a href="tel:+16672730029" class="contact-card">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							width="50"
							height="50"
							fill="currentColor"
						>
							<path
								d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.21.48 2.53.73 3.88.73a1 1 0 011 1v3.5a1 1 0 01-1 1C10.07 21 3 13.93 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.35.25 2.67.73 3.88a1 1 0 01-.21 1.11l-2.2 2.2z"
							/>
						</svg>
						<span>(667) 273-0029</span>
					</a>
					<a href="mailto:contact@santiagoovalles.com" class="contact-card">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							width="50"
							height="50"
							fill="currentColor"
						>
							<path
								d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 2v.01L12 13 4 6.01V6h16zM4 18V8.24l7.38 6.25a1 1 0 001.24 0L20 8.24V18H4z"
							/>
						</svg>
						<span>contact@santiagoovalles.com</span>
					</a>
				</div>
			</section>
		</div>
	</main>
</div>

<style>
	.background {
		position: relative;
	}

	.background > img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		z-index: -1;
		filter: blur(20px);
		opacity: 0.75;
	}

	main {
		font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
			Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		box-sizing: border-box;
		--green-dark: #155d5c;
		--green-light: #2a8571;
		--accent: #04006e;
		--cream: #dadada;
		--white: #ffffff;
		--black: #000000;

		line-height: 1.5;
		font-size: 1.1rem;
		max-width: 750px;
		margin: 0 auto;
	}

	.landing {
		position: relative;

		z-index: -1;
		height: 50vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.landing-image {
		max-width: 100%;
	}

	.background-image {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		z-index: -2;
		filter: blur(5px);
	}

	.content {
		border-top-left-radius: 20px;
		border-top-right-radius: 20px;
		margin-top: -2rem;
		box-shadow: 0 -10px 10px rgba(0, 0, 0, 0.3);

		background-color: white;
		padding-top: 1rem;
	}

	.hero {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}

	.gallery {
		padding: 2rem;
	}

	.gallery-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1rem;
	}

	.gallery-img {
		width: 100%;
		border-radius: 6px;
	}

	button {
		text-transform: capitalize;
		border: none;
		background-color: var(--green-dark);
		color: var(--white);
		padding: 0.7rem 1rem;
		border-radius: 5px;
		cursor: pointer;
		transition: background-color 0.3s ease;
		font-size: inherit;
	}

	button:hover {
		background-color: var(--green-light);
	}

	section {
		position: relative;
		max-width: 900px;
		padding: 0 1rem;
	}

	.about-me,
	.details,
	.location,
	.contact {
		padding: 1.5rem;
	}

	.card {
		max-width: 600px;
		margin: auto;

		display: grid;
		align-items: center;
		justify-items: center;
		margin-bottom: 1rem;

		border-radius: 10px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
		padding: 1rem 2rem;
	}

	.card img {
		border-radius: 50%;
		border: #a9a7a7 solid 1px;
		box-shadow: 0;
	}

	ul {
		list-style: none;
		padding: 0;
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
	}

	li {
		padding: 0.5em;
		box-shadow: 2px 2px 10px #00000030;
		border-radius: 5px;
		display: flex;
		gap: 1ch;
	}

	.contact {
		padding-bottom: 6rem;
	}

	.contact-card {
		display: grid;
		align-items: center;
		justify-content: center;
		gap: 15px;
		border-radius: 10px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
		padding: 1rem 2rem;
		max-width: 150px;
		width: 100%;
	}

	.contact-card svg {
		color: var(--green-dark);
		margin: auto;
	}

	.contact-card span {
		color: var(--green-dark);
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	iframe {
		border-radius: 8px;
		margin-top: 1rem;
	}

	h1 {
		font-size: 1.75rem;
		margin-bottom: 1rem;
		line-height: normal;
	}

	a {
		text-decoration: none;
	}

	@media (max-width: 500px) {
		.landing {
			height: 40vh;
			padding: 1rem;
			padding-bottom: 2.5rem;
		}

		.landing-image {
			border-radius: 10px;
			box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
		}
	}
</style>
