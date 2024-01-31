<script lang="ts">
	import { dictionary } from '../stores';
	import NotificationsButton from './notificationsButton.svelte';
	import SNav from './sNav.svelte';

	let active: boolean = false;
</script>

<div class="header">
	<div class="menu">
		<button
			class="sidebarTrigger"
			aria-label={$dictionary.siteNavigation}
			on:click={() => (active = !active)}
		>
			<ion-icon name="menu-outline" />
		</button>
		<SNav bind:active />
	</div>
	<div class="notifications">
		<NotificationsButton />
	</div>
</div>

<style>
	.header {
		width: 99%;
		margin: 0 auto;
		height: fit-content;
		border-bottom: 1px solid var(--content);
		background-color: var(--mainDimer);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);

		display: grid;
		grid-template-columns: repeat(2, 1fr);
		align-items: center;
		padding: 0.7em 2.5em 0.7em 2em;

		position: sticky;
		top: 0;
		z-index: 3;
	}

	.notifications {
		justify-self: end;
	}

	.menu {
		justify-self: start;
	}

	.sidebarTrigger {
		justify-self: start;

		position: relative;
		transition: all 0.2s;
		border-radius: 50%;
		padding: 0.5em;

		background-color: var(--mainDimer);
	}

	.sidebarTrigger:hover,
	.sidebarTrigger:focus-visible {
		background-color: #ffffff10;
	}

	.sidebarTrigger ion-icon {
		font-size: 2.2rem;
	}

	@media screen and (min-width: 850px) {
		.menu button {
			display: none;
		}

		.header {
			padding: 1em 2.5em 1em 2em;
		}
	}

	@media screen and (min-width: 1150px) {
		.notifications {
			display: none;
		}

		.header {
			padding: 2em;
		}
	}
</style>
