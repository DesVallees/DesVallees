<script lang="ts">
	import { openSettings } from '../stores';
</script>

<button class="settings" on:click={openSettings}><ion-icon name="settings" /></button>

<style>
	.settings {
		position: absolute;
		top: 50%;
		left: 5%;
		translate: 0 -50%;

		display: flex;
		justify-content: center;
		align-items: center;

		border-radius: 50%;
		width: 3.5rem;
		height: 3.5rem;

		background-color: rgb(55, 55, 55);
		box-shadow: 0 0 10px #00000099;

		font-size: 1.5rem;

		z-index: 1;
		animation: rotate-linear 7s infinite linear;
	}

	@keyframes rotate-linear {
		100% {
			transform: rotate(360deg);
		}
	}
</style>
