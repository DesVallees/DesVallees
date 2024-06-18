<script lang="ts">
	import { dictionary } from '../stores';
	import ChangeLanguage from './changeLanguage.svelte';
	import Logo from './logo.svelte';
</script>

<div>
	<a href="/journee" aria-label={$dictionary.journeesHomepage}>
		<Logo />
	</a>
	<ChangeLanguage />
</div>

<style>
	div {
		position: sticky;
		top: 0;
		left: 0;

		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 3rem;

		height: fit-content;
		padding: 0.8rem 2rem;

		z-index: 3;
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
	}

	a {
		display: flex;
	}

	@media screen and (min-width: 650px) {
		div {
			padding: 1rem 3rem;
		}
	}
</style>
