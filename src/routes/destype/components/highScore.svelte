<script lang="ts">
	import { scale } from 'svelte/transition';
	import { bestWPM, dictionary } from '../stores';
</script>

{#key $dictionary}
	<h2 in:scale>
		<span>{$dictionary.highScore}: </span>

		{#key $bestWPM}
			<span in:scale|global>{$bestWPM}</span>
		{/key}

		<span>{$dictionary.wpm}</span>
	</h2>
{/key}

<style>
	h2 {
		font-family: 'Lexend Deca', sans-serif;
		font-size: 1.2rem;
		color: var(--fg-200);
		letter-spacing: 2px;
	}
</style>
