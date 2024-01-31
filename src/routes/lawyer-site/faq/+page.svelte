<script lang="ts">
	import { fade } from 'svelte/transition';
	import { dictionary } from '../stores';
	import toast from 'svelte-french-toast';

	function comingSoon() {
		toast(`${$dictionary.comingSoon}...`, {
			duration: 3000,
			style: 'font-weight: bold; background-color: var(--content); color: var(--main);',
		});
	}
</script>

<svelte:head>
	<title>{$dictionary.frequentlyAskedQuestions}</title>
	<meta name="description" content={$dictionary.exploreFAQPage} />
</svelte:head>

<div class="faq" in:fade>
	<h1>{$dictionary.frequentlyAskedQuestions}</h1>

	<section>
		<p>{$dictionary.lookingForSomethingSpecific}</p>
		<input
			on:focus={comingSoon}
			type="text"
			name="search"
			placeholder={$dictionary.searchPlaceholder}
		/>
	</section>

	<hr />

	<section>
		<h2>{$dictionary.generalQuestions}</h2>
		<dl>
			<dt>{$dictionary.howDoesLegalCollabWork}</dt>
			<dd>
				<p>{$dictionary.legalCollabFAQ}</p>
			</dd>

			<dt>{$dictionary.typesOfLegalServices}</dt>
			<dd>
				<p>{$dictionary.legalServicesDescription}</p>
			</dd>
		</dl>
	</section>

	<hr />

	<section>
		<h2>{$dictionary.usingLegalCollab}</h2>
		<dl>
			<dt>{$dictionary.signUpForLegalCollab}</dt>
			<dd>
				<p>{$dictionary.signUpDescription}</p>
			</dd>

			<dt>{$dictionary.isMyInformationSecure}</dt>
			<dd>
				<p>{$dictionary.informationSecurityDescription}</p>
			</dd>
		</dl>
	</section>

	<hr />

	<section>
		<p>
			{$dictionary.ifYouCantFindInformation}
			<a href="/lawyer-site/contact">{$dictionary.contactUs}</a>. {$dictionary.teamHereToHelp}
		</p>
	</section>
</div>

<style>
	.faq {
		padding: 3rem 2rem 10rem;
		max-width: 1500px;
		margin: auto;
	}

	h1 {
		font-size: clamp(2.25rem, 6vw, 3rem);
		margin: auto;
		margin-bottom: 1.5rem;
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

	p {
		font-size: clamp(1.2rem, 3vw, 1.4rem);
		line-height: 1.8;
		text-wrap: pretty;
		max-width: 50ch;
	}

	input {
		background-color: var(--main-2);
		margin-top: 2rem;
		border-radius: 15px;
		padding: 0.7em 1em;
		border: 2px var(--content-8) solid;
		width: 100%;
		max-width: 70ch;
	}

	input:focus {
		outline: none;
		border: 2px var(--content) solid;
	}

	dt {
		font-size: clamp(1.3rem, 3.5vw, 1.5rem);
		font-weight: bold;
		margin: 1rem 0;
		display: list-item;
		list-style-position: inside;
	}

	dd:not(:last-child) {
		margin-bottom: 3rem;
	}

	section {
		margin: auto;

		display: grid;
		place-items: center;
	}

	a {
		font-size: clamp(1.15rem, 3vw, 1.3rem);
		color: var(--interactive);
		text-decoration: underline;
	}

	hr {
		width: min(100%, 70ch);
		margin: 8rem auto;
	}
</style>
