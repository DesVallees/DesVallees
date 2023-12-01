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
	<figure class="quote">
		<blockquote>
			{@html $dictionary.resumenCCS}
		</blockquote>
		<figcaption>
			&mdash; {$dictionary.elEquipoDeCCS}, <cite>CCS Guitars</cite>  
		</figcaption>
	</figure>
</div>

<style>
	div{
		padding: 0 3em;
        padding-bottom: 100px;

		height: 100%;
		display: flex;
        flex-direction: column;
        justify-content: center;
		align-items: center;
	}

	.quote {
		margin: 0;
		background: #ffffff05;
		padding: 1em;
		border: solid 2px var(--content);
		border-radius: 1em;
		max-width: 500px;
	}
	.quote figcaption,
	.quote blockquote {
		margin: 1em;
		text-align: center;
		font-size: clamp(1.1rem, 2.8vw, 1.3rem);
		line-height: 1.7rem;
	}

</style>