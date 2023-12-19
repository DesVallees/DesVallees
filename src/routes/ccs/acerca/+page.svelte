<script lang="ts">
	import { fade } from "svelte/transition";
	import { dictionary } from "../stores";

</script>

<svelte:head>
    <title>{$dictionary.acercaDeNosotros}</title>
    <noscript>
        <title>CCS - Acerca De Nosotros</title>
    </noscript>
    
    <meta name="description" content={$dictionary.resumenCCS}>
</svelte:head>

<div in:fade|global>
	<article>
		<h1>CCS Guitars</h1>
		<h2>{$dictionary.musicalInstrumentsInspired}</h2>

		<figure>
			<blockquote>
				{@html $dictionary.resumenCCS}
			</blockquote>
			<br>
			<figcaption>
				&mdash; {$dictionary.elEquipoDeCCS}, <cite>CCS Guitars</cite>  
			</figcaption>
		</figure>
	</article>
</div>

<style>
	div{
		padding: 2rem;
		padding-bottom: 5rem;

		min-height: 100%;
		
		display: grid;
        place-content: center;
	}

	article {
		max-width: 60ch;
		font-size: clamp(1.2rem, 4vw, 1.4rem);
		line-height: 1.5;
		padding-bottom: 2rem;
	}
	
	article h1 {
		font-size: clamp(2.5rem, 10vw, 3.75rem);
		line-height: normal;
	}
	
	article h2 {
		font-size: clamp(1.4rem, 5vw, 1.7rem);
		line-height: normal;

		margin: .5rem 0 2rem;
	}

	@media screen and (min-width: 45rem) {
		div {
			padding: 5rem 3rem;
		}

		figure {
			text-align: justify;
		}
	}

</style>