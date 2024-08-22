<script lang="ts">
	import { fade } from 'svelte/transition';
</script>

<div in:fade class="scores">
	<span />
</div>

<style>
	.scores {
		display: grid;
	}
</style>
