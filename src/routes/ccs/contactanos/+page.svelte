<script lang="ts">
	import { fade } from "svelte/transition";
	import Typewriter from "../components/typewriter.svelte";
	import { dictionary, language } from "../stores";

    
</script>

<div in:fade>
	{#key $language}
		<Typewriter phrase="{$dictionary.paginaNoDisponible}..." style="font-size: 2rem; width: 80%;" typingSpeed={50}/>
	{/key}
</div>

<style>
	div{
		padding: 0 3em;
        padding-bottom: 100px;

		height: 100%;
		display: flex;
        flex-direction: column;
        justify-content: center;
	}
</style>