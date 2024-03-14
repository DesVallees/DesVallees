<script lang="ts">
	import { baseImageRoute } from '../stores';

	export let style: string = '';
</script>

<section id="gallery" {style} class="scrollScale">
	<h2>Some Of Our Custom Work</h2>
	<div>
		<!-- Placeholder images representing previous work -->
		<img src="{baseImageRoute}/demo/woman-small.webp" alt="Custom Design 1" />
		<img src="{baseImageRoute}/demo/man-small.webp" alt="Custom Design 2" />
		<img src="{baseImageRoute}/demo/amsterdam-small.webp" alt="Custom Design 3" />
	</div>
	<a class="moreWork" href="our-work">View more</a>
</section>

<style>
	h2 {
		color: darkred;
		margin-bottom: 20px;
		text-align: center;
	}

	#gallery {
		display: grid;
		padding: 3.5em 2rem;
	}

	#gallery div {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1.25rem;
	}

	#gallery img {
		border: 3px solid darkred;
		border-radius: 5px;
		transition: transform 0.3s ease;
		width: 100%;
		max-width: 300px;
	}

	#gallery img:hover {
		transform: scale(1.05);
	}

	.moreWork {
		width: 15rem;
		max-width: 100%;

		margin: auto;
		margin-top: 2rem;
		padding: 10px 20px;
		border: none;
		border-radius: 5px;

		background-color: darkred;

		font-size: 1em;
		text-align: center;
		color: white;

		cursor: pointer;
		transition: background-color 0.3s ease;
	}

	.moreWork:hover {
		background-color: #b30000;
	}
</style>
