<script lang="ts">
	import { fly } from 'svelte/transition';
	import { dictionary, showNotifications } from '../stores';
	import Notification from './notification.svelte';
	import { notifications as dbnot } from '../futureDB';

	function clickOutside(node: any) {
		const handleClick = (event: any) => {
			if (!node.contains(event.target)) {
				close();
			}
		};

		document.addEventListener('click', handleClick, true);

		return {
			destroy() {
				document.removeEventListener('click', handleClick, true);
			},
		};
	}

	function close() {
		$showNotifications = false;
	}

	let notifications: any[] = dbnot
		.filter((notification) => notification.dismissed === false)
		.reverse();

	function dismissNotification(dismissedNotificationId: string) {
		notifications = notifications.filter((element) => element.id !== dismissedNotificationId);
	}
</script>

<section use:clickOutside transition:fly|global={{ x: '100%', opacity: 1 }}>
	<header>
		<h2>{$dictionary.notifications}</h2>
		<!-- svelte-ignore a11y-autofocus -->
		<button
			autofocus
			aria-label="{$dictionary.close} {$dictionary.notifications}"
			on:click={close}><ion-icon name="close-outline" /></button
		>
	</header>
	<div>
		{#if notifications.length > 0}
			{#each notifications as notification (notification)}
				<Notification
					notificationID={notification.id}
					on:dismissed={() => dismissNotification(notification.id)}
				/>
			{/each}
		{:else}
			<h3>{$dictionary.noNoticationsToShow}</h3>
		{/if}
	</div>
</section>

<style>
	section {
		position: fixed;
		top: 0;
		right: 0;
		max-width: 100%;
		width: 28em;
		height: 100vh;
		height: 100dvh;
		z-index: 11;
		border-right: 1px solid var(--content);
		color: var(--content);
		box-shadow: 0 0 5px var(--contentDim);
		background-color: var(--main);
		padding: 3em 2em;
		display: grid;
		grid-template-rows: auto 1fr;
	}

	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2em;
	}

	div {
		overflow-y: auto;
		padding-bottom: 0.5em;
	}

	div::-webkit-scrollbar {
		background-color: #00000020;
		border-radius: 50px;
		width: 10px;
	}
	div::-webkit-scrollbar-thumb {
		background-color: var(--content);
		border-radius: 50px;
	}

	button {
		border-radius: 50%;
		padding: 0.3em;
	}

	button:hover,
	button:focus-visible {
		background-color: #ffffff20;
	}

	button ion-icon {
		font-size: 1.8rem;
	}

	h3 {
		height: 100%;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: normal;
	}

	@media (max-width: 700px) {
		section {
			width: 100%;
		}
	}
</style>
