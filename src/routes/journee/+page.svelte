<script lang="ts">
	import Typewriter from "./components/typewriter.svelte";
	import { dictionary } from "./stores";

</script>

<div class="home">
    <Typewriter phrase="{$dictionary.comingSoon}..." style="font-size: 2rem; font-weight: 700;" delay={100}  />
</div>

<style>
    .home {
        display: grid;
        justify-content: center;
        align-items: center;

        min-height: 100%;
        padding: 1.5em;
    }
</style>