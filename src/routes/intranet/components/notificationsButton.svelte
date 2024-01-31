<script lang="ts">
	import { scale } from 'svelte/transition';
	import { dictionary, showNotifications } from '../stores';
	import { notifications } from '../futureDB';

	let unseenNotifications = notifications.filter(
		(notification) => !notification.seen && !notification.dismissed,
	);
	$: $showNotifications, getUnseenNotifications();

	function getUnseenNotifications() {
		unseenNotifications = notifications.filter(
			(notification) => !notification.seen && !notification.dismissed,
		);
	}
</script>

<button
	aria-label={$dictionary.notifications}
	on:click={() => ($showNotifications = !$showNotifications)}
	class="notification"
	type="button"
>
	<ion-icon name="notifications-outline" />

	{#key unseenNotifications.length}
		<div
			style="--areNotifications: {unseenNotifications.length > 0 ? 'flex' : 'none'}"
			in:scale|global
			class="notificationCounter"
		>
			{unseenNotifications.length}
		</div>
	{/key}
</button>

<style>
	.notification {
		position: relative;
		transition: all 0.2s;
		border-radius: 50%;
		padding: 0.5em;

		background-color: var(--mainDimer);
	}

	.notification:hover,
	.notification:focus-visible {
		background-color: #ffffff10;
	}

	.notification ion-icon {
		font-size: 1.8rem;
	}

	.notificationCounter {
		border-radius: 50%;
		background-color: var(--interative);
		aspect-ratio: 1 / 1;
		height: 50%;
		padding: 0.2em;
		font-size: 0.85rem;
		position: absolute;
		top: 0;
		right: 0;
		display: var(--areNotifications);
		justify-content: center;
		align-items: center;
	}
</style>
