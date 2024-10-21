<script lang="ts">
	import './app.css';

	import { baseImageRoute, dictionary, filterText } from './stores';
	import { flip } from 'svelte/animate';
	import { receive, send } from './transitions';

	import Project from './components/project.svelte';
	import LanguagePicker from './components/languagePicker.svelte';
	import ThemeSwitcher from './components/themeSwitcher.svelte';
	import Separator from './components/separator.svelte';

	const projectsImageRoute = baseImageRoute + '/projects';

	$: projects = [
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
			href: `/chameleon`,
			name: $dictionary.chameleon,
			description: $dictionary.description_chameleon,
			src: `https://miro.medium.com/v2/resize:fit:300/1*cWGXsZij2YY8koglYBcZNw.jpeg`,
			disabled: true,
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

	let filterInput: HTMLInputElement;

	function isPrintableKey(key: string) {
		return key === 'Backspace' || (key.length === 1 && key.match(/[\w\s]/)); // Backspace and alphanumeric characters
	}

	function handleKey(event: KeyboardEvent) {
		if (document.activeElement !== filterInput && isPrintableKey(event.key)) {
			filterInput.focus();
			if (event.key === 'Backspace') {
				$filterText = $filterText.slice(0, -1);
			}
		} else if (document.activeElement === filterInput && event.key === 'Enter') {
			const firstProjectHREF = projects.filter(
				(p) =>
					!p.disabled &&
					(!filterText ||
						`${p.name} ${p.description}`
							.toLowerCase()
							.includes($filterText.toLowerCase())),
			)[0].href;

			window.location.href = firstProjectHREF;
		}
	}
</script>

<svelte:window on:keypress={handleKey} />

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
		<img class="pp" src="{baseImageRoute}/santiago.png" alt={$dictionary.photoOfSantiago} />
		<div class="intro">
			<h1>{$dictionary.santiagoOvalles}</h1>
			<p class="introParagraph">
				<span>{$dictionary.helloImSantiago}</span>
				<a class="email" href="mailto:santiago@desvallees.me">santiago@desvallees.me</a>
			</p>
		</div>
	</header>

	<div class="controls">
		<LanguagePicker />
		<ThemeSwitcher />
	</div>

	<Separator
		width="100%"
		maxWidth="900px"
		height="2px"
		color="var(--content-8)"
		margin="1rem 0 2rem"
	/>

	<div class="search">
		<ion-icon name="search" />
		<input
			type="text"
			autocomplete="off"
			bind:value={$filterText}
			bind:this={filterInput}
			placeholder={$dictionary.lookForProject}
		/>
	</div>

	<main>
		{#each projects.filter((p) => !p.disabled && (!filterText || `${p.name} ${p.description}`
						.toLowerCase()
						.includes($filterText.toLowerCase()))) as project (project.name)}
			<div
				in:receive|global={{ key: project.name }}
				out:send|global={{ key: project.name }}
				animate:flip={{ duration: 400 }}
			>
				<Project {...project} />
			</div>
		{:else}
			<p style="font-size: 1.05em;">{$dictionary.noProjectsToShow}</p>
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
		box-shadow: 5px 5px 10px var(--content-2);
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
		text-wrap: pretty;
		line-height: 1.4;
	}

	.email {
		color: var(--content);
	}

	.controls {
		display: flex;
		flex-wrap: wrap;
		column-gap: 5rem;
		row-gap: 1rem;
		align-items: center;
		justify-content: center;

		margin-top: 2rem;
		margin-bottom: 0.5rem;

		font-size: 1.1rem;
	}

	main {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(275px, 100%), 1fr));
		justify-items: center;
		column-gap: 2rem;
		row-gap: 2rem;

		max-width: 1200px;
	}

	.search {
		position: relative;

		width: 400px;
		max-width: 100%;
		margin-bottom: 2rem;
	}

	.search ion-icon {
		position: absolute;
		left: 0.75em;
		top: 50%;
		transform: translateY(-50%);

		font-size: 1.3em;
		color: var(--content);
	}

	.search input {
		width: 100%;
		padding: 0.5em 1em 0.5em 2.5em;
		border: 2px solid var(--content-5);
		border-radius: 20px;

		background-color: var(--interactive-2);
		box-shadow: 2px 2px 10px var(--content-2);

		font-size: 1.1em;
		color: var(--content);
	}

	.search input:hover {
		box-shadow: 2px 2px 10px var(--content-5);
	}

	.search input:focus {
		outline: 2px solid var(--content);
		box-shadow: 2px 2px 10px var(--content-5);
	}

	.search input::placeholder {
		color: var(--content-7);
	}

	@media screen and (max-width: 1200px) {
		main {
			max-width: 100%;
		}
	}

	@media screen and (max-width: 800px) {
		header {
			flex-direction: column;
			align-items: center;
			text-align: center;
		}

		.introParagraph {
			text-wrap: balance;
		}

		.controls {
			margin-top: 2.5rem;
			margin-bottom: 1rem;
		}
	}

	@media screen and (max-width: 500px) {
		.desvallees {
			padding: 3rem 2rem;
		}

		header {
			font-size: 0.9rem;
		}

		.controls {
			font-size: 1rem;
		}

		.search {
			margin-top: 1rem;
		}
	}

	:global([data-theme='light']) .search input {
		background-color: var(--interactive-1);
	}
</style>
