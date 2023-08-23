<script lang="ts">
	import Typewriter from "../../components/typewriter.svelte";
	import { dictionary, language } from "../../stores";


</script>

{#key $language}
    <Typewriter phrase="{$dictionary.paginaNoDisponible}..." style="font-size: 2rem; width: 80%;" typingSpeed={50}/>
{/key}

<style>

</style>