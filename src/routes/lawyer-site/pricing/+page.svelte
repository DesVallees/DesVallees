<script lang="ts">
	import { fade } from 'svelte/transition';
	import { dictionary } from '../stores';
	import Testimonial from '../components/testimonial.svelte';
</script>

<svelte:head>
	<title>{$dictionary.pricing}</title>
	<meta name="description" content={$dictionary.affordableLegalAssistance} />
</svelte:head>

<div class="pricing" in:fade>
	<h1>{$dictionary.pricing}</h1>

	<section>
		<p>{$dictionary.affordableLegalAssistance}</p>
		<ul>
			<li>{$dictionary.divorceProceedingsAssistance} <strong>$200</strong></li>
			<li>{$dictionary.custodyProceedingsAssistance} <strong>$150</strong></li>
			<li>{$dictionary.legalConsultation} <strong>$50/{$dictionary.hour}</strong></li>
		</ul>
	</section>

	<hr />

	<section>
		<h2>{$dictionary.paymentOptions}</h2>
		<p>{$dictionary.flexiblePaymentOptions}</p>
		<ul>
			<li>{$dictionary.creditCard}</li>
			<li>{$dictionary.payPal}</li>
			<li>{$dictionary.bankTransfer}</li>
		</ul>
	</section>

	<hr />

	<section>
		<h2>{$dictionary.promotions}</h2>
		<p>{$dictionary.explorePromotions}</p>
		<ul style="margin: 3rem 0 4rem; display: grid; gap: 2rem;">
			<li>
				<strong>{$dictionary.firstTimeClientDiscount}:</strong>
				{$dictionary.firstTimeClientDiscountDescription}
			</li>

			<li>
				<strong>{$dictionary.referralRewards}:</strong>
				{$dictionary.referralRewardsDescription}
			</li>

			<li>
				<strong>{$dictionary.freeConsultation}:</strong>
				{$dictionary.freeConsultationDescription}
			</li>
		</ul>
		<p>{$dictionary.promotionDetails}</p>
	</section>

	<hr />

	<section>
		<h2>{$dictionary.successStories}</h2>
		<p>{$dictionary.readAboutSuccess}</p>
		<div class="testimonialCards">
			<Testimonial
				photoSrc="/images/lawyers/Ji-Yeon_Kim.jpg"
				name="Ji-Yeon Kim"
				location={$dictionary.baltimoreCounty}
				text={$dictionary.jiYeonTestimonial}
			/>
			<Testimonial
				photoSrc="/images/lawyers/Rahul_Patel.jpg"
				name="Rahul Patel"
				location={$dictionary.howardCounty}
				text={$dictionary.rahulTestimonial}
			/>
		</div>
	</section>
</div>

<style>
	.pricing {
		padding: 3rem 2rem 10rem;
		margin: auto;
	}

	h1 {
		font-size: clamp(2.25rem, 6vw, 3rem);
		margin: auto;
		margin-bottom: 1rem;
		width: fit-content;
		text-align: center;
		line-height: 2.5ex;
	}

	h2 {
		font-size: clamp(1.75rem, 4vw, 2rem);
		line-height: 1.4;
		text-align: center;
		margin-bottom: 1rem;
	}

	p,
	li {
		font-size: clamp(1.2rem, 3vw, 1.4rem);
		line-height: 1.8;
		text-wrap: pretty;
		max-width: 50ch;
	}

	ul {
		margin-top: 2rem;
		width: 100%;
		max-width: 65ch;
		list-style-position: inside;
	}

	section {
		margin: auto;

		display: grid;
		place-items: center;
	}

	hr {
		width: min(100%, 70ch);
		margin: 8rem auto;
	}

	.testimonialCards {
		margin-top: 5rem;
		display: grid;
		row-gap: 2rem;
		justify-content: center;
	}
</style>
