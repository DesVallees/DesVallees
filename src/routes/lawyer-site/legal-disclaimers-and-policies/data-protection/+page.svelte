<script lang="ts">
	import { fade } from 'svelte/transition';
	import { dictionary } from '../../stores';
</script>

<svelte:head>
	<title>{$dictionary.dataProtection}</title>
	<meta name="description" content={$dictionary.dataProtectionPriority} />
</svelte:head>

<div in:fade>
	<article>
		<header>
			<h1>{$dictionary.articles.dataProtection.legalCollabDataProtectionPolicy}</h1>
		</header>

		<section>
			<h2>{$dictionary.articles.dataProtection.overview}</h2>
			<p>{$dictionary.articles.dataProtection.overviewDescription}</p>
		</section>

		<section>
			<h2>{$dictionary.articles.dataProtection.informationWeCollect}</h2>
			<p>{$dictionary.articles.dataProtection.informationWeCollectDescription}</p>
		</section>

		<section>
			<h2>{$dictionary.articles.dataProtection.howWeUseYourInformation}</h2>
			<p>{$dictionary.articles.dataProtection.howWeUseYourInformationDescription}</p>
		</section>

		<section>
			<h2>{$dictionary.articles.dataProtection.dataSecurityMeasures}</h2>
			<p>{$dictionary.articles.dataProtection.dataSecurityMeasuresDescription}</p>
		</section>

		<section>
			<h2>{$dictionary.articles.dataProtection.sharingOfInformation}</h2>
			<p>{$dictionary.articles.dataProtection.sharingOfInformationDescription}</p>
		</section>

		<section>
			<h2>{$dictionary.articles.dataProtection.userControlAndAccess}</h2>
			<p>{$dictionary.articles.dataProtection.userControlAndAccessDescription}</p>
		</section>

		<section>
			<h2>{$dictionary.articles.dataProtection.complianceWithLaws}</h2>
			<p>{$dictionary.articles.dataProtection.complianceWithLawsDescription}</p>
		</section>

		<section>
			<h2>{$dictionary.articles.dataProtection.contactInformation}</h2>
			<p>
				{$dictionary.articles.dataProtection.contactInformationDescription}
				<a href="mailto:support@legalcollab.com">support@legalcollab.com</a>
			</p>
		</section>

		<footer>
			<p>{$dictionary.articles.dataProtection.lastUpdatedOn}</p>
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
