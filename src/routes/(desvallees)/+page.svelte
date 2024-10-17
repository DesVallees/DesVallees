<script lang="ts">
	import './app.css';
	import Separator from '../intranet/components/separator.svelte';
	import { baseImageRoute, dictionary } from './stores';
	import Project from './components/project.svelte';

	const projectsImageRoute = baseImageRoute + '/projects';

	const projects = [
		{
			href: `/journee`,
			name: `Journée (${$dictionary.comingSoon})`,
			description: $dictionary.description_journee,
			src: `/images/journee/gufoLanding.webp`,
		},
		{
			href: `/eb2`,
			name: `EB2`,
			description: $dictionary.description_eb2,
			src: `${projectsImageRoute}/eb2.webp`,
		},
		{
			href: `/radacycling`,
			name: `RADA Cycling`,
			description: $dictionary.description_rada,
			src: `${projectsImageRoute}/rada.webp`,
		},
		{
			href: `/subito`,
			name: `Súbito`,
			description: $dictionary.description_subito,
			src: `${projectsImageRoute}/subito.webp`,
		},
		{
			href: `https://www.ccsguitars.com/`,
			name: `CCS Guitars`,
			description: $dictionary.description_ccs,
			src: `${projectsImageRoute}/ccsguitars.webp`,
		},
		{
			href: `/lawyer-site`,
			name: `LegalCollab`,
			description: $dictionary.description_legalcollab,
			src: `${projectsImageRoute}/legalcollab.webp`,
		},
		{
			href: `/intranet`,
			name: `${$dictionary.intranet}`,
			description: $dictionary.description_intranet,
			src: `${projectsImageRoute}/intranet.webp`,
		},
		{
			href: `/destype`,
			name: `DesType`,
			description: $dictionary.description_destype,
			src: `${projectsImageRoute}/destype.webp`,
		},
		{
			href: `/threlte`,
			name: `Threlte`,
			description: $dictionary.description_threlte,
			src: `${projectsImageRoute}/threlte.webp`,
		},
		{
			href: `https://clappforms.web.app/`,
			name: `${$dictionary.clappForms}`,
			description: $dictionary.description_clappforms,
			src: `${projectsImageRoute}/clappforms.webp`,
		},
		{
			href: `http://app.clapplawyers.com/`,
			name: `${$dictionary.backoffice}`,
			description: '...',
			src: `${projectsImageRoute}/clappbackoffice.webp`,
			disabled: true,
		},
		{
			href: `http://marshallscare.com/`,
			name: `Marshall's Care`,
			description: '...',
			src: `${projectsImageRoute}/eb2.webp`,
			disabled: true,
		},
		{
			href: `https://ovaliza.com/`,
			name: `Ovaliza`,
			description: $dictionary.description_ovaliza,
			src: `${projectsImageRoute}/ovaliza.webp`,
		},
		{
			href: `https://canto-legal.web.app/`,
			name: `DesCalendar`,
			description: $dictionary.description_descalendar,
			src: `${projectsImageRoute}/descalendar.webp`,
		},
		{
			href: `https://deschat-35f5b.web.app/`,
			name: `DesChat (${$dictionary.sketch})`,
			description: $dictionary.description_deschat,
			src: `${projectsImageRoute}/deschat.webp`,
		},
		{
			href: `https://clapppdfs.web.app/`,
			name: `${$dictionary.pdfEditor} (${$dictionary.sketch})`,
			description: $dictionary.description_pdfeditor,
			src: `${projectsImageRoute}/pdfeditor.webp`,
		},
		{
			href: `https://deschat-35f5b.web.app/sketch`,
			name: `${$dictionary.profileCards} (${$dictionary.sketch})`,
			description: $dictionary.description_profilecards,
			src: `${projectsImageRoute}/profilecards.webp`,
		},
	];
</script>

<svelte:head>
	<title>DesVallees - Santiago Ovalles' Portfolio</title>
	<link rel="icon" href="/images/journee/logoWhite.webp" />
	<meta name="author" content="Santiago Ovalles" />
	<meta
		name="description"
		content="A compilation showcasing the various web projects Santiago has crafted over the course of his professional career."
	/>
	<meta name="keywords" content="Ovalles, Santiago, Desvallees, Portfolio" />
</svelte:head>

<div class="desvallees">
	<header>
		<img class="pp" src="{baseImageRoute}/santiago.webp" alt={$dictionary.photoOfSantiago} />
		<div class="intro">
			<h1>{$dictionary.santiagoOvalles}</h1>
			<p class="introParagraph">
				<span>{$dictionary.helloImSantiago}</span>
				<a class="email" href="mailto:santiago@desvallees.me">santiago@desvallees.me</a>
			</p>
		</div>
	</header>

	<Separator
		width="100%"
		maxWidth="900px"
		height="2px"
		color="var(--content-8)"
		margin="3rem 0 4rem"
	/>

	<main>
		{#each projects as project}
			<Project {...project} />
		{/each}
	</main>
</div>

<style>
	.desvallees {
		display: flex;
		flex-direction: column;
		align-items: center;

		margin: auto;
		padding: 5rem 2rem;
	}

	header {
		display: flex;
		column-gap: 2em;
		row-gap: 2em;

		justify-content: center;
		align-items: start;

		max-width: 1000px;
		height: fit-content;
	}

	.pp {
		height: 10em;
		border-radius: 1em;
		box-shadow: 5px 5px 10px #ffffff50;
	}

	.intro {
		display: grid;
		gap: 0.65em;

		font-size: 1.2em;
		max-width: 50ch;
	}

	h1 {
		font-size: 2.5em;
	}

	.introParagraph {
		font-size: 1em;
		text-wrap: balance;
		line-height: 1.4;
	}

	.email {
		color: var(--content);
	}

	main {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(275px, 100%), 1fr));
		justify-items: center;
		column-gap: 2rem;
		row-gap: 2rem;

		width: 100%;
		max-width: 1200px;
	}

	@media screen and (max-width: 800px) {
		header {
			flex-direction: column;
			align-items: center;
			text-align: center;
		}
	}

	@media screen and (max-width: 500px) {
		.desvallees {
			padding: 3rem 2rem;
		}

		header {
			font-size: 0.9rem;
		}
	}
</style>
