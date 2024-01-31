<script lang="ts">
	import { page } from '$app/stores';
	import { baseRoute, dictionary } from '../stores';
	import ChangeLanguage from './changeLanguage.svelte';
	import Logo from './logo.svelte';
	import SNav from './sNav.svelte';

	let active: boolean = false;
</script>

<nav>
	<section>
		<button
			id="snavToggle"
			class="baseButton s"
			on:click={() => (active = !active)}
			aria-label={$dictionary.siteNavigation}
		>
			<ion-icon name="menu-outline" />
		</button>

		<a class="x" href={baseRoute} aria-label={$dictionary.homepage}>
			<Logo />
		</a>
	</section>

	<div>
		<section class="links x">
			<a class="link" class:active={$page.url.pathname === `${baseRoute}`} href={baseRoute}
				>{$dictionary.home}</a
			>
			<a
				class="link"
				class:active={$page.url.pathname === `${baseRoute}/catalog`}
				href="{baseRoute}/catalog">{$dictionary.catalog}</a
			>
			<a
				class="link"
				class:active={$page.url.pathname === `${baseRoute}/contact`}
				href="{baseRoute}/contact">{$dictionary.contactUs}</a
			>
			<a
				class="link"
				class:active={$page.url.pathname === `${baseRoute}/our-work`}
				href="{baseRoute}/our-work">{$dictionary.ourWork}</a
			>
		</section>

		<a class="s" href={baseRoute} aria-label={$dictionary.homepage}>
			<Logo />
		</a>
	</div>

	<section class="buttons">
		<button class="baseButton x">
			<ion-icon name="search-outline" />
		</button>
		<a
			href="{baseRoute}/my-account"
			class="baseButton x"
			class:active={$page.url.pathname === `${baseRoute}/my-account`}
			aria-label={$dictionary.myAccount}
		>
			<ion-icon name="person-outline" />
		</a>
		<a
			href="{baseRoute}/cart"
			class="baseButton"
			class:active={$page.url.pathname === `${baseRoute}/cart`}
			aria-label={$dictionary.myAccount}
		>
			<ion-icon name="cart-outline" />
		</a>
		<button class="baseButton x">
			<ion-icon name="settings-outline" />
		</button>
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

		padding: 0.5rem 1rem;
		width: 100%;
	}

	a {
		display: flex;
	}

	section {
		display: flex;
		align-items: center;
	}

	.baseButton {
		padding: 0.4em 0.5em;
	}

	#snavToggle ion-icon {
		font-size: 2.325rem;
		transform: translateY(1px);
	}

	.x {
		display: none;
	}

	.links {
		font-size: 1.15rem;
		gap: 3rem;
	}

	.buttons {
		gap: 0.5rem;
		font-size: 1.25rem;
	}

	@media screen and (min-width: 750px) {
		nav {
			padding: 1.5rem 4rem 1rem;
		}
	}

	@media screen and (min-width: 70rem) {
		.x {
			display: flex;
		}

		.s {
			display: none;
		}

		.buttons {
			font-size: 1.15rem;
		}
	}

	@media screen and (max-width: 500px) {
		#snavToggle ion-icon {
			font-size: 2.2rem;
		}
	}
</style>
