<script lang="ts">
	import { fade } from "svelte/transition";
	import GuitarImage from "../../components/guitarImage.svelte";
	import Typewriter from "../../components/typewriter.svelte";
	import { guitarStorage } from "../../database";
	import { dictionary, language } from "../../stores";
	import type { PageData } from "./$types";
	import GuitarFeature from "../../components/guitarFeature.svelte";
	import ShareButton from "../../components/shareButton.svelte";
	import CarrouselController from "../../components/carrouselController.svelte";

	export let data: PageData

    let guitarSpanishName = data.guitarSpanishName

	function findObjectByName(nameToFind: string) {
		const formattedNameToFind = nameToFind.replace(/-/g, ' ').toLowerCase();

		return guitarStorage.find((item) =>
			item.name.es.replace(/-/g, ' ').toLowerCase() === formattedNameToFind
		);
	}

	let chosenGuitar = findObjectByName(guitarSpanishName);

	let currentFileIndex:number;

	let imageHeight:number;

</script>

<svelte:head>
    <title>{chosenGuitar?.name[$language] || guitarSpanishName}</title>
    <noscript>
        <title>CCS Guitarras</title>
    </noscript>
    
    <meta name="description" content={chosenGuitar?.paragraph[$language]}>
</svelte:head>

<div class="main" in:fade|global>
	<a class="back baseButton" href="/ccs" aria-label="{$dictionary.goBack}">
		<ion-icon name="caret-back"></ion-icon>
		<span>{$dictionary.goBack}</span>
	</a>

	{#if chosenGuitar}

		<div class="imageContainer" style="height: {imageHeight}px;" in:fade|global={{delay: 100}}>
			<div class="image" bind:offsetHeight={imageHeight}>
				<GuitarImage fileNames={chosenGuitar.fileNames} bind:currentFileIndex name={chosenGuitar.name[$language]} />
			</div>
		</div>
		<CarrouselController array={chosenGuitar.fileNames} bind:currentFileIndex/>

		
		<div class="headers" in:fade|global={{delay: 600}}>
			<h1 class="name">{chosenGuitar.name[$language]}</h1>
			<h2 class="edition">{$dictionary.edicion}: {chosenGuitar.edition[$language]}</h2>
		</div>

		<p in:fade|global={{delay: 600}}>{chosenGuitar.paragraph[$language]}</p>

		<div class="price">
			<span class="oldPrice">{chosenGuitar.oldPrice}</span>
			<h2 class="currentPrice">{chosenGuitar.price}</h2>
		</div>
		
		<div class="features" in:fade|global={{delay: 600}}>
			{#each chosenGuitar.features as feature}
					<GuitarFeature feature={feature} />
			{/each}
		</div>

		<table in:fade|global={{delay: 600}}>
			{#each chosenGuitar.table as datum}
				<tr>
					{#if datum.property}
						<td>{datum.property[$language]}</td>
					{/if}

					<td>{datum.value[$language]}</td>
				</tr>
			{/each}
		</table>

		<div class="interactives" in:fade|global={{delay: 600}}>
			<a href="/ccs/contactanos" class="button">{$dictionary.contactanos}</a>
			<ShareButton justIcon={false} style="color: var(--content); padding: 10px 1.2em;" url="{guitarSpanishName}" title={chosenGuitar.name[$language]} edition={chosenGuitar.edition[$language]} description={chosenGuitar.description[$language]} />
		</div>


		{:else}

		<Typewriter phrase="{$dictionary.error}" style="font-size: 2rem; width: 80%;" typingSpeed={50}/>

	{/if}
</div>

<style>
	.main {
		padding: 0 clamp(1em, 5vw, 3em);
		padding-top: 100px;
        padding-bottom: 100px;

		height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
		align-items: center;

		position: relative;
	}

	.back {
		position: fixed;
		top: 7rem;
		left: clamp(0em, 4vw, 3em);

		z-index: 2;
		
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
	}

	.imageContainer {
		min-height: 400px;
		margin-bottom: 1.5rem;
		
		transition: height 1s ease-out;
	}

	.headers{
		margin-top: 2em;
	}

	.name{
		font-size: clamp(2.25rem, 6vw, 3.5rem);
		line-height: normal;
	}

	.edition {
		color: var(--interactive);
		font-size: clamp(1.1rem, 3vw, 1.3rem);
	}
	
	p {
		font-size: clamp(1.15rem, 3vw, 1.3rem);
		font-weight: normal;
		line-height: 1.8;
		text-align: justify;
		
		margin: 2em 1em;
		max-width: 70ch;
	}

	.price {
		border-radius: 15px;
		padding: 1.5em 2em;
		box-shadow: 1px 1px 20px rgba(255, 255, 255, 0.062);
		margin: 1.5rem 0 1rem;
		max-width: 100%;
	}
	
	.oldPrice {
		font-size: clamp(1.05rem, 2.5vw, 1.15rem);
		text-decoration: line-through;
		color: var(--interactive);
	}
	
	.currentPrice {
		font-weight: 100;
		font-size: clamp(1.25rem, 3vw, 1.4rem);;
	}
	
	.features {
		display: flex;
		gap: 3em;
		flex-wrap: wrap;
		justify-content: center;
		margin: 4em 0;
		width: 100%;
	}

	table {
		max-width: 70ch;
		width: 100%;
		font-size: clamp(1.1rem, 3vw, 1.25rem);
		margin: 3em 0;
		border-radius: 20px;
		background-color: #00000030;
		border-collapse: collapse;
		overflow: hidden;
		overflow: clip;

		box-shadow: 1px 1px 20px rgba(255, 255, 255, 0.062);
	}

	tr:nth-child(even) {background-color: #00000029;}

	tr:hover{
		background-color: #ffffff05;
	}

	tr {
		display: flex;
		width: 100%;
	}

	td {
		flex: 1;

		display: grid;
		place-items: center;

		border: solid rgba(255, 255, 255, 0.082) 1px;
		padding: 1em;
		text-align: center;
	}

	.interactives {
		display: grid;
		place-items: center;
		gap: 2em;
		max-width: 70ch;
		width: 100%;
		margin-top: 2em;
	}

	.button {
		font-size: clamp(1.15rem, 3.5vw, 1.3rem);
		border-radius: 50px;
		padding: .5em;
		max-width: 20ch;
		width: 100%;
	}

	@media(orientation: portrait){
		.main{padding-top: 0px;}
		.imageContainer{min-height: 530px;}
	}
	@media(max-width: 500px){
		p{
			text-align: initial;
			line-height: 2.1rem;
		}

		.back {
			left: .5rem;
			font-size: 1.05rem;
		}
	}

	@media screen and (max-width: 76.125rem) {
		.back {
			position: absolute;
			top: .5rem;
		}
	}

</style>