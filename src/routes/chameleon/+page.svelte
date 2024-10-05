<script lang="ts">
	import { fade } from 'svelte/transition';
	import { dictionary } from './stores';
</script>

<div in:fade class="chameleon">
	<h1>{$dictionary.chameleon}</h1>
	<p>¿Quién es el verdadero maestro del disfraz?</p>

	<button class="button">Crea una nueva sala</button>

	<span class="separator">o</span>

	<label for="code">Únete a una sala existente</label>
	<input id="code" type="number" />
	<button class="button">Entrar</button>
</div>

<svelte:head>
	<title>{$dictionary.chameleon}</title>
	<meta name="description" content="I'll do this later" />
</svelte:head>

<style>
	.chameleon {
		display: grid;
	}
</style>
