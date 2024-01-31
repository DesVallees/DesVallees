<script lang="ts">
	import { dictionary } from '../stores';
	import ChangeLanguage from './changeLanguage.svelte';
	import Logo from './logo.svelte';
	import SNav from './sNav.svelte';
	import ThemeSwitcher from './themeSwitcher.svelte';

	let active: boolean = false;
</script>

<nav>
	<button
		id="snavToggle"
		class="s"
		on:click={() => (active = !active)}
		aria-label={$dictionary.siteNavigation}
	>
		<ion-icon name="menu-outline" />
	</button>

	<a class="x" href="/lawyer-site" aria-label={$dictionary.homepage}>
		<Logo />
	</a>
	<section>
		<ChangeLanguage />
		<div>
			<ThemeSwitcher />
		</div>
	</section>
</nav>

<SNav bind:active />

<style>
	nav {
		position: relative;

		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 3rem;

		padding: 0.8rem 2rem;
		max-width: 1500px;
		width: 100%;
	}

	a,
	div {
		display: flex;
	}

	section {
		display: flex;
		align-items: center;
		gap: 3rem;
	}

	#snavToggle {
		border-radius: 50px;
		padding: 0.4em 0.5em;

		background-color: transparent;
		transition: background-color 0.2s;
	}

	#snavToggle:hover {
		background-color: rgba(240, 248, 255, 0.1);
	}

	#snavToggle ion-icon {
		font-size: 2.325rem;
		transform: translateY(1px);
	}

	.x {
		display: none;
	}

	@media screen and (min-width: 650px) {
		nav {
			padding: 1rem 3rem;
		}
	}

	@media screen and (min-width: 70rem) {
		.x {
			display: flex;
		}

		.s {
			display: none;
		}
	}

	@media screen and (max-width: 500px) {
		#snavToggle ion-icon {
			font-size: 2.2rem;
		}

		div {
			display: none;
		}
	}
</style>
