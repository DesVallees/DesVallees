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
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 3rem;

		padding: 0.8rem 2rem;
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
