<svelte:head>
	<!-- 1) Google Fonts -->
	<link
		href="https://fonts.googleapis.com/css2?
      family=Montserrat:wght@400;700&
      family=Pacifico&
      family=Dancing+Script:wght@400;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="flyer">
	<div class="top-section">
		<div class="content">
			<!-- Series heading -->
			<div class="series-prefix">Housing opportunity</div>
			<div class="series-title">Private Room, Shared Costs</div>

			<!-- Main title -->
			<div class="headline">Looking for a Roommate?</div>

			<!-- Subtitle -->
			<div class="subtitle">7 Minutes from Carroll Community College</div>
		</div>
	</div>

	<div class="wave">
		<img src="/images/room/wave.png" alt="Wave divider" />
	</div>

	<div class="bottom-section">
		<div class="bottom-content">
			<p class="body-text">
				New to the area or just looking to cut costs? If you’re a Carroll Community College
				student, this quiet, affordable shared home just 7 minutes from campus might be
				perfect for you.
			</p>

			<!-- Date/Time/Where/RSVP -->
			<div class="details">
				<div class="item">
					<div class="label">Rent:</div>
					<div class="value">$687.50/month (half rent)</div>
				</div>
				<div class="item">
					<div class="label">Utilities:</div>
					<div class="value">~$100/month</div>
				</div>
			</div>

			<div class="bottom-extra">
				<div>
					<ul>
						<li>Private, unfurnished bedroom</li>
						<li>Shared bathroom + bonus sink</li>
						<li>Peaceful neighborhood</li>
						<li>Fast Wi-Fi, dishwasher, washer/dryer, A/C</li>
						<li>Free resident parking</li>
					</ul>
				</div>
				<div>
					I’m a quiet, respectful Computer Science student who’s up early and keeps things
					clean. Looking for a like-minded roommate — preferably no smoking or parties,
					but open to chat.
				</div>
			</div>

			<div class="bottom-logos">
				<div class="logo-item">
					<div class="logo-circle">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							width="25"
							height="25"
							fill="currentColor"
						>
							<path
								d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.21.48 2.53.73 3.88.73a1 1 0 011 1v3.5a1 1 0 01-1 1C10.07 21 3 13.93 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.35.25 2.67.73 3.88a1 1 0 01-.21 1.11l-2.2 2.2z"
							/>
						</svg>
					</div>
					<span>667 273 0029</span>
				</div>
				<div class="logo-item">
					<div class="logo-circle">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							width="25"
							height="25"
							fill="currentColor"
						>
							<path
								d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 2v.01L12 13 4 6.01V6h16zM4 18V8.24l7.38 6.25a1 1 0 001.24 0L20 8.24V18H4z"
							/>
						</svg>
					</div>
					<span>sntg.ovalde@gmail.com</span>
				</div>
				<div class="qr">
					<img src="/images/room/qrcode.png" alt="RSVP QR Code" />
					<span>More Info</span>
				</div>
			</div>
		</div>
	</div>
</div>

<style global>
	/* 2) CSS Variables */
	:root {
		--green-dark: #155d5c;
		--green-light: #81e6d0;
		--accent-yellow: #f2d398;
		--cream: #f3e7e4;
		--white: #ffffff;
		--black: #000000;

		font-family: 'Montserrat', sans-serif;
	}

	.flyer {
		max-width: 786px;
		margin: 0 auto;
		display: grid;
	}

	/* 3) Reset & Base */
	*,
	*::before,
	*::after {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	/* 4) Flyer container with background + overlay */
	.top-section {
		position: relative;
		width: 100%;
		background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
			url('/images/room/background.jpeg') center/cover no-repeat;
		color: var(--white);
		overflow: hidden;
	}

	/* 5) Centered content */
	.content {
		position: relative;
		z-index: 1;
		max-width: 800px;
		margin: 0 auto;
		padding: 40px 20px 60px;
		text-align: center;
	}

	/* 6) Series heading */
	.series-prefix {
		font-size: 1rem;
		font-weight: 700;
		color: var(--green-light);
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}
	.series-title {
		font-size: 1.75rem;
		font-weight: 700;
		color: var(--green-light);
		text-transform: uppercase;
		margin-bottom: 50px;
	}

	/* 7) Main headline */
	.headline {
		font-family: 'Pacifico', cursive;
		font-size: 4rem;
		line-height: 1.1;
		text-transform: uppercase;
		text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.7);
		margin-bottom: 30px;
	}

	/* 8) Subtitle */
	.subtitle {
		font-family: 'Dancing Script', cursive;
		font-size: 1.8rem;
		color: var(--cream);
		margin-bottom: 40px;
	}

	/* 9) Body text */
	.body-text {
		font-size: 1rem;
		line-height: 1.6;
		max-width: 700px;
		margin: 0 auto 40px;
	}

	/* 10) Details grid */
	.details {
		display: grid;
		grid-template-columns: 1fr 1fr;
		column-gap: 27px;
		row-gap: 10px;
		margin-bottom: 30px;
		background: linear-gradient(90deg, rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0));
		padding: 10px 60px;
		font-size: 1.2em;
	}
	.details .item {
		min-width: 180px;
		text-align: left;
		display: flex;
		gap: 0.7ch;
	}
	.details .item .label {
		font-weight: 700;
	}

	.wave {
		width: 100%;
		margin-top: -145px;
		z-index: 1;
	}

	.wave img {
		display: block;
		width: 100%;
		height: auto;
	}

	/* Lower section below the wave */
	.bottom-section {
		background: var(--green-dark);
		color: var(--white);
		padding: 80px 0 50px;
		text-align: center;
		z-index: 1;
	}

	.bottom-content {
		margin-top: -145px;
		z-index: 2;
	}

	.bottom-extra {
		display: grid;
		grid-template-columns: 1fr 1fr;
		padding: 0 60px;
		gap: 30px;
		text-align: left;
		text-wrap: balance;
		font-size: 0.9em;
		font-weight: 300;
		line-height: 1.5;
	}

	/* Circle logo placeholder */
	.logo-circle {
		width: 40px;
		height: 40px;
		background: #fff;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 700;
		color: var(--green-dark);
	}

	/* Logos row in bottom section */
	.bottom-logos {
		display: grid;
		grid-template-columns: 1fr 1fr auto;
		justify-content: center;
		align-items: center;
		gap: 40px;
		margin-top: 20px;
		padding: 0 60px;
		font-size: 1.1em;
	}
	.logo-item {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 2ch;
		align-items: center;
	}
	.logo-item span {
		font-weight: 700;
		color: var(--white);
		text-align: left;
		text-transform: none;
	}
	.qr {
		padding: 10px;
		background-color: white;
		border-radius: 10px;
		position: relative;
	}
	.qr img {
		width: 100px;
		height: auto;
		display: block;
	}
	.qr span {
		position: absolute;
		bottom: -20px;
		font-size: 0.8em;
		font-weight: 600;
		left: 0;
		right: 0;
		margin: 0 auto;
		text-align: center;
	}
</style>
