<script lang="ts">
	import { onMount } from 'svelte';
	import { players, gameState, isHost } from './stores';
	import { initPeer, connectToPeer, broadcastData, getPeerId } from './peer';

	let peerIdToConnect = '';

	onMount(() => {
		const isHostFlag = window.location.search.includes('host');
		isHost.set(isHostFlag);
		initPeer(isHostFlag);
	});

	function joinPeer() {
		connectToPeer(peerIdToConnect);
	}

	function startGame() {
		if ($isHost) {
			broadcastData({
				type: 'gameState',
				state: {
					phase: 'in-progress',
					chameleon: 'Alice',
					word: 'Apple',
				},
			});
		}
	}
</script>

<h1>The Chameleon Game</h1>

<div>
	<h2>Players Online:</h2>
	<ul>
		{#each $players as player}
			<li>{player.name} ({player.id})</li>
		{/each}
	</ul>
</div>

{#if $isHost}
	<button on:click={startGame}>Start Game</button>
{/if}

<input placeholder="Peer ID to connect" bind:value={peerIdToConnect} />
<button on:click={joinPeer}>Join Peer</button>

<h3>Game State:</h3>
<pre>{JSON.stringify($gameState, null, 2)}</pre>
