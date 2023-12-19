<script lang="ts">
	import { fade } from "svelte/transition";
	import { dictionary } from "../stores";
	import toast from "svelte-french-toast";

	const ccsEmail = "ccsguitarscolombia@gmail.com";
	
    function copyToClipboard() {
		navigator.clipboard.writeText(ccsEmail);

		toast.success($dictionary.emailCopied, {style: "font-size: 1.25rem"})
	}
</script>

<svelte:head>
    <title>{$dictionary.contactanos}</title>
    <noscript>
        <title>CCS - Contáctanos</title>
    </noscript>
    
    <meta name="description" content={$dictionary.connectWithUs}>
</svelte:head>

<div in:fade|global>
	
	<section>
		<h1>{$dictionary.getInTouch}</h1>
		<h3>{$dictionary.gatewayToExceptional}</h3>
		<p>
			<span>{$dictionary.ourEmail}</span>
			<a href="mailto:{ccsEmail}">{ccsEmail}</a>
			<button on:click={copyToClipboard} class="baseButton" aria-label="{$dictionary.copyEmail}">
				<ion-icon name="copy-outline"></ion-icon>
				<span>{$dictionary.copyEmail}</span>
			</button>
		</p>
		<p>{$dictionary.visitOurInstagram} <a href="https://www.instagram.com/ccsguitars" target="_blank">@cssguitars</a></p>
	</section>
	
	<hr>
	
	<section>
		<h2>{$dictionary.visitOurWonderland}</h2>
		<h3>{$dictionary.experienceExcellence}</h3>
		<p><i>{$dictionary.stayTuned}</i></p>
		<img 
			loading="lazy"
			src="/images/ccs/ccsStore.jpg"
			alt="{$dictionary.ccsGuitarShop} ({$dictionary.comingSoon})"
			width="600"
			height="600"
		>
	</section>
	
</div>

<style>
	div{
		max-width: 1500px;
        margin: auto;
		padding: clamp(2rem, 13vw, 8rem) clamp(2rem, 10vw, 4rem) 8rem;
	}
	
    section {
        display: grid;
        place-items: center;
    }

	h1 {
		max-width: 25ch;
        width: fit-content;
		margin: 0 auto 1.5rem;

        font-size: clamp(2.25rem, 9vw, 3.75rem);
        text-align: center;
        line-height: 2.5ex;
    }

    h2 {
		max-width: 25ch;
        width: fit-content;
		margin: 0 auto 2rem;

        font-size: clamp(2rem, 7vw, 3.75rem);
        text-align: center;
    }

    p, h3 {
		max-width: 65ch;
        margin: auto;

        text-wrap: pretty;
        text-align: center;
    }
	
	h3 {
		margin-bottom: 3rem;

		font-size: clamp(1.3rem, 4vw, 1.6rem);
		font-weight: normal;
	}
	
	p {
		display: grid;
		place-items: center;

		font-size: clamp(1.3rem, 3.8vw, 1.5rem);
		line-height: 1.5;
	}

	a {
		padding: 3px;

		font-size: inherit;
		text-decoration: underline;
		text-underline-offset: .3em;
		text-decoration-color: var(--interactive);

		display: block;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		max-width: 100%;
	}

	button {
		margin: 1rem 0 3.5rem;

		font-size: clamp(1.1rem, 3.25vw, 1.25rem);
	}

    hr {
        width: min(100%, 70ch);
        margin: 10rem auto;
    }
    
    img {
		max-width: 100%;
		height: auto;
        margin-top: 3rem;
        border-radius: 25px;
        box-shadow: 0 0 1rem var(--contentTransparent);
    }
</style>