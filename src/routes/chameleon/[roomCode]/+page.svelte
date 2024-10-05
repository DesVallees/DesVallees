<script lang="ts">
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';

	let code = $page.params.roomCode;
</script>

<div in:fade class="room">
	<span />
</div>

<style>
	.room {
		display: grid;
	}
</style>
