<script lang="ts">
	import { fade } from 'svelte/transition';
	import { dictionary } from './stores';
</script>

<div in:fade class="baseRoute" />

<svelte:head>
	<title>{$dictionary.charades}</title>
	<meta name="description" content={$dictionary.interactivePartyGame} />
</svelte:head>

<style>
</style>
