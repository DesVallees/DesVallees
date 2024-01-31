<script lang="ts">
	import { fade } from 'svelte/transition';
	import { dictionary } from '../../stores';
</script>

<svelte:head>
	<title>{$dictionary.termsOfService}</title>
	<meta name="description" content={$dictionary.termsOfServiceDescription} />
</svelte:head>

<div in:fade>
	<article>
		<header>
			<h1>{$dictionary.articles.termsOfService.legalCollabTermsOfService}</h1>
		</header>

		<section>
			<h2>{$dictionary.articles.termsOfService.acceptanceOfTerms}</h2>
			<p>{$dictionary.articles.termsOfService.acceptanceOfTermsDescription}</p>
		</section>

		<section>
			<h2>{$dictionary.articles.termsOfService.useOfThePlatform}</h2>
			<p>{$dictionary.articles.termsOfService.useOfThePlatformDescription}</p>
		</section>

		<section>
			<h2>{$dictionary.articles.termsOfService.userConduct}</h2>
			<p>{$dictionary.articles.termsOfService.userConductDescription}</p>
		</section>

		<section>
			<h2>{$dictionary.articles.termsOfService.privacyAndDataProtection}</h2>
			<p>{$dictionary.articles.termsOfService.privacyAndDataProtectionDescription}</p>
		</section>

		<section>
			<h2>{$dictionary.articles.termsOfService.intellectualProperty}</h2>
			<p>{$dictionary.articles.termsOfService.intellectualPropertyDescription}</p>
		</section>

		<section>
			<h2>{$dictionary.articles.termsOfService.disclaimerOfWarranties}</h2>
			<p>{$dictionary.articles.termsOfService.disclaimerOfWarrantiesDescription}</p>
		</section>

		<section>
			<h2>{$dictionary.articles.termsOfService.terminationOfServices}</h2>
			<p>{$dictionary.articles.termsOfService.terminationOfServicesDescription}</p>
		</section>

		<section>
			<h2>{$dictionary.articles.termsOfService.contactInformation}</h2>
			<p>
				{$dictionary.articles.termsOfService.contactInformationDescription}
				<a href="mailto:support@legalcollab.com">support@legalcollab.com</a>.
			</p>
		</section>

		<footer>
			<p>{$dictionary.articles.termsOfService.lastUpdatedOn}</p>
		</footer>
	</article>
</div>

<style>
	div {
		padding: 3rem 2rem 10rem;
		max-width: 1000px;
		margin: auto;

		display: grid;
		place-content: center;
	}

	article {
		margin-top: 0;
	}
</style>
