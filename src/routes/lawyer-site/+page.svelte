<script lang="ts">
	import { fade } from "svelte/transition";
	import { dictionary } from "./stores";

</script>

<svelte:head>
    <title></title>
    <meta name="description" content="">
</svelte:head>

<div class="home" in:fade>

</div>

<style>
    .home {
        display: grid;
        justify-content: center;

        min-height: 100%;
        padding: 1.5rem;
    }

    @media screen and (min-width: 800px) {
        .home {
            padding: 1.5rem 5rem;
        }
    }
</style>