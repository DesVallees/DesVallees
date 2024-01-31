<script lang="ts">
	import { dictionary } from '../stores';

	const currentYear: number = new Date().getFullYear();
</script>

<section>
	<div>
		<a href="/lawyer-site/contact" class="baseButton">{$dictionary.contactUs}</a>

		<a href="/lawyer-site/legal-disclaimers-and-policies" class="baseButton">
			{$dictionary.legalDisclaimersAndPolicies}
		</a>

		<a href="/lawyer-site/sitemap" class="baseButton">
			{$dictionary.siteMap}
		</a>
	</div>

	<div>
		<a href="/lawyer-site" class="baseButton" aria-label="Instagram">
			<ion-icon name="logo-instagram" />
			<span>Instagram</span>
		</a>
		<a href="/lawyer-site" class="baseButton" aria-label="Facebook">
			<ion-icon name="logo-facebook" />
			<span>Facebook</span>
		</a>
		<a href="/lawyer-site" class="baseButton" aria-label="LinkedIn">
			<ion-icon name="logo-linkedin" />
			<span>LinkedIn</span>
		</a>
	</div>
</section>

<footer>
	<span>
		{$dictionary.copyright}
		{currentYear} Santiago Ovalles.
	</span>
	<span>
		{$dictionary.allRightsReserved}
	</span>
</footer>

<style>
	div {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		column-gap: 1ch;
		row-gap: 0.5rem;
	}

	section {
		max-width: 1500px;
		margin: auto;
		display: grid;
		row-gap: 0.5rem;

		padding: 2rem 4rem;
	}

	footer {
		width: fit-content;
		max-width: 1500px;
		margin: auto;

		text-align: center;
		text-wrap: balance;

		padding: 1rem 4rem 3rem;
	}

	a {
		text-align: center;
		text-wrap: balance;
		font-size: 1.05rem;
	}

	span {
		font-size: 1rem;
		text-align: center;
		text-wrap: balance;
	}

	@media screen and (min-width: 800px) {
		span {
			font-size: 1.05rem;
		}
	}

	@media screen and (max-width: 600px) {
		section {
			row-gap: 1.5rem;
		}

		a span {
			display: none;
		}
	}
</style>
