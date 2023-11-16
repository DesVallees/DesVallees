<script lang="ts">
	import { fade } from "svelte/transition";
	import { dictionary, language } from "../stores";

    
</script>

<div in:fade>
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