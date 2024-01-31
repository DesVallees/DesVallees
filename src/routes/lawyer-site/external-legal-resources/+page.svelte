<script lang="ts">
	import { fade } from 'svelte/transition';
	import { dictionary } from '../stores';
</script>

<svelte:head>
	<title>{$dictionary.externalLegalResources}</title>
	<meta name="description" content={$dictionary.findImportantInformation} />
</svelte:head>

<div class="external-resources" in:fade>
	<h1>{$dictionary.externalLegalResources}</h1>

	<section>
		<p>{$dictionary.findImportantInformation}</p>
		<ul>
			<li>
				<a href="https://www.childwelfare.gov/" target="_blank"
					>{$dictionary.childWelfareInfoGateway}</a
				>
				- {$dictionary.childWelfareInfoGatewayDescription}
			</li>
			<li>
				<a
					href="https://search.usa.gov/search?affiliate=usagov_all_gov&query=divorce"
					target="_blank">{$dictionary.usaGovDivorce}</a
				>
				- {$dictionary.usaGovDivorceDescription}
			</li>
			<li>
				<a
					href="https://search.usa.gov/search?affiliate=usagov_all_gov&query=custody"
					target="_blank">{$dictionary.usaGovCustody}</a
				>
				- {$dictionary.usaGovCustodyDescription}
			</li>
		</ul>
	</section>
</div>

<style>
	.external-resources {
		padding: 3rem 2rem 10rem;
		max-width: 1500px;
		margin: auto;
	}

	h1 {
		font-size: clamp(2.25rem, 6vw, 3rem);
		margin: auto;
		margin-bottom: 3rem;
		width: fit-content;
		text-align: center;
		line-height: 2.5ex;
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

	a {
		margin-top: 2.75rem;
		font-size: clamp(1.15rem, 3vw, 1.3rem);
		text-align: center;
		color: var(--interactive);
		text-decoration: underline;
	}

	@media screen and (min-width: 500px) {
		p {
			line-height: 1.7;
		}
	}
</style>
