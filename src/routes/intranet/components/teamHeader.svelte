<script lang="ts">
	import { dictionary } from '../stores';
</script>

<section>
	<ion-icon class="logo" name="people-circle-outline" />
	<h2>{$dictionary.teams}</h2>
	<h6>{$dictionary.teamsSubtitle}</h6>
</section>

<style>
	ion-icon {
		font-size: 5rem;
	}

	section {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		gap: 1em;
		margin-bottom: 1em;
	}

	h2 {
		font-size: 2.5rem;
	}

	h6 {
		font-size: 1rem;
		text-align: center;
	}
</style>
